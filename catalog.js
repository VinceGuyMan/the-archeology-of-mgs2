(() => {
  "use strict";

  const gogQualifiedRows = [
    ["usp_sub.kmy",3],["usp_sp_sub.kmy",3],["usp_sp.kmy",3],["usp_emb.kmy",1],["usp_amo.kmy",1],["usp.kmy",3],
    ["tgl.kmy",1],["sna_mugen_bdn2.kmy",9],["sna_mugen_bdn1.kmy",11],["sna_mag4.kmy",1],["sna_mag3.kmy",1],["sna_mag2.kmy",1],["sna_mag1.kmy",1],
    ["sna_bdn2.kmy",9],["sna_bdn1.kmy",11],["sling.kmy",1],["sgr_sub.kmy",3],["sgr_pin.kmy",2],["sgr_lever.kmy",1],["sgr.kmy",1],
    ["scp_rai.kmy",1],["mkr.kmy",3],["m92_sub.kmy",3],["m92_bul2.kmy",1],["m92_amo.kmy",1],["m92.kmy",3],
    ["grn_sub.kmy",3],["grn_pin.kmy",1],["grn_lever.kmy",1],["grn.kmy",1],["gbs_mag.kmy",1],["gbs_knif.kmy",1],["foot_shadow_cm.kmy",1],
    ["foot_shadow2_cm.kmy",1],["fms_emb.kmy",1],["dcm_rai.kmy",1],["cig.kmy",2],["cgr_sub.kmy",3],["cgr_pin.kmy",2],["cgr_lever.kmy",1],
    ["cgr_frg1_cm.kmy",1],["cgr.kmy",1],["cbx_sub.kmy",11],["brk_scr07_full.kmy",1],["aks_amo.kmy",1]
  ];
  const gogAlternateRows = [
    ["snh_def_dummy.kmy",55],["sna_shadow.kmy",21],["sna_glass_sh_mt.kmy",2],["sna_glass_black_sh_mt.kmy",2],["sna_def_sh.kmy",22],
    ["sna_def.kmy",22],["rai_glass_sh_mt.kmy",2],["cbx_a_mt.kmy",19],["cbx_a_futa4_mt.kmy",3],["cbx_a_futa3_mt.kmy",3],
    ["cbx_a_futa2_mt.kmy",2],["cbx_a_futa1_mt.kmy",1]
  ];
  const highlightedGog = {
    "usp.kmy": {description:"Three-part companion textured handgun assembly. Verified sub-atlas crop on weapon_nm.xti, independent raw geometry checks, and Blender reopen pass.", metrics:[["Parts","3"],["Vertices","348"],["Triangles","244"],["Texture","weapon_nm.xti"]]},
    "m92.kmy": {description:"Three-part companion textured handgun assembly. Mapped to weapon_nm.xti with verified UV crop containment and fail-closed corruption controls.", metrics:[["Parts","3"],["Vertices","328"],["Triangles","226"],["Texture","weapon_nm.xti"]]},
    "aks_amo.kmy": {description:"AKS-74u magazine accessory. Verified binding to weapon_nm.xti page 24, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","88"],["Triangles","62"],["Texture","weapon_nm.xti (p24)"]]},
    "m92_amo.kmy": {description:"M92F magazine accessory. Verified binding to weapon_nm.xti page 23, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","48"],["Triangles","34"],["Texture","weapon_nm.xti (p23)"]]},
    "usp_amo.kmy": {description:"USP magazine accessory. Verified binding to weapon_nm.xti page 22, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","48"],["Triangles","34"],["Texture","weapon_nm.xti (p22)"]]},
    "fms_emb.kmy": {description:"FA-MAS handgun emblem. Verified binding to weapon_nm.xti page 20, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","24"],["Triangles","12"],["Texture","weapon_nm.xti (p20)"]]},
    "usp_emb.kmy": {description:"USP handgun emblem. Verified binding to weapon_nm.xti page 19, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","24"],["Triangles","12"],["Texture","weapon_nm.xti (p19)"]]},
    "sling.kmy": {description:"Rifle sling accessory. Verified binding to weapon_nm.xti page 21, exact physical slice match, and fresh-process Blender reopen.", metrics:[["Parts","1"],["Vertices","104"],["Triangles","74"],["Texture","weapon_nm.xti (p21)"]]},
    "sna_bdn1.kmy": {description:"Solid Snake bandanna specimen. Verified binding to transresident.xti page 0, independent geometry check, and Blender reopen pass.", metrics:[["Parts","11"],["Vertices","133"],["Triangles","94"],["Texture","transresident.xti"]]},
    "sna_bdn2.kmy": {description:"Second bandanna specimen from resident.dar; verified binding to transresident.xti page 0 and Blender reopen pass.", metrics:[["Parts","9"],["Vertices","113"],["Triangles","80"],["Texture","transresident.xti"]]},
    "sna_mugen_bdn1.kmy": {description:"Eleven-part infinite-bandanna specimen. Verified binding to transresident.xti page 0, exact source digest, and Blender reopen pass.", metrics:[["Parts","11"],["Vertices","198"],["Triangles","176"],["Texture","transresident.xti"]]},
    "sna_mugen_bdn2.kmy": {description:"Nine-part companion infinite-bandanna specimen; verified binding to transresident.xti page 0 and Blender reopen pass.", metrics:[["Parts","9"],["Vertices","170"],["Triangles","160"],["Texture","transresident.xti"]]},
    "cig.kmy": {description:"Two-part cigar accessory specimen. Verified dual binding to weapon_nm.xti (part 0) and transresident.xti (part 1) with decoded-page evidence.", metrics:[["Parts","2"],["Vertices","40"],["Triangles","36"],["Texture","Dual XTI"]]},
    "gbs_knif.kmy": {description:"Gurlukovich soldier knife geometry and texture from the independently qualified cohort.", metrics:[["Parts","1"],["Vertices","68"],["Triangles","44"],["Texture","weapon_nm.xti"]]}
  };
  const alternateClassifications = {
    "sna_def.kmy": {status:"Qualified · skinned candidate proof", kind:"character", description:"Solid Snake default skinned body (Member 39). Proven dual-frame signed-16 vertex skinning weights; dual-action 141-key motion export verified in Blender with fresh-process reopen.", metrics:[["Parts","22"],["Vertices","1,932"],["Triangles","1,932"],["Layout","Dual-frame Skinned (Stride 20)"]]},
    "sna_glass_sh_mt.kmy": {status:"Blocked · dynamic alpha-blending", kind:"structure", description:"Snake glass overlay (Member 36). Geometry verified; material qualification is blocked because material ID 0x48 requires runtime dynamic additive alpha-blending and reflection buffers.", metrics:[["Parts","2"],["Vertices","48"],["Triangles","24"],["Layout","Stride 20 (Flags 18433)"]]},
    "sna_glass_black_sh_mt.kmy": {status:"Blocked · dynamic alpha-blending", kind:"structure", description:"Snake tinted glass overlay (Member 37). Geometry verified; blocked on runtime dynamic alpha/reflection state (Material ID 0x268).", metrics:[["Parts","2"],["Vertices","48"],["Triangles","24"],["Layout","Stride 20 (Flags 18433)"]]},
    "rai_glass_sh_mt.kmy": {status:"Blocked · dynamic alpha-blending", kind:"structure", description:"Raiden glass overlay (Member 48). Geometry verified; blocked on runtime dynamic alpha/reflection state (Material ID 0x48).", metrics:[["Parts","2"],["Vertices","48"],["Triangles","24"],["Layout","Stride 20 (Flags 18433)"]]},
    "cbx_a_mt.kmy": {status:"Blocked · stride-28 packed attributes", kind:"structure", description:"Cardboard box main body assembly (Member 71). Structurally mapped; qualification blocked on stride-28 packed vertex attributes and procedural wet/damaged texture selection.", metrics:[["Parts","19"],["Vertices","712"],["Triangles","480"],["Layout","Stride 28 (Packed Weights)"]]},
    "cbx_a_futa1_mt.kmy": {status:"Blocked · stride-28 packed attributes", kind:"structure", description:"Cardboard box flap 1 (Member 72). Stride-28 packed attribute layout; procedural texture state.", metrics:[["Parts","1"],["Vertices","32"],["Triangles","20"],["Layout","Stride 28"]]},
    "cbx_a_futa2_mt.kmy": {status:"Blocked · stride-28 packed attributes", kind:"structure", description:"Cardboard box flap 2 (Member 73). Stride-28 packed attribute layout; procedural texture state.", metrics:[["Parts","2"],["Vertices","64"],["Triangles","40"],["Layout","Stride 28"]]},
    "cbx_a_futa3_mt.kmy": {status:"Blocked · stride-28 packed attributes", kind:"structure", description:"Cardboard box flap 3 (Member 74). Stride-28 packed attribute layout; procedural texture state.", metrics:[["Parts","3"],["Vertices","96"],["Triangles","60"],["Layout","Stride 28"]]},
    "cbx_a_futa4_mt.kmy": {status:"Blocked · stride-28 packed attributes", kind:"structure", description:"Cardboard box flap 4 (Member 75). Stride-28 packed attribute layout; procedural texture state.", metrics:[["Parts","3"],["Vertices","96"],["Triangles","60"],["Layout","Stride 28"]]},
    "sna_shadow.kmy": {status:"Unsupported visual texture · shadow hull", kind:"structure", description:"Snake shadow projection volume (Member 29). Preserved geometry; non-textured stencil volume unsupported for diffuse qualification.", metrics:[["Parts","21"],["Vertices","568"],["Triangles","410"],["Layout","Stencil Shadow Volume"]]},
    "sna_def_sh.kmy": {status:"Unsupported visual texture · shadow hull", kind:"structure", description:"Snake companion shadow projection volume (Member 38). Preserved geometry; non-textured stencil volume unsupported for diffuse qualification.", metrics:[["Parts","22"],["Vertices","592"],["Triangles","428"],["Layout","Stencil Shadow Volume"]]},
    "snh_def_dummy.kmy": {status:"Unsupported renderable · kinematic carrier", kind:"structure", description:"Dummy skeleton marker hierarchy (Member 28). Contains 55 parts serving as kinematic transform carriers without renderable surface geometry.", metrics:[["Parts","55"],["Vertices","0"],["Triangles","0"],["Layout","Kinematic Carrier"]]}
  };
  const gogEntries = [
    ...gogQualifiedRows.map(([name,parts]) => {
      const highlight = highlightedGog[name];
      return {name,status:"Qualified · material & texture mapping",kind:"rigid",description:highlight?.description ?? "This record is part of the 45-model GOG PC rigid cohort, 100% qualified for material and texture mapping. Total cohort: 7,136 vertices, 5,201 triangles. Diagnostic unlit scope.",metrics:[["Parts",String(parts)],...(highlight?.metrics ?? [["Status","100% Qualified"],["Evidence","Level 3 glTF 2.0"]]) ]};
    }),
    ...gogAlternateRows.map(([name,parts]) => {
      const alt = alternateClassifications[name];
      return {name,status:alt?.status ?? "Alternate layout · separate gate",kind:alt?.kind ?? "structure",description:alt?.description ?? "Alternate layout member in resident.dar.",metrics:alt?.metrics ?? [["Parts",String(parts)],["State","Separate layout gate"]]};
    })
  ];

  const catalogs = {
    gog: {
      kicker: "GOG PC / RETAIL (SECTION 6 COHORT)",
      title: "57-entry KMY cohort & pipeline",
      summary: "All 45 rigid KMY models in resident.dar are 100% qualified for material and texture mapping (7,136 vertices, 5,201 triangles). One skinned candidate is proven (sna_def.kmy), 11 alternate layouts are classified, and the native ps.1.1 pipeline is reconstructed.",
      stats: [["45", "material & texture qualified"], ["7,136", "source vertices"], ["5,201", "source triangles"], ["1", "skinned proof"]],
      boundary: "GOG findings are bound to cdrom.img/stage/r_tnk0/resident.dar. Qualified indicates verified sub-atlas UV mapping and fail-closed Blender reopen. Procedural in-game weapon socket attachments and native EVX hardware shading remain Level 2/3 limits.",
      entries: gogEntries
    },
    ps2: {
      kicker: "PS2 / EDITION-SPECIFIC",
      title: "Regional binaries & microcode pipeline",
      summary: "PS2 console research maps regional executables (SLED-50117 European Trial, SLUS-20144/20554 North American Retail), vector unit transformation microcode (VU1), and texture swizzle transformations.",
      stats: [["SLED-50117", "European Trial CRC 2522825B"], ["VU1", "microcode audited"], ["Local", "your own file stays here"]],
      boundary: "PS2 and trial releases are not interchangeable. The viewer can inspect a static GLTF/GLB you already have, but the catalog does not identify that file as a PS2 asset.",
      entries: [
        {name:"European Trial (SLED-50117 CRC 2522825B)", status:"Binary layout verified", kind:"structure", description:"European Trial disc executable with 4,751 active cheat patch offsets documented. Stage overlay offsets and memory dispatch tables verified.", metrics:[["Disc Serial","SLED-50117"],["CRC","2522825B"],["Executable","SLUS/SLED MIPS"]]},
        {name:"VU1 Microcode Pipeline (vu_disassembly.py)", status:"Microcode audited", kind:"structure", description:"PS2 Vector Unit 1 transformation and lighting pipeline disassembled. Audited runtime bindings, register clobbers, and DMA packet structures.", metrics:[["Subsystem","VU1 Microcode"],["Source","vu_disassembly.py"],["Bindings","catalog/vu_runtime_bindings.json"]]},
        {name:"Texture Palette Swizzle & IOP Linkage", status:"Audited research leads", kind:"rigid", description:"IOP sound and streaming module inventory complete (736,815 bytes cataloged). GS texture palette swizzle arithmetic reverse-engineered.", metrics:[["GS Clut","32-bit swizzle mapped"],["IOP Inventory","iop_linkage_inventory.json"],["Scope","Hardware Architecture"]]}
      ]
    },
    trials: {
      kicker: "TRIAL RELEASES (SLED-50117)",
      title: "Verified gameplay swap candidates",
      summary: "The trial project records verified gameplay route swaps across SLED-50117: full Olga walkthrough across all 8 rooms, Opening Bridge04 coat resolution, bloodied Snake, and soldier swaps, backed by 464 passing tests.",
      stats: [["5", "verified swap candidates"], ["464", "passing test suite"], ["All-Room", "Olga walkthrough passed"]],
      boundary: "These are trial findings on SLED-50117; they do not establish retail GOG compatibility or native animation/material fidelity.",
      entries: [
        {name:"Olga Gurlukovich · org_def.kms", status:"Passed all gameplay rooms + Opening Bridge04", kind:"character", description:"Candidate 1cc2281b... verified through all 8 rooms (w00a..w01f, SHA-256 2a874a8f...). Candidate 70f1f540... passed Opening Bridge04 with prior coat residual resolved using native 23-part Olga companion.", metrics:[["Parts","21"],["Vertices","7,524"],["Triangles","2,676"],["Candidate 06","1cc2281b... (All rooms)"],["Candidate 04","70f1f540... (Opening bridge)"]]},
        {name:"Solid Snake Bloodied · tnc_def_blood.kms", status:"Passed with equipment issue", kind:"character", description:"User live verified in Deck A with equipped weapon visible. Residual Snake ammo/equipment actor appearance remains an open attachment investigation.", metrics:[["Parts","21"],["Vertices","3,180"],["Triangles","1,808"],["Stage","Deck A (w00a)"],["Open Issue","retained-snake-ammo"]]},
        {name:"Gurlukovich Soldier · gba_def_mt.kms", status:"Partially implemented (Passed)", kind:"character", description:"Both gba_def_mt variants (4fdf2b1a... and 6bb49f00...) verified functional in user test sessions on Deck A.", metrics:[["Parts","21"],["Vertices","2,418"],["Triangles","1,462"],["Variants","2 tested working"],["Stage","Deck A (w00a)"]]},
        {name:"Soldier Swap Candidate 02 · sol_def.kms", status:"Partially implemented (Passed)", kind:"character", description:"Rainy-deck guard sequence verified before, during, and after encounter under candidate soldier-swap-02.", metrics:[["Parts","21"],["Vertices","2,418"],["Triangles","1,462"],["Stage","Deck A (w00a)"],["Sequence","Rainy-deck guard"]]},
        {name:"Olga Single Mesh · org_sgl.kms", status:"Target room retest pending", kind:"character", description:"Single-mesh character model (a1d1984e...). Existing builds target w00b or w01e; New Game starts in w00a which explains non-visibility upon initial boot.", metrics:[["Parts","1"],["Vertices","2,150"],["Triangles","1,100"],["Target Stage","w00b / w01e"],["State","Target room retest pending"]]}
      ]
    },
    document: {
      kicker: "DOCUMENT / USA / SLUS-20543",
      title: "Full corpus / loading metadata",
      summary: "The recognized Document model families cover EVM, KMS, nested ZMS and authored Physics models. Curated records remain available while the verified metadata loads.",
      stats: [["11", "model specimens decoded"], ["11", "storyboard sheets decoded"], ["9", "GOG position-multiset matches"], ["1", "effect component, not an actor"]],
      boundary: "Source: Document USA, DOCUMENT/STAGE.DAT; 442 Document + 14 secondary stages. Hierarchy and strip counts are diagnostic records, not complete actors. Position comparisons ignore winding, normals, UVs, weights, materials and runtime state. Names combine visual review and bounded catalog correlations; original Document basenames remain unresolved. No extracted geometry or textures are hosted; native rendering and animation remain untested.",
      entries: [
        {id:"cmdl00",name:"Raiden · cmdl00 / 541e99",status:"Static geometry · visual identification",kind:"character",description:"The source face pixels and decoded geometry identify Raiden. The 2,002 decoded triangles have only a 469-triangle raw-position overlap with GOG rai_def_mh_mt.evx. Original basename, native alpha, animation, and final material appearance remain unresolved.",metrics:[["Hierarchy records","21"],["Strip entries","3,402"],["Triangles","2,002"],["Source bytes","118,960"],["Resource ID","541e99 · type 4"],["GOG overlap","469 / 2,002 triangles"]]},
        {id:"cmdl01",name:"Snake · cmdl01 / 55aaa5",status:"Static geometry · GOG position match",kind:"character",description:"The preview shows Snake's bandana and suit. All 3,002 raw-i16 XYZ triangles match GOG sna_def_mh.evx; four same-ID Trial occurrences overlap by 2,995 triangles and differ. Binary digests differ. The metric ignores winding, order, normals, UVs, skin weights, and materials; native actor equivalence is untested.",metrics:[["Hierarchy records","53"],["Strip entries","5,158"],["Triangles","3,002"],["Source bytes","210,816"],["Resource ID","55aaa5 · type 4"],["GOG position match","3,002 / 3,002 triangles"]]},
        {id:"cmdl02",name:"IRO skull candidate · cmdl02 / 09274e",status:"Static geometry · GOG position match",kind:"character",description:"The diagnostic preview shows a masked tactical soldier. All 2,724 raw-i16 XYZ triangles match GOG iro_skull_mh_mt.evx, also shared by an iro_blood variant. Binary digests differ. The skull basename remains a candidate; geometry equality does not establish matching textures, rig, or native actor behavior.",metrics:[["Hierarchy records","53"],["Strip entries","4,758"],["Triangles","2,724"],["Source bytes","175,792"],["Resource ID","09274e · type 4"],["GOG position match","2,724 / 2,724 triangles"]]},
        {id:"cmdl03",name:"Otacon · cmdl03 / 53f7f1",status:"Static geometry · GOG position match",kind:"character",description:"Dark hair, the face and a pale jacket over a green shirt support Otacon's identification. All 2,628 position triangles match GOG otc_def_mh_mt.evx; the member binaries differ. Separate accessories and native compositing remain unresolved.",metrics:[["Hierarchy records","53"],["Strip entries","4,538"],["Triangles","2,628"],["Source bytes","179,440"],["Resource ID","53f7f1 · type 4"],["GOG position match","2,628 / 2,628 triangles"]]},
        {id:"cmdl04",name:"Sergei Gurlukovich · cmdl04 / 533701",status:"Static geometry · GOG match, Trial differs",kind:"character",description:"Gray hair, moustache, fur collar, coat and camouflage support Sergei Gurlukovich, correlated with crg_def_mh_mt. All 2,810 position triangles match GOG. Two same-hash Trial records each share 800 of these triangles (28.47%); their geometry differs. Original Document filename and native behavior remain unresolved.",metrics:[["Hierarchy records","56"],["Strip entries","4,832"],["Triangles","2,810"],["Source bytes","200,336"],["Resource ID","533701 · type 4"],["Trial overlap","800 / 2,810 triangles"]]},
        {id:"cmdl05",name:"Colonel Campbell radio bust · cmdl05 / 48346b",status:"Static geometry · 22 additional cap triangles",kind:"character",description:"The decoded uniform has a legible CAMPBELL plate. All 1,561 GOG cam_radio_mh_mt.evx triangles occur in this 1,583-triangle bust. The 22 additional distinct triangles cap torso and sleeve openings using existing XYZ points. This is a measured difference from that GOG reference, not proof of global exclusivity. The Document basename is unresolved.",metrics:[["Hierarchy records","53"],["Strip entries","2,759"],["Triangles","1,583"],["Source bytes","116,720"],["Resource ID","48346b · type 4"],["GOG overlap","1,561 / 1,583 triangles"]]},
        {id:"cmdl06",name:"Rose · cmdl06 / 5425b1",status:"Static geometry · GOG position match",kind:"character",description:"Face pixels and a pale business suit support Rose, correlated with ros_def_mh_mt. All 3,307 position triangles match that GOG member; binary digests differ. This is a static pose and primary diffuse study. Face rig, compositing and animation remain unverified.",metrics:[["Hierarchy records","53"],["Strip entries","5,625"],["Triangles","3,307"],["Source bytes","228,160"],["Resource ID","5425b1 · type 4"],["GOG position match","3,307 / 3,307 triangles"]]},
        {id:"cmdl07",name:"Emma, bandaged variant · cmdl07 / 7d76c2",status:"Static geometry · GOG position match",kind:"character",description:"The face, dark shorts, red shoes and blood-stained torso bandage support Emma's bandaged variant. All 3,592 position triangles match GOG ema_houtai_addhand_mh_mt.evx; binaries differ. The addhand basename is a catalog lead and does not verify hand attachment behavior.",metrics:[["Hierarchy records","87"],["Strip entries","6,130"],["Triangles","3,592"],["Source bytes","254,544"],["Resource ID","7d76c2 · type 4"],["GOG position match","3,592 / 3,592 triangles"]]},
        {id:"cmdl08",name:"Olga-linked armored variant · cmdl08 / 643f41",status:"Static geometry · GOG position match",kind:"character",description:"Short-haired face, helmet and armored suit pixels correlate with the GOG org_tng_mh_mt family. All 3,026 position triangles match the named GOG member; binaries differ. The literal basename is retained as a lead. Precise narrative scene and native variant identity remain unverified.",metrics:[["Hierarchy records","53"],["Strip entries","5,374"],["Triangles","3,026"],["Source bytes","233,920"],["Resource ID","643f41 · type 4"],["GOG position match","3,026 / 3,026 triangles"]]},
        {id:"cmdl09",name:"Solidus, base armored model · cmdl09 / 543595",status:"Static geometry · GOG position match",kind:"character",description:"Gray hair, beard and armor support Solidus, correlated with sol_def_mh_mt. All 3,916 position triangles match that GOG member; binaries differ. Separate equipment, animation and scene state have not been assembled into a complete actor.",metrics:[["Hierarchy records","53"],["Strip entries","6,616"],["Triangles","3,916"],["Source bytes","283,280"],["Resource ID","543595 · type 4"],["GOG position match","3,916 / 3,916 triangles"]]},
        {id:"cmdl10",name:"Fatman-linked blood/ooze component · cmdl10 / eb4887",status:"Static effect component",kind:"rigid",description:"A 64-triangle component correlates with GOG fat_ooze_blood_mh.evx and shares all position triangles; binaries differ. Source alpha falls below the diagnostic cutout threshold, leaving that preview blank. Native effect appearance is unknown. The separate main Fatman model is now decoded in the full corpus; this record remains the effect component.",metrics:[["Record role","Effect component, not actor"],["Hierarchy records","58"],["Strip entries","112"],["Triangles","64"],["Source bytes","7,664"],["Resource ID","eb4887 · type 4"]]}
      ]
    },
    skate: {
      kicker: "SKATE MODE / SEPARATE PS2 TARGET",
      title: "Archive records & mechanics study",
      summary: "The skate mode has its own PS2 executable, SKATE2.ELF, and a BNDR archive with 115 named records. Directory offsets and sizes permit deterministic member extraction.",
      stats: [["115", "named BNDR records"], ["SKATE2.ELF", "executable analyzed"], ["Synthetic", "board teaching proxy"]],
      boundary: "The board shown here is newly generated teaching geometry. It is not extracted from MGS2, and this page is not a playable recreation of the skate mode.",
      entries: [
        {name:"BNDR Archive Container (115 Records)", status:"115 named records · deterministic extraction", kind:"skate", description:"Deterministic member extraction verified across all 115 named records in the skate mode BNDR container.", metrics:[["Records","115"],["Extractor","Deterministic"],["Container","BNDR Archive"]]},
        {name:"SKATE2.ELF Movement & Camera Mechanics", status:"Reverse-engineered mechanics", kind:"skate", description:"Player momentum, grind collision, ollie dynamics, and trailing camera follow vectors reverse-engineered from native traces.", metrics:[["Target","SKATE2.ELF"],["Mechanics","Physics & Camera"],["Prototype","Preserved in MGS2-Skate-Revival"]]}
      ]
    }
  };

  const palette = ["#233d35", "#db542d", "#708b72", "#b8a681", "#9cae9e", "#565f55"];
  const canvas = document.getElementById("specimen-canvas");
  const context = canvas.getContext("2d");
  const tabs = Array.from(document.querySelectorAll(".catalog-tab"));
  const list = document.getElementById("catalog-results");
  const search = document.getElementById("catalog-search");
  const fileInput = document.getElementById("local-model-files");
  const importStatus = document.getElementById("import-status");
  let currentEdition = "gog";
  let currentEntry = null;
  let localGeometry = null;
  let localModelName = "";
  let triangles = [];
  let bounds = null;
  let yaw = -0.56;
  let pitch = -0.24;
  let zoom = 1;
  let spinning = false;
  let wireframe = false;
  let dirty = true;
  let dragging = false;
  let lastPoint = null;
  const curatedDocument = new Map(catalogs.document.entries.map(entry => [entry.id,entry]));
  const documentPageSize = 40;
  let documentPage = 0;
  let documentCorpusReady = false;
  let documentLoading = false;
  let documentLoadError = null;
  let documentIndex = null;
  const requestedSpecimen = new URLSearchParams(window.location.search).get("specimen");
  const requestedFamily = new URLSearchParams(window.location.search).get("family");

  function el(id) { return document.getElementById(id); }
  function setText(id, value) { el(id).textContent = value; }

  const geometryLabels = {static_geometry:"Static source geometry",part_local_geometry:"Part-local geometry / assembly open",static_polygon_geometry:"Authored Physics polygons",
    source_points_verified:"Verified source points",source_points_secondary_stream_unusable:"Source points / secondary streams unusable",source_lines_verified:"Verified source outlines",bound_static_geometry_verified:"Bound cloth source geometry"};
  function metricMatches(row,edition) {
    return row[edition]?.exact_geometry_matches ?? row[edition]?.position_multiset_matches ?? 0;
  }
  function primitiveSummary(row) {
    if (row.geometry_kind === "points") return row.points.toLocaleString()+" points";
    if (row.geometry_kind === "lines") return row.line_segments.toLocaleString()+" line segments";
    return row.triangles.toLocaleString()+" triangles";
  }

  function addTriangle(target, points, color) {
    target.push({points: points, color: color % palette.length});
  }

  function addLine(target,points,color) {
    if (points.length !== 2 || points.some(point => point.length !== 3 || point.some(value => !Number.isFinite(value)))) {
      throw new Error("A line primitive contains invalid coordinates.");
    }
    target.push({points,color:color % palette.length,kind:"line"});
  }

  function addPoint(target,point,color) {
    if (point.length !== 3 || point.some(value => !Number.isFinite(value))) {
      throw new Error("A point primitive contains invalid coordinates.");
    }
    target.push({points:[point],color:color % palette.length,kind:"point"});
  }

  function addBox(target, center, size, color) {
    const x = center[0], y = center[1], z = center[2];
    const hx = size[0] / 2, hy = size[1] / 2, hz = size[2] / 2;
    const v = [
      [x-hx,y-hy,z-hz], [x+hx,y-hy,z-hz], [x+hx,y+hy,z-hz], [x-hx,y+hy,z-hz],
      [x-hx,y-hy,z+hz], [x+hx,y-hy,z+hz], [x+hx,y+hy,z+hz], [x-hx,y+hy,z+hz]
    ];
    const faces = [[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[3,2,6,7],[4,5,1,0]];
    for (const f of faces) {
      addTriangle(target, [v[f[0]],v[f[1]],v[f[2]]], color);
      addTriangle(target, [v[f[0]],v[f[2]],v[f[3]]], color);
    }
  }

  function addWheel(target, x, y, z, radius, depth, color) {
    const segments = 14;
    for (let i=0;i<segments;i++) {
      const a = (i / segments) * Math.PI * 2;
      const b = ((i + 1) / segments) * Math.PI * 2;
      const p0 = [x + Math.cos(a)*radius, y + Math.sin(a)*radius, z - depth/2];
      const p1 = [x + Math.cos(b)*radius, y + Math.sin(b)*radius, z - depth/2];
      const p2 = [x + Math.cos(b)*radius, y + Math.sin(b)*radius, z + depth/2];
      const p3 = [x + Math.cos(a)*radius, y + Math.sin(a)*radius, z + depth/2];
      addTriangle(target, [p0,p1,p2], color);
      addTriangle(target, [p0,p2,p3], color);
      addTriangle(target, [[x,y,z-depth/2],p1,p0], color);
      addTriangle(target, [[x,y,z+depth/2],p3,p2], color);
    }
  }

  function makeProxy(kind) {
    const out = [];
    if (kind === "character") {
      addBox(out,[0,0.05,0],[0.48,0.66,0.3],0);
      addBox(out,[0,0.62,0],[0.3,0.3,0.28],1);
      addBox(out,[-0.37,0.08,0],[0.23,0.62,0.22],2);
      addBox(out,[0.37,0.08,0],[0.23,0.62,0.22],2);
      addBox(out,[-0.14,-0.52,0],[0.22,0.57,0.24],3);
      addBox(out,[0.14,-0.52,0],[0.22,0.57,0.24],3);
    } else if (kind === "skate") {
      addBox(out,[0,0,0],[1.8,0.12,0.55],1);
      addBox(out,[0,-0.14,0],[0.48,0.1,0.42],0);
      addBox(out,[-0.57,-0.14,0],[0.4,0.1,0.42],0);
      for (const x of [-0.63,0.63]) for (const z of [-0.34,0.34]) addWheel(out,x,-0.3,z,0.15,0.1,2);
    } else if (kind === "structure") {
      addBox(out,[0,0,0],[0.75,0.48,0.36],0);
      addBox(out,[0,0.43,0],[0.38,0.3,0.3],1);
      addBox(out,[-0.47,0.03,0],[0.23,0.31,0.22],2);
      addBox(out,[0.47,0.03,0],[0.23,0.31,0.22],2);
      addBox(out,[0,-0.43,0],[0.55,0.22,0.3],3);
    } else {
      addBox(out,[0,0,0],[0.85,0.45,0.32],0);
      addBox(out,[-0.58,0.13,0],[0.25,0.72,0.24],1);
      addBox(out,[0.58,0.13,0],[0.25,0.72,0.24],2);
      addBox(out,[0,0.52,0],[0.45,0.2,0.27],3);
    }
    return out;
  }

  function getBounds(mesh) {
    if (!mesh.length) return {center:[0,0,0], radius:1};
    const lo = [Infinity,Infinity,Infinity], hi = [-Infinity,-Infinity,-Infinity];
    for (const tri of mesh) for (const p of tri.points) {
      for (let k=0;k<3;k++) { lo[k]=Math.min(lo[k],p[k]); hi[k]=Math.max(hi[k],p[k]); }
    }
    const center = lo.map((value,k)=>(value+hi[k])/2);
    const radius = Math.max(0.001,Math.hypot(hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2])/2);
    return {center:center,radius:radius};
  }

  function setGeometry(mesh, isLocal, name) {
    triangles = mesh;
    bounds = getBounds(mesh);
    localGeometry = isLocal ? mesh : null;
    localModelName = isLocal ? name : "";
    setText("viewer-label", isLocal ? "LOCAL FILE / GEOMETRY ONLY" : "SYNTHETIC TEACHING PROXY");
    setText("canvas-stamp", isLocal ? "LOCAL STATIC GEOMETRY" : "SYNTHETIC TEACHING PROXY");
    canvas.setAttribute("aria-label", isLocal ? "Static geometry preview loaded from a local file" : "Interactive synthetic teaching geometry proxy");
    document.getElementById("clear-local-model").disabled = !isLocal;
    dirty = true;
  }

  function setStatus(message, isError) {
    importStatus.textContent = message;
    importStatus.dataset.error = isError ? "true" : "false";
  }

  function renderStats(cat) {
    const container = el("catalog-stats");
    container.replaceChildren();
    for (const stat of cat.stats) {
      const card = document.createElement("div");
      card.className = "catalog-stat";
      const value = document.createElement("strong");
      value.textContent = stat[0];
      const label = document.createElement("span");
      label.textContent = stat[1];
      card.append(value,label);
      container.append(card);
    }
  }

  function renderMetrics(entry) {
    const container = el("record-metrics");
    container.replaceChildren();
    for (const pair of entry.metrics) {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const value = document.createElement("dd");
      term.textContent = pair[0];
      value.textContent = pair[1];
      row.append(term,value);
      container.append(row);
    }
  }

  function selectEntry(index) {
    const cat = catalogs[currentEdition];
    currentEntry = cat.entries[index];
    Array.from(list.children).forEach((button) => {
      button.setAttribute("aria-selected", String(Number(button.dataset.index) === index));
    });
    setText("specimen-name", currentEntry.name);
    setText("specimen-state", currentEntry.status);
    setText("record-title", currentEntry.name);
    setText("record-description", currentEntry.description);
    renderMetrics(currentEntry);
    const permalink = el("record-permalink");
    permalink.hidden = currentEdition !== "document";
    if (currentEdition === "document") {
      permalink.href = "catalog.html?edition=document&specimen=" + encodeURIComponent(currentEntry.alias || currentEntry.id);
    }
    const metadata = el("record-source-metadata");
    metadata.hidden = !currentEntry.corpus;
    if (currentEntry.corpus) el("record-source-json").textContent = JSON.stringify(currentEntry.corpus,null,2);
    setText("catalog-boundary", cat.boundary);
    if (!localGeometry) {
      setGeometry(makeProxy(currentEntry.kind), false, "");
      setStatus("Synthetic teaching proxy ready. No game geometry is loaded.", false);
    } else {
      setStatus("Local geometry is still loaded in this tab. Choose Clear local model to return to the synthetic proxy.", false);
    }
  }

  function renderEntries() {
    const cat = catalogs[currentEdition];
    const term = search.value.trim().toLowerCase();
    list.replaceChildren();
    const fullDocument = currentEdition === "document" && documentCorpusReady;
    const matched = cat.entries.map((entry,index)=>({entry,index})).filter(({entry}) => {
      if (!(entry.searchText || (entry.name+" "+entry.status+" "+entry.description).toLowerCase()).includes(term)) return false;
      if (!fullDocument) return true;
      const row = entry.corpus;
      const family = el("document-model-family").value;
      const comparison = el("document-model-comparison").value;
      const status = el("document-model-status").value;
      return (family === "all" || row.family === family) && (status === "all" || row.status === status) &&
        (comparison === "all" || (comparison === "gog" && metricMatches(row,"gog") > 0) ||
         (comparison === "trial" && metricMatches(row,"trial") > 0) ||
         (comparison === "different" && !metricMatches(row,"gog")));
    });
    setText("catalog-count", matched.length + (matched.length === 1 ? " record" : " records"));
    el("corpus-model-filters").hidden = !fullDocument;
    el("catalog-pagination").hidden = !fullDocument;
    documentPage = Math.max(0,Math.min(documentPage,Math.ceil(matched.length/documentPageSize)-1));
    const start = fullDocument ? documentPage*documentPageSize : 0;
    const visible = fullDocument ? matched.slice(start,start+documentPageSize) : matched;
    el("catalog-prev").disabled = documentPage === 0;
    el("catalog-next").disabled = start+documentPageSize >= matched.length;
    setText("catalog-page-status", matched.length ? (start+1)+"–"+Math.min(start+documentPageSize,matched.length)+" of "+matched.length.toLocaleString() : "0 matching records");
    if (!matched.length) {
      const empty = document.createElement("p");
      empty.className = "empty-results";
      empty.textContent = "No entries match that filter.";
      list.append(empty);
      return;
    }
    for (const {entry,index} of visible) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "catalog-item";
      button.setAttribute("role","option");
      button.dataset.index = String(index);
      button.setAttribute("aria-selected",String(currentEntry === entry));
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const state = document.createElement("span");
      state.className = "item-status";
      state.textContent = entry.status;
      const description = document.createElement("span");
      description.textContent = entry.corpus ? entry.corpus.family+" · "+primitiveSummary(entry.corpus)+" · "+entry.corpus.stages[0]+" / "+entry.corpus.resource_hashes[0]+(entry.corpus.stages.length>1 ? " · "+entry.corpus.stages.length+" stages" : "") : entry.metrics.map((metric)=>metric[0]+": "+metric[1]).join(" · ");
      button.append(name,state,description);
      button.addEventListener("click",()=>{
        selectEntry(index);
        if (currentEdition === "document" && documentCorpusReady) {
          const url = new URL(window.location.href);
          url.searchParams.set("edition","document");
          url.searchParams.set("specimen",entry.alias || entry.id);
          history.replaceState(null,"",url);
        }
      });
      list.append(button);
    }
    if (currentEdition === "document" && !documentCorpusReady) {
      const note = document.createElement("p");
      note.className = "empty-results";
      note.setAttribute("role","status");
      note.textContent = documentLoadError ? documentLoadError : "Loading the full verified model corpus…";
      list.append(note);
      if (documentLoadError) {
        const retry = document.createElement("button");
        retry.type = "button";
        retry.className = "corpus-retry";
        retry.textContent = "Retry full corpus";
        retry.addEventListener("click",loadDocumentCorpus);
        list.append(retry);
      }
    }
  }

  function documentEntry(row, alias) {
    const curated = curatedDocument.get(alias);
    const exact = metricMatches(row,"gog") > 0;
    const comparison = exact ? "The stated geometry metric has an exact GOG reference match. " : "No exact GOG match under the stated metric; this is not global uniqueness. ";
    const placement = row.status === "part_local_geometry" ? "Parts decode, but their native assembly remains unverified. " : "Native pose, materials, animation and complete-actor behavior remain unverified. ";
    const supplemental = !!row.geometry_kind;
    const identity = row.identity_support === "Native menu consumer and exact GCX title-group/index binding" ? "The disc's menu metadata binds this stage/resource to the stated title. Original basenames and native rendered behavior remain unverified. " : "Source names are bounded catalog correlations; original Document filenames are not recovered.";
    const description = curated?.description || row.family + " source resource. " + comparison + placement + (supplemental ? row.limitations.join(" ") : identity);
    const entry = {
      id:row.id, alias, corpus:row,
      name:curated?.name || row.title + " · " + row.resource_hashes.join(" / "),
      status:(geometryLabels[row.status] || row.status.replaceAll("_"," ")) + (exact ? " · shared metric" : " · comparison differs"),
      kind:curated?.kind || "structure", description,
      metrics:[["Family",row.family],["Source vertices",row.vertices.toLocaleString()],[supplemental ? "Diagnostic primitives" : "Diagnostic triangles",supplemental ? primitiveSummary(row) : row.triangles.toLocaleString()],
               [supplemental ? row.binding ? "Bound CVY part" : "Source parts / objects" : "Hierarchy / definitions",supplemental ? String(row.binding?.part ?? row.source_parts ?? row.objects ?? "Unclassified") : row.hierarchy+" / "+row.definitions],["Occurrences",row.occurrences.toLocaleString()],
               ["GOG exact metric references",String(metricMatches(row,"gog"))],["Trial exact metric references",String(metricMatches(row,"trial"))],
               ["Source SHA-256",row.source_member_sha256]]
    };
    entry.searchText = (JSON.stringify(row)+" "+entry.name+" "+(alias || "")).toLowerCase();
    return entry;
  }

  async function loadDocumentCorpus() {
    if (documentLoading || documentCorpusReady) return;
    documentLoading = true;
    documentLoadError = null;
    list.setAttribute("aria-busy","true");
    try {
      const [loaded,supplemental] = await Promise.all([window.DocumentCorpus.load("models"),window.DocumentCorpus.load("geometry")]);
      documentIndex = loaded.index;
      const byId = new Map(Object.entries(documentIndex.aliases).map(([alias,id]) => [id,alias]));
      const rows = loaded.records.concat(supplemental.records);
      const entries = rows.map(row => documentEntry(row,byId.get(row.id)));
      if (new Set(entries.map(entry=>entry.id)).size !== entries.length) throw new Error("Combined source-record IDs are not unique.");
      for (const [id,values,label] of [["document-model-family",new Set(rows.map(row=>row.family)),value=>value],
                                     ["document-model-status",new Set(rows.map(row=>row.status)),value=>geometryLabels[value] || value.replaceAll("_"," ")]]) {
        const select=el(id);
        select.replaceChildren();
        const all=document.createElement("option"); all.value="all"; all.textContent="All "+(id.endsWith("family") ? "families" : "static exports"); select.append(all);
        for (const value of [...values].sort()) {const option=document.createElement("option");option.value=value;option.textContent=label(value);select.append(option);}
      }
      const priority = [...Object.values(documentIndex.aliases),...documentIndex.highlights.map(row => row.id)];
      entries.sort((a,b) => {
        const left = priority.indexOf(a.id), right = priority.indexOf(b.id);
        if (left >= 0 || right >= 0) return (left < 0 ? 99999 : left)-(right < 0 ? 99999 : right);
        return a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
      });
      const summary = documentIndex.models.summary;
      const cat = catalogs.document;
      cat.entries = entries;
      cat.title = entries.length.toLocaleString()+" source records";
      cat.summary = "The recognized EVM, KMS, nested ZMS and Physics families contain "+summary.logical_models.toLocaleString()+" logical models, with "+supplemental.records.length.toLocaleString()+" separately counted supplemental geometry sources. Six model exports retain part-local geometry with native assembly open.";
      cat.stats = [[summary.logical_models.toLocaleString(),"logical model records"],[supplemental.records.length.toLocaleString(),"supplemental geometry sources"],
                   [summary.gog_exact_geometry_models.toLocaleString(),"model GOG metric matches"],[summary.trial_exact_geometry_models.toLocaleString(),"model Trial metric matches"]];
      cat.boundary = "Every source group in both DAT archives was replayed: 456 stages, 948 groups, 20,087 member occurrences. EVM/KMS equality compares local signed-i16 XYZ triangle multisets and ignores transforms, hierarchy, UVs, normals, weights and materials. Physics uses a separate float64 polygon/unpacked-byte metric. Supplemental records retain their own point/line/triangle metric; point arrays do not establish surface topology. Shared geometry does not establish identical textures, actors or native behavior. Extracted assets remain local.";
      documentCorpusReady = true;
      if (currentEdition === "document") {
        setText("catalog-title",cat.title);
        setText("catalog-summary",cat.summary);
        renderStats(cat);
        if ([...el("document-model-family").options].some(option=>option.value===requestedFamily)) el("document-model-family").value=requestedFamily;
        const target = documentIndex.aliases[requestedSpecimen] || requestedSpecimen;
        const index = Math.max(0,entries.findIndex(entry => target ? entry.id === target : requestedFamily ? entry.corpus.family === requestedFamily : false));
        const family=el("document-model-family").value;
        const filtered=family === "all" ? entries : entries.filter(entry=>entry.corpus.family===family);
        documentPage = Math.max(0,Math.floor(filtered.indexOf(entries[index])/documentPageSize));
        selectEntry(index);
        renderEntries();
      }
    } catch (error) {
      documentLoadError = "Full corpus unavailable: "+(error.message || "metadata could not be loaded")+" The eleven curated records below are the earlier sample scope.";
      if (currentEdition === "document") renderEntries();
    } finally {
      documentLoading = false;
      list.setAttribute("aria-busy","false");
    }
  }

  function selectEdition(name, focus) {
    if (!catalogs[name]) name = "gog";
    currentEdition = name;
    const cat = catalogs[name];
    for (const tab of tabs) {
      const selected = tab.dataset.edition === name;
      tab.setAttribute("aria-selected",String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    }
    el("catalog-panel").setAttribute("aria-labelledby","catalog-tab-"+name);
    setText("catalog-kicker",cat.kicker);
    setText("catalog-title",cat.title);
    setText("catalog-summary",cat.summary);
    renderStats(cat);
    search.value = "";
    documentPage = 0;
    for (const id of ["document-model-family","document-model-comparison","document-model-status"]) el(id).value = "all";
    currentEntry = null;
    renderEntries();
    if (name === "document" && !documentCorpusReady) loadDocumentCorpus();
    selectEntry(0);
    renderEntries();
  }

  function hexRgb(hex) {
    const value = parseInt(hex.slice(1),16);
    return [(value>>16)&255,(value>>8)&255,value&255];
  }

  function shaded(hex, amount) {
    const rgb = hexRgb(hex).map((value)=>Math.max(0,Math.min(255,Math.round(value*amount))));
    return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1,2);
    const width = Math.max(1,Math.round(rect.width*ratio));
    const height = Math.max(1,Math.round(rect.height*ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      dirty = true;
    }
  }

  function draw() {
    if (!context) return;
    resizeCanvas();
    const width = canvas.width, height = canvas.height;
    context.clearRect(0,0,width,height);
    context.fillStyle = "#e9e6da";
    context.fillRect(0,0,width,height);
    if (!triangles.length) return;
    const center = bounds.center;
    const cosineYaw = Math.cos(yaw), sineYaw = Math.sin(yaw);
    const cosinePitch = Math.cos(pitch), sinePitch = Math.sin(pitch);
    const scale = Math.min(width,height)*0.39*zoom/bounds.radius;
    const light = [0.36,0.72,0.59];
    const projected = [];
    for (const tri of triangles) {
      const points = tri.points.map((p)=>{
        const x = p[0]-center[0], y = p[1]-center[1], z = p[2]-center[2];
        const rx = x*cosineYaw-z*sineYaw;
        const rz = x*sineYaw+z*cosineYaw;
        const ry = y*cosinePitch-rz*sinePitch;
        const dz = y*sinePitch+rz*cosinePitch;
        return [width/2+rx*scale,height/2-ry*scale,dz];
      });
      const a=points[0], b=points[1], c=points[2];
      if (tri.kind === "point") {
        projected.push({points,depth:a[2],color:tri.color,light:1,kind:"point"});
        continue;
      }
      if (tri.kind === "line") {
        projected.push({points,depth:(a[2]+b[2])/2,color:tri.color,light:1,kind:"line"});
        continue;
      }
      const ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2];
      const vx=c[0]-a[0], vy=c[1]-a[1], vz=c[2]-a[2];
      const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
      const normalLength=Math.max(0.0001,Math.hypot(nx,ny,nz));
      const diffuse=Math.abs((nx*light[0]+ny*light[1]+nz*light[2])/normalLength);
      projected.push({points:points,depth:(a[2]+b[2]+c[2])/3,color:tri.color,light:0.35+diffuse*0.65});
    }
    projected.sort((a,b)=>a.depth-b.depth);
    for (const tri of projected) {
      context.beginPath();
      if (tri.kind === "point") {
        context.arc(tri.points[0][0],tri.points[0][1],Math.max(1.75,width/350),0,Math.PI*2);
        context.fillStyle=palette[tri.color];
        context.fill();
        continue;
      }
      context.moveTo(tri.points[0][0],tri.points[0][1]);
      context.lineTo(tri.points[1][0],tri.points[1][1]);
      if (tri.kind === "line") {
        context.strokeStyle=palette[tri.color];
        context.lineWidth=Math.max(1.25,width/600);
        context.stroke();
        continue;
      }
      context.lineTo(tri.points[2][0],tri.points[2][1]);
      context.closePath();
      context.fillStyle=shaded(palette[tri.color],tri.light);
      context.fill();
      if (wireframe) {
        context.strokeStyle="rgba(29,47,39,.58)";
        context.lineWidth=Math.max(0.7,width/900);
        context.stroke();
      }
    }
  }

  function animationFrame() {
    if (spinning) { yaw += 0.004; dirty = true; }
    if (dirty) { draw(); dirty = false; }
    requestAnimationFrame(animationFrame);
  }

  function dataUriBytes(uri) {
    const comma=uri.indexOf(",");
    if (comma<0) throw new Error("Malformed embedded buffer data.");
    const metadata=uri.slice(0,comma), content=uri.slice(comma+1);
    if (/;base64/i.test(metadata)) {
      const binary=atob(content);
      const bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
      return bytes;
    }
    return new TextEncoder().encode(decodeURIComponent(content));
  }

  function parseGlb(bytes) {
    const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
    if(bytes.length<20 || view.getUint32(0,true)!==0x46546c67) throw new Error("That file is not a GLB.");
    if(view.getUint32(4,true)!==2) throw new Error("Only GLB version 2 is supported.");
    const total=view.getUint32(8,true);
    if(total>bytes.length) throw new Error("The GLB header length exceeds the selected file.");
    let offset=12, json=null, binary=null;
    while(offset+8<=total) {
      const length=view.getUint32(offset,true), type=view.getUint32(offset+4,true);
      offset+=8;
      if(offset+length>total) throw new Error("A GLB chunk extends beyond the selected file.");
      const chunk=bytes.subarray(offset,offset+length);
      if(type===0x4e4f534a) json=JSON.parse(new TextDecoder().decode(chunk).replace(/\u0000+$/g,"").trim());
      else if(type===0x004e4942) binary=chunk;
      offset+=length;
    }
    if(!json) throw new Error("The GLB has no JSON scene chunk.");
    return {document:json,binary:binary};
  }

  function componentSize(type) {
    if(type===5120 || type===5121) return 1;
    if(type===5122 || type===5123) return 2;
    if(type===5125 || type===5126) return 4;
    throw new Error("Unsupported GLTF component type: "+type);
  }

  function componentCount(type) {
    if(type==="SCALAR") return 1;
    if(type==="VEC2") return 2;
    if(type==="VEC3") return 3;
    if(type==="VEC4") return 4;
    throw new Error("Unsupported GLTF accessor type: "+type);
  }

  function matMul(a,b) {
    const out=new Array(16).fill(0);
    for(let col=0;col<4;col++) for(let row=0;row<4;row++) {
      for(let k=0;k<4;k++) out[col*4+row]+=a[k*4+row]*b[col*4+k];
    }
    return out;
  }

  function localMatrix(node) {
    if(node.matrix) return node.matrix.slice();
    const t=node.translation || [0,0,0], s=node.scale || [1,1,1], q=node.rotation || [0,0,0,1];
    const x=q[0],y=q[1],z=q[2],w=q[3];
    return [
      (1-2*y*y-2*z*z)*s[0],(2*x*y+2*z*w)*s[0],(2*x*z-2*y*w)*s[0],0,
      (2*x*y-2*z*w)*s[1],(1-2*x*x-2*z*z)*s[1],(2*y*z+2*x*w)*s[1],0,
      (2*x*z+2*y*w)*s[2],(2*y*z-2*x*w)*s[2],(1-2*x*x-2*y*y)*s[2],0,
      t[0],t[1],t[2],1
    ];
  }

  function transformPoint(matrix,point) {
    const x=point[0],y=point[1],z=point[2];
    const w=matrix[3]*x+matrix[7]*y+matrix[11]*z+matrix[15] || 1;
    return [(matrix[0]*x+matrix[4]*y+matrix[8]*z+matrix[12])/w,
      (matrix[1]*x+matrix[5]*y+matrix[9]*z+matrix[13])/w,
      (matrix[2]*x+matrix[6]*y+matrix[10]*z+matrix[14])/w];
  }

  function makeAccessorReader(document,buffers) {
    return function(index,expectedType) {
      const accessor=document.accessors && document.accessors[index];
      if(!accessor || accessor.sparse) throw new Error("Missing or sparse GLTF accessor is not supported.");
      if(expectedType && accessor.type!==expectedType) throw new Error("Expected a "+expectedType+" accessor.");
      const view=document.bufferViews && document.bufferViews[accessor.bufferView];
      if(!view) throw new Error("A GLTF accessor references a missing buffer view.");
      const bytes=buffers[view.buffer];
      if(!bytes) throw new Error("A required GLTF buffer is missing; select the scene and all matching BIN files.");
      const typeCount=componentCount(accessor.type), size=componentSize(accessor.componentType);
      const stride=view.byteStride || typeCount*size;
      const start=(view.byteOffset || 0)+(accessor.byteOffset || 0);
      const data=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
      const rows=[];
      for(let i=0;i<accessor.count;i++) {
        const row=[];
        for(let c=0;c<typeCount;c++) {
          const offset=start+i*stride+c*size;
          if(offset+size>bytes.length) throw new Error("A GLTF accessor reads past its buffer.");
          if(accessor.componentType===5126) row.push(data.getFloat32(offset,true));
          else if(accessor.componentType===5125) row.push(data.getUint32(offset,true));
          else if(accessor.componentType===5123) row.push(data.getUint16(offset,true));
          else if(accessor.componentType===5121) row.push(data.getUint8(offset));
          else throw new Error("Unsupported GLTF accessor component type.");
        }
        rows.push(typeCount===1 ? row[0] : row);
      }
      return rows;
    };
  }

  async function parseLocalModel(files) {
    const fileList=Array.from(files);
    if(!fileList.length) throw new Error("Choose a GLTF or GLB file first.");
    for(const file of fileList) if(file.size>40*1024*1024) throw new Error("Each selected file must be 40 MiB or smaller.");
    const sceneFile=fileList.find((file)=>/\.glb$/i.test(file.name)) || fileList.find((file)=>/\.gltf$/i.test(file.name));
    if(!sceneFile) throw new Error("Select a GLB or GLTF scene file.");
    const fileMap=new Map(fileList.map((file)=>[file.name,file]));
    const sourceBytes=new Uint8Array(await sceneFile.arrayBuffer());
    let document,glbBinary=null;
    if(/\.glb$/i.test(sceneFile.name)) {
      const result=parseGlb(sourceBytes);
      document=result.document;
      glbBinary=result.binary;
    } else {
      document=JSON.parse(new TextDecoder().decode(sourceBytes));
    }
    if(!document.asset || !String(document.asset.version || "").startsWith("2")) throw new Error("Only GLTF 2.0 scenes are supported.");
    const buffers=[];
    for(let i=0;i<(document.buffers || []).length;i++) {
      const item=document.buffers[i];
      if(!item.uri && glbBinary) { buffers[i]=glbBinary; continue; }
      if(!item.uri) throw new Error("A GLTF buffer has no URI; select its GLB or matching BIN file.");
      if(item.uri.startsWith("data:")) { buffers[i]=dataUriBytes(item.uri); continue; }
      if(/^https?:|^\/\//i.test(item.uri)) throw new Error("Remote buffer links are not loaded. Select the matching local BIN file instead.");
      const basename=decodeURIComponent(item.uri.split(/[?#]/)[0].split("/").pop());
      const bufferFile=fileMap.get(basename);
      if(!bufferFile) throw new Error("Missing local buffer "+basename+". Select the GLTF and its BIN file together.");
      buffers[i]=new Uint8Array(await bufferFile.arrayBuffer());
    }
    const readAccessor=makeAccessorReader(document,buffers);
    const output=[];
    const nodes=document.nodes || [];
    const parentIndices=new Set();
    for(const node of nodes) for(const child of node.children || []) parentIndices.add(child);
    const scene=document.scenes && document.scenes[document.scene || 0];
    const roots=scene && scene.nodes ? scene.nodes : nodes.map((node,index)=>index).filter((index)=>!parentIndices.has(index));
    let primitiveColor=0;
    function appendMesh(meshIndex,world) {
      const mesh=document.meshes && document.meshes[meshIndex];
      if(!mesh) return;
      for(const primitive of mesh.primitives || []) {
        const positionAccessor=primitive.attributes && primitive.attributes.POSITION;
        if(positionAccessor===undefined) continue;
        const positions=readAccessor(positionAccessor,"VEC3");
        const indices=primitive.indices===undefined ? positions.map((_,index)=>index) : readAccessor(primitive.indices,"SCALAR");
        const mode=primitive.mode===undefined ? 4 : primitive.mode;
        const triplets=[];
        const segments=[];
        if(mode===0) {
          for(const index of indices) {
            if(output.length>=50000) throw new Error("This preview is limited to 50,000 points, triangles or line segments for responsive browser use.");
            if(!Number.isInteger(index) || !positions[index]) throw new Error("A point primitive references a missing vertex.");
            addPoint(output,transformPoint(world,positions[index]),primitiveColor);
          }
          primitiveColor++;
        } else if(mode===4) for(let i=0;i+2<indices.length;i+=3) triplets.push([indices[i],indices[i+1],indices[i+2]]);
        else if(mode===5) for(let i=2;i<indices.length;i++) triplets.push(i%2 ? [indices[i-1],indices[i-2],indices[i]] : [indices[i-2],indices[i-1],indices[i]]);
        else if(mode===6) for(let i=2;i<indices.length;i++) triplets.push([indices[0],indices[i-1],indices[i]]);
        else if(mode===1) {
          if(indices.length%2) throw new Error("A LINES primitive has an incomplete pair.");
          for(let i=0;i<indices.length;i+=2) segments.push([indices[i],indices[i+1]]);
        } else if(mode===2 || mode===3) {
          if(indices.length<2) throw new Error("A line loop or strip needs at least two indices.");
          for(let i=1;i<indices.length;i++) segments.push([indices[i-1],indices[i]]);
          if(mode===2) segments.push([indices[indices.length-1],indices[0]]);
        } else continue;
        for(const indexTriplet of triplets) {
          if(output.length>=50000) throw new Error("This preview is limited to 50,000 points, triangles or line segments for responsive browser use.");
          const points=indexTriplet.map((index)=>{
            if(!positions[index]) throw new Error("A primitive references a missing vertex.");
            return transformPoint(world,positions[index]);
          });
          addTriangle(output,points,primitiveColor++);
        }
        for(const pair of segments) {
          if(output.length>=50000) throw new Error("This preview is limited to 50,000 points, triangles or line segments for responsive browser use.");
          const points=pair.map(index=>{
            if(!Number.isInteger(index) || !positions[index]) throw new Error("A line primitive references a missing vertex.");
            return transformPoint(world,positions[index]);
          });
          addLine(output,points,primitiveColor++);
        }
      }
    }
    function visitNode(index,parent,visited) {
      if(visited.has(index)) return;
      visited.add(index);
      const node=nodes[index];
      if(!node) return;
      const world=matMul(parent,localMatrix(node));
      if(node.mesh!==undefined) appendMesh(node.mesh,world);
      for(const child of node.children || []) visitNode(child,world,visited);
    }
    if(nodes.length) {
      const visited=new Set();
      for(const root of roots) visitNode(root,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],visited);
    } else {
      for(let i=0;i<(document.meshes || []).length;i++) appendMesh(i,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    }
    if(!output.length) throw new Error("No static point, triangle or line geometry was found in the scene.");
    return {triangles:output,name:sceneFile.name,triangleCount:output.filter(item=>!item.kind).length,lineCount:output.filter(item=>item.kind==="line").length,pointCount:output.filter(item=>item.kind==="point").length};
  }

  fileInput.addEventListener("change",async()=>{
    try {
      setStatus("Reading selected files locally…",false);
      const result=await parseLocalModel(fileInput.files);
      setGeometry(result.triangles,true,result.name);
      setText("viewer-label","LOCAL FILE / GEOMETRY ONLY");
      setText("specimen-name",result.name);
      setText("specimen-state",result.lineCount || result.pointCount ? "LOCAL STATIC GEOMETRY" : "LOCAL STATIC MESH");
      setStatus("Loaded "+result.name+": "+result.triangleCount.toLocaleString()+" triangles"+(result.lineCount ? " · "+result.lineCount.toLocaleString()+" line segments" : "")+(result.pointCount ? " · "+result.pointCount.toLocaleString()+" points" : "")+". Files stay in this browser tab; textures, skinning, and animation are not loaded.",false);
    } catch(error) {
      setStatus(error && error.message ? error.message : "Could not read this local model.",true);
    }
  });

  document.getElementById("clear-local-model").addEventListener("click",()=>{
    localGeometry=null;
    localModelName="";
    fileInput.value="";
    if(currentEntry) setGeometry(makeProxy(currentEntry.kind),false,"");
    setText("specimen-name",currentEntry ? currentEntry.name : "Synthetic preview");
    setText("specimen-state",currentEntry ? currentEntry.status : "METADATA VIEW");
    setStatus("Local file cleared. Synthetic teaching proxy restored.",false);
  });

  search.addEventListener("input",()=>{documentPage=0;renderEntries();});
  for (const id of ["document-model-family","document-model-comparison","document-model-status"]) {
    el(id).addEventListener("change",()=>{documentPage=0;renderEntries();});
  }
  el("document-model-reset").addEventListener("click",()=>{
    search.value="";
    for (const id of ["document-model-family","document-model-comparison","document-model-status"]) el(id).value="all";
    documentPage=0;
    renderEntries();
    search.focus();
  });
  for (const [id,step] of [["catalog-prev",-1],["catalog-next",1]]) {
    el(id).addEventListener("click",()=>{documentPage+=step;renderEntries();list.scrollTop=0;});
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener("click",()=>selectEdition(tab.dataset.edition));
    tab.addEventListener("keydown",(event)=>{
      let next=null;
      if(event.key==="ArrowRight") next=(index+1)%tabs.length;
      if(event.key==="ArrowLeft") next=(index+tabs.length-1)%tabs.length;
      if(event.key==="Home") next=0;
      if(event.key==="End") next=tabs.length-1;
      if(next!==null) { event.preventDefault(); selectEdition(tabs[next].dataset.edition,true); }
    });
  });

  document.getElementById("auto-spin").addEventListener("click",(event)=>{
    spinning=!spinning;
    event.currentTarget.setAttribute("aria-pressed",String(spinning));
    event.currentTarget.textContent=spinning ? "Stop rotation" : "Start rotation";
  });
  document.getElementById("wireframe").addEventListener("click",(event)=>{
    wireframe=!wireframe;
    event.currentTarget.setAttribute("aria-pressed",String(wireframe));
    event.currentTarget.textContent=wireframe ? "Hide wireframe" : "Show wireframe";
    dirty=true;
  });
  document.getElementById("reset-view").addEventListener("click",()=>{
    yaw=-0.56; pitch=-0.24; zoom=1; dirty=true;
  });
  canvas.addEventListener("pointerdown",(event)=>{
    dragging=true; lastPoint=[event.clientX,event.clientY]; canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove",(event)=>{
    if(!dragging || !lastPoint) return;
    yaw+=(event.clientX-lastPoint[0])*0.008;
    pitch=Math.max(-1.35,Math.min(1.35,pitch+(event.clientY-lastPoint[1])*0.008));
    lastPoint=[event.clientX,event.clientY];
    dirty=true;
  });
  canvas.addEventListener("pointerup",()=>{dragging=false;lastPoint=null;});
  canvas.addEventListener("pointercancel",()=>{dragging=false;lastPoint=null;});
  canvas.addEventListener("wheel",(event)=>{
    event.preventDefault();
    zoom=Math.max(0.35,Math.min(3.5,zoom*Math.exp(-event.deltaY*0.001)));
    dirty=true;
  },{passive:false});
  window.addEventListener("resize",()=>{dirty=true;});
  if(window.ResizeObserver) new ResizeObserver(()=>{dirty=true;}).observe(canvas);

  const requested=new URLSearchParams(window.location.search).get("edition");
  selectEdition(catalogs[requested] ? requested : "gog");
  const requestedIndex=catalogs[currentEdition].entries.findIndex(entry => entry.id === requestedSpecimen);
  if (requestedSpecimen && requestedIndex >= 0) {
    selectEntry(requestedIndex);
    renderEntries();
  }
  animationFrame();
})();
