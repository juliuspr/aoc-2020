// let data = `INPUT DATA`

let nums = data.split('\n').map(n => parseInt(n))

function isNumInArraySum(num, array) {
    for (let i = 0; i < array.length; i++) {
        for(let j= 0; j < array.length; j++) {
            if (i !== j && (array[i] + array[j] === num)) return true;
        }
    }
    return false;
}

function findFirstInvalidNumber(nums) {
    let currentSelection = [];

    for (let i = 0; i < nums.length; i++) {
        if(i >= 25) {
            if(!isNumInArraySum(nums[i], currentSelection)) return nums[i];
            currentSelection.shift();
        }
        currentSelection.push(nums[i]);
    }
}

let invalidNumber = findFirstInvalidNumber(nums);
console.log('Part 1: ', invalidNumber);

// function findContiguousSet(nums, target) {
//     let stats = {
//         start: 0,
//         end: 1,
//         sum: nums[0] + nums[1]
//     };

//     for (let i = 2; i < nums.length; i++) {
//         if (stats.sum === target) return nums[stats.start] + nums[stats.end];
        
//         // check different "stats-window" sizes

//         stats.sum += nums[i];
//         stats.end = i
//         console.log(stats)
//     }
//     return 
// }

// console.log('Part 2: ', findContiguousSet(nums, invalidNumber));
