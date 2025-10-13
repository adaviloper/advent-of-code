import { data } from './data.js'
import { tap } from '../utilities/functions.js';

const preambleSize = 25;

const getPreamble = (index) => {
  return data.filter((n, i) => i >= index - preambleSize && i < index);
}

let preamble = [];
let target = data[preambleSize];
let differences = {};

const init = () => {
  for (let i = preambleSize; i < data.length; i++) {
    preamble = getPreamble(i);
    target = data[i];
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
  return data.filter((n, i) => i >= start && i <= end)
    .reduce((accumulator, n) => {
      return accumulator + n;
    }, 0);
}

const findAddends = () => {
  let start = 0;
  let end = 1;
  const target = data[weakPoint];
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
    data.findIndex(n => n === data[addendA]),
    data.findIndex(n => n === data[addendB]),
  ].sort((a, b) => a - b);

const encryptionSpan = data.filter((n, i) => i >= indexes[0] && i <= indexes[1])
  .sort((a, b) => a - b)

console.log('main.js@:5', data[weakPoint], encryptionSpan[0] + encryptionSpan[encryptionSpan.length - 1]);
