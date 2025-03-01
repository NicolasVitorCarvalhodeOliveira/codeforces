<?php

/*
1 1 1 2 3

1 2 1 1 3

1 2 1 3 1

------------

    REAL WORLD 

---------------


1 1 1 2 3

1 2 1 1 3

1 2 1 1 3

*/

function getDisturbanceCount($arr, $debug = false)
{
    $disturbanceCount = 0;
    for ($i = 0; $i < count($arr) - 1; $i++){
        $currTopicOfInterest = $arr[$i];
        $nextTopicOfInterest = $arr[$i + 1];
        if ($currTopicOfInterest == $nextTopicOfInterest){
            $disturbanceCount++;
        }
    }

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "()'\n");
        echo("disturbanceCount: $disturbanceCount\n");
        echo("For the current array:\n");
        $stringOfArray = implode(",", $arr);
        echo("[$stringOfArray]\n");
        echo("------------------------------------------\n");
    }

    return $disturbanceCount;
}

function getSwap($index, $arr, $debug = false)
{
    $swapIndex = (count($arr) - 1) - ($index);
    if ($index == $swapIndex){
        return null;
    }

    $swap = [$index, $swapIndex];
    
    $indexValue = $arr[$index];
    $swapIndexValue = $arr[$swapIndex];

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "()'\n");
        echo("Index: '$index' Swap: [$index, $swapIndex] Values: '$indexValue' <-> '$swapIndexValue'\n");
        echo("------------------------------------------\n");
    }

    return $swap;
}

function getAllPossibleSwaps($arr, $debug = false)
{
    $allPossibleSwaps = [];
    for ($i = 0; $i < count($arr); $i++){
        $swap = getSwap($i, $arr, false);
        if ($swap){
            sort($swap);
            if (!in_array($swap, $allPossibleSwaps)){
                array_push($allPossibleSwaps, $swap);
            }
        }
    }

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "()'\n");
        echo("allPossibleSwaps:\n");
        print_r($allPossibleSwaps);
        echo("------------------------------------------\n");
    }

    return $allPossibleSwaps;
}

function getAllPossibilities($arr, $debug = false)
{
    $allPossibilities = [];
    for ($i = 0; $i < count($arr); $i++){
        for ($j = $i; $j < count($arr); $j++){
            if ($i == $j){
                $possibility = [$arr[$i]];
                array_push($allPossibilities, $possibility);
            } else {
                $possibility = [];
                for ($k = $i; $k < $j + 1; $k++){
                    $element = $arr[$k];
                    array_push($possibility, $element);
                }
                array_push($allPossibilities, $possibility);
            }
        }
    }

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "()'\n");
        echo("allPossibilities:\n");
        print_r($allPossibilities);
        echo("------------------------------------------\n");
    }

    return $allPossibilities;
}

function execSwap()
{

}

function main()
{
    $arr = [1, 1, 1, 2, 3];
    $initialDisturbanceCount = getDisturbanceCount($arr, $debug = false);
    if ($initialDisturbanceCount == 0){
        echo("$initialDisturbanceCount\n");
        break;
    }
    $allDisturbanceCount = [];
    array_push($allDisturbanceCount, $initialDisturbanceCount);

    $allSwaps = getAllPossibleSwaps($arr, $debug = false);
    $allPossibilities = getAllPossibilities($allSwaps, $debug = true);
}

main();