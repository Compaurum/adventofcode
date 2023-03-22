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
const maxSteps = 26;
let counter = 0;
let maxFlowRate = 0;

let looper = 0;
let answers = 0;
//flowRate, totalFlowRate, allSteps1, allSteps2, currChain1, currChain2,
function getCombinations(firstRoute, secondRoute, variantsLeft) {
  looper++;
  if (variantsLeft.length === 0) {
    const firstTotalRate = firstRoute.flowRate * (maxSteps - firstRoute.steps) + firstRoute.totalFlowRate;
    const secondTotalRate = secondRoute.flowRate * (maxSteps - secondRoute.steps) + secondRoute.totalFlowRate;
    maxFlowRate = Math.max(maxFlowRate, firstTotalRate + secondTotalRate);
    if (answers++ % 10000000 === 0) {
      console.log(firstRoute.currChain.map((v) => v.name));
      console.log(secondRoute.currChain.map((v) => v.name));
      console.log('--------------');
    }

    //   const stepsLeft = maxSteps - allSteps;
    //   const rateSum = totalFlowRate + stepsLeft * flowRate;
    //   maxFlowRate = Math.max(maxFlowRate, rateSum);
    //   // console.log(`step rate is: ${flowRate}; total flowrate is ${rateSum}.`);
    //   counter++;
    //   if (counter % 100000 === 0) console.log(`counter is ${(counter / 1000000).toFixed(2)} Ml`);
    // console.log('zero variants');
    return;
  }

  if (firstRoute.steps === maxSteps && secondRoute.steps === maxSteps) {
    maxFlowRate = Math.max(maxFlowRate, firstRoute.totalFlowRate + secondRoute.totalFlowRate);
    if (answers++ % 10000000 === 0) {
      console.log(firstRoute.currChain.map((v) => v.name));
      console.log(secondRoute.currChain.map((v) => v.name));
      console.log('--------------');
    }
    return;
  }
  for (let i = 0; i < variantsLeft.length; i++) {
    const copy = [...variantsLeft];
    const element = copy.splice(i, 1)[0];
    if (firstRoute.steps <= secondRoute.steps) {
      const route = routes[firstRoute.currChain[firstRoute.currChain.length - 1].name].find(
        (r) => r[r.length - 1] === element,
      );
      const steps = route.length;
      if (steps + firstRoute.steps > maxSteps) {
        const stepsLeft = maxSteps - firstRoute.steps;
        const rateSum = firstRoute.totalFlowRate + stepsLeft * firstRoute.flowRate;
        getCombinations({ ...firstRoute, totalFlowRate: rateSum, steps: maxSteps }, secondRoute, [...variantsLeft]);
        // maxFlowRate = Math.max(maxFlowRate, rateSum);

        counter++;
        if (counter % 1000000 === 0) console.log(`counter is ${(counter / 1000000).toFixed(2)} Ml`);
        continue;
      }

      getCombinations(
        {
          flowRate: element.flowRate + firstRoute.flowRate,
          totalFlowRate: firstRoute.totalFlowRate + firstRoute.flowRate * steps,
          steps: firstRoute.steps + steps,
          currChain: [...firstRoute.currChain, element],
        },
        secondRoute,
        copy,
      );
    } else {
      const route = routes[secondRoute.currChain[secondRoute.currChain.length - 1].name].find(
        (r) => r[r.length - 1] === element,
      );
      const steps = route.length;
      if (steps + secondRoute.steps > maxSteps) {
        const stepsLeft = maxSteps - secondRoute.steps;
        const rateSum = secondRoute.totalFlowRate + stepsLeft * secondRoute.flowRate;
        getCombinations(firstRoute, { ...secondRoute, totalFlowRate: rateSum, steps: maxSteps }, [...variantsLeft]);
        // maxFlowRate = Math.max(maxFlowRate, rateSum);

        counter++;
        if (counter % 1000000 === 0) console.log(`counter is ${(counter / 1000000).toFixed(2)} Ml`);
        continue;
      }

      getCombinations(
        firstRoute,
        {
          flowRate: element.flowRate + secondRoute.flowRate,
          totalFlowRate: secondRoute.totalFlowRate + secondRoute.flowRate * steps,
          steps: secondRoute.steps + steps,
          currChain: [...secondRoute.currChain, element],
        },

        copy,
      );
    }

    // getCombinations(
    //   element.flowRate + flowRate,
    //   totalFlowRate + flowRate * steps,
    //   allSteps + steps,
    //   [...currChain1, element],
    //   [...currChain2, element],
    //   copy,
    // );
  }
  return;
}

const firstRoute = { flowRate: 0, totalFlowRate: 0, steps: 0, currChain: [start] };
const secondRoute = { flowRate: 0, totalFlowRate: 0, steps: 0, currChain: [start] };

getCombinations(firstRoute, secondRoute, valves);

console.log(`max flowrate is ${maxFlowRate}`);
