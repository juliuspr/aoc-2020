// let data = 'INPUT DATA'

const findRow = (input) => {
    let bottom = 0, top = 127, middle

    for (let letter of input) {
        middle = Math.floor((top + bottom) / 2)
        if (letter === 'F') top = middle 
        else bottom = middle
    }
    return top
}

const findColumn = (input) => {
    let bottom = 0, top = 7, middle

    for (let letter of input) {
        middle = Math.ceil((top + bottom) / 2)
        if (letter === 'L') top = middle
        else bottom = middle
    }
    return bottom
}

const findSeat = (boardingPass) => {
   const row = boardingPass.slice(0, 7)
   const column = boardingPass.slice(7)
   return {row: findRow(row), column: findColumn(column)}
}

const seatID = ({row, column}) => row * 8 + column

let seats = data.split('\n')

console.log('Part 1: ', seats.map(seat => seatID(findSeat(seat))).sort((a,b) => b-a)[0])

const ids = seats.map(seat => seatID(findSeat(seat))).sort((a,b) => a-b)

let seatsWithoutOneNeighboor = []
for (let i = 0; i < ids.length; i++) {
    if(!ids.includes(ids[i]+1) || !ids.includes(ids[i]-1)) seatsWithoutOneNeighboor.push(ids[i])
}

console.log('Part 2: ', seatsWithoutOneNeighboor)
