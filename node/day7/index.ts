import InputReader from '../utils/InputReader';

type BagTree = { [key: string]: string[] };
type BagTreeCount = { 
  [key: string]: {
    [key: string]: number
  } 
};

type TotalChildren = { [key: string]: number };

const convertToChildBagTree = (bags: string[]): BagTree => {
  return bags.reduce((prev, curr) => {
    const [bagParent, bagOptions] = curr.split(' contain ');
    const childBags = bagOptions.replace('.', '').split(',');
    for (let childBag of childBags) {
      let childBagString = (childBag.match(new RegExp('[a-z ]', 'g')) || []).join('').trim();
      if (!childBagString.endsWith('s')) { // add (s) if singular bag
        childBagString += 's';
      }
      if (prev[childBagString]) {
        prev[childBagString].push(bagParent);
      } else {
        prev[childBagString] = [bagParent];
      }
    }
    return prev;
  }, {});
};

const convertToParentBagTree = (bags: string[]): BagTreeCount => {
  return bags.reduce((prev, curr) => {
    const [bagParent, bagOptions] = curr.split(' contain ');

    const childBags = bagOptions.replace('.', '').split(', ');
    for (let childBag of childBags) {
      let [childBagCount, childBagString] = childBag.split(/ (.+)/);
      if (!childBagString.endsWith('s')) { // add (s) if singular bag
        childBagString += 's';
      }
      if (prev[bagParent]) {
        prev[bagParent][childBagString] = Number(childBagCount) || 0;
      } else {
        prev[bagParent] = { [childBagString]: Number(childBagCount) || 0 };
      }
    }
    return prev;
  }, {});
};

const getBagParentCount = (bagTree: BagTree, bagColor: string, totalParents = {}): number => {
  const bagColorParents = bagTree[bagColor];
  if (!bagColorParents) {
    return 0;
  }
  for (let parentColor of bagColorParents) {
    totalParents[parentColor] = 1;
    const matchingParent = bagTree[parentColor];

    if (matchingParent && matchingParent.length) {
      getBagParentCount(bagTree, parentColor, totalParents);
    }
  }
  return Object.keys(totalParents).length;
};

const getBagChildrenCount = (bagTree: BagTreeCount, bagColor: string, totalChildren: TotalChildren = {}): number => {
  const bagColorChildren = bagTree[bagColor];
  for (let childColor in bagColorChildren) {
    const childColorMultiplier = bagColorChildren[childColor] || 0;
    if (!totalChildren[childColor]) {
      totalChildren[childColor] = childColorMultiplier;
    } else {
      totalChildren[childColor] += childColorMultiplier;
    }
    for (let i = 0; i < childColorMultiplier; i++) {
      getBagChildrenCount(bagTree, childColor, totalChildren);
    }
  }
  return Object.values(totalChildren).reduce((prev, curr) => prev + curr);
};

const run = () => {
  console.log('Advent of Code Day 7');
  const textFile = InputReader.readTxtFile('../../day7/input.txt');
  const input = textFile.split('\n');

  const childBagTree = convertToChildBagTree(input);
  const part1Answer = getBagParentCount(childBagTree, 'shiny gold bags');
  console.log('Part 1 answer: ', part1Answer);

  const parentBagTree = convertToParentBagTree(input);
  const part2Answer = getBagChildrenCount(parentBagTree, 'shiny gold bags');
  console.log('Part 2 answer: ', part2Answer);
};

run();