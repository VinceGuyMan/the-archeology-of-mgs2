# The Document of MGS2: field notes

October 23, 2026 · USA PS2 disc · `SLUS_205.43` · static and diagnostic evidence

The Document of Metal Gear Solid 2 has its own [exhibition room](document.html) and [model catalog](catalog.html?edition=document). This branch records an independently identified disc, three decoded model specimens, and three decoded storyboard sheets. Extracted game files, image previews, geometry exports, and native decompiler listings remain outside this public repository.

## Source passport

| Source | Bytes | SHA-256 |
|---|---:|---|
| Complete ISO | 4,245,913,600 | `8a63b3194af65e82e66a3c1d8139a26ad91961455b57f50a790796e36abaa973` |
| Boot executable `SLUS_205.43` | 842,532 | `eb1520c2b52d07593e416e3f1c09de990f294ee621bd837e4c94da25b471184f` |
| Secondary `MGS2/MGS2.ELF` | 846,116 | `e395206f84a5ceabf91f09ba3f181b13bd9dbe55527df5ca3853ca256547d1a6` |
| `DOCUMENT/STAGE.DAT` | 1,100,466,176 | `e14cb27434e840818aebca1c134f650e1109017eba708d930ae16480bc260d5d` |
| `MGS2/STAGE.DAT` | 43,282,432 | `b67c8d1ade1052ea5eeaa16ae3eb186065eedcfaa0bf380a130a713686024c29` |

The ISO9660 inventory contains 15 regular files. The two stage archives contain 442 Document stages and 14 secondary MGS2 stages, with 20,087 member occurrences between them. An occurrence is a stage-table record, not a unique model, character, or scene.

Extraction opens the original ISO read-only and writes into a separate local research workspace. Archive extents, member hashes, exact zlib output lengths, and source-preservation receipts bind these specimens to this disc. No ISO modification or emulator test is part of this result.

## Three model specimens

| Stage / resource | Visual identification | Source bytes | Hierarchy records | Mesh definitions | Strip entries | Decoded triangles |
|---|---|---:|---:|---:|---:|---:|
| `cmdl00 / 541e99`, type 4 | Raiden | 118,960 | 21 | 122 | 3,402 | 2,002 |
| `cmdl01 / 55aaa5`, type 4 | Snake | 210,816 | 53 | 214 | 5,158 | 3,002 |
| `cmdl02 / 09274e`, type 4 | Masked tactical soldier; IRO skull basename candidate | 175,792 | 53 | 185 | 4,758 | 2,724 |

These counts describe a bounded diagnostic geometry decode. Strip entries include the decoder's submitted strip records; they are not a count of deduplicated vertices. Hierarchy records are not a claim that every record is an independently animated bone. Visual names come from review of the decoded figures, not from reconstructing original model filenames or the native menu's actor bindings.

| Source member | SHA-256 |
|---|---|
| `cmdl00 / 541e99`, type 4 | `916cefff650b6d716aef1e0592971c993bc72dad62b46402e5d036ea008a9eac` |
| `cmdl01 / 55aaa5`, type 4 | `8173afd90e7e9059da4917650959878cfd99d615f44aa4cfd2ddd8af6bdc730f` |
| `cmdl02 / 09274e`, type 4 | `a2200d48a3f0e4c8f7b14e850d9168f075d7ba590640c1ab62bda8dea7869fb8` |

Diagnostic exports do not establish complete actor assembly, native skinning, equipment attachment, animation playback, or final material appearance. Source-RGB model previews and their transparency treatment remain diagnostic; native alpha and hair rendering need their own reference checks. The public catalog shows original teaching proxies. Its local GLTF/GLB inspector can display geometry selected by a visitor without uploading or saving it.

## Three storyboard sheets

| Stage / resource | Decoded pixels | Identification and basis |
|---|---|---|
| `sbrd00t / 21dee7`, type 19 | 698 × 1,024 | Bridge continuity sheet. Bridge towers, cables, roadway, panel columns, and the footer “MGSII PROJECT KCEJW cs1” are visible. Mapping it to the opening is a visual inference; the bridge name is not established by this sample. |
| `sbrd28p / d16d38`, type 19 | 316 × 456 | Ninja appearance, production reference `P036_07_p06`. Manual caption reading finds `忍者登場`, `ライデン`, and `忍者(オルガ)`: ninja appearance, Raiden, and ninja (Olga). |
| `sbrd94p / d067a8`, type 19 | 316 × 638 | Ending at Federal Hall, production reference `P082_06_P04`. Manual caption reading finds `エンディング`, `フェデラルホール前`, `ライデン`, and `ローズ`: ending, in front of Federal Hall, Raiden, and Rose. |

Type numbers in these notes are decimal: type 19 is hexadecimal `0x13`. Production references are transcribed labels visible within an image; they are not recovered original filenames.

| Source image member | SHA-256 |
|---|---|
| `sbrd00t / 21dee7`, type 19 | `611eeadea39462bc0cc165456eb8c1eb3aa1d91a04d06fbbf8d2d3f7b9d65949` |
| `sbrd28p / d16d38`, type 19 | `d521f3b0a1f4c3325ac9a53c940a82b147ef6d81bf58719c5a1d0975ecc96719` |
| `sbrd94p / d067a8`, type 19 | `e6a48708c6e291a1e750cc6ee489b128f02f5f1bf7f622bcce11aaf2f9e73bef` |

The sampled images use PSMT4 indexed pixels and a 32-bit CSM0 palette. The strict existing Trial texture parser rejected their palette extent; the Document decoder admits the observed 8,192-byte palette tail while leaving the differing header word's meaning unresolved. The previews retain source RGB and force alpha to 255 because all sampled source alpha values are zero. This produces readable diagnostic images; native color, alpha, cropping, and display framing still need comparison with the original viewer.

The Document room's local PNG inspector displays a file the visitor already has. It does not read an ISO, extract a resource, establish provenance from a filename, or send the image to a server.

## Comparisons with the existing archaeology

### Exact stage labels

108 of the 442 Document stage labels match labels in the existing GOG loose-DAR catalog, which represents 283 stage directories. Five of the 14 secondary MGS2 labels also match. The remaining 334 Document labels are absent from that specific catalog. This is a literal name join, not a payload comparison or proof of game-wide absence; other GOG container inventories are separate.

### Model positions

The comparison reconstructs each nondegenerate decoded triangle from raw signed-16-bit XYZ coordinates, sorts the three vertices within each triangle, then compares triangle multisets with multiplicity preserved. This deliberately ignores winding and triangle order. It also ignores normals, UVs, skin weights, materials, hierarchy, and animation. The GOG geometry scope contains 365 unique EVX members; exact source-digest checks additionally inspect the 3,922-member KMY inventory. None of the three Document member digests is an exact match in those bounded inventories.

| Document specimen | Existing GOG comparison | Result |
|---|---|---|
| `cmdl00 / 541e99` | `rai_def_mh_mt.evx` | 469 of 2,002 triangles overlap, approximately 23.43%. This does not identify the complete Document model as the same asset. |
| `cmdl01 / 55aaa5` | `sna_def_mh.evx` | Exact position-triangle multiset match across all 3,002 decoded triangles. The source-member SHA-256 values differ. |
| `cmdl02 / 09274e` | `iro_skull_mh_mt.evx` | Exact position-triangle multiset match across all 2,724 decoded triangles. An `iro_blood` variant shares this geometry too. The source-member SHA-256 values differ. |

The masked figure's balaclava/skullcap and tactical vest are visible in the local preview. The matching GOG geometry and the `iro_skull_mh_mt` name-hash candidate support an IRO skull/balaclava variant label. They do not reconstruct a unique original Document filename, prove an identical texture variant, or establish a native menu identity. Interpreting this as Pliskin remains a character-level inference.

The Snake comparison concerns the GOG `sna_def_mh.evx` geometry, which is distinct from the public GOG catalog's `sna_def.kmy` authoring proof. Geometry equality does not transfer the existing rig, material, animation, or runtime claims.

Four same-ID Trial `55aaa5` occurrences in stages `d00a1`, `d00a4`, `d00a5`, and `w01e` each contain 3,002 nondegenerate triangles. Each shares 2,995 triangles with Document Snake under this metric, approximately 99.77%; the multisets differ. This comparison uses the stored Trial stage-v2 and face-v2 inventories and decodes the same-ID model resources only. It does not establish complete Trial model coverage.

The name-hash audit covers 328 GOG loose-DAR archives, 49,677 member records, and 3,493 distinct observed basenames. Within that catalog, `55aaa5` maps to one basename candidate, `sna_def_mh`, and `09274e` maps to one, `iro_skull_mh_mt`; no collision was observed for either identifier. `541e99` has no observed basename match. A unique match within a finite catalog does not recover an original Document filename or rule out names absent from that catalog.

### Storyboard resources

The three image members and their three accompanying type-6 `180720` members were compared with six stored GOG and Trial catalogs: the loose-DAR member catalog, QAR member inventory, GOG texture baseline, Trial resource index, Trial texture layout, and Trial pixel coverage.

No exact SHA-256 match was found for these six sampled members in those catalogs. The three image IDs also have no same-ID candidate in the compared Trial resource and pixel catalogs. This result describes the stored inventories; source installations were not rescanned, and GOG QAR chunk hashes have a different granularity from an individual Document image.

The type-6 `180720` identifier occurs in 16 existing Trial resource records. Their sizes and digests differ from the three sampled Document members. The shared identifier is a format/role lead, not byte identity or semantic equivalence.

### Executables within this disc

All 56 same-named `.DVP.overlay.*` section payloads are byte-identical between the Document resident executable and its secondary MGS2 executable. Their EE code and several data sections differ. This establishes section-byte reuse within the disc, not renderer equivalence or recovered VU instruction semantics.

### Editions stay separate

The GOG `sna_def.kmy` body, Trial character candidates, and Skateboarding BNDR records retain their own source identities and verification scopes. A shared character name, extension, resource ID, or plausible import does not transfer those claims to a Document specimen. No Document-to-skate asset or gameplay equivalence is established here.

## Reverse engineering and remaining gates

Two saved Ghidra analyses used the Emotion Engine processor. Across bounded first-pass and targeted exports, pseudocode was emitted for 43 distinct resident functions, covering file paths, loader and camera registrations, and archive cryptography. Native instruction listings and pseudocode remain local. The public notes report findings in newly written prose.

The archive implementation was independently derived against pinned primary [tools-mgs DAT source](https://raw.githubusercontent.com/Joy-Division/tools-mgs/4e9394baa8ac6872e66202ff0ce26352cd45bef9/dat-extract_enc.c) and [name-hash source](https://raw.githubusercontent.com/Joy-Division/tools-mgs/4e9394baa8ac6872e66202ff0ce26352cd45bef9/strcode/strcode.c), then corroborated against this disc's resident code. These references are credited evidence sources; their code is not copied into this exhibit.

Native playback, complete stage code, menu-to-resource mappings, exact original filenames, faithful materials, animation, and shot-by-shot storyboard comparison remain open. The three models and three sheets are samples, not a claim of corpus-wide compatibility or a full decompilation.

See the [research notes](RESEARCH_NOTES.md) for the project's evidence conventions and [Contributing](CONTRIBUTING.md) for the public-content boundary.
