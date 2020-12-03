// let data = 'INPUT DATA';
let map = data.split('\n');

let isTree = (line, x) => line[x] === '#'

function countTrees(map, [slopeX, slopeY], [currentX,currentY] = [0,0]) {
    let numberOfTrees = 0;

    for (currentY; currentY < map.length; currentY += slopeY) {
        if(isTree(map[currentY], currentX % map[currentY].length)) numberOfTrees++;
        currentX += slopeX;
    }
    return numberOfTrees;
}

const slopes = [
    [1,1], 
    [3,1], 
    [5,1],
    [7,1],
    [1,2]];

let part1 = countTrees(map, [3,1]);

let part2 = slopes.reduce((acc, current) => acc * countTrees(map, current), 1);

console.log(part1, part2);
