const fs = require('fs');

const xBoundaries = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
const yBoundaries = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
const lines = fs
  .readFileSync('debug.txt')
  .toString()
  .split('\n')
  .map((line) =>
    line.split(' -> ').map((v) => {
      const coord = v.split(',').map((v) => Number(v));
      yBoundaries[0] = Math.min(yBoundaries[0], coord[0]);
      yBoundaries[1] = Math.max(yBoundaries[1], coord[0]);
      xBoundaries[0] = Math.min(xBoundaries[0], coord[1]);
      xBoundaries[1] = Math.max(xBoundaries[1], coord[1]);
      return coord;
    }),
  );

console.log(lines);
console.log(xBoundaries);
console.log(yBoundaries);

const grid = new Array(xBoundaries[1] + 1).fill('.');
grid.forEach((v, i) => (grid[i] = new Array(yBoundaries[1] + 1).fill('.')));
// console.log(grid);

lines.forEach((line) =>
  line.forEach((item, i) => {
    if (i === 0) {
      grid[item[1]][item[0]] = '#';
      return;
    }

    // x index changed
    const start = line[i - 1];
    const end = line[i];
    let diff = end[0] - start[0];
    for (let index = 0; index < Math.abs(diff); index++) {
      start[0] += diff / Math.abs(diff);
      grid[start[1]][start[0]] = '#';
    }
    diff = end[1] - start[1];
    for (let index = 0; index < Math.abs(diff); index++) {
      start[1] += diff / Math.abs(diff);
      grid[start[1]][start[0]] = '#';
    }
  }),
);

// throw sand
let counter = 0;
while (true) {
  const pos = [-1, 500];
  let finish;
  // one item falling
  while (true)
    if (pos[0] >= xBoundaries[1]) {
      finish = true;
      break;
    } else if (grid[pos[0] + 1][pos[1]] === '.') {
      pos[0] += 1;
    } else if (grid[pos[0] + 1][pos[1] - 1] === '.') {
      pos[0] += 1;
      pos[1] -= 1;
    } else if (grid[pos[0] + 1][pos[1] + 1] === '.') {
      pos[0] += 1;
      pos[1] += 1;
    } else {
      break;
    }

  if (finish || pos[0] === -1) {
    break;
  }
  grid[pos[0]][pos[1]] = 'o';
  counter++;
}

grid.forEach((g) => {
  console.log(JSON.stringify(g));
});
console.log('--------------');
console.log(counter);
