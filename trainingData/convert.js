const fs = require("fs");
const csvFilePath = "./dialog.csv";
const csvCoverter = require("csvtojson");

csvCoverter()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    let buffer = JSON.stringify(jsonObj);
    fs.writeFileSync("한국어대화.json", buffer);
  });
