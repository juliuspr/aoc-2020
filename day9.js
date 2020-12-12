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

function findContiguousSet(nums, target) {
    for (let windowSize = 2; windowSize < nums.length; windowSize++) {
        for (let i = 0; i < nums.length; i++) {
            let range = nums.slice(i, i + windowSize)
            let rangeSum = range.reduce((acc, num) => acc + num, 0)

            let sortedRange = range.sort((a,b) => a-b)
            if (rangeSum === target) return sortedRange[0] + sortedRange[sortedRange.length-1]
        } 
    }
}

console.log('Part 2: ', findContiguousSet(nums, invalidNumber));
