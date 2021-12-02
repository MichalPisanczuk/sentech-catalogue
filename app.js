let selectedFile = null;
const overlayLayer = document.querySelector(".overlay-layer");

document.querySelector("#catalogueFile").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});

document.querySelector("#myBtn").addEventListener("click", () => {
  if (selectedFile) {
    overlayLayer.style.display = "flex";
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      const bar = new Promise((resolve, reject) => {
        workbook.SheetNames.forEach((sheet, index, array) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          const pre = (document.querySelector("#jsonData").innerText = JSON.stringify(rowObject, undefined, 4));
          if (index === array.length - 1) resolve();
        });
      });
      bar.then(() => {
        console.log("All data loaded");
        overlayLayer.style.display = "none";
      });
    };
  }
});
