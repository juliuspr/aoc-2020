// const data = 'INPUT DATA';

let passports = data.split('\n\n').map((passport) => {
    return passport
        .replace(/\r?\n|\r/g, ' ')
        .split(' ')
        .map(field => field.split(':'))
        .reduce((acc, [k, v]) =>  ({...acc, [k]: v}), {});
});

// PART 1

let requiredFields = ['byr', 'iyr','eyr','hgt','hcl','ecl','pid'];

const validatePassport = (passport) => {   
    for (let field of requiredFields) {
        if(!passport[field]) return false;
    }
    return true;
}

console.log('Part 1: ', passports.filter(validatePassport).length);

// PART 2

const validateLength = (field, { length }) => {
    return (passport) => passport[field] && (passport[field].length === length);   
}

const validateInRange = (field, { min, max }) => {
    return (passport) => {
        if (!passport[field]) return false;
        let value = parseInt(passport[field])
        if(value >= min && value <= max) return true
        return false;
    }
}

const validateIsIn = (field, { arr }) => {
    return (passport) => arr.filter((item) => passport[field] === item).length === 1 ? true : false
}

const validateHEX = (field) => (passport) => (passport[field] && passport[field].match(/#([0-9 a-f])\w+/g))
    
const validateHeight = (field, { conditions })  => {
    return (passport) => {
        if (!passport[field]) return false;

        for (let condition of conditions) {
            let {0: result, 1: number, 2: unit} = passport[field].match(/([0-9]+)(in|cm)/);
            let inRange = (parseInt(number) >= condition.min && parseInt(number) <= condition.max);
            
            if(unit === condition.unit && inRange) return true;
        }
        return false;
    }
}

let composePredicates = (...predicates) => {
    return (passport) => {
        for (let predicate of predicates) {
            if (!predicate(passport)) return false;
        }    
        return true;
    }
}

let composed = composePredicates(
    validateLength('byr',{ length: 4 }),
    validateInRange('byr', { min: 1920, max: 2002 }),
    validateLength('iyr',{ length: 4}),
    validateInRange('iyr', { min: 2010, max: 2020 }),
    validateLength('eyr',{ length: 4 }),
    validateInRange('eyr', { min: 2020, max: 2030 }),
    validateHeight('hgt', { conditions: [{unit: 'cm', min: 150, max: 193}, {unit: 'in', min: 59, max: 76}] }),
    validateHEX('hcl'),
    validateIsIn('ecl', { arr: "amb blu brn gry grn hzl oth".split(' ') }),
    validateLength('pid', { length: 9 })
    );

let result = passports.filter(composed);

let result2 = passports
    .filter(validateLength('byr',{length: 4}))
    .filter(validateInRange('byr', {min: 1920, max: 2002}))
    .filter(validateLength('iyr',{length: 4}))
    .filter(validateInRange('iyr', {min: 2010, max: 2020}))
    .filter(validateLength('eyr',{length: 4}))
    .filter(validateInRange('eyr', {min: 2020, max: 2030}))
    .filter(validateHeight('hgt', { conditions: [{unit: 'cm', min: 150, max: 193}, {unit: 'in', min: 59, max: 76}] }  ))
    .filter(validateHEX('hcl'))
    .filter(validateIsIn('ecl', {arr: "amb blu brn gry grn hzl oth".split(' ') }))
    .filter(validateLength('pid', {length: 9}));

console.log('Passports total: ', passports.length);
console.log('Part 2: ', result.length, result2.length);
