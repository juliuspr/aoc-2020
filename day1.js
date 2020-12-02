// process raw data
const list = data.split('\n').map(x => parseInt(x));
    
// Part 1
function findSum(list, sum) {
    for (number of list) {
        if (list.includes(sum - number)) {
            return (number * (sum - number));
        }
    }
}

function findSum2(list, sum) {
    let set = new Set(list);
    for (number of list) {
        if (set.has(sum - number)) {
            return (number * (sum - number));
        }
    }
}

// Part 2
function findTriple(list, targetSum) {
    let seenSums = new Map();

    for (let i = 0; i < list.length; i++) {
        for(let j = i+1; j < list.length; j++) {
            if(list[i]+list[j] <= targetSum) {
                seenSums.set(list[i]+list[j], {i: i, j: j});  
            }
        }
    }

    for(let i = 0; i < list.length; i++) {
        let found = seenSums.get(targetSum - list[i]);

        if (found && i != found.i && i != found.j) {
            return list[i] * list[found.i] * list[found.j];
        } 
    }
    return;
}

function findTriple2(list, targetSum) {
    let seenSums = new Map();

    for (let num1 of list) {
        for(num2 of list) {
            for(num3 of list) {
                if (num1 + num2+ num3 === targetSum) return num1*num2*num3;
            }
        }
    }
    return;
}

function findTriple3(list, targetSum) {
    let set = new Set(list);
    for (let number of list) {
        for (let i = 1; i < list.length; i++) { // Optimization: depending on whether targetSum or list.length is larger, one could use targetSum instead of list.length for fewer iterations
            if(set.has(targetSum - number - list[i]) && set.has(list[i])) {
                return number * list[i] * (targetSum - list[i] - number);
            }
        }    
    }
    return;
}

let s4 = performance.now();
console.log(findSum(list, 2020));
let e4 = performance.now();

let s5 = performance.now();
console.log(findSum2(list, 2020));
let e5 = performance.now();

let s1 = performance.now();
console.log(findTriple(list, 2020));
let e1 = performance.now();

let s2 = performance.now();
console.log(findTriple2(list, 2020));
let e2 = performance.now();

let s3 = performance.now();
console.log(findTriple3(list, 2020));
let e3 = performance.now();

console.log('findSum: nested-loop: O(n^2): ' + (e4 - s4));
console.log('findSum: single loop, use Set(): O(n): ' + (e5 - s5));


console.log('findTriple: Precalculate sum, use Map(): O(n^2): ' + (e1 - s1));
console.log('findTriple: 3-level nested loop: O(n^3): ' + (e2 - s2))
console.log('findTriple: nested loop, use Set(): O(n^2): ' + (e3 - s3))
