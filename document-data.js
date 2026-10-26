/* Public research metadata only. No game-file access, storage or uploads. */
(() => {
  "use strict";
  const maxBytes = 2 * 1024 * 1024;
  let indexPromise = null;
  const collections = new Map();

  async function readJson(path, expected) {
    if (!/^(?:document-corpus\.json|data\/document\/(?:models|textures|geometry)-\d+\.json)$/.test(path)) {
      throw new Error("Unsupported metadata path.");
    }
    const response = await fetch(path, {cache:"no-cache", credentials:"same-origin"});
    if (!response.ok) throw new Error("Metadata request failed (" + response.status + ").");
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > maxBytes || (expected && bytes.byteLength !== expected.bytes)) {
      throw new Error("Metadata size check failed.");
    }
    if (expected) {
      if (!window.crypto?.subtle) throw new Error("Use HTTPS or a local server to check metadata integrity.");
      const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
      const hex = Array.from(digest, byte => byte.toString(16).padStart(2,"0")).join("");
      if (hex !== expected.sha256) throw new Error("Metadata integrity check failed. Reload to get the current index.");
    }
    return JSON.parse(new TextDecoder("utf-8", {fatal:true}).decode(bytes));
  }

  function index() {
    if (!indexPromise) {
      indexPromise = readJson("document-corpus.json").then(data => {
        if (data.schema !== "document-public-corpus-index-v1" || data.assets_distributed !== false) {
          throw new Error("Unsupported Document metadata index.");
        }
        return data;
      }).catch(error => {indexPromise = null; throw error;});
    }
    return indexPromise;
  }

  function load(kind) {
    if (!collections.has(kind)) {
      const promise = (async () => {
        if (!['models','textures','geometry'].includes(kind)) throw new Error("Unknown metadata collection.");
        const metadata = await index();
        const shards = metadata[kind].shards;
        const results = new Array(shards.length);
        let next = 0;
        async function worker() {
          while (next < shards.length) {
            const slot = next++;
            const shard = shards[slot];
            const data = await readJson(shard.path, shard);
            if (data.schema !== "document-public-metadata-shard-v1" || !Array.isArray(data.records) || data.records.length !== shard.records) {
              throw new Error("Metadata shard coverage check failed.");
            }
            results[slot] = data.records;
          }
        }
        await Promise.all(Array.from({length:Math.min(4,shards.length)}, worker));
        const records = results.flat();
        const expected = kind === "models" ? metadata.models.summary.logical_models : kind === "geometry" ? metadata.geometry.summary.records : metadata.textures.coverage.texture_asset_count;
        const ids = records.map(record => kind === "textures" ? record.sha256 : record.id);
        if (records.length !== expected || new Set(ids).size !== expected) throw new Error("Metadata collection coverage check failed.");
        return {index:metadata, records};
      })().catch(error => {
        // Retry must fetch a current index and every collection from the same publication.
        collections.clear();
        indexPromise=null;
        throw error;
      });
      collections.set(kind,promise);
    }
    return collections.get(kind);
  }

  window.DocumentCorpus = Object.freeze({index,load});
})();
