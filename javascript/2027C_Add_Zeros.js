'use strict';

///////////////////////////////////////////////////////////
//                   2027C ADD ZEROS                     //
// URL: https://codeforces.com/problemset/problem/2027/C //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 11.08.24 15:49 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 9 HOURS              //
///////////////////////////////////////////////////////////

//let arr = [2, 4, 6, 2, 5];
//let arr = [5, 4, 4, 5, 1];
//let arr = [6, 8, 2, 3];

let arr;

function isGreaterThanOne(virtualIndex) {
  if (virtualIndex > 1) {
    return true;
  }
}
function isLessOrEqualCurrArrLength(virtualIndex, array) {
  const arrayLength = array.length;
  if (virtualIndex <= arrayLength) {
    return { virtualIndex, arrayLength, check: true };
  }
}

function isValueEqualToArrayElement(value, realIndex, array) {
  const arrayElement = array[realIndex];
  if (arrayElement == value) {
    return { value, arrayElement, check: true };
  } else {
    return { value, arrayElement, check: false };
  }
}

function getValue(virtualIndex, array) {
  const value = array.length + 1 - virtualIndex;
  return value;
}

function getZeroQuantityToAdd(virtualIndex) {
  const zeroQuantityToAdd = virtualIndex - 1;
  return { zeroQuantityToAdd };
}

function addZerosToArray(array, zeroQuantityToAdd) {
  let newArray = array.slice();
  let addedZeros = 0;
  if (zeroQuantityToAdd > 0) {
    for (let i = 0; i < zeroQuantityToAdd; i++) {
      newArray.push(0);
      addedZeros++;
    }
    return { addedZeros, newArray };
  }
}

function zeroProceedual(virtualIndex, array) {
  let { zeroQuantityToAdd } = getZeroQuantityToAdd(virtualIndex);
  if (zeroQuantityToAdd > 0) {
    let { addedZeros, newArray } = addZerosToArray(array, zeroQuantityToAdd);
    let newArrayLength = newArray.length;
    return { zeroQuantityToAdd, addedZeros, newArray, newArrayLength };
  }
}

function passedAllChecks(checksArray, checkInfo) {
  checksQuantity = checksArray.length;
  passedChecks = 0;
  checksArray.forEach((check) => {
    if (check === true) {
      passedChecks++;
    }
  });
  if (passedChecks == checksQuantity) {
    return {
      passedChecks,
      checksQuantity,
      check: true,
      checkStackTree: checkInfo,
    };
  } else {
    return {
      passedChecks,
      checksQuantity,
      check: false,
      checkStackTree: checkInfo,
    };
  }
}

///////////////////////////////////////////////////
// ONLY THE ONES THAT ALREADY PASS THE TEST WITH //
//         THE CURRENT ARRAY.LENGTH              //
///////////////////////////////////////////////////
function getVirtualIndexesOfAllAlreadyPassingElements(arr) {
  let allVirtualIndexes = [];
  let allRealIndexes = [];
  for (let i = 0; i < arr.length; i++) {
    let realIndex = i;
    let virtualIndex = realIndex + 1;

    let checks = [];
    let checksInfo = [];

    if (isGreaterThanOne(virtualIndex)) {
      checks.push(true);
      checksInfo.push(`CHECK 1 SUCESS IN 'isGreaterThanOne(virtualIndex)'`);
    } else {
      checks.push(false);
      checksInfo.push(`CHECK 1 FAIL IN 'isGreaterThanOne(virtualIndex)'`);
    }

    if (isLessOrEqualCurrArrLength(virtualIndex, arr)) {
      checks.push(true);
      checksInfo.push(
        `CHECK 2 SUCESS IN 'isLessOrEqualCurrArrLength(virtualIndex)'`
      );
    } else {
      checks.push(false);
      checksInfo.push(
        `CHECK 2 FAIL IN 'isLessOrEqualCurrArrLength(virtualIndex)'`
      );
    }

    let passedCurrentChecks;
    if (passedAllChecks(checks).check == true) {
      passedCurrentChecks = true;
    } else {
      passedCurrentChecks = false;
    }

    if (passedCurrentChecks == true) {
      let value = getValue(virtualIndex, arr);
      //console.log(isValueEqualToArrayElement(value, realIndex, arr));
      if (isValueEqualToArrayElement(value, realIndex, arr).check == true) {
        checks.push(true);
        checksInfo.push(
          `CHECK 3 SUCESS IN 'isValueEqualToArrayElement(value, realIndex, arr).check == true'`
        );
      } else {
        checks.push(false);
        checksInfo.push(
          `CHECK 3 FAIL IN 'isValueEqualToArrayElement(value, realIndex, arr).check == true'`
        );
      }
      let hasPassedAllChecks;

      if (passedAllChecks(checks).check == true) {
        hasPassedAllChecks = true;
      } else {
        hasPassedAllChecks = false;
      }

      //console.log(passedAllChecks(checks, checksInfo));
      if (hasPassedAllChecks == true) {
        allVirtualIndexes.push(virtualIndex);
        allRealIndexes.push(realIndex);
      }
    }
  }
  return allVirtualIndexes;
}

function elementBatteryTest(realIndex, virtualIndex, array) {
  let checks = [];
  let checksInfo = [];

  if (isGreaterThanOne(virtualIndex)) {
    checks.push(true);
    checksInfo.push(`CHECK 1 SUCESS IN 'isGreaterThanOne(virtualIndex)'`);
  } else {
    checks.push(false);
    checksInfo.push(`CHECK 1 FAIL IN 'isGreaterThanOne(virtualIndex)'`);
  }

  if (isLessOrEqualCurrArrLength(virtualIndex, array)) {
    checks.push(true);
    checksInfo.push(
      `CHECK 2 SUCESS IN 'isLessOrEqualCurrArrLength(virtualIndex)'`
    );
  } else {
    checks.push(false);
    checksInfo.push(
      `CHECK 2 FAIL IN 'isLessOrEqualCurrArrLength(virtualIndex)'`
    );
  }

  let passedCurrentChecks;
  if (passedAllChecks(checks).check == true) {
    passedCurrentChecks = true;
  } else {
    passedCurrentChecks = false;
  }

  if (passedCurrentChecks == true) {
    let value = getValue(virtualIndex, array);
    //console.log(isValueEqualToArrayElement(value, realIndex, array));
    if (isValueEqualToArrayElement(value, realIndex, array).check == true) {
      checks.push(true);
      checksInfo.push(
        `CHECK 3 SUCESS IN 'isValueEqualToArrayElement(value, realIndex, array).check == true'`
      );
    } else {
      checks.push(false);
      checksInfo.push(
        `CHECK 3 FAIL IN 'isValueEqualToArrayElement(value, realIndex, array).check == true'`
      );
    }
    let hasPassedAllChecks;

    if (passedAllChecks(checks).check == true) {
      hasPassedAllChecks = true;
    } else {
      hasPassedAllChecks = false;
    }

    //console.log(passedAllChecks(checks, checksInfo));
    if (hasPassedAllChecks == true) {
      return 'Passed';
    } else {
      return 'Failed';
    }
  } else {
    return 'Failed';
  }
}

//console.log(elementBatteryTest(1, 2));

function getAllFixedValidVirtualIndexes(arr) {
  let allValidVirtualIndexes = [];
  for (let i = 0; i < arr.length; i++) {
    let realIndex = i;
    let virtualIndex = realIndex + 1;
    if (1 < virtualIndex && virtualIndex <= arr.length) {
      //console.log({ virtualIndex });
      allValidVirtualIndexes.push(virtualIndex);
    }
  }
  return allValidVirtualIndexes;
}

function getAllCurrentUsableVirtualIndexes(allValidVirtualIndexes, array) {
  let allUsableVirtualIndexes = [];
  for (const element of allValidVirtualIndexes) {
    let realIndex = element - 1;
    let virtualIndex = element;
    if (elementBatteryTest(realIndex, virtualIndex, array) == 'Passed') {
      allUsableVirtualIndexes.push(virtualIndex);
    }
  }
  return allUsableVirtualIndexes;
}

function getMaxValueOfArray(array) {
  let maxValue = 0;
  array.forEach((value) => {
    if (value > maxValue) {
      maxValue = value;
    }
  });
  return maxValue;
}

function getPassingStudents(array) {
  let allFixedValidVirtualIndexes = getAllFixedValidVirtualIndexes(array);
  let passingStudents = getAllCurrentUsableVirtualIndexes(
    allFixedValidVirtualIndexes,
    array
  );
  return passingStudents;
}

function getNewWorld(passingStudentVirtualIndex, worldArray) {
  let { zeroQuantityToAdd, addedZeros, newArray, newArrayLength } =
    zeroProceedual(passingStudentVirtualIndex, worldArray);
  let newWorld = newArray.slice();
  return newWorld;
}

//let arr = [5, 4, 4, 5, 1];
//let arr = [1];

function mainLogic() {
  let worlds = []; // this will be a dinamic array, where each world is completly independent from the others
  let lengths = []; // the lengths of each world in the worlds array

  worlds.push(arr);
  lengths.push(arr.length);

  let i = 0;
  let worldsLength = worlds.length; // initial length

  while (i < worlds.length) {
    let array = worlds[i];
    let passingStudents = getPassingStudents(array);
    for (let passingStudent of passingStudents) {
      let newWorld = getNewWorld(passingStudent, array);
      worlds.push(newWorld);
      lengths.push(newWorld.length);
      // console.log({ index: i, worldsLength, currWorld: array, newWorld });
    }
    i++;
  }

  let maxLength = getMaxValueOfArray(lengths);

  //console.log(lengths);
  console.log(maxLength);
}

//mainLogic();

async function readFileLinesFromInputFile() {
  return new Promise((resolve, reject) => {
    const readline = require('readline');

    let fileLines = [];

    process.stdin.on('data', (allFileLines) => {
      fileLines = allFileLines.toString().trim().split('\n');
    });

    process.stdin.on('end', () => {
      resolve(fileLines);
    });
  });
}

function convertAllElementsToNumber(array) {
  newArray = [];
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    let elementConvertedToNumber = Number(element);
    newArray.push(elementConvertedToNumber);
  }
  return newArray;
}

function getFileLines() {
  const readline = require('readline');

  let fileLines = [];

  process.stdin.on('data', (allFileLines) => {
    fileLines = allFileLines.toString().trim().split('\n');
  });

  process.stdin.on('end', () => {
    console.log({ fileLines });
  });
}

async function getTestCasesAndAllArraysFromFileLines() {
  let fileLines = await readFileLinesFromInputFile();
  let fileLinesCopy = fileLines.slice();
  let testCases = Number(fileLines[0]);
  fileLinesCopy.splice(0, 1);

  let allArrays = [];

  for (let i = 0; i < fileLinesCopy.length; i += 2) {
    const numberOfStudents = fileLinesCopy[i];
    const StudentsArray = convertAllElementsToNumber(
      fileLinesCopy[i + 1].split(' ')
    );
    //console.log({ numberOfStudents, StudentsArray });
    allArrays.push(StudentsArray);
  }
  //console.log({ testCases, AllArrays });
  return { testCases, allArrays };
}

async function main() {
  const { _, allArrays } = await getTestCasesAndAllArraysFromFileLines();
  for (let array of allArrays) {
    arr = array;
    mainLogic();
  }
}

main();
