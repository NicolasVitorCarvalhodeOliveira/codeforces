<?php

///////////////////////////////////////////////////////////
//                    2050A LINE BREAKS                  //
// URL: https://codeforces.com/problemset/problem/2050/A //
//     SOLVED BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA      //
//         DATETIME: 12.07.24 22:07 UTC−3 (BRAZIL - RJ)  //
//             TOTAL TIME TO SOLVE: 2H 30 MIN            //
///////////////////////////////////////////////////////////

function canPassWord($wordLength, $maxCountOfChars, $countOfChars)
{
    $newCountOfChars = $wordLength + $countOfChars;
    if ($newCountOfChars <= $maxCountOfChars){
        return true;
    } else {
        return false;
    }
}

function increaseCountOfChars(&$countOfChars, $wordLenght)
{
    $countOfChars += $wordLenght;
}

function increaseCountOfPassedWords(&$countOfPassedWords)
{
    $countOfPassedWords++;
}

function getStdin()
{
    $stdin = fopen('php://stdin', 'r');

    $content = stream_get_contents($stdin);

    fclose($stdin);

    $contentTrimed = trim($content);
    $stdin = explode("\n", $contentTrimed);

    return $stdin;
}

function dropIndex(&$array, $i)
{
    unset($array[$i]);
    $array = array_values($array);
}


function getWords($stdin)
{
    dropIndex($stdin, 0);

    $words = [];

    $i = 0;
    while ($i < count($stdin)){
        $word = [];
        $arrayLength = (int) explode(" ", $stdin[$i])[0];
        $firstIndex = $i + 1;
        $lastIndex = ($i + 1) + ($arrayLength - 1);
        for ($j = $firstIndex; $j < $lastIndex + 1; $j++){
            array_push($word, $stdin[$j]);
        }
        array_push($words, $word);
        $i += ($arrayLength + 1);
    }

    return $words;
}

function getMaxCountOfChars($stdin)
{
    dropIndex($stdin, 0);

    $aMaxCountOfChars = [];

    $i = 0;
    while ($i < count($stdin)){
        $maxCountOfChars = (int) explode(" ", $stdin[$i])[1];

        array_push($aMaxCountOfChars, $maxCountOfChars);

        $arrayLength = (int) explode(" ", $stdin[$i])[0];
        $i += ($arrayLength + 1);
    }

    return $aMaxCountOfChars;
}


/*
    @param $words Array
*/
function maxCountOfPassedWords($words, $maxCountOfChars)
{
    $countOfChars = 0;
    $countOfPassedWords = 0;

    for ($i = 0; $i < count($words); $i++){
        $word = $words[$i];
        $wordLength = strlen($word);
        $canPass = canPassWord($wordLength, $maxCountOfChars, $countOfChars);
        if ($canPass){
            increaseCountOfChars($countOfChars, $wordLength);
            increaseCountOfPassedWords($countOfPassedWords);
        } else {
            return "$countOfPassedWords\n";
        }
    }

    return "$countOfPassedWords\n";
}


function main()
{
    $stdin = getStdin();
    $words = getWords($stdin);
    $maxCountOfChars = getMaxCountOfChars($stdin);
    for ($i = 0; $i < count($words); $i++){
        $currWords = $words[$i];
        $currMaxCountOfChars = $maxCountOfChars[$i];
        $currMaxCountOfPassedWords = maxCountOfPassedWords($currWords, $currMaxCountOfChars);

        echo "$currMaxCountOfPassedWords";
    }
}

main();