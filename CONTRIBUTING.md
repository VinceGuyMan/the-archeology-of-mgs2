# Contributing

Help make the explanations clearer, the original demos more useful and the evidence boundaries easier to understand.

Good contributions include accessibility fixes, original SVG diagrams, clearer explanations, synthetic test cases and source-linked corrections. Keep changes small enough to review and explain what a reader can now understand or do.

## Before submitting

1. Use original code, text and teaching data, or identify a compatible license and preserve its notices. Linked community research is a reference, not permission to copy it.
2. Keep all protected game material outside this directory: extracted models, textures, animation, sound, screenshots, video, executables, archives and save states. Do not include private research notes, local filesystem paths or credentials.
3. Name the game edition and evidence level for technical claims. Distinguish source inspection, conditional offline calculations, external authoring checks and observed native behavior.
4. Run `python3 tools/check_public.py`, then check the changed page in a browser. Confirm keyboard access, readable text, working links and usable narrow-screen layout where relevant.
5. Describe the change, its source or provenance, and the check you performed. Do not claim complete compatibility from one successful specimen.

The checker allows reviewed text/code and original SVG files. It rejects binary files, unrecognized file types, symlinks, private paths, likely credentials and missing local references. `.git` and `.qa` are excluded; ignored game files elsewhere in the working tree still fail the check. Keep local QA captures inside `.qa` and out of publication.

Do not add a game-file upload feature, distribute extracted data, replace working research tools or change a **Coming soon** label into a capability claim without supporting evidence and a scope review.

Contributions to the site's new original code and text are offered under the [MIT license](LICENSE). Ownership of the game and separately referenced community work remains with its respective rights holders.
