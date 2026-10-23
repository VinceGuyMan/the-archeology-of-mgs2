/* Local PNG inspection only. No archive access, network upload, or persistence. */
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
