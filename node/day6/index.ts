import InputReader from '../utils/InputReader';

const calculateYesPerGroup = (input: string[]): number => {
  return input.reduce((prev, curr) => {
    const distinct = Array.from(new Set(curr.replace(/\n/g, '').split(''))).join('');
    return prev + distinct.length;
  }, 0);
};

const calculateUniqueYesAnswersV2 = (input: string[]): number => {
  return input.reduce((prev, group) => {
    const members = group.split('\n');
    prev += members.reduce((matches, currAnswer) => {
      return stringIntersection(matches, currAnswer);
    }).length;
    return prev;
  }, 0);
};

const stringIntersection = (oldValue: string, newValue: string) => {
  return (oldValue.match(new RegExp(`[${newValue}]`, 'g')) || []).join('');
};


const run = () => {
  console.log('Advent of Code Day 6');
  const textFile = InputReader.readTxtFile('../../day6/input.txt');
  const input = textFile.split('\n\n');
  const part1YesAnswers = calculateYesPerGroup(input);
  console.log('Part 1 answer: ', part1YesAnswers);
  const part2Answer = calculateUniqueYesAnswersV2(input);
  console.log('Part 2 answer: ', part2Answer);
};

run();