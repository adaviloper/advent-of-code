const {sum} = require('../utilities/functions');
const input = require('./data').input;

const dec2bin = (dec) => {
  return (dec >>> 0).toString(2);
}

let mask = '';
let mem = {};

input
  .map(command => {
    let [operation, value] = command.replace(/\s/g, '').split('=');
    if (operation === 'mask') {
      return {
        operation,
        value,
      }
    }

    return {
      operation,
      address: parseInt(operation.match(/mem\[([0-9]+)/)[1]),
      value: parseInt(value),
    }
  })
  .forEach(command => {
    if (command.operation === 'mask') {
      mask = command.value;
    } else {
      const floatingBitIndices = [];
      const newAddresses = [];
      let value = `${dec2bin(command.address)}`.padStart(36, '0');
      value = value.split('')
        .map((bit, index) => {
          return {
            '0': bit,
            '1': '1',
            'X': 'X',
          }[mask[index]];
        })
        .join('');
      value.split('')
        .forEach((bit, index) => {
          if (bit === 'X') {
            floatingBitIndices.push(index);
          }
        });
      const newSize = Math.pow(2, floatingBitIndices.length);
      for (let i = 0; i < newSize; i++) {
        const bitCombo = dec2bin(i % newSize).padStart(floatingBitIndices.length, '0').split('');
        const bits = value.split('');
        bitCombo.forEach((bit, index) => {
          bits[floatingBitIndices[index]] = bit;
        })
        newAddresses.push(bits.join(''));
      }

      newAddresses.forEach(address => {
        mem[`${parseInt(address, 2)}`] = command.value;
      })
    }
  })

mem = Object.values(mem)
  .map(value => value);

console.log('main.1.js@:34', sum(mem));
