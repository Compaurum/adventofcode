const fs = require('fs');

const allPairs = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n\n')
  .map((pair) => pair.split('\n').map((v) => JSON.parse(v)));

// console.log(allPairs);

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
allPairs.forEach((pair, i) => {
  const result = compare(pair[0], pair[1]);
  if (result <= 0) sum += i + 1;
  console.log(result);
});
console.log(sum);
