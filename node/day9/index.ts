import InputReader from '../utils/InputReader';

const getPreambleNumbers = (input: number[], preambleLength: number): Map<string, number> => {
  const validNumbers = new Map();
  for (let i = 0; i < preambleLength; i++) {
    const firstNumber = input[i];
    for (let j = 0; j < preambleLength; j++) {
      if (i === j) {
        continue;
      }
      const secondNumber = input[j];
      validNumbers[`${firstNumber}-${secondNumber}`] = firstNumber + secondNumber;
    }
  }
  return validNumbers;
};

const findBadNumber = (input: number[], preambleLength: number) => {
  const validNumbers = getPreambleNumbers(input, preambleLength);

  for (let i = preambleLength; i < input.length; i++) {
    const nextNumber = input[i];
    const firstNumber = input[i - preambleLength];
    if (!Object.values(validNumbers).includes(nextNumber)) {
      return nextNumber;
    } else {
      const spacesToGoBack = preambleLength - 1;
      for (let j = i - spacesToGoBack; j < i; j++) {
        // Set addition of all numbers
        const prevNumberToAdd = input[j];

        delete validNumbers[`${firstNumber}-${prevNumberToAdd}`];
        delete validNumbers[`${prevNumberToAdd}-${firstNumber}`];

        validNumbers[`${nextNumber}-${prevNumberToAdd}`] = nextNumber + prevNumberToAdd;
      }
    }
  }

  return 0;
};

const findContinousRange = (input: number[], badNumber: number): number => {
  const badNumberIndex = input.indexOf(badNumber);

  for (let i = 0; i < badNumberIndex; i++) {
    const firstNumber = input[i];
    let total = firstNumber;
    let j = i + 1;
    for (j; j < badNumberIndex; j++) {
      const nextNumber = input[j];
      total += nextNumber;

      if (total >= badNumber) {
        break;
      }
    }

    if (total === badNumber) {
      const totalSlice = input.slice(i, j + 1).sort((a, b) => a - b);
      return totalSlice[0] + totalSlice[totalSlice.length - 1];
    }
  }

  return -1;
};

(() => {
  console.log('Advent of Code Day 9');
  const file = InputReader.readTxtFile('../../day9/input.txt');
  const input = file.split('\n').map(x => Number(x));
  const badNumberPart1 = findBadNumber(input, 25);
  console.log('Part 1 Answer: ', badNumberPart1);
  const badRangePart2 = findContinousRange(input, badNumberPart1);
  console.log('Part 2 Answer: ', badRangePart2);
})();