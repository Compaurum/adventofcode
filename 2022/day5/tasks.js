const fs = require('fs');
const [cargoLines, movementLines] = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n\n')
  .map((t) => t.split('\n'));

const splitIntoChunks = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

let cargo1 = [];
let cargo2 = [];
cargoLines.pop();
cargoLines.map((l, li) => {
  splitIntoChunks(l, 4).map((c, i) => {
    if (li == 0) cargo1[i] = [];
    if (c[1] !== ' ') cargo1[i].unshift(c[1]);
    if (li == 0) cargo2[i] = [];
    if (c[1] !== ' ') cargo2[i].unshift(c[1]);
  });
});

movementLines.map((m) => {
  const cmd = m
    .split(/[^\d]+/gm)
    .filter((v) => v)
    .map((v) => Number(v));

  for (let i = 0; i < cmd[0]; i++) {
    const tmp = cargo1[cmd[1] - 1].pop();
    cargo1[cmd[2] - 1].push(tmp);
  }

  const len = cargo2[cmd[1] - 1].length;
  const tmp = cargo2[cmd[1] - 1].splice(len - cmd[0], len);
  cargo2[cmd[2] - 1].push(...tmp);
  console.log(cargo2);
});

const res1 = cargo1.map((c, i) => c[c.length - 1]).join('');
const res2 = cargo2.map((c, i) => c[c.length - 1]).join('');

console.log('res');
console.log(res1, res2);
// allLines
//   .slice(0, 8)
//   .reverse()
//   .map((l) => {});

// let task1 = 0;
// let task2 = 0;
// allLines.map((l) => {
//   const [a, b, c, d] = l.split(/[,-]/gm).map((v) => Number(v));
//   if ((a <= c && b >= d) || (c <= a && d >= b)) task1++;
//   if ((c <= a && a <= d) || (c <= b && b <= d) || (a <= c && c <= b) || (a <= d && d <= b)) task2++;
// });
// console.log(task1);
// console.log(task2);
