const input = require('./data').input;
const { flatten } = require('../utilities/functions');

const cubes = {};

const parseCoordinates = (key) => {
  const [x, y, z, w] = key.split('.').map(n => parseInt(n));
  return {
    x,
    y,
    z,
    w,
  }
}

class Cube {
  constructor(dimensions, state = '.') {
    this.dimensions = dimensions;
    this.state = state;
    this.nextState = '.';
  }

  isActive() {
    return this.state === '#';
  }

  willActivate() {
    this.nextState = '#';
  }

  willDeactivate() {
    this.nextState = '.';
  }

  wontChange() {
    this.nextState = this.state;
  }

  update() {
    this.state = this.nextState;
  }

  get key() {
    return `${this.dimensions.x}.${this.dimensions.y}.${this.dimensions.z}.${this.dimensions.w}`
  }

  generateNeighboringKeys() {
    const keys = [];
    for (let w = -1; w <= 1; w++) {
      for (let z = -1; z <= 1; z++) {
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            const key = `${this.dimensions.x + x}.${this.dimensions.y + y}.${this.dimensions.z + z}.${this.dimensions.w + w}`;
            if (key !== this.key) {
              keys.push(key)
            }
          }
        }
      }
    }
    this.pushNewNeighbors(keys);
    return keys;
  }

  pushNewNeighbors(keys) {
    keys.forEach(key => {
      if (!cubes[key]) {
        cubes[key] = new Cube(parseCoordinates(key), '.');
      }
    })
  }

  activeNeighborCount() {
    return this.generateNeighboringKeys()
      .map(key => {
        if (!cubes[key]) {
          cubes[key] = new Cube(parseCoordinates(key), '.');
        }
        return cubes[key];
      })
      .filter(cube => cube.isActive())
      .length;
  }
}

input.map(row => row.split(''))
  .forEach((row, i) => {
    row.forEach((col, j) => {
      const cube = new Cube({x: i, y: j, z: 0, w: 0}, col)
      cubes[cube.key] = cube;
    });
  });

const cycle = () => {
  Object.values(cubes).forEach(cube => cube.generateNeighboringKeys());
  Object.values(cubes)
    .forEach(cube => {
      const activeCount = cube.activeNeighborCount();
      if (cube.isActive() && (activeCount === 2 || activeCount === 3)) {
        cube.wontChange();
      } else if (!cube.isActive() && activeCount === 3) {
        cube.willActivate();
      } else {
        cube.willDeactivate();
      }
    });
  Object.values(cubes).forEach(cube => {
    cube.update();
  });
  Object.values(cubes)
    .filter(cube => !cube.isActive())
    .forEach(cube => {
      delete cubes[cube.key];
    })
}

for (let i = 0; i < 6; i++) {
  cycle();
}

console.log('main.1.js@:31', Object.values(cubes).filter(cube => cube.isActive()).length);
