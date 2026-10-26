# Research Notes

The [Document USA room](document.html) and [October 26 field notes](DOCUMENT_RESEARCH.md) now cover all 456 stages and 948 archive groups: 3,945 main model records, 150 supplemental geometry sources and 3,253 texture containers with 59,485 decoded source RGB entries. The previously rejected Fatman main-body layout, authored Physics models and PSMT8 storyboard pages are decoded. The RAW ledger additionally identifies three memory-card icon meshes, 464 RAT raster frames, a fixed font atlas, a hidden VRAM message and controller-demo data. Six model exports retain part-local assembly limits, and native alpha, materials, font palettes and complete actors remain separate questions. Fourteen storyboard sheets have individual visual/caption identifications; the 654 storyboard-stage texture containers are not all identified sheets. GOG, Trial and Skateboarding runtime results are not transferred to Document.

The general project notes below preserve the October 18, 2026 snapshot. Its [field notes](PROGRESS_2026-10-18.md) supersede the earlier October 17 specimen discussion where they identify broader qualified coverage; the current Document findings are linked separately above.

The primary target is the original GOG PC release of Metal Gear Solid 2: Substance. Findings from PS2, HD Collection and Master Collection are useful leads; they become GOG findings only after the relevant structure or behavior is independently checked.

## What the current specimen establishes

- Original GOG archive, geometry and texture research already exists in the private laboratory. This site explains selected ideas without publishing the extracted data.
- One source-linked motion specimen has 21 quaternion channels and 22 model parts, including a part that copies another part's transform. The 22 parts are not 22 animation frames.
- A conditional fresh, single-layer numerical reconstruction spans 16 native-derived update samples. Independent calculations checked controls, cursors, state transitions, quaternion results, transforms and root-stream arithmetic. It does not establish an observed native-game pose or the active player's two-layer controller.
- A separate Blender check confirmed 1,926 of 1,932 source triangles in one specimen. Blender import evidence is distinct from native game execution, faithful materials and a complete export pipeline.

The public demonstrations are newly authored teaching examples using synthetic data. Their timing, labels and controls are explanatory choices. They are not extracted clips, original-game footage or evidence of browser-based MGS2 gameplay. No wall-clock frame rate is inferred from the bounded numerical motion specimen.

## What remains open

Authentic actor selection, active layers and masks, runtime math dispatch, world placement, collision-dependent movement and general clip/export coverage still require evidence. Custom missions, in-game dialogue, independently controlled actors and a complete compatible runtime remain research ambitions.

PS2 versions, trials, demos and skateboarding have separate catalog sections. The trial section lists four static model records; the skate section lists the 115-record BNDR inventory without claiming recovered model geometry; the PS2 section makes its current public model-evidence gap explicit. The viewer's default geometry is synthetic, and visitor-selected GLTF/GLB files stay in the browser.

## Community research we learned from

The following projects contain substantial prior art. Links credit their authors; they do not imply that their code is included here. The observations below come from a source review, not a new execution test of those tools.

| Project | Useful work and qualification |
|---|---|
| [oct0xor/mgs2sos](https://github.com/oct0xor/mgs2sos/tree/76e3ff47c9493179c020f124c15f64141c941f74) | Original Windows PC camera/control hooks and memory patches. This is a native modification project, not an animation-file decoder or unrestricted filmmaking camera. Exact executable compatibility matters. |
| [oct0xor/gcx_decompiler](https://github.com/oct0xor/gcx_decompiler/tree/b2e9a8d15c30e2a1a39e4c52c54c13118b5ebd6d) | GCX script decoding and command references. The author reports MGS2 PC testing; the tool is not a compiler, visual mission editor or proof of support for this exact GOG installation. |
| [otac0n/Codec](https://github.com/otac0n/Codec/tree/378ad3f368d4af3850b33487375b7d32a611b2ca) | Archive, image, audio and asset browsing with model export paths. Its name does not mean it is a complete conversation-production studio, and it does not establish an animated GOG export workflow. |
| [Jayveer/MGS-KMS-EVM-Noesis](https://github.com/Jayveer/MGS-KMS-EVM-Noesis/tree/8358e0eb2a13b63d79bd05931a4a9982a9e18b17) | KMS/EVM models, TRI textures, bones/weights and MAR import into Noesis, associated with PS2 extraction/layouts. Its MAR path skips a second stored control and delegates interpolation to Noesis. That is not authentic GOG motion proof. |
| [Jayveer/MGS-Master-Collection-Noesis](https://github.com/Jayveer/MGS-Master-Collection-Noesis/tree/64a49162ed9f732406db6e943fe60df3f14e0fba) | Model and motion import for PC Master Collection. The target differs from the original GOG PC release; shared extensions do not establish compatibility. CMDL support is preliminary. |
| [Jacky720/SeaLouse](https://github.com/Jacky720/SeaLouse/tree/ce36b64ad5c0f6e041d1f70163b801ea4f30416d) | Blender KMS/EVM model authoring, armatures, weights and materials. Its documented Master Collection/PS2 paths are not an established GOG motion importer. |
| [sagefantasma/gcxEditor](https://github.com/sagefantasma/gcxEditor/tree/32ab3003aae43580edd98baf56b4ea169d7ef176) | Editable GCX structure and reconstructed bytecode for Master Collection. Native original-GOG execution and custom dialogue remain separate questions. |
| [Jayveer/Arsenal](https://github.com/Jayveer/Arsenal/blob/d9bebad6945c7d2eaf6da9b2bed58056130b5241/README.md) | Face/Stage archive extraction explicitly targeting PS2. It is a useful format reference, not a replacement for the existing GOG extraction work. |

The Jayveer plugins' [stored-control implementation](https://github.com/Jayveer/MGS-KMS-EVM-Noesis/blob/8358e0eb2a13b63d79bd05931a4a9982a9e18b17/motion.h#L81-L135) illustrates the difference between displaying animation and reproducing the original evaluation semantics. Their [original EVM loader](https://github.com/Jayveer/MGS-KMS-EVM-Noesis/blob/8358e0eb2a13b63d79bd05931a4a9982a9e18b17/mgs_kms_evm.cpp#L16-L19) and [Master Collection loader](https://github.com/Jayveer/MGS-Master-Collection-Noesis/blob/64a49162ed9f732406db6e943fe60df3f14e0fba/mgs_master_collection_mdl.cpp#L132-L146) even use different bone-table offsets.

Repository visibility is not a reuse license. Some projects have permissive terms, some use GPL terms, and no project-wide license was identified in the inspected SOS or Jayveer plugin revisions. Consult each repository's actual terms before incorporating code. No third-party implementation is vendored through these reference links.

## How to read a claim here

**Source inspection** means code or format evidence was examined. **Offline verification** means bounded calculations agreed under declared assumptions. **Blender verification** means an external authoring result was checked. **Native execution** requires observations from the target game. Each claim keeps its own scope; one category does not automatically establish the next.
