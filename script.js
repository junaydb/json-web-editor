const table = document.getElementById("data");
const saveButton = document.getElementById("save");

async function getPetData() {
  const raw = await fetch("./data.json");
  const parsed = await raw.json();

  return parsed.petData;
}

async function buildTable() {
  const petData = await getPetData();

  console.log(petData);

  petData.forEach((pet, i) => {
    const row = table.insertRow(-1);
    row.setAttribute("class", "data-row");

    for (const [key, value] of Object.entries(pet)) {
      const cell = row.insertCell(-1);
      const input = document.createElement("input");

      input.setAttribute("type", "text");
      input.setAttribute("value", value);
      cell.appendChild(input);
    }
  });
}

function buildJSON() {
  const allData = document.querySelectorAll(".data-row");
  // TO-DO: iterate over each child of data row and build JSON Blob
}

saveButton.addEventListener("click", buildJSON);

buildTable();
