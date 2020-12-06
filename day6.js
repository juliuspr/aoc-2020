// let data = 'INPUT DATA'

function solveA(data) {
    return data.split('\n\n')
                .map((group) => new Set(group.split('\n').map(person => person.split('')).flat()).size)
                .reduce((acc, current) => acc + current, 0)
}

let sharedAnswerCountPerGroup = (group) => {
    let stats = new Map(),
        membersInGroup = group.split('\n').length,
        answersInGroup = group.split('\n').join('')
    
    for (let answer of answersInGroup) {
        stats.get(answer) ? stats.set(answer, stats.get(answer) + 1) : stats.set(answer, 1) 
    }
    
    let sharedAnswers = []
    for (let answerCount of stats.entries()) {
        if (answerCount[1] == membersInGroup) sharedAnswers.push(answerCount[0])
    }
    return sharedAnswers
}

function solveB(data) {
    return data.split('\n\n')
                .map((group) => sharedAnswerCountPerGroup(group).length)
                .reduce((acc, curr) => acc + curr, 0)
}

console.log('Part 1: ', solveA(data))
console.log('Part 2: ', solveB(data))
