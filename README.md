# The Archeology of MGS2

An independent, educational look at how Metal Gear Solid 2 works. Explore the ideas behind archives, character parts, animation controls and research evidence through original interactive teaching demos.

**[Visit the interactive museum](https://vinceguyman.github.io/the-archeology-of-mgs2/)** · [Browse the source](https://github.com/VinceGuyMan/the-archeology-of-mgs2)

The demos use synthetic data and original graphics. They do not run MGS2, load your game files or reproduce a complete game engine.

## What is here

| Area | Status |
|---|---|
| Original GOG PC version | Partial research, explained through public notes and original demos. |
| PS2 versions | Preserved research summarized in the latest field notes; interactive room planned. |
| Trials and demos | Actor, asset and modification research preserved; new candidates need native tests. |
| Skateboarding | Executable/archive research preserved; interactive room planned. |

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
