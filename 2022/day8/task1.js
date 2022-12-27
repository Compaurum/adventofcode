const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString().split('\n');

const grid = [];
lines.forEach((l) => grid.push(l.split('').map((v) => Number(v))));
const treeVisibility = new Array(lines.length).fill(0);
treeVisibility.forEach((v, i) => (treeVisibility[i] = new Array(lines.length).fill(0)));

for (let i = 0; i < grid.length; i++) {
  let maxLeft = 0,
    maxRight = 0,
    maxTop = 0,
    maxBottom = 0;
  // left
  for (let j = 0; j < grid.length; j++) {
    if (j === 0) treeVisibility[i][j] = 1;
    else if (grid[i][j] > maxLeft) treeVisibility[i][j] = 1;
    maxLeft = Math.max(grid[i][j], maxLeft);
  }

  // top
  for (let j = 0; j < grid.length; j++) {
    if (j === 0) treeVisibility[j][i] = 1;
    else if (grid[j][i] > maxTop) treeVisibility[j][i] = 1;
    maxTop = Math.max(grid[j][i], maxTop);
  }

  //right
  for (let j = grid.length - 1; j >= 0; j--) {
    if (j === grid.length - 1) treeVisibility[i][j] = 1;
    else if (grid[i][j] > maxRight) treeVisibility[i][j] = 1;
    maxRight = Math.max(grid[i][j], maxRight);
  }

  //bottom
  for (let j = grid.length - 1; j >= 0; j--) {
    if (j === grid.length - 1) treeVisibility[j][i] = 1;
    else if (grid[j][i] > maxBottom) treeVisibility[j][i] = 1;
    maxBottom = Math.max(grid[j][i], maxBottom);
  }
}

let counter = 0;
treeVisibility.map((t) =>
  t.map((v) => {
    if (v) counter++;
  }),
);

// for (let i = 0; i < grid.length; i++) {
//   for (let j = 0; j < grid.length; j++) {}
// }

console.log(grid);
console.log(treeVisibility);
console.log(counter);
