const input = require('./data.js').input.sort((a, b) => a - b);

const sum = (arr) => arr[0] + arr[1];

const product = (arr) => { return arr[0] * arr[1]; };

const solve = (data, depth, callback) => {
  return data.reduce((sums, a) => {
    if (sums.length === depth) {
      return sums;
    }
    return sums.concat(callback(a));
  }, []);
}

const part1 = solve(input, 2, ((a) => {
  return input.filter(b => a + b === 2020);
}))

let lt2020 = solve(input, 3, (a) => {
  return input.filter(b => a + b < 2020)
    .map(b => {
      return [a, b];
    });
})

lt2020 = Array.from(new Set(lt2020));

const tt2020 = lt2020.find(pair => input.find(n => sum(pair) + n === 2020));
const last = input.find(n => sum(tt2020) + n === 2020);
console.log(product(part1), product([product(tt2020), last]));

