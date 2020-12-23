const input = require('./data').input;

const calledNumbers = {};

const numbers = input[0]
  .split(',')
  .map(n => parseInt(n));

numbers.forEach((n, i) => {
  calledNumbers[`${n}`] = [i];
});

let currentIndex = numbers.length;
let prevNumber = numbers[numbers.length - 1];
const nextNumber = () => {
  if (calledNumbers[`${prevNumber}`] && calledNumbers[`${prevNumber}`].length > 1 && calledNumbers[`${prevNumber}`][calledNumbers[`${prevNumber}`].length - 2] !== currentIndex) {
    const difference = currentIndex - calledNumbers[`${prevNumber}`][calledNumbers[`${prevNumber}`].length - 2] - 1;
    if (!calledNumbers[`${difference}`]) {
      calledNumbers[`${difference}`] = [];
    }
    calledNumbers[`${difference}`].push(currentIndex);
    prevNumber = difference;
  } else {
    calledNumbers[`0`].push(currentIndex);
    prevNumber = 0;
  }
  currentIndex++;
}

const iterations = 30000000;
console.time('2020-12-15');
for (let i = numbers.length; i < iterations; i++) {
  nextNumber();
}
console.timeEnd('2020-12-15');

console.log('main.1.js@:5', prevNumber);
