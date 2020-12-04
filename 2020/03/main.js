const input = require('./data.js').input;

const BASE_WIDTH = input[0].length;

const traverse = (dx, dy) => {
  let column = 0;
  return input.filter((_, index) => index % dy === 0)
    .map(line => {
    const index = column % BASE_WIDTH;
    column += dx;
    return line[index];
  }).filter(marker => marker === '#');
};

const pathMarkers = [
  traverse(1, 1).length,
  traverse(3, 1).length,
  traverse(5, 1).length,
  traverse(7, 1).length,
  traverse(1, 2).length,
].reduce((accumulator, n) => accumulator * n, 1);

console.log(pathMarkers);
