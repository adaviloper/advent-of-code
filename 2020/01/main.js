const input = require('./data.js').input.sort((a, b) => a - b);

const sum = (arr) => arr[0] + arr[1];

const product = (arr) => {
  return arr.reduce((accumulator, n) => {
    return accumulator * n
  }, 1);
};

const solve = (data, depth, callback) => {
  return data.reduce((sums, a) => {
    if (sums.length === depth) {
      return sums;
    }
    return sums.concat(callback(a));
  }, []);
}

const targets1 = input.reduce((accumulator, n) => {
  const index = `${2020 - n}`;
  accumulator[index] = n;
  return accumulator;
}, {});
const part1 = input.filter(n => {
  return targets1[`${n}`];
})

let lt2020 = solve(input, 3, (a) => {
  return input.filter(b => a + b < 2020)
    .map(b => {
      return [a, b];
    });
})

const part2 = Array.from(new Set(lt2020)).find(pair => input.find(n => sum(pair) + n === 2020));
const last = input.find(n => sum(part2) + n === 2020);

console.log(product(part1), product([...part2, last]));
