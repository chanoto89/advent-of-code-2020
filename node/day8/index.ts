import InputReader from '../utils/InputReader';
type AccumulatorStep = {
  instruction: string;
  operation: number;
};

type ProgramResult = {
  accumulator: number;
  lastIndex: number;
};

const getAccumulatorSteps = (input: string[]): AccumulatorStep[] => {
  return input.map(x => {
    const [instruction, operation] = x.split(' ');
    return {
      instruction, 
      operation: Number(operation.replace('+', '')),
    };
  });
};

const runSteps = (accumulatorSteps: AccumulatorStep[]): ProgramResult => {
  let accumulator = 0;
  let currenIndex = 0;
  const hitIndexes: { [key: string]: number } = {};

  while(true) {
    const currentStep = accumulatorSteps[currenIndex];

    if (!currentStep) {
      break;
    }

    const { instruction, operation } = currentStep;
    hitIndexes[currenIndex] = 1;
    
    switch(instruction) {
      case 'nop':
        currenIndex++;
        break;
      case 'acc':
        accumulator += operation;
        currenIndex++;
        break;
      case 'jmp':
        currenIndex += operation;
        break;
    }

    if (hitIndexes[currenIndex]) {
      break;
    }
  }

  return { accumulator, lastIndex: currenIndex };
};

const getPart2Accumulator = (accumulatorSteps: AccumulatorStep[]): ProgramResult => {
  let result: ProgramResult = { accumulator: 0, lastIndex: 0 };
  
  for (let i = 0; i < accumulatorSteps.length; i++) {
    const step = accumulatorSteps[i];
    const { instruction } = step;
    if (!['jmp', 'nop'].includes(instruction)) {
      continue;
    }

    const stepCopy = accumulatorSteps.map(x => Object.assign({}, x));
    stepCopy[i].instruction = instruction === 'jmp' ? 'nop' : 'jmp';

    result = runSteps(stepCopy);
    if (result.lastIndex === stepCopy.length) {
      return result;
    }
  }

  return result;
};

const run = () => {
  console.log('Advent of Code Day 8');
  const file = InputReader.readTxtFile('../../day8/input.txt');
  const input = file.split('\n');
  const accumulatorSteps = getAccumulatorSteps(input);
  const part1Accumulator = runSteps(accumulatorSteps);
  console.log('Part 1 Answer: ', part1Accumulator);
  const part2Accumulator = getPart2Accumulator(accumulatorSteps);
  console.log('Part 2 Answer: ', part2Accumulator);
};

run();