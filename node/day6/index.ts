declare global {
  interface Array<T> {
    intersection(): Array<T>;
  }
}

import InputReader from '../utils/InputReader';

const part1 = (input: string[]): number => {
  return input.reduce((prev, curr) => {
    const distinct = Array.from(new Set(curr.replace(/\n/g, '').split(''))).join('');
    return prev + distinct.length;
  }, 0);
};

const part2 = (input: string[]): number => {
  return input.map(x => x.split('\n')).reduce((prev, curr) => { return prev + curr.intersection().length; }, 0);
};

Array.prototype.intersection = function () {
  return this.reduce((prev, curr) => {
    return (prev.match(new RegExp(`[${curr}]`, 'g')) || []).join('');
  });
};

const run = () => {
  console.log('Advent of Code Day 6');
  const textFile = InputReader.readTxtFile('../../day6/input.txt');
  const input = textFile.split('\n\n');
  const part1YesAnswers = part1(input);
  console.log('Part 1 answer: ', part1YesAnswers);
  const part2Answer = part2(input);
  console.log('Part 2 answer: ', part2Answer);
};

run();