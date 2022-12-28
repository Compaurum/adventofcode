const debug = () => [
  {
    items: [79, 98],
    operation: (v) => v * 19,
    divisor: 23,
    test: (v) => (v % 23 === 0 ? 2 : 3),
    inspected: 0,
  },
  {
    items: [54, 65, 75, 74],
    operation: (v) => v + 6,
    divisor: 19,
    test: (v) => (v % 19 === 0 ? 2 : 0),
    inspected: 0,
  },
  {
    items: [79, 60, 97],
    operation: (v) => v * v,
    divisor: 13,
    test: (v) => (v % 13 === 0 ? 1 : 3),
    inspected: 0,
  },
  {
    items: [74],
    operation: (v) => v + 3,
    divisor: 17,
    test: (v) => (v % 17 === 0 ? 0 : 1),
    inspected: 0,
  },
];

const init = () => [
  {
    items: [73, 77],
    operation: (v) => v * 5,
    divisor: 11,
    test: (v) => (v % 11 === 0 ? 6 : 5),
    inspected: 0,
  },
  {
    items: [57, 88, 80],
    operation: (v) => v + 5,
    divisor: 19,
    test: (v) => (v % 19 === 0 ? 6 : 0),
    inspected: 0,
  },
  {
    items: [61, 81, 84, 69, 77, 88],
    operation: (v) => v * 19,
    divisor: 5,
    test: (v) => (v % 5 === 0 ? 3 : 1),
    inspected: 0,
  },
  {
    items: [78, 89, 71, 60, 81, 84, 87, 75],
    operation: (v) => v + 7,
    divisor: 3,
    test: (v) => (v % 3 === 0 ? 1 : 0),
    inspected: 0,
  },
  {
    items: [60, 76, 90, 63, 86, 87, 89],
    operation: (v) => v + 2,
    divisor: 13,
    test: (v) => (v % 13 === 0 ? 2 : 7),
    inspected: 0,
  },
  {
    items: [88],
    operation: (v) => v + 1,
    divisor: 17,
    test: (v) => (v % 17 === 0 ? 4 : 7),
    inspected: 0,
  },
  {
    items: [84, 98, 78, 85],
    operation: (v) => v * v,
    divisor: 7,
    test: (v) => (v % 7 === 0 ? 5 : 4),
    inspected: 0,
  },
  {
    items: [98, 89, 78, 73, 71],
    operation: (v) => v + 4,
    divisor: 2,
    test: (v) => (v % 2 === 0 ? 3 : 2),
    inspected: 0,
  },
];

const monkeys = init();
const monkeys2 = init();
const commonDivisor = monkeys2.reduce((prev, curr) => {
  return prev * curr.divisor;
}, 1);

for (let i = 0; i < 20; i++) {
  monkeys.forEach((m, i) => {
    m.items.forEach((item) => {
      const newItem = Math.floor(m.operation(item) / 3);
      monkeys[m.test(newItem)].items.push(newItem);
    });
    m.inspected += m.items.length;
    m.items = [];
  });
}

for (let i = 0; i < 10000; i++) {
  monkeys2.forEach((m, i) => {
    m.items.forEach((item) => {
      const newItem = Math.floor(m.operation(item) % commonDivisor);
      monkeys2[m.test(newItem)].items.push(newItem);
    });
    m.inspected += m.items.length;
    m.items = [];
  });
}

monkeys.sort((a, b) => b.inspected - a.inspected);
monkeys2.sort((a, b) => b.inspected - a.inspected);
console.log(monkeys[0].inspected * monkeys[1].inspected);
console.log(monkeys2[0].inspected * monkeys2[1].inspected);
