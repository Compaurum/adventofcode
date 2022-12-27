const fs = require('fs');
const lines = fs.readFileSync('input.txt').toString().split('\n');

let task1 = 0;

const filePrototype = {
  getSize() {
    if (this.type === 'file') {
      return this.size;
    }
    // this is a dir
    const size = this.children.reduce((pr, curr) => {
      return Number(pr) + Number(curr.getSize() ?? 0);
    }, 0);
    // console.log(`size is ${size}`);
    if (size <= 100000) task1 += size;
    return size;
  },

  search(condition) {
    const res = [];
    if (
      (!condition.type || condition.type === this.type) &&
      (!condition.maxSize || condition.maxSize >= this.getSize()) &&
      (!condition.minSize || condition.minSize <= this.getSize()) &&
      (!condition.name || condition.name === this.name)
    ) {
      res.push(this);
    }

    // this is a dir
    this.children?.forEach((v) => {
      res.push(...v.search(condition));
    }, 0);

    return res;
  },
};

function File(name, type, parent = null, size = 0) {
  this.name = name;
  this.type = type;
  this.parent = parent;
  this.size = size;
  this.children = [];
  this.getSize.bind(this);
  this.search.bind(this);
}

Object.assign(File.prototype, filePrototype);

const root = new File('/', 'dir');
let currentDir;

lines.forEach((line) => {
  const l = line.split(' ');
  console.log(l);

  if (l[0] === '$') {
    switch (l[1]) {
      case 'ls':
        return;
        break;
      case 'cd':
        switch (l[2]) {
          case '/':
            currentDir = root;
            break;
          case '..':
            currentDir = currentDir.parent;
            break;
          default:
            const i = currentDir.children.findIndex((el) => el.type === 'dir' && el.name === l[2]);
            currentDir = currentDir.children[i];
        }
        break;
    }
    return;
  }

  // ls output
  if (l[0] === 'dir') {
    currentDir.children.push(new File(l[1], 'dir', currentDir));
  } else {
    currentDir.children.push(new File(l[1], 'file', currentDir, l[0]));
  }
});

// task1: find all of the directories with a total size of at most 100000
const totalSize = root.getSize();
console.log(task1);

const toFree = totalSize - (70000000 - 30000000);
console.log(`TOTAL ${totalSize}`);
console.log(`to free ${toFree}`);
const searchRes = root.search({ minSize: toFree });
const task2 = searchRes.reduce((pr, curr) => {
  const size = curr.getSize();
  return size < pr ? size : pr;
}, totalSize);
console.log(task2);
