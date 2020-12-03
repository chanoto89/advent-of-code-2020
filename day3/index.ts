import input from './input.json';

const countTrees = (map: string[][], down: number, right: number) => {
  let currentXIndex = 0;
  let currentYIndex = 0;
  let totalTrees = 0;
  const endOfMapY = map.length;

  while(currentYIndex < endOfMapY) {
    const row = map[currentYIndex];
    const rowLength = row.length;
    const value = currentXIndex >= rowLength ? row[currentXIndex % rowLength] : row[currentXIndex];
    if (value === '#') {
      totalTrees++;
    }
    currentYIndex += down;
    currentXIndex += right;
  }

  return totalTrees;
};

const run = () => {
  console.log('Advent of Code Day 3');

  const map = input.reduce((prev, curr) => {
    prev.push(curr.split(''));
    return prev;
  }, new Array<string[]>());

  const part1Trees = countTrees(map, 1, 3);
  console.log(`You have hit ${part1Trees} trees for part 1`);

  const traversals = [
    { right: 1, down: 1 }, 
    { right: 3, down: 1 }, 
    { right: 5, down: 1 }, 
    { right: 7, down: 1 }, 
    { right: 1, down: 2 }, 
   ];

  const part2Sum = traversals.reduce((prev, curr) => {
    return prev *= countTrees(map, curr.down, curr.right);
  }, 1);

  console.log(`You have hit ${part2Sum} trees for part 2`);
};

run();