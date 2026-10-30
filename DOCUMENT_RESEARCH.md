# The Document of MGS2: field notes

October 30, 2026 · USA PS2 disc · `SLUS_205.43` · static and diagnostic evidence

The Document of Metal Gear Solid 2 has its own [exhibition room](document.html) and [model catalog](catalog.html?edition=document). The full corpus pass now indexes **3,945 records in the main model families, 150 supplemental geometry sources and 3,253 texture containers containing 59,485 decoded source RGB entries**. The catalog's 4,095 source records include separate point, line, cloth and memory-card-icon families. Fourteen storyboard sheets have individual visual/caption identifications. Resource and export counts do not count complete native actors. Extracted game files, image previews, geometry exports, and native decompiler listings remain outside this public repository.

## Full corpus pass

Both DAT archives were freshly parsed, extent-hashed and completely extracted. A separate verifier with an independent cipher/inflate implementation replayed all **456 stages, 948 groups and 20,087 member occurrences**, and rehashed all **8,551 distinct source payloads**. There are no failed archive groups or omitted numeric resource types. This establishes exhaustive archive extraction. Supplemental geometry has its own collection and evidence beyond the 3,945 recognized model records below. The source ISO was opened read-only; its identity and preservation checks remain separate from decoder semantics.

The public [metadata index](document-corpus.json) links every reviewed model and texture-container shard with record count, byte length and SHA-256. The browser verifies shard hashes and whole-collection coverage before presenting a full list. Filters and 40-record pages keep the larger source catalog usable. The eleven original `cmdl00`–`cmdl10` links remain aliases into the complete catalog. These files contain research metadata only.

| Model family | Logical records | Evidence and remaining limits |
|---|---:|---|
| EVM | 289 | Bounded source streams, including layouts rejected by the earlier sample decoder. Local positions do not establish complete actors, native pose or materials. |
| KMS, including nested ZMS | 3,651 | Every identified source model and nested child has a static export and source ledger. Six part banks now have verified selection studies; native mesh pose remains unverified. |
| Physics 8020.0002 | 5 | Lossless outer LZSS unpacking, bounded float64 source polygons, authored scale/translation and static exports. One is stored under type 17 rather than type 12. |
| **Total** | **3,945** | **3,934 static geometry records, six part-local records and five authored Physics polygon records.** |

The source-model scope has 11,001 resource occurrences and 3,917 distinct source members. Nested children make the logical-model count larger than the source-member count. A zero-geometry placeholder inside an authored model is retained as an object record, not promoted to a separate actor.

### Six part-bank assembly studies

The six formerly unresolved sources are replacement-part banks: `cit_male_all_def`, `w04a_us_def`, `nyp_def_epa`, and the `hos_all_def`, `hos_all_mid` and `hos_all_low` LOD banks. Native wrappers name a separate 21-part base model and a table of signed selections. A negative entry keeps that base slot; a nonnegative entry chooses a bank part. The matrix selector then addresses the selected host slots. Treating every part in a bank as one skeleton would join alternative parts incorrectly.

The complete **248 bank parts** match their ordered GOG counterparts in local triangle geometry and 44 bytes of flags, bounds, origin and selector fields. The source-based selection study verifies **187 selector rows / 184 distinct part maps** across **20 actual stage contexts and 15 distinct overlays**: 96 civilian choices, 54 `w04a` choices, four NYPD choices and eleven for each hostage LOD bank. Every actual context has a verified wrapper, matching complete selection-helper bytes and exact eligible table bytes. These are available choices in source data; no scene choice was executed or observed.

Five guard-admitted boundary choices reach neighboring data and are withheld: `w04a` selector 54, NYPD selector 4 and each hostage selector 11. Two happen to look like valid base aliases in the character-viewer table but contain invalid neighboring values in other actual stage overlays. A wrapper's numerical guard alone is insufficient to admit them. This is static boundary evidence, not a claim that a runtime fault was observed.

All **187** retained selections match the same base-plus-bank reconstruction from GOG. **58** also match a standalone GOG asset's ordered local geometry and 20-byte flags/origin/selector placement fields; **13** additionally match all bound fields in the stricter 44-byte metric. Counts describe selector rows, including repeated maps. Compared scope: 3,922 GOG KMY sources. No selected sequence matches the 641 Trial KMS sources under these metrics; the separate bank-part comparison covered 655 Trial EVM/KMS sources. These negatives do not establish global exclusivity.

There are **187 independently checked local GLBs** for rigid source-part inspection. Every source coordinate, triangle and selected-slot origin is verified. Their identity-object, cumulative-origin convention is conditional: the sources contain nontrivial vertex weights, while these diagnostics omit skinning. They do not reproduce a native zero-angle mesh, final pose, animation, materials or complete actor behavior. The six source records remain part banks; the derivatives do not inflate the 4,095-source catalog. Their [study cards](document.html#assembly-research) and catalog links expose the evidence and limits, and the existing local inspector accepts the GLBs without uploading them.

### What changed from the samples

The main Fatman layout now decodes: `cmdl10 / 535eb5` has 3,096 triangles, and `d3bcdb` has 3,048. The earlier `eb4887` sample remains a separate 64-triangle blood/ooze effect component. The flags-2264 rejection is historical evidence of the first decoder's limit; it is no longer the current source-geometry status.

The 2,045-triangle `cmdl01 / bb12a0` model now has a static menu binding to **“Solid Snake/Shinkawa touch experiment model”**. The 1,910-triangle purple-suited `cmdl26 / d8a464` figure binds to **“Mei Ling for Toon Shading Experiment”**. Both stage scripts contain complete nine-field menu metadata records, and their stage/resource pairs resolve title indices 69 and 63 through the same registered title group. The later of two adjacent main-script registrations selects global-object base 1: the resolved strings are objects 70 and 64. Native token, registration and lookup code corroborates that exact base-plus-index route. Source line-break controls are normalized to spaces in the display titles and retained exactly in the private proof. This is a source-backed menu identity, not observed native rendering or animation. Original basenames remain unrecovered; MGS1 provenance and global exclusivity are not established.

Four of the five Physics containers exactly equal the compared GOG MDLs after removing only zero DAT alignment padding. All four also have exact unpacked-byte equality: `c4_kaitai_b1.mdl`, `c4_kaitai_b1_set.mdl`, `c4_kaitai_b1_frost_cm.mdl` and `c4_kaitai_b1_frost_cm_set.mdl`. A type-17 authored floor/wall/roof/decoration collection has no exact match in those four MDLs. It is a component collection, not a verified complete scene.

### Comparison metrics and coverage

For EVM/KMS, an exact match is a multiset of nondegenerate **local raw signed-i16 XYZ triangles**, with corners and triangles sorted and multiplicity preserved. It ignores winding, order, hierarchy, part origins/transforms, normals, UVs, weights, materials and runtime. All 3,922 distinct GOG KMY and 365 distinct GOG EVX geometry references are admitted to that comparison. **3,801** Document logical records have exact GOG matches. The four exact Physics unpacked comparisons use a separate source-polygon/container metric, giving **3,805** exact family-metric matches in total.

**962** Document records have exact local-position matches against the **655** admitted distinct Trial EVM/KMS references. The Physics comparison freshly rehashes all **2,987** members in the stored Trial stage/face inventories; none carry a Physics model header or an exact raw Physics-container match. Same-name-hash partial candidates are retained for every model; all 139 signed-i16 models without exact GOG geometry matches also receive global GOG/Trial partial-overlap ranking. A missing exact match is scoped to these corpora, not proof of global Document exclusivity.

### Supplemental source geometry

All **136 CVY sources**, representing 433 occurrences, have independently checked source-local point exports: **73,730 float32 XYZ points across 1,237 nonempty parts**. The local inspector supports true glTF POINTS and draws dots without inventing faces. These are deformation/source-attribute arrays, not 136 additional complete actors or proven collision volumes.

Three sources retain **37 unusable secondary UV streams** containing invalid indices or nonfinite words. The native stream selection and primary point evidence are independent; those secondary words remain explicit and are never expanded. Their verified primary XYZ exports retain a separate qualified status rather than forcing a UV read. The source index arrays have not been established as triangle topology.

Against 161 distinct stored GOG and 65 distinct stored Trial CVY sources, **29** Document sources have exact GOG source-position multiset matches and **48** have exact Trial matches. Complete raw payloads match 0 GOG and 14 Trial sources; complete ordered attribute-array signatures match 0 GOG and 35 Trial sources. These are different metrics. Point equality normalizes negative zero and retains duplicate float32 XYZ values; it ignores topology, transforms, pose, weights, materials and runtime deformation. Supplemental source records and primitive counts stay separate from the 3,945 logical model records.

All **10 ROL sources** now have native-backed outline layouts and true LINES exports, preserving **9,856 source vertices and 8,435 line segments** across 13 occurrences. Each object's strip counts, final-strip length and control-bit-zero connectivity determine the lines; object boundaries reset the previous vertex. No triangle fans are manufactured. Eighty malformed controls reject, and an independent export check compares every source vertex. Nine Document outlines have exact undirected line-geometry matches among all 82 distinct stored GOG ROL sources. None of the 24 searched Trial type-17 occurrences is a ROL source. The metric ignores line direction, object grouping, colors, transforms and native final rendering.

The **RWV coat resource** binds 144 points from its same-ID CVY source to 235 source triangles, 378 edges and per-node coefficients. Every rest length agrees with the bound point distance within 7.5e-6, and its triangles exactly reproduce two existing Document KMS coat records. The native cloth reader corroborates the layout and same-ID KMS/RAW/CVY requests. The static bound export has no new standalone positions and does not reproduce cloth simulation or native pose. Its two exact GOG mesh correlations come through the matched KMS geometry; the compared GOG RWV source itself differs. These metrics remain separate in each source record.

The **three FAR sources** are complete typed transform/sequence banks, with exact typed counterparts in the four-source GOG comparison scope; one also matches raw bytes directly. Their 32-channel pose and quaternion records do not create standalone meshes. **Seven RMT sources** are separately classified typed transform/property sample banks, with complete source-byte accounting and re-encoding. Named-source correlations retain literal abbreviations. Native actor binding, named bones, timing, interpolation and final animation playback remain unverified. These families have separate metadata records and do not inflate the model or supplemental geometry counts.

### Texture coverage

All **3,253** distinct type-19 containers, representing **5,905** source occurrences, decode into **59,485** source entry records and **14,524** distinct RGB images. Repeated stage occurrences contain 112,041 entry occurrences. Both PSMT4 and PSMT8 layouts are supported; no source RGB entries are rejected in this corpus. Native loader analysis corroborates the header's palette-transfer row declaration and 8,192-byte allocation rounding. Source RGB reconstruction does not prove native GS color, scaled alpha, clipping, blending or final materials. Four entries retain explicitly unadmitted source-alpha scaling.

There are **4,900** exact GOG RGB-entry matches, representing **688** distinct Document RGB images, and **19,714** exact Trial RGB-entry matches, representing **2,588** distinct Document RGB images. Whole source-container hashes do not match the compared GOG/Trial texture payloads; storage and allocation differ. Same texture IDs, exact source RGBA bytes, decoded RGB and native material appearance remain distinct evidence.

The **113** storyboard stages contain **654** distinct texture containers. None has an exact RGB-entry match in the compared GOG/Trial corpora. These stages also contain UI and unclassified images; 654 is not a count of identified storyboard sheets.

| Newly resolved PSMT8 sheet | Source size | Visible reference | Identification |
|---|---|---|---|
| `sbrd00p / d3e98e` | 316 × 928 | `P001_01_p01` | Opening infiltration at Verrazano Bridge; bridge/helicopter sketches and revision notes. |
| `sbrd23p / 9de98f` | 296 × 944 | `P036_01_p01` | Raiden at the stair landing and the ninja entrance; motion-capture and possible-battle notes. |
| `sbrd93p / d5ea1c` | 292 × 662 | `P082_04_P03` | Snake notices Raiden's dog tags; Raiden removes them in the final panel. |

These are three additional earlier pages, distinct from the retained later PSMT4 sheets. The old rejection records remain historical. Individually reviewed drawings and captions support these labels; final cinematic framing and shipped interaction remain untested.

### Other image families

Both 418-glyph fonts have decoded two-bit mask indices. One equals the compared GOG `keepfont.raw` after excluding eight zero DAT padding bytes. The other differs in exactly the 94 printable ASCII slots `0x21`–`0x7e`, with visibly heavier strokes; the remaining 324 slots match. Native caller-selected glyph colors and palettes remain unverified.

A **separate fixed debug-font resource**, `34ca34`, has a 3,104-byte layout of sixteen 16-bit palette words plus 3,072 bytes of packed four-bit indices. A 256 × 24 diagnostic atlas reveals **96 cells of 8 × 8 pixels**, comprising 95 printable-ASCII sequence slots and a final symbol; two cells are blank. Every source byte and all 96 cropped cells are independently checked. Fourteen raw Trial occurrences share the exact source, while the compared GOG DAR catalog has no exact match. These are scoped raw comparisons. Atlas layout and cell order are source-backed diagnostic interpretations; native upload dimensions, palette/alpha, glyph lookup, spacing and final UI appearance remain unverified. This resource stays separate from the two 418-glyph banks and the type-19 texture-container count.

Five Physics models contain **45** decoded DIB material records and **38** distinct RGB images, independently checked against Pillow. All **77** mapping records and **377** source polygons resolve their image IDs and dimensions. RGB-only local diagnostic exports retain both V interpretations; native UV orientation, lighting and extra-plane alpha semantics remain open. A separate RIM/IPUM resource has **60** decoded source frames, all with exact GOG RGB matches.

All **77** O2D containers have bounded reference-grammar parses. Their **14,973** texture requests have same-stage candidates; this does not reproduce native UI rendering.

Native consumer analysis binds the 432-byte `tdcm_empty.raw` payload to an **18 × 12 PSMCT16** upload. All 216 source RGB5/alpha-bit words decode and re-encode exactly; the local RGB diagnostic expands five-bit channels by bit replication and uses opaque display alpha. Source alpha bits, native TEXA and blending remain separate: zero source alpha is not claimed to mean final transparency. The complete GOG raw payload is identical, while no complete raw Trial counterpart matches.

The separate 8,192-byte `vram0.raw` payload has a readable baked developer message in a **256 × 32 row-major byte-intensity diagnostic**: `http://www.kcej.com/xxx/` and `VRAMなんか覗かないで・・・` (“Do not go peeking at VRAM…”). An independent PNG decoder reproduces all 8,192 source bytes exactly. Eleven Document occurrences, seven verified named GOG occurrences and one stored Trial raw counterpart share this source payload. Its leading zeros do not characterize the complete payload. This visual identification and reversible byte interpretation do not establish the native pixel format, upload consumer or an observed in-game display. Only original text and metadata are published here; the extracted bitmap stays local.

The font/Trial comparison retains an explicit partial two-bit 24-high shape hypothesis and 4,800 unclassified middle bytes; it does not establish native glyph parity. The RIM resource has no exact Trial RGB frame match in the stored pixel scope. These narrower results do not transfer native appearance claims across editions.

Six separately counted **RAT raster containers** now decode to **464 frames and 294 distinct RGB images**, using native-backed LZ, hold-mask, low-nibble and packed-XOR rules. Removing only bounded zero DAT padding makes each source exactly equal its named GOG counterpart: `fat_ooze_blood.rat`, `ema_ooze_blood.rat`, `tears_rgb.rat`, `tears_sub.rat`, `w11.rat` and `w31c.rat`. All 464 frames agree in indexed pixels, RGB and literal source-palette alpha with those counterpart RAT sources. This is separate from the GOG/Trial type-19 pixel inventories, which contain no exact RGB frame match. Native GS orientation, scaled alpha, tint, blending, timing and actual actor use remain unverified. The six RAT containers and their frames do not inflate the 3,253 type-19 container or 59,485 entry counts.

## Memory-card icons and the complete RAW ledger

Three type-17 resources are **PS2 memory-card icon models**, with 3,093 source vertices, 1,031 triangles and three embedded 128 × 128 textures. Their complete vertex, animation-key, signed-RLE and zero-DAT-padding layouts are independently checked. Each has one stored animation key; static exports do not establish native animation playback. The source diagnostics show a green VR-SYSTEM device, a silver tripod/platform form and a dark ring/platform form. Their exact character or location identities are not invented. No exact raw, geometry or RGB counterpart occurs in the compared GOG/Trial sets. These three models are included among the 150 supplemental source records, with six neutral/opaque-UV GLBs retained locally. The native size walker corroborates the layout; the common [PS2 icon loader implementation](https://github.com/ps2homebrew/HDLGameInstaller/blob/main/IconLoader.c) is a separate format reference, not evidence of Document runtime behavior.

Every one of the **40 distinct RAW payloads** now has an explicit classification: ten ROL outlines, seven RMT sample banks, six RAT raster sources, four RPD recordings, three memory-card icons, two indexed-font banks, two RPT reports, and one each of the fixed font atlas, RIM video, TDCM placeholder, VRAM message, RWV cloth dependency and authored Physics collection. The public metadata index retains the complete source ledger. This covers stored RAW source roles; it does not certify unused optional streams or native rendering.

The four RPD files contain **1,534 controller-demo frames**, decoded as 20-byte input packets with initial play state and bounded source streams. The native reader and controller-buffer copy are statically traced; no input API or gameplay was executed. All four have exact unpadded named GOG counterparts. Two also exactly match stored Trial resources, reproducing all 1,271 corresponding packets; eight Trial references were separately decoded. The two RPT files are complete mesh-report text, whose bounds independently agree with the associated Physics exports. Neither family creates additional render geometry or sampled pixels.

## Earlier specimen passes

The sections below preserve the first three-model and eight-model expansion scopes. Their smaller comparison sets, first-pass rejections and verification receipts describe those milestones. The full corpus counts and resolved layout statuses above supersede them for current coverage.

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

## First three model specimens

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

## First three storyboard sheets

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

## Eight additional model specimens

The second batch retains the first three specimens and adds the following type-4 resources. Counts use the same hierarchy/strip/triangle conventions. All names are visual identifications or bounded source-family correlations. A named GOG comparison does not recover the original Document filename.

| Stage / resource | Identification | Source bytes | Hierarchy records | Mesh definitions | Strip entries | Decoded triangles |
|---|---|---:|---:|---:|---:|---:|
| `cmdl03 / 53f7f1` | Otacon | 179,440 | 53 | 195 | 4,538 | 2,628 |
| `cmdl04 / 533701` | Sergei Gurlukovich | 200,336 | 56 | 195 | 4,832 | 2,810 |
| `cmdl05 / 48346b` | Colonel Campbell radio bust | 116,720 | 53 | 140 | 2,759 | 1,583 |
| `cmdl06 / 5425b1` | Rose | 228,160 | 53 | 226 | 5,625 | 3,307 |
| `cmdl07 / 7d76c2` | Emma, bandaged variant | 254,544 | 87 | 290 | 6,130 | 3,592 |
| `cmdl08 / 643f41` | Olga-linked armored variant | 233,920 | 53 | 234 | 5,374 | 3,026 |
| `cmdl09 / 543595` | Solidus, base armored model | 283,280 | 53 | 275 | 6,616 | 3,916 |
| `cmdl10 / eb4887` | Fatman-linked blood/ooze effect component | 7,664 | 58 | 5 | 112 | 64 |

Otacon's face, dark hair and pale jacket, Sergei's moustache, fur collar and camouflage, Rose's face and business suit, Emma's blood-stained bandage, and Solidus's face and armor were inspected in source-derived static diagnostics. The Campbell bust has a legible **CAMPBELL** nameplate. Its `48346b` identifier has no basename match among the 3,493 observed GOG stems in the name audit. The Olga-linked record correlates with literal `org_tng_mh_mt`; its precise narrative scene and native variant identity remain qualified. The literal Emma `addhand` name is a lead, not a verified hand-attachment behavior.

The Fatman-linked resource is an effect component, not the Fatman actor. The sampled source pixels have alpha below the diagnostic cutout threshold of 128, so that cutout preview is blank. Neutral and opaque diagnostics expose the small static geometry; native effect appearance remains unknown. At this earlier sample milestone, the main Fatman model meshes failed the strict flags-2264 gate. The full corpus decoder now supports their static geometry, as recorded above.

| Source member | SHA-256 |
|---|---|
| `cmdl03 / 53f7f1` | `07b94b92ff281219458c0ace524012b2b5f0d02b79c0d13afcf96cabf81268da` |
| `cmdl04 / 533701` | `b70e3a6e9cee1a69c4efb4ee5a05b77d6898bbc3db6a7cc955daefa8be993701` |
| `cmdl05 / 48346b` | `f80b3ad14a43a3625a7b5254d18edec28517bd6615c952e1b365168ba5867f43` |
| `cmdl06 / 5425b1` | `c78298d060b877b01f73ca9600e54437453427ad1a9ed9e74d54c3ec5f0d7beb` |
| `cmdl07 / 7d76c2` | `88bda44d7435b7a794612e3e090eb72840b09fd5e029ba72f9c4c92dffefe722` |
| `cmdl08 / 643f41` | `2e1fe844c5d3753e377fa0fdac70727f14368d945fe82f0a98978bcf1b7c4aaa` |
| `cmdl09 / 543595` | `f392c134875d8529ed7c0ca8233ff22d1cf055daea17b40bc72a42229c5640cd` |
| `cmdl10 / eb4887` | `cd3ba9ff71ef89c767814e55ee96cada6cc5ab084f95833513747f5578cef3af` |

### Shared geometry and a measured difference

| Document specimen | GOG comparison | Position-triangle result |
|---|---|---|
| Otacon | `otc_def_mh_mt.evx` | Exact multiset, 2,628 / 2,628 |
| Sergei Gurlukovich | `crg_def_mh_mt.evx` | Exact multiset, 2,810 / 2,810 |
| Campbell radio bust | `cam_radio_mh_mt.evx` | 1,561 / 1,583 Document triangles; all 1,561 GOG reference triangles present |
| Rose | `ros_def_mh_mt.evx` | Exact multiset, 3,307 / 3,307 |
| Emma, bandaged | `ema_houtai_addhand_mh_mt.evx` | Exact multiset, 3,592 / 3,592 |
| Olga-linked armor | `org_tng_mh_mt.evx` | Exact multiset, 3,026 / 3,026 |
| Solidus | `sol_def_mh_mt.evx` | Exact multiset, 3,916 / 3,916 |
| Fatman-linked component | `fat_ooze_blood_mh.evx` | Exact multiset, 64 / 64 |

Campbell is the clearest new topology difference from a specific GOG reference. Document retains every reference triangle and adds 22 distinct triangles closing the torso and sleeve boundaries. Those triangles use existing XYZ points; there are no new XYZ positions. This establishes an extra set of cap triangles relative to `cam_radio_mh_mt.evx`, not global Document exclusivity. Across both batches, nine of eleven specimens have an exact GOG position-triangle multiset and two have partial overlap.

The second-batch GOG comparison admits all 365 unique EVX members, including their indexed layouts, and checks 3,922 KMY members for source digests. None of the eight Document source-member hashes matches those GOG inventories. The metric remains the signed-i16 XYZ triangle multiset described below; matching positions do not establish matching binary layout, hierarchy, normals, weights, UVs, textures or animation.

The Trial comparison checks 2,987 stored member records from the stage/face caches. None of the eight source digests matches. Two same-hash Sergei EVM references each share 800 of 2,810 Document triangles (28.47%); their position multisets differ. No same-hash EVM reference was found for the other seven new specimens. This is a cached-inventory and same-hash geometry search, not a comparison with every Trial model or a fresh scan of source installations.

## Eight additional storyboard sheets

These type-19 images extend the first three sheets to eleven retained specimens. The scene labels below come from decoded drawings and manually read captions. Production identifiers are visible labels, not recovered original filenames.

| Stage / resource | Decoded pixels | Identification and evidence |
|---|---|---|
| `sbrd01t / b90f35` | 698 × 1,024 | Tanker on the Hudson. Vessel-and-river drawings, camera-dolly arrows, and script naming the Hudson, Snake and Otacon. Exact ship identity and final framing remain unverified. |
| `sbrd08t / b910f5` | 698 × 1,024 | Armed figure at tanker rail, with smaller rail-framed and waist-up drawings. Olga is a visual candidate only; the selected sheet does not visibly name the character. |
| `sbrd17t / b917b5` | 698 × 1,024 | RAY at the waterline. A mechanical form and successive waterline panels accompany script explicitly naming RAY. No recovered model or final-shot association is established. |
| `sbrd00p / d3e98f` | 316 × 928 | Helicopters and the Big Shell introduction. Helicopter, aerial-roadway and uniformed-personnel drawings; Raiden and Colonel dialogue labels and a Big Shell reference. |
| `sbrd23p / 9de990` | 296 × 944 | Raiden confronting the ninja. Gun, blade and masked-face panels accompany script naming Olga in the visor/face note. This is production intent, not proof of a native transparency effect. |
| `sbrd47p / 1fe990` | 292 × 602 | Vamp sinks into the pool, reference `P057_01_P01`. The production heading names the battle's end and the script describes Raiden's victory and Vamp sinking. |
| `sbrd71p / 8aead4` | 302 × 696 | Arsenal interrogation, reference `P070_22_I02`. Restrained Raiden and a second figure, Raiden/Olga dialogue labels, a Listen annotation and a LIFE-decrease note. |
| `sbrd93p / d5ea1d` | 290 × 662 | Dog tags with Raiden and Snake. The script lists user-entered name, age, sex and blood type, and a maximum name length of 12 characters. |

The Listen prompt, LIFE change and dog-tag fields are authored design evidence. They have not been tested against shipped interaction, input handling or native game behavior. The first type-19 candidate in `sbrd00p`, `sbrd23p` and `sbrd93p` failed the existing strict texture-boundary contract; the second candidate was decoded. The decoder was not relaxed to admit those failures. Display alpha is forced opaque while retaining source RGB, so native alpha, cropping, color and framing remain unverified.

| Source image member | SHA-256 |
|---|---|
| `sbrd01t / b90f35` | `6e5b1a77ad1edb1f97bc79fd6d6feb6a9a8a617dd77e18fdff827e0c3d8248f2` |
| `sbrd08t / b910f5` | `a0de5c05742403cfb566c8dcbba45d66aaf6371b0e3f7ea884ac413df389f98c` |
| `sbrd17t / b917b5` | `4e880842c3628707029e26a29fc8583aa0ee0a7a40be01b6f690701409e53d3f` |
| `sbrd00p / d3e98f` | `27ad4698d52c9bc44403c1f2527de1ca7d73d3aee5d12590cfb9f4b48856902b` |
| `sbrd23p / 9de990` | `ef429e7a6d964f50bcc213f9b34f7f1d60c6a9d70ddf1779d843874c36249049` |
| `sbrd47p / 1fe990` | `1ceb18b09b0f3122562952cf9309bc15eb0a55b7bf7b60bcd8baf6e920daa1f0` |
| `sbrd71p / 8aead4` | `9594ebc3933c90f006fbe8340dbcd2b7d6280d1d9f91ed53e0a60422b01ce7c9` |
| `sbrd93p / d5ea1d` | `dc6ef73076800e5af996e2989f18b354f0d4276a6f337caabb7d7cfadb8fbcbe` |

The eight source-payload hashes, decoded-pixel hashes and 24-bit ID/name-hash leads have no exact candidate in the six stored GOG/Trial catalogs described below. All eleven retained Document sheets differ from one another in source and decoded hashes. These are finite catalog and exact-hash comparisons. Differing catalog granularity, especially GOG QAR chunks versus individual textures, limits negative conclusions; no perceptual-image search or native cinematic alignment was performed. The result is **no match in the compared catalogs**, not proof of global Document exclusivity.

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

At the earlier sample milestones, two saved Ghidra analyses used the Emotion Engine processor. Those bounded exports emitted pseudocode for 43 distinct resident functions, covering file paths, loader and camera registrations, and archive cryptography. The later corpus pass adds separate overlay and format investigations described above. Native instruction listings and pseudocode remain local. The public notes report findings in newly written prose.

The archive implementation was independently derived against pinned primary [tools-mgs DAT source](https://raw.githubusercontent.com/Joy-Division/tools-mgs/4e9394baa8ac6872e66202ff0ce26352cd45bef9/dat-extract_enc.c) and [name-hash source](https://raw.githubusercontent.com/Joy-Division/tools-mgs/4e9394baa8ac6872e66202ff0ce26352cd45bef9/strcode/strcode.c), then corroborated against this disc's resident code. These references are credited evidence sources; their code is not copied into this exhibit.

At the eleven-model/eleven-sheet milestone, the Fatman layouts and menu identities were still unresolved. The current corpus work resolves their static geometry and the two menu bindings described above. Native playback, complete stage code, unrecovered original filenames, faithful materials, animation and a shot-by-shot reading of every storyboard-stage image remain open. The source exports do not establish complete native actors, corpus-wide runtime compatibility or a full decompilation.

See the [research notes](RESEARCH_NOTES.md) for the project's evidence conventions and [Contributing](CONTRIBUTING.md) for the public-content boundary.
