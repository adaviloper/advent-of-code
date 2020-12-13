const input = require('./data').input;

const tap = (data, callback) => {
  callback(data);
  return data;
}

const differences = {
  '-1': 0,
  '-3': 0,
};

const differenceList = [];

let sortedAdapters = [0, ...input].sort((a, b) => a - b);
sortedAdapters.push(sortedAdapters[sortedAdapters.length - 1] + 3)
adapters = sortedAdapters.reduce((accumulator, joltage, index) => {
    return tap(accumulator, (accumulator) => {
      if (index === 0) {
        return;
      }
      let difference = sortedAdapters[index] - sortedAdapters[index - 1];
      if (difference === 3) {
        accumulator['-3']++;
      }
      if (difference === 1) {
        accumulator['-1']++;
      }
      differenceList.push(difference)
    })
}, differences);

const differenceBits = differenceList.join('').replace(/[2]/g, '3').split('3');

const twosCount = differenceBits.filter(s => s.length === 2).length;
const threesCount = differenceBits.filter(s => s.length === 3).length;
const foursCount = differenceBits.filter(s => s.length === 4).length;

console.log('main.js@:10', adapters['-1'] * adapters['-3'], Math.pow(2, twosCount) * Math.pow(4, threesCount) * Math.pow(7, foursCount));
