/* Original public teaching exhibits. No game assets, native clips or telemetry. */
"use strict";

const $ = (id) => document.getElementById(id);
const articles = [
  {id:"rig",number:"001",category:"MODELS & MOTION",title:"What does a rig actually know?",description:"A handful of joints can tell a surprisingly big story.",body:`<p>A model is a collection of surfaces. A rig is a collection of relationships: this hand belongs to this forearm, which belongs to this upper arm. Move a parent, and the children follow.</p><h3>Try it on the motion table</h3><p>Drag to turn the original teaching rig. Scrub its pose, hide the shell, or tap a joint. The motion is authored for this exhibit; it is not extracted from MGS2.</p><div class="note-callout">A hierarchy is not a complete character. Rest transforms, skin influences, materials, attachments and motion binding each need their own evidence.</div><p>Our current GOG specimen has 21 rotation channels and 22 model-part transforms. The extra part copies another part's transform. That is a version-specific finding, not a rule we apply to every model.</p><h3>From rig to export</h3><p>The partial body has been exported and imported into Blender with sampled poses. That proves a useful authoring path for the admitted subset. It does not prove that an active game character uses the same layers, timing or rendering state.</p>`},
  {id:"bits",number:"002",category:"SMALL NUMBERS, BIG CLUES",title:"How can twelve bits be negative?",description:"Meet two's complement. Flip the first bit and find out.",body:`<p>Twelve bits can represent 4,096 different patterns. An unsigned reading gives values from 0 to 4,095. A signed two's-complement reading uses the same patterns for −2,048 through 2,047.</p><div class="note-callout">If raw ≥ 2,048, signed = raw − 4,096.<br>Otherwise, signed = raw.</div><p>The leftmost bit marks the negative half of the range. The pattern FE4 in hexadecimal is 4,068 unsigned. Subtract 4,096 and you get −28.</p><h3>A format still has to tell you what to do</h3><p>Knowing the number representation is only the beginning. A real decoder must identify bit order, field boundaries, signedness, scale and state transitions for the exact target. A plausible value is a clue, not a validation.</p><p>Our bit workbench uses synthetic examples and needs no game files. Make a target value, flip the sign bit, and watch the arithmetic change.</p>`},
  {id:"archive",number:"003",category:"ARCHIVES & RELATIONSHIPS",title:"From an archive to an actor",description:"Finding a file is the beginning of the trail.",body:`<p>An archive is a container. A useful extractor identifies each member's name, exact extent and source identity, then accounts for what remains. It must reject damaged boundaries instead of making a convincing guess.</p><p>The GOG research inventory covers 328 loose DAR archives and 49,677 members. Other containers and internal layouts have their own coverage boundaries.</p><h3>The interesting question is what belongs together</h3><p>A model can refer to a material identifier. A material can refer to a page in a texture container. A script can request a resource inside a particular stage. The same name or identifier may appear in several contexts.</p><div class="note-callout">Keep the chain: edition → container → member → identity → relationship → supported interpretation.</div><p>This is why a searchable research laboratory is more useful than a giant folder of exports. It should explain both the relationship and what remains uncertain.</p>`},
  {id:"motion",number:"004",category:"ANIMATION ARCHEOLOGY",title:"The frame after the first frame",description:"An initial pose can hide the hardest part of an animation.",body:`<p>Our earlier conditional pose began exactly at a key endpoint. It was a real numerical result, but it could not tell us whether the decoder correctly advances into later keys.</p><h3>The next state matters</h3><p>The newer sampler follows the native-derived order: evaluate the pose, then advance clocks. A key changes only when the clock is strictly greater than its duration. At equality, it stays on the endpoint.</p><p>Across 16 samples, 21 rotation channels now pass an independent comparison. Those samples include 71 decoded transitions and 265 evaluations inside key intervals.</p><div class="note-callout">Sampled offline motion ≠ observed original-game behavior.<br>Actual actor layers, loop/reset behavior, timing and backend state remain separate questions.</div><p>The public teaching rig illustrates motion relationships with its own authored movement. It does not replay those GOG samples.</p>`},
  {id:"editions",number:"005",category:"THE VERSION MATTERS",title:"Same game. Different ground.",description:"Why a PS2 extension doesn't prove GOG compatibility.",body:`<p>Original Windows PC, PS2, trial releases and Master Collection are related targets, but their file layouts, executable addresses and runtime behavior can differ.</p><p>Community model, motion and script tools have solved important problems. Their supported edition, exact implementation, license and limitations determine how they can help a particular investigation.</p><h3>Reuse the discovery, check the assumption</h3><p>A shared extension is a useful lead. It is not proof that offsets, packed controls, skin weights or texture layout match. A successful import also does not establish faithful animation or rendering.</p><div class="note-callout">The public GOG exhibit is active. Dedicated PS2, Trials and Skateboarding rooms are coming soon. Their preserved research remains separate.</div><p>The community credits and qualified findings are collected in the research notes linked from the evidence section.</p>`},
  {id:"future",number:"006",category:"BUILDING A STUDIO",title:"What could we make with this?",description:"Codec conversations, director tools and a very practical next step.",body:`<p>Understanding a game's assets can support new authoring tools. It does not require promising a complete replacement engine before anything useful can be made.</p><h3>Codec Studio</h3><p>An independent conversation tool can start with original portraits and performances: editable dialogue, recording, subtitles, expressions, project persistence and synchronized video export. That full production loop remains to be implemented here.</p><h3>Director tools</h3><p>A validated partial rig export is an early foundation. Complete characters, reliable motion, multiple actors, cameras and timelines are further milestones. Actual control inside the original game requires additional native evidence.</p><div class="note-callout">Useful tools earn their next feature through reproducible results. The ambition is big; the evidence stays specific.</div><p>This museum is the public front door. The private workbench preserves source and research context, while protected game data stays local.</p>`}
];

let stamps = {};
try { stamps = JSON.parse(localStorage.getItem("mgs2-arch-fieldpass-v1") || "{}"); } catch (_) { stamps = {}; }
if (!stamps || typeof stamps !== "object" || Array.isArray(stamps)) stamps = {};
let toastTimer;
function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 3200);
}
function refreshPass() { $("pass-count").textContent = `${["turn","decode","note"].filter(k => stamps[k] === true).length}/3`; }
function stamp(name) {
  if (stamps[name] === true) return;
  stamps[name] = true;
  try { localStorage.setItem("mgs2-arch-fieldpass-v1", JSON.stringify(stamps)); } catch (_) {}
  refreshPass();
  toast("Field stamp collected. Your curiosity is showing.");
}
refreshPass();

const reader = $("reader");
let readerTrigger = null;
function showReader(category, html) {
  readerTrigger = document.activeElement;
  $("reader-category").textContent = category;
  $("reader-body").innerHTML = html;
  if (!reader.open) reader.showModal();
  reader.scrollTop = 0;
}
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;
  showReader(`FIELD NOTE ${article.number} / ${article.category}`, `<h2 id="reader-title">${article.title}</h2>${article.body}`);
  stamp("note");
}
document.querySelectorAll("[data-article]").forEach(button => button.addEventListener("click", () => openArticle(button.dataset.article)));
$("close-reader").addEventListener("click", () => reader.close());
reader.addEventListener("click", event => { if (event.target === reader) { const r = reader.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) reader.close(); } });
reader.addEventListener("close", () => { if (readerTrigger?.isConnected) readerTrigger.focus({preventScroll:true}); });
$("passport-button").addEventListener("click", () => {
  const tasks = [["turn","↔","TURN A RIG","Drag or use its arrow keys"],["decode","01","CRACK A VALUE","Complete a bit challenge"],["note","↗","FOLLOW A CLUE","Read a field note"]];
  showReader("VISITOR FIELD PASS / SAVED IN THIS BROWSER", `<h2 id="reader-title">A little proof of curiosity.</h2><p>Collect a stamp for getting hands-on. Your pass stays in this browser; no account or tracking service is involved.</p><div class="pass-stamps">${tasks.map(([id,icon,title,description]) => `<div class="pass-stamp ${stamps[id] === true ? "collected" : ""}"><b>${icon}</b><strong>${title}</strong><span>${stamps[id] === true ? "STAMP COLLECTED" : description}</span></div>`).join("")}</div><p>Three tiny adventures. One considerably more interesting way to learn.</p>`);
});
function renderGuide() {
  const q = $("guide-search").value.trim().toLocaleLowerCase();
  const found = articles.filter(a => `${a.title} ${a.category} ${a.description} ${a.body.replace(/<[^>]*>/g," ")}`.toLocaleLowerCase().includes(q));
  $("guide-list").replaceChildren(...found.map(article => {
    const button = document.createElement("button");
    button.className = "guide-row";
    button.innerHTML = `<span class="note-number">${article.number}</span><span><span class="note-title">${article.title}</span><span class="note-description">${article.description}</span></span><span class="note-category">${article.category}</span><span class="note-arrow" aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => openArticle(article.id));
    return button;
  }));
  $("empty-search").hidden = found.length !== 0;
}
$("guide-search").addEventListener("input", renderGuide);
document.addEventListener("keydown", event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("guide-search").focus(); } });
renderGuide();

const editions = {
  gog:{disc:"PC",label:"ORIGINAL PC / GOG LINEAGE",eyebrow:"THE ORIGINAL WINDOWS PC RELEASE",title:"The active excavation.",description:"Browse the rigid KMY specimens qualified from the GOG archive. Alternate layouts and the preserved failure receipts remain separate.",facts:[["45","rigid specimens qualified"],["12","alternate layouts kept separate"],["0","supported entries unexamined"]],boundary:"The public preview contains metadata and synthetic teaching geometry. Native materials, animation, and appearance are not established.",link:"Browse the model catalog"},
  ps2:{disc:"PS2",label:"SEPARATE EDITIONS / SEPARATE EVIDENCE",eyebrow:"ROOM 02 / TARGETS KEPT APART",title:"The console excavation.",description:"PS2 research has its own executable and archive identities. This catalog does not borrow GOG or trial meshes as stand-ins for PS2 evidence.",facts:[["PS2","edition-specific evidence"],["Separate","target identities preserved"],["Local","bring-your-own preview"]],boundary:"No extracted PS2 geometry is hosted here. Load a model you already have to inspect its static geometry in your browser.",link:"Browse the model catalog"},
  trials:{disc:"TRIAL",label:"SMALL RELEASES / BIG QUESTIONS",eyebrow:"ROOM 03 / TRIAL MODEL NOTES",title:"Four static character studies.",description:"The offline trial viewer reports static renders for Snake, Olga, Diving Snake, and a guard. This public catalog lists their checked counts without distributing meshes or textures.",facts:[["4","curated static model records"],["21","parts in each reported figure"],["Static","native animation unverified"]],boundary:"These are trial findings; they do not establish retail GOG compatibility or native animation/material fidelity.",link:"Browse the model catalog"},
  skate:{disc:"SK8",label:"SIDE QUEST / SEPARATE PS2 TARGET",eyebrow:"ROOM 04 / SKATE ARCHIVE NOTES",title:"The skateboarding dig.",description:"The separate skate executable has a BNDR archive with 115 named records. No recovered model preview is claimed in this public catalog yet.",facts:[["115","named BNDR records"],["0","game meshes hosted here"],["Synthetic","board teaching proxy"]],boundary:"The board in the viewer is original procedural teaching geometry, not an extracted MGS2 asset or a playable port.",link:"Browse the model catalog"},
  document:{disc:"DOC",label:"DOCUMENT / USA / SLUS-20543",eyebrow:"ROOM 05 / THE MAKING-OF DISC",title:"A document of its own.",description:"Eleven model specimens and eleven storyboard sheets now extend this PS2 branch. Compare shared positions, Campbell's additional cap triangles, and authored interaction notes against the existing digs.",facts:[["11","model specimens, including one effect"],["11","storyboard sheets decoded"],["9","GOG position-multiset matches"]],boundary:"Document keeps its own disc, executable and archive identities: 442 + 14 stage-table entries. Static matches and authored storyboard notes do not establish complete actors or native behavior.",link:"Explore the Document room",href:"document.html"}
};
const tabs = [...document.querySelectorAll("[data-edition]")];
function selectEdition(name, focus = false) {
  const data = editions[name];
  tabs.forEach(tab => { const selected = tab.dataset.edition === name; tab.setAttribute("aria-selected", String(selected)); tab.tabIndex = selected ? 0 : -1; if (focus && selected) tab.focus(); });
  $("edition-panel").setAttribute("aria-labelledby", `tab-${name}`);
  $("edition-eyebrow").textContent = data.eyebrow;
  $("edition-title").textContent = data.title;
  $("edition-description").textContent = data.description;
  $("edition-facts").innerHTML = data.facts.map(([value,description]) => `<span><b>${value}</b>${description}</span>`).join("");
  $("edition-boundary").replaceChildren(Object.assign(document.createElement("span"),{textContent:"↳"}),document.createTextNode(` ${data.boundary}`));
  document.querySelector(".archive-disc>span").innerHTML = `MGS2<br><b>${data.disc}</b>`;
  document.querySelector(".graphic-coordinate").textContent = data.label;
  $("edition-link").innerHTML = `${data.link} <span aria-hidden="true">↗</span>`;
  $("edition-link").href = data.href || "catalog.html?edition=" + encodeURIComponent(name);
}
tabs.forEach((tab,index) => {
  tab.addEventListener("click", () => selectEdition(tab.dataset.edition));
  tab.addEventListener("keydown", event => {
    let next;
    if (event.key === "ArrowRight") next = (index+1)%tabs.length;
    if (event.key === "ArrowLeft") next = (index+tabs.length-1)%tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length-1;
    if (next !== undefined) { event.preventDefault(); selectEdition(tabs[next].dataset.edition,true); }
  });
});

let packedValue = 60;
const targets = [-28,60,2045,-1024,17];
let targetIndex = 0;
function signed(raw) { return raw & 2048 ? raw-4096 : raw; }
const bitButtons = [];
for (let bit = 11; bit >= 0; bit--) {
  const button = document.createElement("button");
  button.type = "button";
  button.addEventListener("click", () => { packedValue ^= 1<<bit; renderBits(true); });
  $("bit-buttons").append(button);
  bitButtons.push([button,bit]);
}
function renderBits(interacted = false) {
  const value = signed(packedValue);
  bitButtons.forEach(([button,bit]) => { const set = Boolean(packedValue & (1<<bit)); button.textContent = set ? "1" : "0"; button.setAttribute("aria-pressed",String(set)); button.setAttribute("aria-label",`Bit ${bit}${bit===11?", sign bit":""}: ${set?1:0}. Toggle bit.`); });
  $("hex-value").textContent = `0x${packedValue.toString(16).toUpperCase().padStart(3,"0")}`;
  $("signed-value").textContent = value < 0 ? `−${-value}` : String(value);
  $("bit-output").textContent = String(value);
  $("bit-value").value = value;
  $("bit-formula").textContent = packedValue & 2048 ? `Sign bit is set. ${packedValue} − 4,096 = ${value}.` : `Sign bit is clear. The value is ${value}.`;
  const solved = value === targets[targetIndex];
  $("challenge-feedback").textContent = solved ? "Decoded. One small number, one excellent discovery." : "Try the bits, or scrub the value below.";
  if (solved && interacted) stamp("decode");
}
$("bit-value").addEventListener("input", event => { packedValue = Number(event.target.value)&4095; renderBits(true); });
$("new-challenge").addEventListener("click", () => { targetIndex = (targetIndex+1)%targets.length; $("challenge-target").textContent = String(targets[targetIndex]).replace("-","−"); renderBits(); });
renderBits();

// An original small rig, authored for this page. No MGS2 geometry or keyframes.
const canvas = $("rig-canvas");
const ctx = canvas.getContext("2d");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
let phase = 0, yaw = -.45, selectedJoint = -1, playing = !reduced.matches;
let dirty = true, lastTime = 0, width = 1, height = 1, projected = [];
const jointNames = ["HIP","SPINE","NECK","HEAD","LEFT SHOULDER","LEFT ELBOW","LEFT HAND","RIGHT SHOULDER","RIGHT ELBOW","RIGHT HAND","LEFT HIP","LEFT KNEE","LEFT FOOT","RIGHT HIP","RIGHT KNEE","RIGHT FOOT"];
const edges = [[0,1],[1,2],[2,3],[2,4],[4,5],[5,6],[2,7],[7,8],[8,9],[0,10],[10,11],[11,12],[0,13],[13,14],[14,15]];
function syncMotion() { $("play-motion").textContent = playing ? "Ⅱ" : "▶"; $("play-motion").setAttribute("aria-label",playing ? "Pause teaching animation" : "Play teaching animation"); $("motion-time").value = Math.round(phase*100); $("motion-output").textContent = String(Math.round(phase*100)).padStart(2,"0"); }
function rigPoints(p) {
  const t=p*Math.PI*2, breathe=.025*Math.sin(t), sway=.045*Math.sin(t);
  const points=[[sway,1.45,0],[sway,1.98+breathe,0],[sway,2.42+breathe,0],[sway,2.82+breathe,0],[-.52+sway,2.32+breathe,0],[],[],[.52+sway,2.32+breathe,0],[],[],[-.29+sway,1.4,0],[],[],[.29+sway,1.4,0],[],[]];
  const a=-.65+.65*Math.sin(t), b=-.9+.5*Math.sin(t+.7), c=.42+.3*Math.sin(t+2);
  points[5]=[points[4][0]+.65*Math.sin(a),points[4][1]-.65*Math.cos(a),.08];
  points[6]=[points[5][0]+.59*Math.sin(b),points[5][1]-.59*Math.cos(b),.12+.14*Math.sin(t)];
  points[8]=[points[7][0]+.64*Math.sin(c),points[7][1]-.64*Math.cos(c),-.08];
  points[9]=[points[8][0]+.52*Math.sin(.5+c),points[8][1]-.52*Math.cos(.5+c),.06];
  points[11]=[points[10][0]-.035,.72,.12+.13*Math.sin(t)];points[12]=[points[10][0]-.06,.07,.28+.15*Math.sin(t)];
  points[14]=[points[13][0]+.035,.72,.12-.13*Math.sin(t)];points[15]=[points[13][0]+.06,.07,.28-.15*Math.sin(t)];
  return points;
}
function project(v) {
  const x=v[0]*Math.cos(yaw)+v[2]*Math.sin(yaw), z=-v[0]*Math.sin(yaw)+v[2]*Math.cos(yaw), y=v[1]-1.48;
  const tilt=.11, py=y*Math.cos(tilt)-z*Math.sin(tilt), depth=y*Math.sin(tilt)+z*Math.cos(tilt);
  const scale=Math.min(width*.28,height*.265), perspective=1/(1+depth*.07);
  return {x:width*.5+x*scale*perspective,y:height*.51-py*scale*perspective,depth};
}
function path(points,close=false) { ctx.beginPath(); points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));if(close)ctx.closePath(); }
function box(center,size,fill) {
  const vertices=[];for(let z=-1;z<=1;z+=2)for(let y=-1;y<=1;y+=2)for(let x=-1;x<=1;x+=2)vertices.push(project([center[0]+x*size[0]/2,center[1]+y*size[1]/2,center[2]+z*size[2]/2]));
  const faces=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]];
  faces.sort((a,b)=>b.reduce((n,i)=>n+vertices[i].depth,0)-a.reduce((n,i)=>n+vertices[i].depth,0));
  for(const face of faces){path(face.map(i=>vertices[i]),true);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle="#546c52";ctx.lineWidth=.8;ctx.stroke();}
}
function draw() {
  if (!ctx) return;
  ctx.clearRect(0,0,width,height);
  ctx.strokeStyle="#62755544";ctx.lineWidth=.7;
  for(let n=-4;n<=4;n++){path([project([n*.4,0,-1.4]),project([n*.4,0,1.4])]);ctx.stroke();path([project([-1.6,0,n*.35]),project([1.6,0,n*.35])]);ctx.stroke();}
  const center=project([0,0,0]);ctx.beginPath();ctx.ellipse(center.x,center.y,width*.18,8,0,0,Math.PI*2);ctx.fillStyle="#61725312";ctx.fill();
  const points=rigPoints(phase);projected=points.map(project);
  if($("show-shell").checked){
    box([points[1][0],1.96,0],[.87,.83,.36],"#f3f3dfb3");box([points[0][0],1.45,0],[.67,.3,.4],"#c0cfac88");
    for(const [a,b]of edges.filter(([,b])=>![1,2,3,4,7,10,13].includes(b))){const p=projected[a],q=projected[b],dx=q.x-p.x,dy=q.y-p.y,len=Math.hypot(dx,dy)||1,thickness=b===6||b===9?5:7,nx=-dy/len*thickness,ny=dx/len*thickness;path([{x:p.x+nx,y:p.y+ny},{x:q.x+nx*.68,y:q.y+ny*.68},{x:q.x-nx*.68,y:q.y-ny*.68},{x:p.x-nx,y:p.y-ny}],true);ctx.fillStyle="#d8e1c0b0";ctx.fill();ctx.strokeStyle="#6d815c";ctx.lineWidth=.7;ctx.stroke();}
    box([points[3][0],points[3][1]+.04,0],[.45,.48,.4],"#eeeacfbb");
    const eyeA=project([points[3][0]-.1,points[3][1]+.08,.21]),eyeB=project([points[3][0]+.1,points[3][1]+.08,.21]);path([eyeA,eyeB]);ctx.strokeStyle="#db542d";ctx.lineWidth=3;ctx.stroke();
  }
  ctx.strokeStyle="#355440";ctx.lineWidth=1.5;
  for(const[a,b]of edges){path([projected[a],projected[b]]);ctx.stroke();}
  if($("show-joints").checked)projected.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,i===selectedJoint?6.5:3,0,Math.PI*2);ctx.fillStyle=i===selectedJoint?"#db542d":"#f4f3dc";ctx.fill();ctx.strokeStyle=i===selectedJoint?"#db542d":"#355440";ctx.lineWidth=1.2;ctx.stroke();});
  const tag=projected[selectedJoint>=0?selectedJoint:5];
  ctx.strokeStyle="#db542d";ctx.lineWidth=.8;ctx.setLineDash([3,3]);path([tag,{x:Math.min(width-56,tag.x+48),y:tag.y-25}]);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#a6472e";ctx.font="9px ui-monospace,monospace";ctx.fillText(String(selectedJoint>=0?selectedJoint:5).padStart(2,"0"),Math.min(width-50,tag.x+53),tag.y-26);
  dirty=false;
}
function resize() {const r=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);dirty=true;}
new ResizeObserver(resize).observe(canvas);
let drag=null;
function selectJoint(index){selectedJoint=index;$("joint-label").textContent=`${String(index).padStart(2,"0")} / ${jointNames[index]}`;dirty=true;}
canvas.addEventListener("pointerdown",event=>{drag={x:event.clientX,y:event.clientY,lastX:event.clientX,moved:false};canvas.setPointerCapture(event.pointerId);});
canvas.addEventListener("pointermove",event=>{if(!drag)return;if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6)drag.moved=true;if(drag.moved){yaw+=(event.clientX-drag.lastX)*.012;dirty=true;$("orbit-hint").textContent="↔ keep looking around";}drag.lastX=event.clientX;});
canvas.addEventListener("pointerup",event=>{if(!drag)return;if(drag.moved)stamp("turn");else{const r=canvas.getBoundingClientRect(),x=event.clientX-r.left,y=event.clientY-r.top;let nearest=-1,distance=22;projected.forEach((p,i)=>{const d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;nearest=i;}});if(nearest>=0)selectJoint(nearest);}drag=null;});
canvas.addEventListener("pointercancel",()=>{drag=null;});
canvas.addEventListener("keydown",event=>{if(event.key==="ArrowLeft"||event.key==="ArrowRight"){event.preventDefault();yaw+=event.key==="ArrowLeft"?-.16:.16;dirty=true;stamp("turn");}if(event.key==="ArrowUp"||event.key==="ArrowDown"){event.preventDefault();const next=selectedJoint<0?(event.key==="ArrowUp"?jointNames.length-1:0):(selectedJoint+(event.key==="ArrowUp"?-1:1)+jointNames.length)%jointNames.length;selectJoint(next);}if(event.code==="Space"){event.preventDefault();playing=!playing;syncMotion();}});
$("play-motion").addEventListener("click",()=>{playing=!playing;syncMotion();});
$("motion-time").addEventListener("input",event=>{phase=Number(event.target.value)/100;playing=false;dirty=true;syncMotion();});
$("reset-rig").addEventListener("click",()=>{phase=0;yaw=-.45;selectedJoint=-1;playing=false;$("joint-label").textContent="SELECT A JOINT";$("show-shell").checked=true;$("show-joints").checked=true;dirty=true;syncMotion();});
for(const id of["show-shell","show-joints"])$(id).addEventListener("change",()=>{dirty=true;});
reduced.addEventListener("change",()=>{if(reduced.matches){playing=false;syncMotion();}});
function animate(now){const dt=Math.min(50,now-(lastTime||now));lastTime=now;if(playing&&!document.hidden){phase=(phase+dt*.00008)%1;dirty=true;syncMotion();}if(dirty)draw();requestAnimationFrame(animate);}
syncMotion();requestAnimationFrame(animate);
