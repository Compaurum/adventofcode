const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString().split('\n');

const grid = [];
lines.forEach((l) => grid.push(l.split('').map((v) => Number(v))));

let visibility = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid.length; j++) {
    visibility = Math.max(consider(i, j), visibility);
  }
}

function consider(x, y) {
  let toRight = 0,
    toLeft = 0,
    toBottom = 0,
    toTop = 0;

  // toRight
  for (let j = y + 1; j < grid.length; j++) {
    toRight++;
    if (grid[x][j] >= grid[x][y]) break;
  }
  // console.log(`compare: ${grid[x][j]},${grid[x][y]}, [${x},${y}] - toRight: ${toRight}`);

  // bottom
  for (let j = x + 1; j < grid.length; j++) {
    toBottom++;
    if (grid[j][y] >= grid[x][y]) break;
  }
  // console.log(`[${x},${y}] - toBottom: ${toBottom}`);

  //left
  for (let j = y - 1; j >= 0; j--) {
    toLeft++;
    if (grid[x][j] >= grid[x][y]) break;
  }

  //top
  for (let j = x - 1; j >= 0; j--) {
    toTop++;
    if (grid[j][y] >= grid[x][y]) break;
  }
  return toBottom * toTop * toLeft * toRight;
}

// let counter = 0;
// treeVisibility.map((t) =>
//   t.map((v) => {
//     if (v) counter++;
//   }),
// );

// for (let i = 0; i < grid.length; i++) {
//   for (let j = 0; j < grid.length; j++) {}
// }

console.log(grid);
console.log(visibility);
// console.log(treeVisibility);
// console.log(counter);
