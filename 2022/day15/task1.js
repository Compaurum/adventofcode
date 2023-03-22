const fs = require('fs');

// function createGrid(x, y, value) {
//   const grid = new Array(y).fill(value);
//   grid.forEach((v, i) => (grid[i] = new Array(x).fill(value)));
//   return grid;
// }

let xBoundaries = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
let yBoundaries = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
let maxDistance = 0;
const lines = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((l) => {
    const numbers = l.match(/-?[\d]+/gm).map((v) => Number(v));
    xBoundaries = {
      min: Math.min(xBoundaries.min, numbers[0], numbers[2]),
      max: Math.max(xBoundaries.max, numbers[0], numbers[2]),
    };
    yBoundaries = {
      min: Math.min(yBoundaries.min, numbers[1], numbers[3]),
      max: Math.max(yBoundaries.max, numbers[1], numbers[3]),
    };

    const s = { x: numbers[0], y: numbers[1] };
    const b = { x: numbers[2], y: numbers[3] };
    const distance = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);
    maxDistance = Math.max(distance, maxDistance);
    // console.log(maxDistance);
    return numbers;
  });
const modul = { x: Math.abs(xBoundaries.min) + maxDistance, y: Math.abs(yBoundaries.min) };

const controlY = 2000000 + modul.y;
// const controlY = 10 + modul.y;
const controlLine = new Array(xBoundaries.max + modul.x + 1 + maxDistance).fill('.');

lines.forEach((l) => {
  l[0] += modul.x;
  l[2] += modul.x;
  l[1] += modul.y;
  l[3] += modul.y;
});
// console.log(lines);
console.log(xBoundaries);
console.log(yBoundaries);

// const grid = createGrid(xBoundaries.max + modul.x + 1, yBoundaries.max + modul.y + 1, '.');
let counter = 0;

lines.forEach((l, i) => {
  const s = { x: l[0], y: l[1] };
  const b = { x: l[2], y: l[3] };
  if (s.y === controlY) {
    controlLine[s.x] = 'S';
  }
  if (b.y === controlY) {
    controlLine[b.x] = 'B';
  }
  // grid[s.y][s.x] = 'S';
  // grid[b.y][b.x] = 'B';

  // console.log(`index ${i}`);
  const distance = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);
  const overlap = distance - Math.abs(s.y - controlY);

  // signal has no effect on controlLine
  if (overlap < 0) {
    return;
  }

  for (let i = 0; i <= overlap; i++) {
    if (controlLine[s.x + i] === '.') {
      controlLine[s.x + i] = '#';
      counter++;
    }
    if (controlLine[s.x - i] === '.') {
      controlLine[s.x - i] = '#';
      counter++;
    }
  }
});

console.log(counter);
// process.stdout.write(controlLine.toString());
// showGrid();
// function showGrid() {
//   grid.forEach((g) => {
//     g.forEach((i) => process.stdout.write(i));
//     process.stdout.write('\n');
//   });
// }
