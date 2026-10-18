#!/usr/bin/env python3
"""Fail-closed public-tree check. No network requests or source-file writes.

This checks known content boundaries, not copyright ownership or arbitrary
obfuscation. It does not turn private research material into publishable data.
"""
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRECTORIES = {'.git', '.qa'}
TEXT_EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.json', '.md', '.txt', '.svg',
                   '.xml', '.webmanifest', '.py', '.yml', '.yaml', '.toml'}
TEXT_NAMES = {'LICENSE', '.gitignore', '.nojekyll'}
PROTECTED_EXTENSIONS = {'.exe', '.dll', '.iso', '.bin', '.cue', '.dar', '.qar',
                        '.mar', '.kmy', '.xti', '.evx', '.pnach', '.p2s', '.blend',
                        '.glb', '.gltf'}
DISALLOWED_DIRECTORIES = {'node_modules', 'extracted', 'checkpoints', 'game-assets'}
MAX_FILE_BYTES = 2 * 1024 * 1024
PRIVATE_PATH = re.compile('/' + r'(?:Users|home|Volumes|private|tmp|var/folders|mnt|root)/'
                          + r'|[A-Za-z]:[\\/]Users[\\/]|file' + r'://', re.IGNORECASE)
CREDENTIAL_PATTERNS = [
    re.compile(r'\bgh[pousr]_[A-Za-z0-9_]{20,}\b'),
    re.compile(r'\bgithub_pat_[A-Za-z0-9_]{30,}\b'),
    re.compile(r'\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b'),
    re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    re.compile(r'\bxox[baprs]-[A-Za-z0-9-]{10,}\b'),
    re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    re.compile(r'\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b'),
]
SECRET_ASSIGNMENT = re.compile(r'''(?ix)\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|password)\b
                                  ['"]?\s*[:=]\s*(['"])([^'"\r\n]{8,})\1''')
PLACEHOLDER = re.compile(r'^(?:example|placeholder|your[_ -]|replace[_ -]|<)', re.IGNORECASE)
EMBEDDED_BINARY = re.compile(r'data:[^\s,]*;base64,|[A-Za-z0-9+/]{2048,}={0,2}', re.IGNORECASE)
CAPTURE_NAME = re.compile(r'(?:^|[/_.-])(?:screenshot|screencap|gamecapture|game-capture)(?:[/_.-]|$)', re.IGNORECASE)


class HTMLReferences(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.references = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value is None:
                continue
            if name == 'id':
                self.ids.add(value)
            if name in {'href', 'src', 'poster'}:
                self.references.append(value)
            if name == 'srcset':
                self.references.extend(item.strip().split()[0] for item in value.split(',') if item.strip())

    handle_startendtag = handle_starttag


def inspect_tree(root):
    errors, texts = [], {}
    for directory, directories, files in os.walk(root, followlinks=False):
        here = Path(directory)
        for name in list(directories):
            path = here / name
            relative = path.relative_to(root).as_posix()
            if path.is_symlink():
                errors.append(relative + ': symlink is not allowed')
                directories.remove(name)
            elif name in EXCLUDED_DIRECTORIES:
                directories.remove(name)
            elif name in DISALLOWED_DIRECTORIES:
                errors.append(relative + ': private/generated dependency directory is not allowed')
                directories.remove(name)
        for name in files:
            path = here / name
            relative = path.relative_to(root).as_posix()
            if path.is_symlink():
                errors.append(relative + ': symlink is not allowed')
                continue
            if name == '.git':
                continue
            extension = path.suffix.lower()
            if extension in PROTECTED_EXTENSIONS:
                errors.append(relative + ': protected game/research file extension')
                continue
            if name not in TEXT_NAMES and extension not in TEXT_EXTENSIONS:
                errors.append(relative + ': unrecognized or binary file type; only reviewed text/code/SVG is allowed')
                continue
            if CAPTURE_NAME.search(relative):
                errors.append(relative + ': capture filename is not public teaching content')
                continue
            data = path.read_bytes()
            if len(data) > MAX_FILE_BYTES:
                errors.append(relative + ': file exceeds the public text size limit')
                continue
            try:
                text = data.decode('utf-8-sig')
            except UnicodeDecodeError:
                errors.append(relative + ': non-UTF-8 binary content')
                continue
            if any(ord(character) < 32 and character not in '\t\n\r' for character in text):
                errors.append(relative + ': binary/control-byte content')
                continue
            if PRIVATE_PATH.search(text):
                errors.append(relative + ': private absolute path or local file URL')
            if any(pattern.search(text) for pattern in CREDENTIAL_PATTERNS):
                errors.append(relative + ': likely credential/private-key pattern')
            if any(not PLACEHOLDER.search(match.group(2)) for match in SECRET_ASSIGNMENT.finditer(text)):
                errors.append(relative + ': likely secret assignment')
            if EMBEDDED_BINARY.search(text):
                errors.append(relative + ': embedded binary/base64 payload')
            texts[path] = text
    return texts, errors


def references(path, text):
    if path.suffix.lower() == '.html':
        parser = HTMLReferences()
        parser.feed(text)
        return parser.references, parser.ids
    if path.suffix.lower() == '.css':
        found = re.findall(r'''url\(\s*['"]?([^)'"\s]+)['"]?\s*\)''', text, re.IGNORECASE)
        found += re.findall(r'''@import\s+['"]([^'"]+)['"]''', text, re.IGNORECASE)
        return found, set()
    if path.suffix.lower() == '.md':
        return re.findall(r'!?\[[^\]]*\]\(([^\s)]+)', text), set()
    return [], set()


def check_references(root, texts):
    errors, parsed = [], {path: references(path, text) for path, text in texts.items()}
    count = 0
    for source, (links, _) in parsed.items():
        for reference in links:
            count += 1
            parts = urlsplit(reference)
            if parts.scheme in {'http', 'https', 'mailto', 'tel'} or parts.netloc:
                continue
            label = source.relative_to(root).as_posix()
            if parts.scheme:
                errors.append(label + ': unsupported reference scheme')
                continue
            if parts.path.startswith('/'):
                errors.append(label + ': use project-relative references for portable hosting')
                continue
            target = (source.parent / unquote(parts.path)).resolve() if parts.path else source
            if not target.is_relative_to(root):
                errors.append(label + ': local reference escapes the public directory')
                continue
            if target.is_dir():
                target = target / 'index.html'
            if not target.is_file() or target not in texts:
                errors.append(label + ': missing or excluded local reference: ' + reference)
                continue
            if parts.fragment and target.suffix.lower() == '.html' and unquote(parts.fragment) not in parsed[target][1]:
                errors.append(label + ': missing HTML anchor: ' + reference)
    return count, errors


def main():
    texts, errors = inspect_tree(ROOT)
    count, reference_errors = check_references(ROOT, texts)
    errors.extend(reference_errors)
    result = dict(status='fail' if errors else 'pass', text_files_checked=len(texts),
                  references_checked=count, excluded_directory_names=sorted(EXCLUDED_DIRECTORIES),
                  scope='working tree; known public-content boundaries and local references only', errors=errors)
    print(json.dumps(result, indent=2))
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
