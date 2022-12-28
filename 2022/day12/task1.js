const fs = require('fs');
const MAP = [];
let start;
let end;

// getting estimated distance to the end.
function getDistance(start, end) {
  return Math.abs(start.row - end.row) + Math.abs(start.col - end.col);
}

function findNeighbors(startingNode) {
  const neighbors = [
    MAP[startingNode.row - 1]?.[startingNode.col],
    MAP[startingNode.row + 1]?.[startingNode.col],
    MAP[startingNode.row][startingNode.col - 1],
    MAP[startingNode.row][startingNode.col + 1],
  ].filter((v) => v && !v.blocked && v.height <= startingNode.height + 1);

  return neighbors;
}

function newNode(row, col, height, parent, G = 0) {
  return {
    row,
    col,
    height,
    blocked: false,
    parent,
    children: [],
    G, // distance from starting node
    H: 0, // distance to the end
  };
}

const lines = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line, lineIndex) => {
    MAP.push([]);
    const arr = line.split('').map((v, i) => {
      let node;
      switch (v) {
        case 'S':
          start = newNode(lineIndex, i, 'a'.charCodeAt(0));
          node = start;
          break;
        case 'E':
          end = newNode(lineIndex, i, 'z'.charCodeAt(0));
          node = end;
          break;
        default:
          node = newNode(lineIndex, i, v.charCodeAt(0));
      }

      MAP[lineIndex].push(node);
      return v.charCodeAt(0);
    });

    return arr;
  });

const nodesQueue = [];
nodesQueue.push(start);

let foundPath;
while (!foundPath) {
  const startingNode = nodesQueue.pop();
  startingNode.blocked = true;
  const neighbors = findNeighbors(startingNode).filter((n) => {
    return !n.G || !n.H || n.G > startingNode.G + 1;
  });
  neighbors.forEach((n) => {
    const H = getDistance(n, end);
    if (H === 0) {
      // FOUND THE PATH
      n.parent = startingNode;
      foundPath = n;
    }

    n.H = H;
    n.G = startingNode.G + 1;
    n.parent = startingNode;
  });

  startingNode.children = neighbors;
  nodesQueue.push(...neighbors);

  nodesQueue.sort((a, b) => {
    if (a.G + a.H !== b.G + b.H) {
      return b.G + b.H - (a.G + a.H);
    }
    return b.H - a.H;
  });
}

console.log('FOUND PATH!!!');
console.log(foundPath);

let node = foundPath;
let pathLength = 0;
do {
  // console.log(node.row, node.col);
  node = node.parent;
  pathLength++;
} while (node.parent);
console.log(`pathlength is ${pathLength}`);
