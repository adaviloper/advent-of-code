const input = require('./data').input;

const tap = (data, callback) => {
  callback(data);
  return data;
};

const commands = input.map(operation => {
  const [command, value] = operation.split(' ');
  return {
    command,
    value,
  }
});

console.log('main.js@:44', commands);
