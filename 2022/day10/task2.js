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

function checkCycle(cycle, value) {
  const position = (cycle - 1) % 40;
  if (position === 0) {
    process.stdout.write('\n');
  }

  process.stdout.write(`${Math.abs(value - position) < 2 ? '#' : '.'}`);
}

// console.log(lines);
let cycle = 1;
let value = 1;
lines.forEach((v, i) => {
  switch (v[0]) {
    case 'addx':
      checkCycle(cycle, value);
      cycle++;
      checkCycle(cycle, value);
      cycle++;
      value += v[1];
      break;
    case 'noop':
      checkCycle(cycle, value);
      cycle++;
      break;
  }
});
