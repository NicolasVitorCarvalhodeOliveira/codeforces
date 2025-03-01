// 14:51 -> Start

function getCurrFunctionName(debug = false)
{
    const stack = new Error().stack;
    const callerFunctionName = stack.split('\n')[2].trim().split(' ')[1];

    if (debug){
        const getFunctionName = () => {
            const stack = new Error().stack;
            const callerFunctionName = stack.split('\n')[2].trim().split(' ')[1];
            return callerFunctionName;
        }

        const functionName = getFunctionName();

        console.log("-------------------------------------------");
        console.log(`Function name: '${functionName}()'`);
        console.log(`callerFunctionName: ${callerFunctionName}()`);
        console.log(`stack: `);
        console.log(stack);
        console.log("-------------------------------------------");
    }

    return callerFunctionName;
}

/**
 * Returns an array of numbers from 'Start' to 'End' (inclusive).
 * @param {[number, number]} range - Start: firts element, End: last element
 * @returns {number[]} An array of numbers from 'Start' to 'End' (inclusive)
 */
function getRange(range, debug = false)
{
    range.sort();

    const [start, end] = range;

    const result = [];

    for (let i = start; i < end + 1; i++){
        const number = i;
        result.push(number);
    }

    if (debug){
        const funcName = getCurrFunctionName();
        console.log("-------------------------------------------");
        console.log(`Function name: '${funcName}()'`);
        console.log(`Start: '${start}' End: '${end}'`);
        console.log(`Range:`);
        console.log(result);
        console.log("-------------------------------------------");
    }

    return result;
}

/**
 * Returns a binary string: '0' (if is unique) || '1' (if is not unique)
 * @param {number} index - The index of the impression.
 * @param {number[]} range - An array of numbers within the range of 'array[index]'.
 * @param {Array<[number, number]>} array - The whole impression array. 
 * @returns {string} returns a binary string: '0' (if is unique) || '1' (if is not unique)
 */
function isUniqueImpression(index, range, array, debug = false)
{
    if (debug){
        const funcName = getCurrFunctionName();
        console.log("-------------------------------------------");
        console.log(`Function name: '${funcName}()'`);
        console.log(array);
        console.log(`Checking if index '${index}' will generate an unique impression`);
        console.log(`Range of index '${index}':`);
        console.log(range);
    }

    for (let i = 0; i < range.length; i++){
        const number = range[i];

        let uniqueImpressions = [];

        debug ? console.log(`Choosed number: '${number}'.`) : ``;

        for (let j = 0; j < array.length; j++){
            if (j == index){
                continue;
            }

            const rangee = getRange(array[j]);
            const copyRangee = Array.from(rangee);

            const numberIndex = copyRangee.indexOf(number);

            if (numberIndex != -1){
                copyRangee.splice(numberIndex, 1);

                if (copyRangee.length == 0){
                    break;
                }
            }

            uniqueImpressions.push(true);
        }

        const isUniqueImpression = (array.length - 1) == uniqueImpressions.length;

        if (isUniqueImpression){
            debug ? console.log(`Index '${index}' on number '${number}' DO generates unique impression`) : '';
            debug ? console.log("-------------------------------------------") : ``;
            return '1';
        }
    }

    if (debug){
        console.log(`Index '${index}' DOES NOT generate unique impression`);
        console.log("-------------------------------------------");
    }

    return '0';
}

function main()
{
    const impression1 = [
        [1,1],
        [1,1]
    ];

    
    const impression2 = [
        [1,3],
        [1,3],
        [1,3],
        [1,3]
    ];


    const impression3 = [
        [3,6],
        [2,2],
        [1,2],
        [1,1],
        [3,4],
        [2,2]
    ];

    let str = '';

    impression3.forEach((impression, index, impressions) => {
        const range = getRange(impression, debug = true);
        const string = isUniqueImpression(index, range, impressions, debug = true);
        str += string;
    });

    console.log(str);

    const impression4 = [
        [3,4],
        [4,4],
        [4,4],
        [1,3],
        [2,5],
        [1,4],
        [2,2]
    ];

    const impression5 = [
        [4,5],
        [4,4],
        [5,5]
    ];
    console.log(`DEUS PRECISO DE TI MEU SENHOR.`);
    console.log(`PRECISO DE TI, SENHOR JESUS CRISTO.`);
}

main();