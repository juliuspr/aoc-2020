// let data = 'INPUT DATA'

let groups = data.split('\n\n')

let uniqueAnswersPerGroup = groups.map((group) => new Set(group.split('\n').map(person => person.split('')).flat()).size) 

let totalAnswers = uniqueAnswersPerGroup.reduce((acc, current) => acc + current, 0)

console.log('Part 1: ', totalAnswers)


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

let result2 = groups.map((group) => sharedAnswerCountPerGroup(group).length).reduce((acc, curr) => acc + curr, 0)

console.log('Part 2: ', result2)
