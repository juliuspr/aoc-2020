// let data = `INPUT DATA`

const COLOR_MATCH = /(\w+\s+\w+)(?=\s+bag)/;
const NUMBER_WITH_COLOR_MATCH = /([1-9])\s+(\w+\s+\w+)(?=\s+bag)/;

function processContents(contents) {
    if (contents === 'no other bags.') return [];

    return contents.split(', ').reduce(
        (acc, item) => {
            let [_, number, color] = item.match(NUMBER_WITH_COLOR_MATCH);
            return [...acc, {color, number: parseInt(number)}]
        }, []);
}

function mapBag(input) {
    let [bag, contents] = input.split(' contain '); 

    return {color: bag.match(COLOR_MATCH)[0], contents: processContents(contents)};
}

function isInitialBagInTheContentsOfCurrentBag(initial, current) {
    for (let content of current.contents) {
        if (initial === content.color) return true;
    }
    return false;    
}

function findContainersFor(initial, processedBags) {
    const canContainShinyGold = new Set();

    function internalRecursionFunc(starting) {
        for (let bag of processedBags) {
           if(isInitialBagInTheContentsOfCurrentBag(starting, bag)) {
               canContainShinyGold.add(bag);
               internalRecursionFunc(bag.color);
           }
        } 
    }
    internalRecursionFunc(initial);

    return canContainShinyGold;
}

function findContentsFor(initial, processedBags) {
    
    function countBranches(initialColor) {
        let node = processedBags.filter(node => node.color === initialColor)[0];

        if (node.contents.length === 0) return 0;

        let sum = 0;
        for (let child of node.contents) {
            sum += child.number + (child.number * countBranches(child.color));
        }
        return sum;
    }

    return countBranches(initial);
}

let bags = data.split('\n').map(mapBag);

const part1 = findContainersFor('shiny gold', bags);
console.log(part1);

const part2 = findContentsFor('shiny gold', bags);
console.log(part2);
