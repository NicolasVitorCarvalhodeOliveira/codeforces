'use strict';

const readline = require('readline');

async function main() {
  let fileLines = [];
  process.stdin.on('data', (allLines) => {
    fileLines = allLines.toString().trim().split('\n');
  });
  process.stdin.on('end', () => {
    let debug = [];
    const testeCaseQuantity = Number(fileLines[0]);
    debug.push(testeCaseQuantity);

    let currentLine = 1;
    for (let t = 0; t < testeCaseQuantity; t++) {
      const cellQuantity = Number(fileLines[currentLine++]);
      let cellNumbers = fileLines[currentLine++].split(' ').map(Number);
      debug.push([cellQuantity, cellNumbers]);

      cellNumbers.sort((x, y) => x - y);

      if (cellQuantity % 2 !== 0) {
        const lastElement = cellNumbers[cellNumbers.length - 1];
        cellNumbers.push(lastElement + 1);
      }

      let pairs = 0;

      for (let i = 0; i < cellNumbers.length; i += 2) {
        pairs++;
      }
      console.log(pairs);
    }
    // console.log(debug);
  });
}

/////////////////////////////////////////////
//     WILL WAIT TILL YOU GIVE             //
// AN EXTERNAL RESOURCE (FILE, CAT SCRIPT) //
// TO PROCEED                              //
/////////////////////////////////////////////
process.stdin.resume();
main();
