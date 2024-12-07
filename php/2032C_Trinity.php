<?php

///////////////////////////////////////////////////////////
//                    2032C TRINITY                      //
// URL: https://codeforces.com/problemset/problem/2032/C //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 11.10.24 01:47 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 13H                  //
///////////////////////////////////////////////////////////

function getMean($array)
{
  $sum = 0;
  $len = count($array);
  for ($i = 0; $i < count($array); $i++) {
    $sum += $array[$i];
  }
  $mean = $sum / $len;
  return (int) $mean;
}

function isLast($index, $array)
{
  $elementIndex = $index;
  $arrayLength = count($array);
  $lastIndex = $arrayLength - 1;
  if ($elementIndex < $lastIndex) {
    return false;
  } else {
    return true;
  }
}

function isNonDegenerated($triangleArray)
{
  $array = $triangleArray;

  $firstSegment = $array[0];
  $secoundSegment = $array[1];
  $thirdSegment = $array[2];

  if ($firstSegment < $secoundSegment + $thirdSegment) {
    if ($secoundSegment < $firstSegment + $thirdSegment) {
      if ($thirdSegment < $firstSegment + $secoundSegment) {
        return true;
      }
    }
  } else {
    return false;
  }
}

function getUpdatedArray($newValue, $segmentIndex, $array)
{
  $array[$segmentIndex] = $newValue;
  return $array;
}

function getAllTrianglesForCurrentIndex($currentIndex, $array)
{
  $allTriangles = [];
  $i = $currentIndex;
  $j = $i + 1;
  while ($j < count($array)) {
    if (!isLast($j, $array)) {
      $firstSegment = $array[$i];
      $secoundSegment = $array[$j];
      for ($k = $j + 1; $k < count($array); $k++) {
        $thirdSegment = $array[$k];
        $triangle = [$firstSegment, $secoundSegment, $thirdSegment];
        array_push($allTriangles, $triangle);
      }
      $j++;
      //break;
    } else {
      break;
    }
  }
  return $allTriangles;
}

function getTotalCountOfSegmentChanges($arr, $originalArray)
{
  $totalCountOfSegmentChanges = 0;
  for ($i = 0; $i < count($originalArray); $i++) {
    $originalElement = $originalArray[$i];
    $currentElement = $arr[$i];
    if ($currentElement != $originalElement) {
      $totalCountOfSegmentChanges++;
    }
  }
  return $totalCountOfSegmentChanges;
}

function main($originalArr)
{
  sort($originalArr);

  $arr = $originalArr;

  $sortedUniqueSegments = $arr;
  sort($sortedUniqueSegments);
  $sortedUniqueSegments = array_values(array_unique($sortedUniqueSegments)); // Reindexa o array

  $updateCounter = 0;

  for ($i = 0; $i < count($arr); $i++) {
    $originalSegment = $arr[$i];
    $segmentIndex = $i;

    $allTrianglesForCurrentIndex = getAllTrianglesForCurrentIndex(
      $segmentIndex,
      $arr
    );

    //echo json_encode($allTrianglesForCurrentIndex);
    //exit();

    for ($j = 0; $j < count($allTrianglesForCurrentIndex); $j++) {
      $currentTriangle = $allTrianglesForCurrentIndex[$j];
      //echo json_encode($currentTriangle);
      //exit();
      if (!isNonDegenerated($currentTriangle)) {
        for ($k = 0; $k < count($sortedUniqueSegments); $k++) {
          $newSegment = $sortedUniqueSegments[$k];
          //echo json_encode($newSegment);
          if ($newSegment != $originalSegment) {
            $updatedArr = getUpdatedArray($newSegment, $segmentIndex, $arr);

            $arr = $updatedArr;
            $allTrianglesForCurrentIndex = getAllTrianglesForCurrentIndex(
              $segmentIndex,
              $arr
            );
            $currentTriangle = $allTrianglesForCurrentIndex[$j];
            if (isNonDegenerated($currentTriangle)) {
              break;
            }
          }
        }
      }
    }
  }

  $totalCountOfSegmentChanges = getTotalCountOfSegmentChanges(
    $arr,
    $originalArr
  );

  //echo json_encode($arr) . "\n";
  echo $totalCountOfSegmentChanges . "\n";
}

function getFileInput()
{
  $stdin = fopen('php://stdin', 'r');
  $fileContent = stream_get_contents($stdin);
  fclose($stdin);
  return $fileContent;
}

function fileInputToArray($fileInput)
{
  $allLines = explode("\n", trim($fileInput));
  $allLinesArr = [];
  foreach ($allLines as $line) {
    $line = explode(' ', $line);
    if (count($line) > 1) {
      $arr = [];
      foreach ($line as $element) {
        array_push($arr, (int) $element);
      }
      array_push($allLinesArr, $arr);
    } else {
      array_push($allLinesArr, (int) $line[0]);
    }
  }
  return $allLinesArr;
}

function getTestCaseQuantityAndAllArrays($fileInputArray)
{
  $testCaseQuantity = $fileInputArray[0];

  $allArrays = [];
  $index = 1;
  for ($i = $index; $i < count($fileInputArray); $i += 2) {
    $temp = [];
    $arrayLength = $fileInputArray[$i];
    $array = $fileInputArray[$i + 1];
    array_push($temp, $arrayLength);
    array_push($temp, $array);

    array_push($allArrays, $temp);
  }

  return [$testCaseQuantity, $allArrays];
}

$fileInput = getFileInput();
$fileInputArray = fileInputToArray($fileInput);
list($_, $allArrays) = getTestCaseQuantityAndAllArrays($fileInputArray);

for ($i = 0; $i < count($allArrays); $i++) {
  $segmentsArrLength = $allArrays[$i][0];
  $segmentsArr = $allArrays[$i][1];
  $originalArr = $segmentsArr;
  main($originalArr);
}