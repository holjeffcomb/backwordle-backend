// a script for converting a txt file of words to an array of 5-letter words in javascript

const fs = require("fs");
const path = require("path");

// Assuming words.txt is in the same directory as your script
const filePath = path.join("../", "words.txt");
const outputPath = path.join("../", "checkWords.js"); // Path for the output file

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split the contents by new lines, then filter by word length
  const wordsArray = data.split(/\r?\n/).filter((word) => word.length === 5);

  // Convert the array to a string and prepare it to be exported from a JS module
  const outputContent = `const words = ${JSON.stringify(
    wordsArray,
    null,
    2
  )};\n\nexport default words;`;

  // Write the filtered array to words.js
  fs.writeFile(outputPath, outputContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Filtered words have been written to words.js");
  });
});
