import InputReader from '../utils/InputReader';

const calculateYesPerGroup = (input: string[]): number => {
  return input.reduce((prev, curr) => {
    curr = Array.from(new Set(curr.replace(/\n/g, '').split(''))).toString();
    return prev + (curr.match(new RegExp('[a-z]', 'g')) || []).length;
  }, 0);
};

const calculateUniqueYesAnswers = (input: string[]): number => {
  return input.reduce((prev, group) => {
    const members = group.split('\n');
    if (members.length > 1) {
      let matchingAnswers = members[0];
      for (let i = 1; i < members.length; i++) {
        let memberAnswer = members[i];
        memberAnswer = memberAnswer.split('').join(',');
        matchingAnswers = (matchingAnswers.match(new RegExp(`[${memberAnswer}]`, 'g')) || []).toString();
        if (!matchingAnswers.length) {
          break;
        }
      }
      prev += matchingAnswers.replace(/[,]/g, '').length;
    } else {
      prev += group.length;
    }
    return prev;
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
  const answerRegex = newValue.split('').join(',');
  return (oldValue.match(new RegExp(`[${answerRegex}]`, 'g')) || []).toString().replace(/[,]/g, '');
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