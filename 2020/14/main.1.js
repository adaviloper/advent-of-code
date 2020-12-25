import { data } from './data.js'
import { sum } from '../utilities/functions.js';

const dec2bin = (dec) => {
  return (dec >>> 0).toString(2);
}

let mask = '';

let mem = [];

data
  .map(command => {
    const [operation, value] = command.replace(/\s/g, '').split('=');
    return {
      operation,
      value,
    }
  })
  .forEach(command => {
    if (command.operation === 'mask') {
      mask = command.value;
    } else {
      let value = `${dec2bin(parseInt(command.value))}`.padStart(36, '0');
      value = value.split('')
        .map((bit, index) => {
          return mask[index] === 'X' ? bit : mask[index];
        })
        .join('');
      const [match, address] = command.operation.match(/mem\[([0-9]+)/);
      mem[parseInt(address)] = value;
    }
  })

mem = mem.filter(value => value)
  .map(value => parseInt(value, 2));

console.log('main.1.js@:34', sum(mem));

