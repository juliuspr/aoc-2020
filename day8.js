// let data = `INPUT DATA`;
let lines = data.split('\n');

function sandboxRunner() {
    let accValue = 0;

    function interpret(lineNr, lineCode) {
        let [instruction, argument] = lineCode.split(' ');

        if (instruction === 'nop') return lineNr + 1;
        if (instruction === 'jmp') return lineNr + parseInt(argument);
        if (instruction === 'acc') {
            accValue = accValue + parseInt(argument);
            return lineNr + 1;
        }
    }

    return function execute(lines) {
        let currentLine = 0;
        let visitedLines = new Set();

        while(!visitedLines.has(currentLine) && lines[currentLine]) {
            visitedLines.add(currentLine);
            currentLine = interpret(currentLine, lines[currentLine]);    
        }   
        return {currentLine, visitedLines, accValue};
    }
}

let run = sandboxRunner();
console.log('Part 1: ', run(lines));

function findIncorretctLine(lines) {
    for (let i = 0; i < lines.length; i++) {
        let l = [...lines];
        let run = sandboxRunner();

        let instruction = l[i].split(' ')[0];
        if(instruction === 'jmp') l[i] = l[i].replace(/jmp/, 'nop');
        if(instruction === 'nop') l[i] = l[i].replace(/nop/, 'jmp');
        
        let attempt = run(l);
        if (attempt.currentLine === l.length) return attempt.accValue;
    }
    return "No version of the code attempted to execute the line after the last one"
}

console.log('Part 2: ', findIncorretctLine(lines));
