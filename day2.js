// Prepare data
const list = data.split('\n').map(processEntries);

function processEntries(entry) {
   entry = entry.split(':');
   const [range, letter] = entry[0].split(' ');

   return {
       letter: letter,
       min: parseInt(range.split('-')[0]),
       max: parseInt(range.split('-')[1]),
       password: entry[1].trim()
   }
}

// Solution 1: Part 1
function findValidPasswords(list) {
    const validPasswords = [];
    for (const entry of list) {
        let regex = new RegExp(entry.letter, 'g');
        let numberOfOccurences = entry.password.match(regex);

        if (numberOfOccurences && numberOfOccurences.length >= entry.min && numberOfOccurences.length <= entry.max) {
            validPasswords.push(entry.password);
        }
    }
    return validPasswords;
}
// Solution 1: Part 2
function findValidPasswords2(list) {
    const validPasswords = [];
    for (const e of list) {
        let min = e.min - 1
        let max = e.max - 1
        if (
            (e.password[min] === e.letter || e.password[max] === e.letter) &&
            !(e.password[min] === e.letter && e.password[max] === e.letter)
           ) {
            validPasswords.push(e.password);
        }
    }
    return validPasswords; 
}


// Solution 2
function findValidPasswords3(list, isValid) {
    const validPasswords = [];
    for (const entry of list) {
        if (isValid(entry)) validPasswords.push(entry.password)
    }
    return validPasswords;
}

function part1Rule(entry) {
    let regex = new RegExp(entry.letter, 'g');
    let numberOfOccurences = entry.password.match(regex);

    return numberOfOccurences && numberOfOccurences.length >= entry.min && numberOfOccurences.length <= entry.max
}

function part2Rule({min, max, letter, password}) {
    return (password[min - 1] === letter || password[max - 1] === letter) &&
        !(password[min - 1] === letter && password[max - 1] === letter)   
}


console.log(findValidPasswords(list));
console.log(findValidPasswords2(list));
console.log(findValidPasswords3(list, part1Rule));
console.log(findValidPasswords3(list, part2Rule));
