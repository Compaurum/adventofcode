const fs = require('fs');
const { stdout } = require('process');

const cacheXYZ = {};
const cubes = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((v) => {
    const cube = v.split(',').map((n) => Number(n));
    // const cube = { key: v, coord };
    cacheXYZ[v] = cube;
    return cube;
  });

// console.log(cubes);
// console.log(cacheXYZ);
const min = [cubes[0][0], cubes[0][1], cubes[0][2]];
const max = [cubes[0][0], cubes[0][1], cubes[0][2]];
function task1() {
  let allOpenSides = 0;
  cubes.forEach((cube) => {
    // calculate min and max values
    if (min[0] > cube[0]) min[0] = cube[0];
    if (min[1] > cube[1]) min[1] = cube[1];
    if (min[2] > cube[2]) min[2] = cube[2];
    if (max[0] < cube[0]) max[0] = cube[0];
    if (max[1] < cube[1]) max[1] = cube[1];
    if (max[2] < cube[2]) max[2] = cube[2];

    let newSides = 6;
    // check leftX
    cube[0]--;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[0]++;
    // check rightX
    cube[0]++;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[0]--;
    // check rightY
    cube[1]++;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[1]--;
    // check rightY
    cube[1]++;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[1]--;
    // check rightZ
    cube[2]++;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[2]--;
    // check rightZ
    cube[2]++;
    if (cacheXYZ[cube.join(',')]) newSides--;
    cube[2]--;

    allOpenSides += newSides;
  });

  return allOpenSides;
}

const answer1 = task1();

function getNeighbours(a) {
  return [
    [a[0] + 1, a[1], a[2]],
    [a[0] - 1, a[1], a[2]],
    [a[0], a[1] + 1, a[2]],
    [a[0], a[1] - 1, a[2]],
    [a[0], a[1], a[2] + 1],
    [a[0], a[1], a[2] - 1],
  ].filter((v) => {
    for (let i = 0; i < 3; i++) {
      if (v[i] < 0 || v[i] > max[i]) {
        return false;
      }
    }
    return true;
  });
}

let answer2 = 0;
const start = [...max];
const queue = [start];
const seen = {};
while (queue.length) {
  const cube = queue.pop();
  if (cacheXYZ[cube.join(',')]) {
    answer2++;
  } else if (!seen[cube.join(',')]) {
    seen[cube.join(',')] = true;
    queue.push(...getNeighbours(cube));
  }
  // getNeighbours(cube);
}
// const zeroCoordinates = {};
// const totalCube = [];
// for (let i = 0; i <= max[0]; i++) {
//   const yLine = [];
//   for (let j = 0; j <= max[1]; j++) {
//     const zLine = [];
//     for (let k = 0; k <= max[2]; k++) {
//       const isKnown = cacheXYZ[[i, j, k].join(',')];
//       const value = isKnown ? 'X' : 'O';
//       if (!isKnown) zeroCoordinates[[i, j, k].join(',')] = [i, j, k];
//       zLine.push(value);
//     }
//     yLine.push(zLine);
//   }
//   totalCube.push(yLine);
// }
// Object.keys(zeroCoordinates).forEach((v) => {
//   if (cacheXYZ[zeroCoordinates]) {
//     throw 'error';
//   }
// });
// console.log('min -', min);
// console.log('max -', max);
// console.log(totalCube);
// console.log(zeroCoordinates);

// let deletedCubes = 0;
// while (true) {
//   const closestToEdge = Object.values(zeroCoordinates).find(
//     (v) => v[0] === 0 || v[0] === max[0] || v[1] === 0 || v[1] === max[1] || v[2] === 0 || v[2] === max[2],
//     // (v) => v[0] === 0 || v[1] === 0 || v[2] === 0,
//   );
//   if (!closestToEdge) break;
//   const neighbours = [closestToEdge];
//   // console.log(closestToEdge);
//   while (neighbours.length) {
//     const start = neighbours.pop();
//     // console.log(start);
//     delete zeroCoordinates[start.join(',')];
//     const lookFor = [
//       [start[0] + 1, start[1], start[2]].join(','),
//       [start[0] - 1, start[1], start[2]].join(','),
//       [start[0], start[1] + 1, start[2]].join(','),
//       [start[0], start[1] - 1, start[2]].join(','),
//       [start[0], start[1], start[2] + 1].join(','),
//       [start[0], start[1], start[2] - 1].join(','),
//     ];
//     lookFor.forEach((l) => {
//       // && !neighbours.find((v) => v[0] === l[0] && v[1] === l[1] && v[2] === l[2])
//       if (zeroCoordinates[l] && !neighbours.find((v) => v[0] === l[0] && v[1] === l[1] && v[2] === l[2]))
//         neighbours.push(l.split(','));
//       if (cacheXYZ[l]) deletedCubes++;
//     });
//   }
// }

// console.log('--- filtered');
// // console.log(zeroCoordinates);
// console.log(Object.keys(zeroCoordinates).length);
// let sub = 0;
// Object.values(zeroCoordinates).forEach((coord) => {
//   const lookFor = [
//     [coord[0] + 1, coord[1], coord[2]].join(','),
//     [coord[0] - 1, coord[1], coord[2]].join(','),
//     [coord[0], coord[1] + 1, coord[2]].join(','),
//     [coord[0], coord[1] - 1, coord[2]].join(','),
//     [coord[0], coord[1], coord[2] + 1].join(','),
//     [coord[0], coord[1], coord[2] - 1].join(','),
//   ];
//   let countSidesOfCubes = 0;
//   lookFor.forEach((l) => {
//     if (cacheXYZ[l]) {
//       console.log(`${l} - exists in cache`);
//       countSidesOfCubes++;
//     }
//   });
//   if (countSidesOfCubes > 0) {
//     console.log(coord, countSidesOfCubes);
//   }
//   sub += countSidesOfCubes;
// });

console.log(answer1);
console.log(answer2);
// console.log(`${answer1} - ${sub} = ${answer1 - sub}`);
// console.log(deletedCubes);
