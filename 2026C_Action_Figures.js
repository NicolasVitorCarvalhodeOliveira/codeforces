'use strict';

///////////////////////////////////////////////////////////
//               2026C ACTION FIGURES                    //
// URL: https://codeforces.com/problemset/problem/2026/C //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 11.07.24 16:54 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 6 HOURS              //
///////////////////////////////////////////////////////////

let random;
let totalSpentCoins;
//const random = [1];
//const random = [1, 0, 1, 1, 0, 1];
//const random = [1, 1, 1, 0, 0, 0, 1];
//const random = [1, 1, 1, 1, 1];
//let totalSpentCoins = 0;

function isExistingIndex(index) {
  if (index >= 0) {
    return true;
  } else {
    return false;
  }
}

function sort(array) {
  array.sort((x, y) => x - y);
}

function plusOneForAllElements(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] += 1;
  }
}

function getElementsByListOfIndexes(listOfIndexes, array) {
  let elements = [];
  for (const index of listOfIndexes) {
    elements.push(array[index]);
  }
  return elements;
}

function getAvailableArrayLength(index, array) {
  let availableArrayLength = 0;
  for (let i = 0; i < index + 1; i++) {
    availableArrayLength++;
  }
  return availableArrayLength;
}

function getNeighborIndex(index) {
  if (index - 1 >= 0) {
    return index - 1;
  }
}

function getType(index, array) {
  if (array[index] == 0) return 'mysteryBox';
  if (array[index] == 1) return 'toy';
}

function toyNeighborProcess(index, array) {
  let buyedToys = [];
  let paiyedToys = [];
  let spentCoins = 0;

  let availableArrayLength = getAvailableArrayLength(index, array);
  if (availableArrayLength >= 4) {
    buyedToys.push(index);
    buyedToys.push(index - 1);
    buyedToys.push(index - 2);
    buyedToys.push(index - 3);

    index -= 3;

    paiyedToys = buyedToys.slice();
    paiyedToys.splice(0, 1);
    paiyedToys.splice(0, 1);

    sort(buyedToys);
    sort(paiyedToys);

    let mysteryBoxesAndToys = getElementsByListOfIndexes(buyedToys, random);

    plusOneForAllElements(buyedToys);
    plusOneForAllElements(paiyedToys);

    paiyedToys.forEach((e) => (spentCoins += e));

    return {
      currentIndex: index,
      spentCoins: spentCoins,
      paiyedToys,
      buyedToys,
      mysteryBoxesAndToys,
      runnedFunction: 'toyNeighborProcess (>= 4)',
    };
  } else if (availableArrayLength == 3) {
    buyedToys.push(index);
    buyedToys.push(index - 1);
    buyedToys.push(index - 2);

    index -= 2;

    paiyedToys = buyedToys.slice();
    paiyedToys.splice(0, 1);

    sort(buyedToys);
    sort(paiyedToys);

    let mysteryBoxesAndToys = getElementsByListOfIndexes(buyedToys, random);

    plusOneForAllElements(buyedToys);
    plusOneForAllElements(paiyedToys);

    paiyedToys.forEach((e) => (spentCoins += e));

    return {
      currentIndex: index,
      spentCoins: spentCoins,
      paiyedToys,
      buyedToys,
      mysteryBoxesAndToys,
      runnedFunction: 'toyNeighborProcess (== 3)',
    };
  } else if (availableArrayLength == 2) {
    buyedToys.push(index);
    buyedToys.push(index - 1);

    index -= 1;

    paiyedToys = buyedToys.slice();
    paiyedToys.splice(0, 1);

    sort(buyedToys);
    sort(paiyedToys);

    let mysteryBoxesAndToys = getElementsByListOfIndexes(buyedToys, random);

    plusOneForAllElements(buyedToys);
    plusOneForAllElements(paiyedToys);

    paiyedToys.forEach((e) => (spentCoins += e));

    return {
      currentIndex: index,
      spentCoins: spentCoins,
      paiyedToys,
      buyedToys,
      mysteryBoxesAndToys,
      runnedFunction: 'toyNeighborProcess (== 2)',
    };
  } else if (availableArrayLength == 1) {
    //
    // IM PRETTY SURE THAT THIS WILL NEVER RUN
    // BECAUSE THIS FUNCTIONS ONLY RUNS IF THE HAS
    // A NEIGHBOR
    buyedToys.push(index);
    paiyedToys = buyedToys.slice();

    sort(buyedToys);
    sort(paiyedToys);

    let mysteryBoxesAndToys = getElementsByListOfIndexes(buyedToys, random);

    plusOneForAllElements(buyedToys);
    plusOneForAllElements(paiyedToys);

    paiyedToys.forEach((e) => (spentCoins += e));

    return {
      currentIndex: index,
      spentCoins: spentCoins,
      paiyedToys,
      buyedToys,
      mysteryBoxesAndToys,
      runnedFunction: 'toyNeighborProcess (== 1)',
    };
  }
}

function mysteryBoxNeighborProcess(index, array) {
  let buyedToys = [];
  let paiyedToys = [];
  let spentCoins = 0;

  buyedToys.push(index);
  while (
    getNeighborIndex(index) !== undefined &&
    getType(getNeighborIndex(index), random) == 'mysteryBox'
  ) {
    index--;
    buyedToys.push(index);
  }
  paiyedToys = buyedToys.slice();
  paiyedToys.splice(0, 1);

  sort(buyedToys);
  sort(paiyedToys);

  let mysteryBoxesAndToys = getElementsByListOfIndexes(buyedToys, random);

  plusOneForAllElements(buyedToys);
  plusOneForAllElements(paiyedToys);

  paiyedToys.forEach((e) => (spentCoins += e));

  return {
    currentIndex: index,
    spentCoins: spentCoins,
    paiyedToys,
    buyedToys,
    mysteryBoxesAndToys,
    runnedFunction: 'mysteryBoxNeighborProcess',
  };
}

function main() {
  let currIndex = random.length - 1; // current Index

  if (random.length == 1) {
    totalSpentCoins = 1;
  } else {
    while (true) {
      let neighbor = getNeighborIndex(currIndex);
      if (neighbor !== undefined) {
        if (getType(neighbor, random) == 'mysteryBox') {
          let { currentIndex, spentCoins, paiyedToys, buyedToys } =
            mysteryBoxNeighborProcess(currIndex, random);
          // console.log(mysteryBoxNeighborProcess(currIndex, random));
          totalSpentCoins += spentCoins;
          if (isExistingIndex(currentIndex - 1)) {
            currIndex = currentIndex - 1;
          } else {
            break;
          }
        }
        if (getType(neighbor, random) == 'toy') {
          let { currentIndex, spentCoins, paiyedToys, buyedToys } =
            toyNeighborProcess(currIndex, random);
          // console.log(toyNeighborProcess(currIndex, random));
          totalSpentCoins += spentCoins;
          if (isExistingIndex(currentIndex - 1)) {
            currIndex = currentIndex - 1;
          } else {
            break;
          }
        }
      } else {
        totalSpentCoins += currIndex + 1;
        break;
      }
    }
  }

  console.log(totalSpentCoins);
}

async function getFileInput() {
  const readline = require('readline');
  let allFileLines = [];

  process.stdin.on('data', (allLines) => {
    allFileLines = allLines.toString().trim().split('\n');
  });

  process.stdin.on('end', () => {
    let testCasesQuantity = Number(allFileLines[0]);

    allFileLines.splice(0, 1);
    // console.log(allFileLines);

    let randomLengthAndRandomElements = [];

    for (let i = 0; i < allFileLines.length; i += 2) {
      let randomLength = Number(allFileLines[i]);
      let randomElements = allFileLines[i + 1];
      let temp = [];
      for (let j = 0; j < randomElements.length; j++) {
        let randomElement = Number(randomElements[j]);
        temp.push(randomElement);
      }
      randomElements = temp.slice();

      randomLengthAndRandomElements.push([randomLength, randomElements]);
    }

    for (let i = 0; i < randomLengthAndRandomElements.length; i++) {
      let randomLength = randomLengthAndRandomElements[i][0];
      random = randomLengthAndRandomElements[i][1];
      totalSpentCoins = 0;
      main();
    }
  });
}

getFileInput();
