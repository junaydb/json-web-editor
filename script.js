let filename;
const fileUploadButton = document.getElementById("upload");
const downloadButton = document.getElementById("download");
const textarea = document.querySelector("textarea");

async function handleUpload({ target }) {
  const file = target.files[0];
  filename = file.name.replace(".json", "");
  const jsonString = await file.text();

  displayJSON(JSON.parse(JSON.stringify(jsonString)));
}

function displayJSON(jsonString) {
  const { rows, cols } = getTextAreaDimensions(jsonString);
  textarea.rows = rows;
  textarea.cols = cols;
  textarea.innerHTML = jsonString;
}

function downloadJSON({ target }) {
  const blob = new Blob(textarea.value.split(""), {
    type: "application/json",
  });
  const blobURL = URL.createObjectURL(blob);

  target.href = blobURL;
  target.download = `${filename}-edited.json`;
}

function getTextAreaDimensions(str) {
  const lines = str.split("\n");
  const rows = lines.length - 1;
  const columns = Math.max(...lines.map((line) => line.length)) - 1;

  return { rows: rows, cols: columns };
}

fileUploadButton.addEventListener("change", handleUpload);
downloadButton.addEventListener("click", downloadJSON);
