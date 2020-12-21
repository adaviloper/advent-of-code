const input = require('./data').input;

const earliestPossibleDeparture = input[0];

class Bus {
  constructor(id) {
    this.id = id;
    this.departsAt = 0;
  }

  setNextDepartureAfter() {
    this.departsAt = Math.ceil(earliestPossibleDeparture / this.id) * this.id;
    return this;
  }

  waitTime() {
    return this.departsAt - earliestPossibleDeparture;
  }
}

let fleet = input[1].split(',')
  .filter(busId => busId !== 'x')
  .map(busId => {
    return new Bus(parseInt(busId));
  })

fleet = fleet.map(bus => {
  return bus.setNextDepartureAfter(earliestPossibleDeparture);
}).sort((a, b) => {
  return a.departsAt - b.departsAt;
})

const bus = fleet[0];
const solution = bus.waitTime() * bus.id;

console.log('main.js@:24', solution);
