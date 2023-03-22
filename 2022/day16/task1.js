const fs = require('fs');

const nodes = [];
fs.readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((l) => l.match(/[A-Z]{2}|[\d]+/gm))
  .map((l) => {
    nodes.push({ name: l[0], flowRate: Number(l[1]), leadsTo: [], usedTimes: 0 });
    return l;
  })
  .map((l) => {
    const parent = nodes.find((o) => o.name === l[0]);
    for (let i = 2; i < l.length; i++) {
      const child = nodes.find((o) => o.name === l[i]);
      parent.leadsTo.push(child);
    }
  });

function newChain(parent, node, score, step) {
  return {
    parent,
    node,
    step,
    score,
  };
}

let analyzedVariants = 0;
let maxTotalScore = 0;
const history = {};
const start = new Date();
let skipped = 0;
function printTree(ch, totalScore) {
  const arr = [];
  let tmp = ch;
  arr.push(tmp);
  while (tmp.parent) {
    tmp = tmp.parent;
    arr.unshift(tmp);
  }
  arr.forEach((a) => process.stdout.write(`${a.node.name} -> `));
  process.stdout.write(`step is ${ch.step};  score is ${ch.score}. Total score is ${totalScore}\n`);
}

const analyze = (deep = 0, ch, totalScore = 0) => {
  analyzedVariants++;
  if (analyzedVariants % 100000000 === 0) {
    // printTree(ch, totalScore);
    end = new Date();
    const speedMlPerSecond = analyzedVariants / ((end.getTime() - start.getTime()) / 1000) / 1000000;
    console.log(
      `analyzed: ${(analyzedVariants / 1000000).toFixed(2)} milions. Speed is ${speedMlPerSecond.toFixed(
        2,
      )} ml/sec, Skipped: ${(skipped / 1000000).toFixed(2)} milions`,
    );
  }

  const skip = history[ch.node.name] && history[ch.node.name].score === ch.score;
  if (skip) {
    skipped++;
    // useless loop
  }

  if (ch.step >= 30 || skip) {
    if (maxTotalScore >= totalScore) return;
    maxTotalScore = totalScore;

    printTree(ch, totalScore);
    return;
  }

  const oldScore = history[ch.node.name]?.score;
  history[ch.node.name] = { score: ch.score };

  ch.node.usedTimes++;
  ch.node.leadsTo.forEach((child) => {
    analyze(deep + 1, newChain(ch, child, ch.score, ch.step + 1), totalScore + ch.score);
    if (!ch.node.open && ch.node.flowRate > 0) {
      ch.node.open = true;
      analyze(
        deep + 1,
        newChain(ch, ch.node, ch.score + ch.node.flowRate, ch.step + 1),
        totalScore + ch.score + ch.node.flowRate,
      );
      ch.node.open = false;
    }
  });

  history[ch.node.name] = { score: oldScore };
  ch.node.usedTimes--;
};

const ch = newChain(
  undefined,
  nodes.find((n) => n.name === 'AA'),
  0,
  1,
);
analyze(0, ch);
