const input = require('./data').input;

const fleet = input[1].split(',')
  .map((id, index) => {
    if (id === 'x') {
      return null;
    }
    return {
      id: parseInt(id),
      dt: index,
    }
  })

console.log('main.js@:24', fleet);
