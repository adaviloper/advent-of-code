const input = require('./data').input;

class Ship {
  constructor(headings) {
    this.headings = headings;
    this.facing = 'E';
    this.rotation = 0;
    this.distances = {
      N: 0,
      E: 0,
      S: 0,
      W: 0,
    };
  }

  sail() {
    this.headings.forEach(heading => {
      if (heading.command === 'propel') {
        this.propel(heading);
      } else {
        this.steer(heading);
      }
    });
  }

  propel(heading) {
    if (heading.direction === 'F') {
      this.distances[this.facing] += heading.distance;
    } else {
      this.distances[heading.direction] += heading.distance;
    }
  }

  steer(heading) {
    const compass = {
      '0': 'E',
      '90': 'N',
      '180': 'W',
      '270': 'S',
    };
    const dh = (this.rotation + (heading.multiplier * heading.distance) + 360) % 360;
    this.rotation = dh;
    this.facing = compass[dh];
  }

  manhattanDistance() {
    return Math.abs(this.distances['N'] - this.distances['S'])
      + Math.abs(this.distances['E'] - this.distances['W'])
  }
}

const headings = input.map(heading => {
  const direction = heading.substr(0, 1);
  const distance = parseInt(heading.substr(1));
  const command = (direction === 'R' || direction === 'L') ? 'steer' : 'propel';
  const multiplier = direction === 'R' ? -1 : 1;
  return {
    command,
    direction,
    distance,
    multiplier,
  }
});

const ship = new Ship(headings);
ship.sail();

console.log('main.js@:24', ship.manhattanDistance());
