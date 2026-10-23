# The Archeology of MGS2

An independent, educational look at how Metal Gear Solid 2 works. Explore the ideas behind archives, character parts, animation controls and research evidence through original interactive teaching demos.

**[Visit the interactive museum](https://vinceguyman.github.io/the-archeology-of-mgs2/)** · [Browse the source](https://github.com/VinceGuyMan/the-archeology-of-mgs2)

The default previews use synthetic data and original graphics. The model catalog can also inspect static geometry from a GLTF/GLB you select on your device; the files stay in your browser tab and are never uploaded. The site does not read game archives, run MGS2 or reproduce a complete game engine.

## What is here

| Area | Status |
|---|---|
| Original GOG PC version | 45 rigid KMY models 100% qualified for material & texture; 1 skinned candidate proven, 11 alternate layouts classified, native ps.1.1 pipeline reconstructed. |
| PS2 versions | Regional binary mappings (SLED-50117 / Retail), VU1 microcode pipeline disassembly, and texture swizzle audits. |
| Trials and demos | Verified gameplay route swaps (Olga all-room, Opening Bridge04, bloodied Snake, soldier), 464 passing repository tests. |
| Skateboarding | 115 named BNDR records indexed, SKATE2.ELF analyzed, and movement mechanics reverse-engineered. |
| The Document of MGS2 (USA) | Separate SLUS-20543 source track; 442 + 14 stage entries, three decoded model specimens, and three decoded storyboard sheets. Static findings and bounded comparisons. |

Open the [interactive model catalogs](catalog.html) to browse findings, orbit synthetic teaching proxies, and inspect a local GLTF/GLB. A local import can be cleared at any time; no file is sent to a server or saved by the page.

Open the [Document exhibition room](document.html) for the October 23 model and storyboard specimens, source passport, edition comparisons, and a local PNG inspector. [Document field notes](DOCUMENT_RESEARCH.md) record exact member identities and evidence limits. Extracted models and images remain outside this publication, following the same rules as the other versions.

Read the [October 18 field notes](PROGRESS_2026-10-18.md) for the newer full body-cycle specimen, three-action arms study, Codec authoring, preserved PS2/trial/skate findings and Universal Modder assessment. Earlier 16-sample and partial-triangle results remain historical milestones. These bounded results do not establish native game playback, a complete character exporter or general compatibility across editions.

See [Research Notes](RESEARCH_NOTES.md) for evidence boundaries and community credits, and [Contributing](CONTRIBUTING.md) for the public-content rules.

## Run locally

From this directory:

```sh
python3 tools/check_public.py
python3 -m http.server 8000
```

Open the local server on port 8000. The site uses ordinary HTML, CSS, JavaScript and SVG; its teaching demos do not need a game installation.

## Public content boundary

Treat every file here as publishable. Keep the private laboratory, local paths, credentials, extracted game data, game captures, executables and research checkpoints outside this directory. The checker inspects the working tree even when a file is ignored by Git; its only excluded directory names are `.git` and `.qa`.

The checker is a local publishing check, not a license detector or a proof that arbitrary uploaded content is safe to distribute. Review provenance before adding anything.

## License

The [MIT license](LICENSE) covers this site's new original code and text. It does not grant rights to Metal Gear Solid 2, its assets, other community projects or their code. Community references remain subject to their own terms.

This is an independent fan research project, without affiliation or endorsement from the game's rights holders.
