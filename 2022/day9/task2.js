const fs = require('fs');
const lines = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((v) => {
    const arr = v.split(' ');
    arr[1] = Number(arr[1]);
    return arr;
  });

// for task1 leave only two items in the array
const rope = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

function visualiseRope() {
  const treeVisibility = new Array(40).fill('.');
  treeVisibility.forEach((v, i) => (treeVisibility[i] = new Array(40).fill('.')));
  const startingPoint = { x: 12, y: 6 };
  rope.forEach((v, i) => {
    treeVisibility[v.x + startingPoint.x][v.y + startingPoint.y] = i;
  });
  for (let i = 40 - 1; i >= 0; i--) {
    const tmp = [];
    for (let j = 0; j < 40; j++) {
      tmp.push(treeVisibility[j][i]);
    }
    console.log(tmp.join(' '));
  }

  console.log('            -----             ');
}
const tailMoves = [{ ...rope[rope.length - 1] }];

function lean(s, t) {
  if (s === t) return t;
  if (s < t) return t - 1;
  if (s > t) return t + 1;
}
function moveTail(direction, count) {
  for (let counter = 0; counter < count; counter++) {
    for (let t = 1; t < rope.length; t++) {
      const h = t - 1;
      let changed = true;
      if (rope[h].x - rope[t].x > 1) {
        rope[t] = { x: rope[t].x + 1, y: lean(rope[h].y, rope[t].y) };
      } else if (rope[h].x - rope[t].x < -1) {
        rope[t] = { x: rope[t].x - 1, y: lean(rope[h].y, rope[t].y) };
      } else if (rope[h].y - rope[t].y > 1) {
        rope[t] = { x: lean(rope[h].x, rope[t].x), y: rope[t].y + 1 };
      } else if (rope[h].y - rope[t].y < -1) {
        rope[t] = { x: lean(rope[h].x, rope[t].x), y: rope[t].y - 1 };
      } else {
        changed = false;
      }

      if (changed) {
        tailMoves.push({ ...rope[rope.length - 1] });
        // visualiseRope();
      }
    }
  }
  // visualiseRope();
  return;
}

lines.forEach((l) => {
  switch (l[0]) {
    case 'R':
      rope[0].x += l[1];
      moveTail(l[0], l[1]);
      break;
    case 'L':
      rope[0].x -= l[1];
      moveTail(l[0], l[1]);
      break;
    case 'U':
      rope[0].y += l[1];
      moveTail(l[0], l[1]);
      break;
    case 'D':
      rope[0].y -= l[1];
      moveTail(l[0], l[1]);
      break;
  }
});

// console.log(tailMoves);

// count unique values
const map = {};
tailMoves.forEach((m) => {
  map[`${m.x}:${m.y}`] = 1;
});

console.log(`amount of positions: ${Object.keys(map).length}`);
