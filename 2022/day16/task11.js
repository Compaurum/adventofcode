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

const routes = {};
const start = nodes.find((v) => v.name === 'AA');
const valves = nodes.filter((n) => n.flowRate > 0);

function findRoutes(v) {
  const routes = [];
  const toFound = [...valves];
  const toAnalyze = [v];
  while (toAnalyze.length) {
    const tmp = toAnalyze.shift();
    tmp.leadsTo.forEach((child) => {
      if (!child.block) {
        child.parent = tmp;
        toAnalyze.push(child);

        const index = toFound.findIndex((v) => v.name === child.name);
        if (index >= 0) {
          toFound.splice(index, 1);
          const route = [];
          let temp = child;
          route.unshift(temp);
          while (temp.parent) {
            temp = temp.parent;
            route.unshift(temp);
          }
          routes.push(route);
        }
      }
    });
    tmp.block = true;
  }

  return routes;
}
function resetNodes() {
  nodes.forEach((n) => {
    n.parent = undefined;
    n.block = false;
  });
}

routes[start.name] = findRoutes(start);
resetNodes();
valves.forEach((v) => {
  routes[v.name] = findRoutes(v);
  resetNodes();
});

// all routes
// console.log(routes);

// all combinations of routes
const maxSteps = 30;
let counter = 0;
let maxFlowRate = 0;
function getCombinations(flowRate, totalFlowRate, allSteps, currChain, variantsLeft) {
  if (variantsLeft.length === 0) {
    const stepsLeft = maxSteps - allSteps;
    const rateSum = totalFlowRate + stepsLeft * flowRate;
    maxFlowRate = Math.max(maxFlowRate, rateSum);
    // console.log(`step rate is: ${flowRate}; total flowrate is ${rateSum}.`);
    counter++;
    if (counter % 100000 === 0) console.log(`counter is ${(counter / 1000000).toFixed(2)} Ml`);
    return;
  }

  for (let i = 0; i < variantsLeft.length; i++) {
    const copy = [...variantsLeft];
    const element = copy.splice(i, 1)[0];
    const route = routes[currChain[currChain.length - 1].name].find((r) => r[r.length - 1] === element);
    const steps = route.length;
    if (steps + allSteps > maxSteps) {
      const stepsLeft = maxSteps - allSteps;
      const rateSum = totalFlowRate + stepsLeft * flowRate;
      maxFlowRate = Math.max(maxFlowRate, rateSum);

      counter++;
      if (counter % 100000 === 0) console.log(`counter is ${(counter / 1000000).toFixed(2)} Ml`);
      continue;
    }

    getCombinations(
      element.flowRate + flowRate,
      totalFlowRate + flowRate * steps,
      allSteps + steps,
      [...currChain, element],
      copy,
    );
  }
  return;
}

getCombinations(0, 0, 0, [start], valves);

console.log(`max flowrate is ${maxFlowRate}`);
