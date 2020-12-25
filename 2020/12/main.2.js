import { data } from './data.js'

class WayPoint {
  constructor(props) {
    this.rotation = 0;
    this.distances = {
      N: props.N,
      E: props.E,
      S: props.S,
      W: props.W,
    };
  }

  rotate(heading) {
    const compass = {
      '0': 'E',
      '90': 'N',
      '180': 'W',
      '270': 'S',
    };
    const currentDistances = { ...this.distances };
    const dh = (this.rotation + (heading.multiplier * heading.distance) + 360) % 360;
    Object.keys(compass).forEach(direction => {
      const compassChange = (parseInt(direction) + (heading.multiplier * heading.distance) + 360) % 360;
      this.distances[compass[compassChange]] = currentDistances[compass[direction]];
    });
  }

  translate(heading) {
    this.distances[heading.direction] += heading.distance;
  }
}

class Ship {
  constructor(headings) {
    this.headings = headings;
    this.wayPoint = new WayPoint({ N: 1, E: 10, W: 0, S: 0 })
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
      } else if (heading.command === 'rotate') {
        this.wayPoint.rotate(heading);
      } else {
        this.wayPoint.translate(heading);
      }
    });
  }

  propel(heading) {
    this.distances['E'] += heading.distance * this.wayPoint.distances.E;
    this.distances['N'] += heading.distance * this.wayPoint.distances.N;
    this.distances['W'] += heading.distance * this.wayPoint.distances.W;
    this.distances['S'] += heading.distance * this.wayPoint.distances.S;
  }

  manhattanDistance() {
    return Math.abs(this.distances['N'] - this.distances['S'])
      + Math.abs(this.distances['E'] - this.distances['W'])
  }
}

const headings = data.map(heading => {
  const direction = heading.substr(0, 1);
  const distance = parseInt(heading.substr(1));
  const methods = {
    'E': 'translate',
    'N': 'translate',
    'W': 'translate',
    'S': 'translate',
    'R': 'rotate',
    'L': 'rotate',
    'F': 'propel',
  };
  const multiplier = direction === 'R' ? -1 : 1;
  return {
    command: methods[direction],
    direction,
    distance,
    multiplier,
  }
});

const ship = new Ship(headings);
ship.sail();

console.log('main.js@:24', ship.manhattanDistance());
