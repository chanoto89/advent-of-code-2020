import InputReader from '../utils/InputReader';
import { passportConditions } from './passportConditions.json';

const getValidPassports = (input: string[], shouldValidate?: boolean): string[] => {
  const validFields = Object.keys(passportConditions);
  return input.reduce((prev, curr) => {
    curr = curr.trim().replace(/\n/g, ' ');
    if (validFields.every(x => curr.includes(x))) {
      if (shouldValidate && !validatePassport(curr)) {
        return prev;
      }
      prev.push(curr);
    }
    return prev;
  }, new Array<string>());
};

const validatePassport = (passportEntry: string) : boolean => {
  let isValid = true;
  for (let field in passportConditions) {
    const fieldIndex = passportEntry.indexOf(field) + field.length;
    const valueEnd = passportEntry.indexOf(' ', fieldIndex);
    const value = passportEntry.substring(fieldIndex, valueEnd === -1 ? undefined : valueEnd);
    
    const condition = passportConditions[field];
    const { type } = condition;
    switch (type) {
      case 'range':
        isValid = value >= condition.min && value <= condition.max;
        break;
      case 'conditionRange':
        const rangeConditions = condition.rangeConditions;
        const conditionKeys = Object.keys(rangeConditions);
        const matchingCondition = conditionKeys.find(x => value.includes(x));
        if (matchingCondition) {
          const rangeCondition = rangeConditions[matchingCondition];
          const stripedValue = value.replace(matchingCondition, '');
          isValid = Number(stripedValue) >= rangeCondition.min && Number(stripedValue) <= rangeCondition.max;
        } else {
          isValid = false;
        }
        break;
      case 'regex':
        isValid = (value.match(new RegExp(condition.regex)) || []).length > 0;
        break;
      case 'set': 
        isValid = condition.options.includes(value);
        break;
      case 'number':
        isValid = !isNaN(Number(value)) && value.length === condition.digits;
        break;
    }

    if (!isValid) {
      return false;
    }
  }

  return isValid;
};

const run = () => {
  console.log('Advent of Code Day 4');
  const fileString = InputReader.readTxtFile('../../day4/input.txt');
  const input = fileString.split('\n\n');
  const part1Passports = getValidPassports(input);
  console.log('Part 1 valid passports: ', part1Passports.length);
  const part2Passports = getValidPassports(input, true);
  console.log('Part 2 valid passports: ', part2Passports.length);
};

run();