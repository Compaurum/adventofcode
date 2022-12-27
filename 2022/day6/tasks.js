const fs = require('fs');
const line = fs.readFileSync('./input.txt').toString();

const window = {
  start: 0,
  end: 4,
};

const lockWindow = {
  start: 0,
  end: 14,
};

while (window.end < line.length) {
  const tmp = line.slice(window.start, window.end);
  let repeat = false;
  console.log('----', tmp, window);
  for (let i = 0; i < tmp.length; i++) {
    for (let j = i + 1; j < tmp.length; j++) {
      if (tmp[i] === tmp[j]) repeat = true;
      // console.log(tmp[i], tmp[j], tmp[i] === tmp[j]);
    }
  }
  if (!repeat) {
    console.log(window.end);
    break;
  }

  window.start++;
  window.end++;
}

while (lockWindow.end < line.length) {
  const tmp = line.slice(lockWindow.start, lockWindow.end);
  let repeat = false;
  console.log('----', tmp, lockWindow);
  for (let i = 0; i < tmp.length; i++) {
    for (let j = i + 1; j < tmp.length; j++) {
      if (tmp[i] === tmp[j]) repeat = true;
      // console.log(tmp[i], tmp[j], tmp[i] === tmp[j]);
    }
  }
  if (!repeat) {
    console.log(lockWindow.end);
    break;
  }

  lockWindow.start++;
  lockWindow.end++;
}
