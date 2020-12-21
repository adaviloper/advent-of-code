const input = require('./data').input;

let mask = '';

const commands = input
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
      let value = `${parseInt(command.value, 2)}`.padStart(36, '0');
      console.log('main.2.js@:18', value);
    }
  })
