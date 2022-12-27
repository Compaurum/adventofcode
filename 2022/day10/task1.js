const fs = require('fs');
const lines = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((v) => {
    const arr = v.split(' ');
    if (arr[1]) {
      arr[1] = Number(arr[1]);
    }
    return arr;
  });

let sum = 0;
function checkCycle(cycle, value) {
  if (cycle % 40 === 20) {
    sum += cycle * value;
    console.log(`cycle: ${cycle}, value: ${value}, power: ${cycle * value}`);
  }
}

let cycle = 1;
let value = 1;
lines.forEach((v, i) => {
  switch (v[0]) {
    case 'addx':
      cycle++;
      checkCycle(cycle, value);
      cycle++;
      value += v[1];
      checkCycle(cycle, value);
      break;
    case 'noop':
      cycle++;
      checkCycle(cycle, value);
      break;
  }
});

console.log(`sum is ${sum}`);
