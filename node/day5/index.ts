import input from './input.json';

class BoardingInfo {
  upperRow: number = 127;
  lowerRow: number = 0;
  upperColumn: number = 7;
  lowerColumn: number = 0;
}

const getPassportSeatIds = (input: string[]): number[] => {
  return input.reduce((prev, curr) => {
    const boardingInfo: BoardingInfo = new BoardingInfo();
    let { upperColumn, lowerColumn, lowerRow, upperRow } = boardingInfo;
    let finalRow = 0;
    let finalColumn = 0;
    
    for (const character of curr) {
      switch(character) {
        case 'F': 
          upperRow = Math.floor((upperRow + lowerRow) / 2);
          finalRow = upperRow;
        break;
        case 'B': 
          lowerRow = Math.ceil((upperRow + lowerRow) / 2);
          finalRow = upperRow;
        break;
        case 'L':
          upperColumn = Math.floor((upperColumn + lowerColumn) / 2);
          finalColumn = upperColumn;
        break;
        case 'R': 
          lowerColumn = Math.floor((upperColumn + lowerColumn) / 2);
          finalColumn = upperColumn;
        break;
      }
    }

    const seatId = (finalRow * 8) + finalColumn;
    prev.push(seatId);

    return prev;
  }, new Array<number>());
};

const getHighestPassportSeatIds = (input: string[]): number => {
  const seatIds = getPassportSeatIds(input);
  return seatIds.reduce((prev, curr) => curr > prev ? curr : prev);
};

const findMySeatId = (input: string[]): number => {
  const seatIds = getPassportSeatIds(input);
  const sortedSeatIds = seatIds.sort((a, b) => a - b);
  for (let i = 1; i < sortedSeatIds.length; i++) {
    const currentId = sortedSeatIds[i];
    const lastId = sortedSeatIds[i -1];
    if (currentId - lastId === 2) {
      return currentId - 1;
    }
  }
  return 0;
};

const run = () => {
  console.log('Advent of Code Day 5');
  const highestSeatId = getHighestPassportSeatIds(input);
  console.log('Highest Seat Id: ', highestSeatId);
  const mySeatId = findMySeatId(input);
  console.log('My seat id is ', mySeatId);
};

run();