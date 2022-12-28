const fs = require('fs');

const allPairs = fs
  .readFileSync('input.txt')
  .toString()
  .replaceAll('\n\n', '\n')
  .split('\n')
  .map((line) => JSON.parse(line));

allPairs.push(JSON.parse('[[2]]'));
allPairs.push(JSON.parse('[[6]]'));

// console.log(allPairs);
// return;

function compare(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) return a - b;
  if (Number.isInteger(a) && !Number.isInteger(b)) return compare([a], b);
  if (!Number.isInteger(a) && Number.isInteger(b)) return compare(a, [b]);

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const cmp = compare(a[i], b[i]);
    if (cmp !== 0) return cmp;
  }
  return a.length - b.length;
}

let sum = 0;
allPairs.sort(compare);
// console.log(allPairs);

let result = 1;
allPairs.forEach((el, i) => {
  const tmp = JSON.stringify(el);
  if (tmp === '[[2]]' || tmp === '[[6]]') result *= i + 1;
});
console.log(result);
// allPairs.forEach((pair, i) => {
//   const result = compare(pair[0], pair[1]);
//   if (result <= 0) sum += i + 1;

// });
// console.log(sum);
//
