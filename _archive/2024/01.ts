import { input } from './data/01.data.ts';

const env = 'prod';
const data = input[env];

const p1 = () => {
  let first: number[] = [];
  let second: number[] = [];
  data.map(pair => pair.split('   '))
    .forEach(element => {
      first.push(parseInt(element[0], 10));
      second.push(parseInt(element[1], 10));
    });

  first.sort((a, b) => a > b ? 1 : -1);
  second = second.sort((a, b) => a > b ? 1 : -1);

  const sum = first.map((a, i) => {
    if (a > second[i]) {
      return a - second[i];
    }

    return second[i] - a;
  }).reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  console.log(sum);
};

const p2 = () => {
  let first: number[] = [];
  let second: number[] = [];
  data.map(pair => pair.split('   '))
    .forEach(element => {
      first.push(parseInt(element[0], 10));
      second.push(parseInt(element[1], 10));
    });

  first.sort((a, b) => a > b ? 1 : -1);
  const factors = second.reduce((prev, cur) => {
    if (!prev[cur]) {
      prev[cur] = 0;
    }
    prev[cur]++;
    return prev;
  }, {});

  const sum = first.map((a) => {
    if (!factors[a]) {
      return 0;
    }
    
    return a * factors[a];
  }).reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  console.log(sum);
};

p1();
p2();
