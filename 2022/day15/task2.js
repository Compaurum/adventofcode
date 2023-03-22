const fs = require('fs');

// function createGrid(x, y, value) {
//   const grid = new Array(y).fill(value);
//   grid.forEach((v, i) => (grid[i] = new Array(x).fill(value)));
//   return grid;
// }

function merge(a, b) {
  return (a.s <= b.s && b.s <= a.e) || (b.s <= a.s && a.s <= b.e)
    ? [{ s: Math.min(a.s, b.s), e: Math.max(a.e, b.e) }]
    : [a, b];
}
function mergeBoundaries(boundaries) {
  if (!boundaries.length) return [];
  boundaries.sort((a, b) => a.s - b.s);

  const newA = [boundaries.shift()];
  while (boundaries.length > 0) {
    newA.push(...merge(newA.pop(), boundaries.shift()));
  }
  return newA;
}

const lines = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((l) => l.match(/-?[\d]+/gm).map((v) => Number(v)));

const limit = 4000000;

for (let i = 0; i <= limit; i++) {
  const lineBoundaries = [];

  lines.forEach((l) => {
    const s = { x: l[0], y: l[1] };
    const b = { x: l[2], y: l[3] };

    const distance = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);
    const overlap = distance - Math.abs(s.y - i);
    if (overlap < 0) return;
    lineBoundaries.push({ s: s.x - overlap, e: s.x + overlap });
  });

  const merged = mergeBoundaries(lineBoundaries);
  if (merged[0].s >= 0 || merged[0].e <= limit) {
    console.log(merged);
    console.log(`index is i ${i}`);
    console.log(`answer is ${(merged[0].e + 1) * limit + i}`);
    break;
  }
}
