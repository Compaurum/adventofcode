const fs = require('fs');
const { stdout } = require('process');

const profiler = {};
function startProfile(name) {
  if (!profiler.hasOwnProperty(name)) {
    profiler[name] = [];
  }
  const start = new Date();
  return () => {
    const end = new Date();
    profiler[name].push(end.getTime() - start.getTime());
    if (profiler[name].length > 10000) {
      const averageTime = profiler[name].reduce((pr, cr) => pr + cr, 0) / profiler[name].length;
      console.log(`average ${name} speed is ${averageTime.toFixed(20)} seconds.`);
      profiler[name] = [];
    }
  };
}

const winds = fs.readFileSync('input.txt').toString().split('');
// console.log(winds.length);
const left = '<';
const right = '>';
const repeatedPatternEvery = winds.length * 5;

function createGrid(x, y, value) {
  const grid = new Array(y).fill(value);
  grid.forEach((v, i) => (grid[i] = new Array(x).fill(value)));
  return grid;
}

const chamber = createGrid(3, 7, 0);

function getTopLine() {
  let topLine = -1;
  chamber.forEach((c) => {
    let deep = 0;
    for (let i = c.length - 1; i >= 0; i--) {
      if (deep++ > 8) break;
      if (c[i] === 1 && i > topLine) {
        topLine = i;
        break;
      }
    }
  });
  return topLine;
}
let topLine = -1;
let cuttedHight = 0;
const spaceBetweenForms = 4;
// increase chamber if required and return a li to draw from
function increaseChamber(formHight = 1) {
  if (chamber[0].length > 1000) {
    const toCut = chamber[0].length - 50;
    cuttedHight += toCut;
    chamber.forEach((c, ci) => {
      const tmp = new Array(50);
      for (let i = 0; i < 50; i++) {
        tmp[i] = c[c.length - (50 - i)];
      }
      chamber[ci] = tmp;
    });
    topLine -= toCut;
  }

  const lisToAdd = spaceBetweenForms + formHight - (chamber[0].length - topLine);
  chamber.forEach((v) => {
    for (let i = 0; i < lisToAdd; i++) {
      v.push(0);
    }
  });

  const result = topLine + spaceBetweenForms;
  return result;
}

console.log(winds);

currWind = -1;
function getNextWind() {
  currWind = (currWind + 1) % winds.length;
  return winds[currWind];
}

function drawShape(shape) {
  let iteration = 0;
  while (true) {
    const wind = getNextWind();

    const allowSideMove =
      wind === right
        ? shape.r.find((v) => chamber[v.col + 1]?.[v.li] !== 0) === undefined
        : shape.l.find((v) => chamber[v.col - 1]?.[v.li] !== 0) === undefined;
    if (allowSideMove) {
      if (wind === right) shape.all.forEach((v) => (v.col += 1));
      else shape.all.forEach((v) => (v.col -= 1));
    }

    const allowDownMove =
      iteration++ < 3 ? true : shape.bot.find((v) => chamber[v.col]?.[v.li - 1] !== 0) === undefined;
    if (allowDownMove) shape.all.forEach((v) => (v.li -= 1));

    if (!allowDownMove) {
      // save shape
      shape.all.forEach((v) => (chamber[v.col][v.li] = 1));
      if (topLine < shape.top.li && topLine - shape.top.li < 20) topLine = shape.top.li;
      break;
    }
  }
}

currShape = 0;
let offset = 0;
let shape;
function drawNextShape() {
  switch (currShape) {
    case 0:
      offset = increaseChamber(1);
      shape = {
        all: [
          { li: offset, col: 2 },
          { li: offset, col: 3 },
          { li: offset, col: 4 },
          { li: offset, col: 5 },
        ],
      };
      shape.bot = shape.all;
      shape.l = [shape.all[0]];
      shape.r = [shape.all[3]];
      shape.top = shape.all[0];
      drawShape(shape);
      break;
    case 1:
      offset = increaseChamber(3);
      shape = {
        all: [
          { li: offset, col: 3 },
          { li: 1 + offset, col: 2 },
          { li: 1 + offset, col: 3 },
          { li: 1 + offset, col: 4 },
          { li: 2 + offset, col: 3 },
        ],
      };
      shape.bot = [shape.all[0], shape.all[1], shape.all[3]];
      shape.l = [shape.all[0], shape.all[1], shape.all[4]];
      shape.r = [shape.all[0], shape.all[3], shape.all[4]];
      shape.top = shape.all[4];
      drawShape(shape);
      break;
    case 2:
      offset = increaseChamber(3);
      shape = {
        all: [
          { li: offset, col: 2 },
          { li: offset, col: 3 },
          { li: offset, col: 4 },
          { li: 1 + offset, col: 4 },
          { li: 2 + offset, col: 4 },
        ],
      };
      shape.bot = [shape.all[0], shape.all[1], shape.all[2]];
      shape.l = [shape.all[0], shape.all[3], shape.all[4]];
      shape.r = [shape.all[2], shape.all[3], shape.all[4]];
      shape.top = shape.all[4];
      drawShape(shape);
      break;
    case 3:
      offset = increaseChamber(4);
      shape = {
        all: [
          { li: offset, col: 2 },
          { li: 1 + offset, col: 2 },
          { li: 2 + offset, col: 2 },
          { li: 3 + offset, col: 2 },
        ],
      };
      shape.bot = [shape.all[0]];
      shape.l = shape.all;
      shape.r = shape.all;
      shape.top = shape.all[3];
      drawShape(shape);
      break;
    case 4:
      offset = increaseChamber(2);
      shape = {
        all: [
          { li: offset, col: 2 },
          { li: offset, col: 3 },
          { li: 1 + offset, col: 2 },
          { li: 1 + offset, col: 3 },
        ],
      };
      shape.bot = [shape.all[0], shape.all[1]];
      shape.l = [shape.all[0], shape.all[2]];
      shape.r = [shape.all[1], shape.all[3]];
      shape.top = shape.all[3];
      drawShape(shape);
      break;
  }
  currShape = (currShape + 1) % 5;
}

// task 1
// for (let i = 0; i < 2022; i++) {
//   drawNextShape();
// }

const compareArrays = (a, b) => a.length === b.length && a.every((element, index) => element === b[index]);

// task 2
const start = new Date();
let lastHeight = 0;
const history = [];
let patternLength = 0;
let reducedPatternSum = 0;
const iterations = 1000000000000;
for (let i = 0; i < iterations; i++) {
  if (i % repeatedPatternEvery === 0) {
    const heightNow = getTopLine() + 1 + cuttedHight;
    const diff = heightNow - lastHeight;
    lastHeight = heightNow;
    if (i > repeatedPatternEvery) history.push(diff);
    if (
      history.length > 5 &&
      history.length % 2 === 0 &&
      compareArrays(history.slice(0, history.length / 2), history.slice(history.length / 2)) &&
      !patternLength
    ) {
      const patternSum = history.slice(history.length / 2).reduce((pr, cr) => pr + cr, 0);
      patternLength = history.length / 2;
      console.log(`pattern length is ${patternLength}`);

      const skippedIterations = Math.floor((iterations - i) / (repeatedPatternEvery * patternLength));
      reducedPatternSum = skippedIterations * patternSum;
      i += skippedIterations * repeatedPatternEvery * patternLength;
    }
  }
  if (i % 1000000 === 0) {
    const end = new Date();
    const durationSeconds = (end.getTime() - start.getTime()) / 1000;
    const speedMlPerSecond = i / durationSeconds / 1000000;
    console.log(`analyzed: ${(i / 1000000).toFixed(2)} millions. Speed is ${speedMlPerSecond.toFixed(2)} ml/sec`);
  }

  drawNextShape();
}

console.log(getTopLine() + 1 + cuttedHight + reducedPatternSum);
