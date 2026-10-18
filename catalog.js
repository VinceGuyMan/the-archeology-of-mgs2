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
    "sna_bdn1.kmy": {description:"Solid Snake bandanna specimen. The independent geometry check and Blender reopen gate passed.", metrics:[["Vertices","133"],["Triangles","94"]]},
    "sna_bdn2.kmy": {description:"Second bandanna specimen from the same GOG archive cohort; it passed its own geometry and Blender reopen gates.", metrics:[["Vertices","113"],["Triangles","80"]]},
    "sna_mugen_bdn1.kmy": {description:"Eleven-part infinite-bandanna specimen. Exact source and output identities are retained in the qualification receipts.", metrics:[["Vertices","198"],["Triangles","176"]]},
    "sna_mugen_bdn2.kmy": {description:"Nine-part companion specimen. It remains a separate source record from sna_mugen_bdn1.", metrics:[["Vertices","170"],["Triangles","160"]]},
    "cig.kmy": {description:"Two-part cigar accessory specimen. Its earlier mistaken member premise was preserved as a mismatch receipt; the corrected specimen was qualified separately.", metrics:[["Vertices","40"],["Triangles","36"]]},
    "gbs_knif.kmy": {description:"Gurlukovich soldier knife geometry from the independently checked rigid cohort.", metrics:[["Vertices","68"],["Triangles","44"]]}
  };
  const gogEntries = [
    ...gogQualifiedRows.map(([name,parts]) => {
      const highlight = highlightedGog[name];
      return {name,status:"Qualified · rigid geometry",kind:"rigid",description:highlight?.description ?? "This record is part of the 45-entry GOG PC rigid-geometry qualification cohort. The public card contains index metadata; its canvas shows only generated teaching geometry.",metrics:[["Parts",String(parts)],...(highlight?.metrics ?? [])]};
    }),
    ...gogAlternateRows.map(([name,parts]) => ({name,status:"Alternate layout · separate gate",kind:"structure",description:"This record is one of the 12 alternate-layout entries. It is not counted among the qualified rigid specimens; the canvas shows generated teaching geometry only.",metrics:[["Parts",String(parts)],["State","Separate layout gate"],["Preview","Synthetic only"]]}))
  ];

  const catalogs = {
    gog: {
      kicker: "GOG PC / RETAIL",
      title: "57-entry KMY index",
      summary: "The current GOG index lists all 57 catalog entries: 45 rigid-geometry qualifications and 12 alternate layouts. Browse names and part counts; source models and textures are not included.",
      stats: [["57", "indexed records"], ["45", "qualified rigid geometry"], ["12", "alternate layouts"]],
      boundary: "GOG findings are bound to the GOG PC archive. Qualified means the geometry-only gates passed; this public page shares index metadata and generated teaching proxies, not extracted model bytes, textures, materials, animation, or native appearance.",
      entries: gogEntries
    },
    ps2: {
      kicker: "PS2 / EDITION-SPECIFIC",
      title: "Separate target, separate proof",
      summary: "The current public evidence does not include a qualified standalone PS2 model catalog. This room keeps the target boundary visible instead of borrowing GOG or trial models.",
      stats: [["PS2", "separate target"], ["0", "PS2 meshes bundled"], ["Local", "your own file stays here"]],
      boundary: "PS2 and trial releases are not interchangeable. The viewer can inspect a static GLTF/GLB you already have, but the catalog does not identify that file as a PS2 asset.",
      entries: [
        {name:"PS2 model catalog", status:"No public specimen yet", kind:"structure", description:"No independently qualified PS2 mesh specimen is represented in this public catalog. This synthetic view is an edition-separation teaching proxy, not a model recovered from the game.", metrics:[["Edition","PS2"],["Source mesh","None bundled"],["State","Evidence kept separate"]]},
        {name:"KMS / EVM format leads", status:"Reference only", kind:"rigid", description:"Community format tools are useful research leads. They do not establish that a model belongs to a specific PS2 build or prove native rendering.", metrics:[["Role","Format context"],["Verification","Target-specific"],["Assets","Not included"]]}
      ]
    },
    trials: {
      kicker: "TRIAL RELEASES / STATIC MODELS",
      title: "Four offline model records",
      summary: "The local trial browser reports static views for Snake, Olga, Diving Snake, and a guard. This page publishes only their record names and geometry counts.",
      stats: [["4", "curated static records"], ["21", "parts in each report"], ["Static", "animation not reproduced"]],
      boundary: "The offline preview uses extracted trial resources. This public exhibit contains no source meshes or textures. Native animation, game lighting, and full actor assembly remain unverified.",
      entries: [
        {name:"Snake · sna_def.kms", status:"Static preview reported", kind:"character", description:"The local preview report records a visually checked static Snake render. This public proxy is generated teaching geometry, not that render.", metrics:[["Parts","21"],["Vertices","3,180"],["Triangles","1,808"],["Primary textures","21 / 21"]]},
        {name:"Olga · org_def_sh_mt.kms", status:"Static preview reported", kind:"character", description:"The local report records a recognizable static Olga body. It does not establish a complete assembled gameplay actor.", metrics:[["Parts","21"],["Vertices","7,524"],["Triangles","2,676"],["Primary textures","13 / 13"]]},
        {name:"Diving Snake · sna_dive_sh_mt.kms", status:"Geometry and textures loaded", kind:"character", description:"The offline report records the diving variant geometry and its primary texture previews loading. The public site shows counts only.", metrics:[["Parts","21"],["Vertices","7,350"],["Triangles","2,756"],["Primary textures","33 / 33"]]},
        {name:"Guard · gbs_def.kms", status:"Static preview reported", kind:"character", description:"The local report records a visually recognized guard model in a static pose.", metrics:[["Parts","21"],["Vertices","2,418"],["Triangles","1,462"],["Primary textures","19 / 19"]]}
      ]
    },
    skate: {
      kicker: "SKATE MODE / SEPARATE PS2 TARGET",
      title: "Archive records, no mesh claim",
      summary: "The skate mode has a BNDR archive with 115 named records. The current catalog evidence establishes an asset-index route, not a public model preview set.",
      stats: [["115", "named BNDR records"], ["0", "game meshes bundled"], ["Synthetic", "board teaching proxy"]],
      boundary: "The board shown here is newly generated teaching geometry. It is not extracted from MGS2, and this page is not a playable recreation of the skate mode.",
      entries: [
        {name:"BNDR archive index", status:"115 named records · inventory", kind:"skate", description:"The preserved index supports deterministic member extraction from the separate skate target. Individual records are not claimed as previewable models by this catalog.", metrics:[["Records","115"],["Mesh catalog","Not established"],["Game data","Not included"]]},
        {name:"Original movement study", status:"Behavior evidence · separate", kind:"skate", description:"A bounded original movement mechanism has been observed in controlled trials. The full movement model and original game content remain incomplete.", metrics:[["Scope","Bounded samples"],["Prototype","Independent"],["Full parity","Unknown"]]}
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

  function el(id) { return document.getElementById(id); }
  function setText(id, value) { el(id).textContent = value; }

  function addTriangle(target, points, color) {
    target.push({points: points, color: color % palette.length});
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
    const matched = cat.entries.map((entry,index)=>({entry,index})).filter(({entry}) =>
      (entry.name+" "+entry.status+" "+entry.description).toLowerCase().includes(term)
    );
    setText("catalog-count", matched.length + (matched.length === 1 ? " record" : " records"));
    if (!matched.length) {
      const empty = document.createElement("p");
      empty.className = "empty-results";
      empty.textContent = "No entries match that filter.";
      list.append(empty);
      return;
    }
    for (const {entry,index} of matched) {
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
      description.textContent = entry.metrics.map((metric)=>metric[0]+": "+metric[1]).join(" · ");
      button.append(name,state,description);
      button.addEventListener("click",()=>selectEntry(index));
      list.append(button);
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
    currentEntry = null;
    renderEntries();
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
      context.moveTo(tri.points[0][0],tri.points[0][1]);
      context.lineTo(tri.points[1][0],tri.points[1][1]);
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
        if(mode===4) for(let i=0;i+2<indices.length;i+=3) triplets.push([indices[i],indices[i+1],indices[i+2]]);
        else if(mode===5) for(let i=2;i<indices.length;i++) triplets.push(i%2 ? [indices[i-1],indices[i-2],indices[i]] : [indices[i-2],indices[i-1],indices[i]]);
        else if(mode===6) for(let i=2;i<indices.length;i++) triplets.push([indices[0],indices[i-1],indices[i]]);
        else continue;
        for(const indexTriplet of triplets) {
          if(output.length>=50000) throw new Error("This preview is limited to 50,000 triangles for responsive browser use.");
          const points=indexTriplet.map((index)=>{
            if(!positions[index]) throw new Error("A primitive references a missing vertex.");
            return transformPoint(world,positions[index]);
          });
          addTriangle(output,points,primitiveColor++);
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
    if(!output.length) throw new Error("No static triangle, strip, or fan geometry was found in the scene.");
    return {triangles:output,name:sceneFile.name};
  }

  fileInput.addEventListener("change",async()=>{
    try {
      setStatus("Reading selected files locally…",false);
      const result=await parseLocalModel(fileInput.files);
      setGeometry(result.triangles,true,result.name);
      setText("viewer-label","LOCAL FILE / GEOMETRY ONLY");
      setText("specimen-name",result.name);
      setText("specimen-state","LOCAL STATIC MESH");
      setStatus("Loaded "+result.name+": "+result.triangles.length.toLocaleString()+" triangles. Files stay in this browser tab; textures, skinning, and animation are not loaded.",false);
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

  search.addEventListener("input",renderEntries);
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
  animationFrame();
})();
