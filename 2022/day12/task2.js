const fs = require('fs');
const MAP = [];
let start;
let end;

function findNeighbors(startingNode) {
  const neighbors = [
    MAP[startingNode.row - 1]?.[startingNode.col],
    MAP[startingNode.row + 1]?.[startingNode.col],
    MAP[startingNode.row][startingNode.col - 1],
    MAP[startingNode.row][startingNode.col + 1],
  ].filter((v) => v && !v.blocked && v.height >= startingNode.height - 1);

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
    H: 0, // distance to the end // ignored in task 2
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
nodesQueue.push(end);

let foundPath;
while (!foundPath) {
  const startingNode = nodesQueue.pop();
  startingNode.blocked = true;
  const neighbors = findNeighbors(startingNode).filter((n) => {
    return !n.G || n.G > startingNode.G + 1;
  });
  neighbors.forEach((n) => {
    if (n.height === 'a'.charCodeAt(0)) {
      // FOUND THE PATH
      n.parent = startingNode;
      foundPath = n;
    }

    n.G = startingNode.G + 1;
    n.parent = startingNode;
  });

  startingNode.children = neighbors;
  nodesQueue.push(...neighbors);

  nodesQueue.sort((a, b) => b.G - a.G);
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
