const fs = require('fs');
const allLines = fs.readFileSync('./input.txt').toString().split('\n');

let task1 = 0;
let task2 = 0;
allLines.map(l => {
  const [a, b, c, d] = l.split(/[,-]/gm).map(v => Number(v));
  if ((a <= c && b >= d) || (c <= a && d >= b)) task1++
  if ((c<= a && a <= d) || (c<= b && b <= d) || (a<= c && c <= b) || (a<= d && d<= b)) task2++
})
console.log(task1)
console.log(task2)