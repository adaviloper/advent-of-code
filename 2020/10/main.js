const input = require('./data').input;

const tap = (data, callback) => {
  callback(data);
  return data;
}

const preambleSize = 25;

const getPreamble = (index) => {
  return input.filter((n, i) => i >= index - preambleSize && i < index);
}

let preamble = [];
let target = input[preambleSize];
let differences = {};

const init = () => {
  for (let i = preambleSize; i < input.length; i++) {
    preamble = getPreamble(i);
    target = input[i];
    differences = preamble.reduce((accumulator, n) => {
      return tap(accumulator, (differences) => {
        const collection = new Set(preamble);
        if (target - n >= 0 && collection.has(n) && collection.has(target - n)) {
          differences[`${target - n}`] = n;
        }
      });
    }, {});

    if (Object.keys(differences).length === 0) {
      return i;
    }
  }
}

const weakPoint = init();

const sum = (start, end) => {
  return input.filter((n, i) => i >= start && i <= end)
    .reduce((accumulator, n) => {
      return accumulator + n;
    }, 0);
}

const findAddends = () => {
  let start = 0;
  let end = 1;
  const target = input[weakPoint];
  let total;
  while (end !== weakPoint) {
    total = sum(start, end);
    if (total === target) {
      return [start, end];
    }

    if (total < target) {
      end++;
    } else {
      start++;
    }
  }
};

const [addendA, addendB] = findAddends();

let indexes = [
    input.findIndex(n => n === input[addendA]),
    input.findIndex(n => n === input[addendB]),
  ].sort((a, b) => a - b);

const encryptionSpan = input.filter((n, i) => i >= indexes[0] && i <= indexes[1])
  .sort((a, b) => a - b)

// 1446749368 too high
// 498256625 too high
// 76688505
// 65118771 too low

console.log('main.js@:5', input[weakPoint], encryptionSpan[0] + encryptionSpan[encryptionSpan.length - 1]);
