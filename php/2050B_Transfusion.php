<?php

///////////////////////////////////////////////////////////
//                    2050B TRANSFUSION                  //
// URL: https://codeforces.com/problemset/problem/2050/B //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 12.07.24 17:33 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 7H                   //
//                       RATE: 800 PTS                   //
///////////////////////////////////////////////////////////

/*
A regra é que nós escolheremos um índice partindo do segundo:
1. A escolha desse índice não significa mais que:
1.1. Nós realizaremos processos sobre o número anterior e posterior:
1.1.1. Se o número anterior cresce, o posterior diminui
1.1.2. Se o número anterior diminui, o número posterior cresce.
2. Não pode ter números negativos

Lógica para completar o desafio:

1. Verificaremos a média:
1.1. Se a média for um número do tipo float, entregaremos "NO" de cara.
1.2. Se a média for um inteiro: CONTINUE.
2. Tentaremos transformar todos os números do array nessa média:
2.1. Seguiremos linearmente, isso significa que tentaremos transformar inicialmente o primeiro,
no número da média, o segundo o terceiro e assim por diante, sem que o número vire negativo (R: 2.)
2.1.1. Se for possível: CONTINUE
2.1.2. Se NÃO for possível: BREAK e printa "NO"
3. No final a gente dá um for e verifica se todos os números são o número da média.
3.1. Se sim printa "YES".
3.2. Se não printa "NO".
 */

function getArraySum($array)
{
    $arraySum = 0;
    for ($i = 0; $i < count($array); $i++) {
        $element = $array[$i];
        $arraySum += $element;
    }
    return $arraySum;
}

function getMean($array)
{
    $arraySum = getArraySum($array);
    $arrayLength = count($array);
    $mean = $arraySum / $arrayLength;
    return $mean;
}

function getLNeighboorProcedualType($lNeighboor, $mean)
{
    if ($lNeighboor == $mean) {
        return "do nothing";
    } else if ($mean > $lNeighboor) {
        return "add";
    } else if ($lNeighboor > $mean) {
        return "subtract";
    }
}

function getNumberOfTimes($procedualType, $lNeighboor, $mean)
{
    switch ($procedualType) {
        case "add":
            $numberOfTimes = $mean - $lNeighboor;
            break;
        case "subtract":
            $numberOfTimes = $lNeighboor - $mean;
            break;
        default:
            $numberOfTimes = 0;
            break;
    }
    return $numberOfTimes;
}

function isPossibleProcedual($procedualType, $numberOfTimes, $rNeighboor)
{
    switch ($procedualType){
        case "add":
            if ($rNeighboor - $numberOfTimes >= 0){
                return true;
            } else {
                return false;
            }
        default:
            return true;
    }
}

function isLastIndex($i, $array)
{
    $lastIndex = count($array) - 1;
    if ($lastIndex == $i) {
        return true;
    } else {
        return false;
    }
}


function exeProcedual($procedualType, $numberOfTimes, $i, &$array)
{
    switch ($procedualType){
        case "add":
            add($numberOfTimes, $i, $array);
            break;
        case "subtract":
            subtract($numberOfTimes, $i, $array);
            break;
    }
}

function add($numberOfTimes, $i, &$array)
{
    $lNeighboor = $array[$i - 1];
    $rNeighboor = $array[$i + 1];

    $array[$i - 1] = $lNeighboor + $numberOfTimes;
    $array[$i + 1] = $rNeighboor - $numberOfTimes;
}

function subtract($numberOfTimes, $i, &$array)
{
    $lNeighboor = $array[$i - 1];
    $rNeighboor = $array[$i + 1];

    $array[$i - 1] = $lNeighboor - $numberOfTimes;
    $array[$i + 1] = $rNeighboor + $numberOfTimes;
}

function isEveryoneIsEqualToMean($mean, $array)
{
    $checkArray = [];
    for ($i = 0; $i < count($array); $i++) {
        $element = $array[$i];
        if ($element == $mean) {
            array_push($checkArray, "true");
        } else {
            array_push($checkArray, "false");
        }
    }
    $checkArrayCount = count($checkArray);
    $numOfTrue = 0;
    for ($i = 0; $i < count($checkArray); $i++) {
        $element = $checkArray[$i];
        if ($element == "true") {
            $numOfTrue += 1;
        }
    }

    if ($checkArrayCount == $numOfTrue) {
        return true;
    } else {
        return false;
    }
}

function getStdinFromFile()
{
    $stdin = fopen('php://stdin', 'r');

    $allLines = stream_get_contents($stdin);
    $allLinesToString = trim($allLines);
    $allLines = explode("\n", $allLinesToString);

    fclose($stdin);

    return $allLines;
}

function getTransfusionArrays($stdin)
{
    $transfusionArrays = [];

    dropIndex($stdin, 0);

    for ($i = 1; $i < count($stdin); $i+=2){
        $row = $stdin[$i];
        $arr = explode(" ", $row);
        array_push($transfusionArrays, $arr);
    }
    return $transfusionArrays;
}

function dropIndex(&$array, $i)
{
    unset($array[$i]);
    $array = array_values($array);
}

function transfusion($array)
{
    $mean = getMean($array);
    $isIntegerMean = is_integer($mean);
    if ($isIntegerMean) {
        for ($i = 1; $i < count($array); $i++) {
            if (!isLastIndex($i, $array)) {
                $lNeighboor = $array[$i - 1];
                $rNeighboor = $array[$i + 1];
                $procedualType = getLNeighboorProcedualType($lNeighboor, $mean);
                $numberOfTimes = getNumberOfTimes($procedualType, $lNeighboor, $mean);
                $isPossible = isPossibleProcedual($procedualType, $numberOfTimes, $rNeighboor);
                if ($isPossible){
                    exeProcedual($procedualType, $numberOfTimes, $i, $array);
                } else {
                    return "NO\n";
                }
            }
        }
        if (isEveryoneIsEqualToMean($mean, $array)) {
            return "YES\n";
        } else {
            return "NO\n";
        }
    } else {
        return "NO\n";
    }
}

function main()
{
    $stdin = getStdinFromFile();
    $transfusionArrays = getTransfusionArrays($stdin);

    for ($i = 0; $i < count($transfusionArrays); $i++){
        $currTransfusionArray = $transfusionArrays[$i];
        $transfusionResponse = transfusion($currTransfusionArray);
        echo $transfusionResponse;
    }
}

main();
