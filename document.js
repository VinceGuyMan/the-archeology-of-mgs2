/* Metadata filters and local PNG inspection. No archive access or uploads. */
(() => {
  "use strict";
  const controls = document.getElementById("document-filters");
  const kind = document.getElementById("document-filter");
  const search = document.getElementById("document-record-search");
  const count = document.getElementById("document-record-count");
  if (!controls || !kind || !search || !count) return;
  const records = Array.from(document.querySelectorAll("[data-specimen-kind]"));
  const groups = Array.from(document.querySelectorAll("[data-specimen-group]"));
  function filterRecords() {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const record of records) {
      record.hidden = (kind.value !== "all" && record.dataset.specimenKind !== kind.value) || !record.textContent.toLocaleLowerCase().includes(term);
      if (!record.hidden) visible++;
    }
    for (const group of groups) group.hidden = !Array.from(group.querySelectorAll("[data-specimen-kind]")).some(record => !record.hidden);
    count.textContent = visible + " of " + records.length + " specimens";
    document.getElementById("document-empty").hidden = visible !== 0;
  }
  kind.addEventListener("change", filterRecords);
  search.addEventListener("input", filterRecords);
  controls.hidden = false;
  filterRecords();
})();

/* Full source-container metadata, paginated to keep the document responsive. */
(() => {
  "use strict";
  const results = document.getElementById("texture-corpus-results");
  if (!results) return;
  const search = document.getElementById("texture-corpus-search");
  const format = document.getElementById("texture-corpus-format");
  const match = document.getElementById("texture-corpus-match");
  const count = document.getElementById("texture-corpus-count");
  const previous = document.getElementById("texture-corpus-prev");
  const next = document.getElementById("texture-corpus-next");
  const pageStatus = document.getElementById("texture-corpus-page");
  const pageSize = () => window.matchMedia("(max-width: 600px)").matches ? 10 : 40;
  let size = pageSize();
  let records = [];
  let page = 0;
  window.addEventListener("resize",()=>{
    const nextSize=pageSize();
    if(nextSize!==size) {
      const first=page*size;
      size=nextSize;
      page=Math.floor(first/size);
      if(records.length) render();
    }
  });

  function text(tag,value,className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function render() {
    const term = search.value.trim().toLowerCase();
    const matched = records.filter(row => {
      const layouts = format.value === "all" || (format.value === "psmt4" && row.psmt4 > 0) ||
        (format.value === "psmt8" && row.psmt8 > 0) || (format.value === "mixed" && row.psmt4 > 0 && row.psmt8 > 0);
      const comparisons = match.value === "all" || (match.value === "gog" && row.matches.gog_exact_rgb > 0) ||
        (match.value === "trial" && row.matches.trial_exact_rgb > 0) ||
        (match.value === "neither" && !row.matches.gog_exact_rgb && !row.matches.trial_exact_rgb);
      return layouts && comparisons && row.searchText.includes(term);
    });
    page = Math.max(0,Math.min(page,Math.ceil(matched.length/size)-1));
    const start = page*size;
    results.replaceChildren();
    count.textContent = matched.length.toLocaleString()+" of "+records.length.toLocaleString()+" source containers · "+matched.reduce((sum,row)=>sum+row.entries,0).toLocaleString()+" source entries in this filter";
    pageStatus.textContent = matched.length ? (start+1)+"–"+Math.min(start+size,matched.length)+" of "+matched.length.toLocaleString() : "0 matching containers";
    previous.disabled = page === 0;
    next.disabled = start+size >= matched.length;
    if (!matched.length) {
      const row = document.createElement("tr");
      const cell = text("td","No source containers match. Change a filter or use Reset filters.");
      cell.colSpan = 3;
      row.append(cell);
      results.append(row);
      return;
    }
    for (const source of matched.slice(start,start+size)) {
      const row = document.createElement("tr");
      row.dataset.sourceSha256 = source.sha256;
      const identity = document.createElement("td");
      const location = source.locations[0];
      identity.append(text("strong",location[1]+" / "+location[2]),text("code",source.sha256.slice(0,16)+"…"),
                      text("span",source.occurrences.toLocaleString()+" occurrence"+(source.occurrences === 1 ? "" : "s")+" · "+source.bytes.toLocaleString()+" source bytes"));
      const details = document.createElement("details");
      details.append(text("summary","All locations and comparison counts"));
      const {searchText,...safeRecord} = source;
      details.append(text("pre",JSON.stringify(safeRecord,null,2)));
      identity.append(details);
      const entries = document.createElement("td");
      entries.append(text("strong",source.decoded.toLocaleString()+" / "+source.entries.toLocaleString()),
                     text("span","PSMT4: "+source.psmt4.toLocaleString()),text("span","PSMT8: "+source.psmt8.toLocaleString()));
      if (source.source_alpha_scaling_unadmitted) entries.append(text("span","Source alpha scaling unadmitted: "+source.source_alpha_scaling_unadmitted,"texture-limit"));
      const comparison = document.createElement("td");
      comparison.append(text("span","GOG: "+source.matches.gog_exact_rgb.toLocaleString()+" exact RGB entries"),
                        text("span","Trial: "+source.matches.trial_exact_rgb.toLocaleString()+" exact RGB entries"));
      const local = text("a","Inspect your local PNG ↗");
      local.href = "#local-inspector";
      comparison.append(local);
      row.append(identity,entries,comparison);
      results.append(row);
    }
  }

  function renderAssemblyStudies(index) {
    const container = document.getElementById("assembly-study-records");
    const status = document.getElementById("assembly-study-status");
    const sharedLimits = document.getElementById("assembly-study-limits");
    container.replaceChildren();
    sharedLimits.hidden = true;
    sharedLimits.textContent = "";
    try {
      const studies = window.DocumentCorpus.assemblyStudies(index);
      if (!studies.length) {
        status.textContent = "No assembly studies are included in this metadata snapshot.";
        return;
      }
      for (const study of studies) {
        const article = document.createElement("article");
        article.dataset.assemblyId = study.id;
        article.append(text("p","SOURCE BUNDLE / ASSEMBLY EVIDENCE","eyebrow"),text("h4",study.title),
          text("p",study.assembly_status.replaceAll("_"," "),"assembly-state"));
        const facts = document.createElement("ul");
        facts.append(text("li",study.part_count.toLocaleString()+" source parts"),
          text("li",study.verified_variants.toLocaleString()+" verified local variant"+(study.verified_variants === 1 ? "" : "s")));
        article.append(facts,text("p",study.findings[0]),text("p","GOG: "+study.gog.summary),text("p","Trial: "+study.trial.summary));
        const details = document.createElement("details");
        const limits = document.createElement("ul");
        for (const limit of study.limitations) limits.append(text("li",limit));
        details.append(text("summary","Evidence and remaining limits"),limits,text("pre",JSON.stringify(study,null,2)));
        const link = text("a","Inspect this assembly study ↗");
        link.href = "catalog.html?edition=document&specimen="+encodeURIComponent(study.id);
        article.append(details,link);
        container.append(article);
      }
      status.textContent = studies.length+" source bundles studied · included in the existing model count";
      sharedLimits.textContent = index.assembly_studies.limits.join(" ");
      sharedLimits.hidden = false;
    } catch (error) {
      container.replaceChildren();
      status.textContent = "Assembly studies unavailable: "+(error.message || "metadata could not be checked");
      const retry = text("button","Retry assembly metadata","assembly-retry");
      retry.id = "assembly-study-retry";
      retry.type = "button";
      retry.addEventListener("click",()=>{window.DocumentCorpus.reset();load();});
      status.append(retry);
    }
  }

  async function load() {
    results.setAttribute("aria-busy","true");
    count.textContent = "Loading and checking the full texture metadata…";
    try {
      const data = await window.DocumentCorpus.load("textures");
      renderAssemblyStudies(data.index);
      records = data.records.map(row => ({...row,searchText:JSON.stringify(row).toLowerCase()}));
      document.getElementById("texture-corpus-controls").hidden = false;
      document.getElementById("texture-corpus-pagination").hidden = false;
      const rawStatuses = document.getElementById("raw-source-statuses");
      rawStatuses.replaceChildren();
      for (const raw of data.index.textures.raw_leads) {
        rawStatuses.append(text("li",raw.name_candidate_from_exact_gog_bytes+": "+raw.status));
      }
      const snake = data.index.highlights.find(row => row.key === "snake-experiment" || row.label === "Low-poly Snake look");
      if (snake) document.getElementById("low-poly-snake-link").href = "catalog.html?edition=document&specimen="+encodeURIComponent(snake.id);
      const geometry=data.index.geometry.summary;
      document.getElementById("supplemental-geometry-title").textContent=geometry.records.toLocaleString()+" supplemental geometry sources";
      const primitives=[geometry.points ? geometry.points.toLocaleString()+" source points" : "",geometry.line_segments ? geometry.line_segments.toLocaleString()+" line segments" : "",geometry.triangles ? geometry.triangles.toLocaleString()+" triangles" : ""].filter(Boolean);
      document.getElementById("supplemental-geometry-summary").textContent=primitives.join(" · ")+". Each family retains its own comparison metric. Point arrays do not establish surface topology; native pose, materials and complete-actor behavior remain unverified.";
      const families=document.getElementById("supplemental-geometry-families");
      families.replaceChildren();
      for (const [family,total] of Object.entries(geometry.families)) {
        const item=document.createElement("li");
        const link=text("a",family+": "+total.toLocaleString()+" source record"+(total===1 ? "" : "s"));
        link.href="catalog.html?edition=document&family="+encodeURIComponent(family);
        item.append(link);families.append(item);
      }
      const otherFamilies=document.getElementById("other-source-families");
      otherFamilies.replaceChildren();
      for (const family of data.index.other_families) {
        const article=document.createElement("article");
        article.append(text("p","SEPARATE SOURCE FAMILY / METADATA ONLY","eyebrow"),text("h3",family.family+" · "+family.records.length.toLocaleString()+" source records"));
        if (family.coverage.source_frames && Number.isFinite(family.coverage.unique_source_rgb_images)) article.append(text("p",family.coverage.source_frames.toLocaleString()+" decoded source frames · "+family.coverage.unique_source_rgb_images.toLocaleString()+" distinct RGB images. These counts are separate from type-19 containers and entries."));
        else if (family.family === "RPD" && family.coverage.source_frames) article.append(text("p",family.coverage.source_frames.toLocaleString()+" recorded controller frames decoded as data. No input replay or gameplay was executed."));
        const limits=family.limits || family.records[0].limits || family.records[0].limitations || [];
        article.append(text("p",limits[0] || "Source classification and complete typed correspondence remain separate from native playback."));
        const details=document.createElement("details");
        details.append(text("summary","All source records and evidence limits"),text("pre",JSON.stringify(family,null,2)));
        article.append(details);otherFamilies.append(article);
      }
      const rawLedger=data.index.raw_dispositions;
      const ledger=document.createElement("article");
      ledger.append(text("p","COMPLETE TYPE-17 SOURCE LEDGER","eyebrow"),text("h3",rawLedger.coverage.accounted_sources+" RAW sources classified"),
                    text("p","Every stored RAW payload has a source identity and an explicit role. Fonts, raster animation, icon models, controller recordings, reports and mesh dependencies retain separate evidence limits."));
      const ledgerDetails=document.createElement("details");
      ledgerDetails.append(text("summary","All source identities and classifications"),text("pre",JSON.stringify(rawLedger,null,2)));
      ledger.append(ledgerDetails);otherFamilies.append(ledger);
      render();
    } catch (error) {
      document.getElementById("assembly-study-records").replaceChildren();
      document.getElementById("assembly-study-limits").hidden = true;
      document.getElementById("assembly-study-status").textContent = "Assembly studies unavailable until the corpus metadata can be checked.";
      count.textContent = "Full texture index unavailable: "+(error.message || "metadata could not be loaded");
      results.replaceChildren();
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.append(text("p","The full corpus has not loaded. No partial list is presented as complete."));
      const retry = text("button","Retry texture metadata");
      retry.type = "button";
      retry.addEventListener("click",load);
      cell.append(retry);
      row.append(cell);
      results.append(row);
    } finally {
      results.setAttribute("aria-busy","false");
    }
  }

  search.addEventListener("input",()=>{page=0;render();});
  format.addEventListener("change",()=>{page=0;render();});
  match.addEventListener("change",()=>{page=0;render();});
  document.getElementById("texture-corpus-reset").addEventListener("click",()=>{
    search.value="";format.value="all";match.value="all";page=0;render();search.focus();
  });
  previous.addEventListener("click",()=>{page--;render();});
  next.addEventListener("click",()=>{page++;render();});
  load();
})();

(() => {
  "use strict";
  const input = document.getElementById("local-storyboard");
  const image = document.getElementById("storyboard-image");
  const empty = document.getElementById("storyboard-empty");
  const caption = document.getElementById("storyboard-caption");
  const status = document.getElementById("storyboard-status");
  const clear = document.getElementById("clear-storyboard");
  let objectUrl = null;
  let selection = 0;

  function releaseImage() {
    image.removeAttribute("src");
    image.hidden = true;
    caption.hidden = true;
    caption.textContent = "";
    empty.hidden = false;
    clear.disabled = true;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  }

  function showStatus(message, error = false) {
    status.textContent = message;
    status.dataset.error = String(error);
  }

  clear.addEventListener("click", () => {
    selection++;
    releaseImage();
    input.value = "";
    showStatus("Local preview cleared. No image is retained by the page.");
    input.focus();
  });

  input.addEventListener("change", async () => {
    const token = ++selection;
    releaseImage();
    const file = input.files[0];
    if (!file) {
      showStatus("No local image selected.");
      return;
    }
    showStatus("Checking the selected PNG…");
    let candidateUrl = null;
    try {
      if (file.size > 16 * 1024 * 1024) throw new Error("Choose a PNG smaller than 16 MiB.");
      const header = new Uint8Array(await file.slice(0, 24).arrayBuffer());
      if (token !== selection) return;
      const signature = [137,80,78,71,13,10,26,10];
      if (header.length < 24 || !signature.every((byte, index) => header[index] === byte) || String.fromCharCode(...header.slice(12,16)) !== "IHDR") {
        throw new Error("The selected file is not a supported PNG image.");
      }
      const dimensions = new DataView(header.buffer);
      const width = dimensions.getUint32(16), height = dimensions.getUint32(20);
      if (!width || !height || width > 8192 || height > 8192 || width * height > 32 * 1024 * 1024) {
        throw new Error("Choose a PNG with dimensions up to 8,192 per side and 32 million pixels.");
      }
      candidateUrl = URL.createObjectURL(file);
      const candidate = new Image();
      candidate.src = candidateUrl;
      await candidate.decode();
      if (token !== selection) {
        URL.revokeObjectURL(candidateUrl);
        return;
      }
      objectUrl = candidateUrl;
      image.src = objectUrl;
      image.alt = "Local preview: " + file.name;
      image.hidden = false;
      empty.hidden = true;
      caption.textContent = file.name + " · " + width.toLocaleString() + " × " + height.toLocaleString() + " pixels · selected locally";
      caption.hidden = false;
      clear.disabled = false;
      showStatus("Local PNG displayed. Its filename and appearance do not verify an edition or specimen identity.");
    } catch (error) {
      if (candidateUrl) URL.revokeObjectURL(candidateUrl);
      if (token !== selection) return;
      releaseImage();
      input.value = "";
      showStatus(error.message || "The PNG could not be decoded.", true);
    }
  });

  window.addEventListener("pagehide", () => {
    selection++;
    releaseImage();
    input.value = "";
  });
})();
