import input from './input.json';

const part1 = () => {
  return input.reduce((prev, curr) => {
    const [count, value, password] = curr.replace(':', '').split(' ');
    const [countA, countB] = count.split('-');
    const occurrences = (password.match(new RegExp(value,'g')) || []).length;
    if (occurrences >= Number(countA) && occurrences <= Number(countB)) {
      prev.push(password);
    }

    return prev;
  }, new Array<string>());
};

const part2 = () => {
  return input.reduce((prev, curr) => {
    const [positions, value, password] = curr.replace(':', '').split(' ');
    const [positionA, positionB] = positions.split('-');
    const positionAMatch = password[Number(positionA) - 1] === value;
    const positionBMatch = password[Number(positionB) - 1] === value;
    if ((positionAMatch && !positionBMatch) || (!positionAMatch && positionBMatch)) {
      prev.push(password);
    }
    return prev;
  }, new Array<string>());
};

const run = () => {
  console.log('Advent of Code Day 2');
  const part1ValidPasswords = part1();
  console.log('Part 1 valid passwords: ', part1ValidPasswords.length);
  const part2ValidPasswords = part2();
  console.log('Part 2 valid passwords: ', part2ValidPasswords.length);
};

run();