<?php

///////////////////////////////////////////////////////////
//                    2050A LINE BREAKS                  //
// URL: https://codeforces.com/problemset/problem/2033/D //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 12.22.24 12:14 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 2H 30 MIN            //
///////////////////////////////////////////////////////////


function getSum($arr)
{
    $sum = null;
    for ($i = 0; $i < count($arr); $i++){
        $num = $arr[$i];
        $sum += $num;
    }
    return $sum;
}

function isBeautifulSegment($sum)
{
    if ($sum == 0){
        return true;
    } else {
        return false;
    }
}

function getCount($arr)
{
    $count = count($arr);
    return $count;
}


function getAllSegments($index, $arr, $debug = false)
{
    $allSegments = [];
    for ($i = $index; $i < count($arr); $i++){
        for ($j = $i; $j < count($arr); $j++){
            if ($i == $j){
                $segment = [$arr[$i]];
                array_push($allSegments, $segment);
            } else {
                $segment = [];
                for ($k = $i; $k < $j + 1; $k++ ){
                    array_push($segment, $arr[$k]);
                }
                array_push($allSegments, $segment);
            }
        }
        break;
    }
    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "'\n");
        echo("allSegments:\n");
        foreach($allSegments as $segment){
            $sum = getSum($segment);
            $stringOfArray = implode(",", $segment);
            if (isBeautifulSegment($sum)){
                echo("[$stringOfArray] => sum: '$sum' => isBeautifulSegment: 'true'\n");
            } else {
                echo("[$stringOfArray] => sum: '$sum'\n");
            }
        }
        echo("------------------------------------------\n");
    }
    return $allSegments;
}



function getBeautifulSegments($allSegments, $debug = false)
{
    $beautifulSegments = [];
    foreach($allSegments as $segment){
        $sum = getSum($segment);
        if (isBeautifulSegment($sum)){
            array_push($beautifulSegments, $segment);
        }
    }

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "'\n");
        echo("beautifulSegments:\n");
        foreach($beautifulSegments as $beautifulSegment){
            $sum = getSum($beautifulSegment);
            $stringOfArray = implode(",", $beautifulSegment);
            if (isBeautifulSegment($sum)){
                echo("[$stringOfArray] => sum: '$sum' => isBeautifulSegment: 'true'\n");
            } else {
                echo("[$stringOfArray] => sum: '$sum'\n");
            }
        }
        echo("------------------------------------------\n");
    }

    return $beautifulSegments;
}

function getDistinctBeautifulSegments($arr, $debug = false)
{
    $allBeautifulSegments = [];
    for ($i = 0; $i < count($arr); $i++){
        $allSegments = getAllSegments($i, $arr, false);
        $beautifulSegments = getBeautifulSegments($allSegments, false);
        if (!empty($beautifulSegments)){
            $allBeautifulSegments = array_merge($allBeautifulSegments, $beautifulSegments);
        }
    }

    $oAllBeautifulSegments = $allBeautifulSegments;

    foreach($allBeautifulSegments as &$beautifulSegment){
        sort($beautifulSegment);
    }

    $distinctBeautifulSegments = [];

    foreach($allBeautifulSegments as $beautifulSegmentt){
        if (!in_array($beautifulSegmentt, $distinctBeautifulSegments)){
            array_push($distinctBeautifulSegments, $beautifulSegmentt);
        }
    }

    if ($debug){
        echo("------------------------------------------\n");
        echo("Function name: '" . __FUNCTION__ . "'\n");
        echo("unsorted 'allBeautifulSegments':\n");
        foreach($oAllBeautifulSegments as $beautifulSegment){
            $stringOfArray = implode(",", $beautifulSegment);
            echo("[$stringOfArray]\n");
        }
        echo("distinctBeautifulSegments and sorted segments:\n");
        foreach($distinctBeautifulSegments as $beautifulSegment){
            $stringOfArray = implode(",", $beautifulSegment);
            echo("[$stringOfArray]\n");
        }
        echo("------------------------------------------\n");
    }

    return $distinctBeautifulSegments;
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

function dropIndex($i, &$array)
{
    unset($array[$i]);
    $array = array_values($array);
}

function getAllArrays($stdin, $debug = false)
{
    $allArrays = [];
    for ($i = 1; $i < count($stdin); $i+= 2){
        $line = $stdin[$i];
        $arr = explode(" ", $line);
        array_push($allArrays, $arr);
    }

    if ($debug){
        echo("Function name: '" . __FUNCTION__ . "'\n");
        echo("all arrays:\n");
        print_r($allArrays);
    }

    return $allArrays;
}

function main()
{
    $stdin = getStdinFromFile();
    dropIndex(0, $stdin);
    $allArrays = getAllArrays($stdin, $debug = false);
    foreach($allArrays as $arr){
        $nonOverlappingBeautilfulSegments = getDistinctBeautifulSegments($arr, $debug = false);
        $count = getCount($nonOverlappingBeautilfulSegments);
        echo("$count\n");
    }
}

main();