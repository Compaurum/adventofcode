const fs = require('fs');
const { splitIntoChunks } = require('../../help');
const allLines = fs.readFileSync('./input.txt').toString().split('\n');

console.log('hi');
const res = splitIntoChunks([4, 43, 12, 3, 4234, 234234], 3);
console.log(res);
return;
let task1 = 0;
let task2 = 0;
allLines.map((l) => {
  const [a, b, c, d] = l.split(/[,-]/gm).map((v) => Number(v));
  if ((a <= c && b >= d) || (c <= a && d >= b)) task1++;
  if ((c <= a && a <= d) || (c <= b && b <= d) || (a <= c && c <= b) || (a <= d && d <= b)) task2++;
});
console.log(task1);
console.log(task2);
