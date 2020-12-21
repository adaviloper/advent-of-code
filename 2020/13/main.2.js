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
  .filter(bus => bus)

let skip = fleet[0].id;
let time = skip;
let maxLoop = 1;
while (true) {
  const passingBuses = fleet.filter(bus => {
    return (time + bus.dt) % bus.id === 0;
  })
  if (passingBuses.length > maxLoop) {
    skip = passingBuses.reduce((acc, bus) => acc * bus.id, 1);
    maxLoop = passingBuses.length;
  }
  if ((time % fleet[0].id) === ((time + fleet[1].dt) % fleet[1].id)) {
    console.log('main.2.js@:19', time, passingBuses);
  }
  if (passingBuses.length === fleet.length) {
    break;
  }
  console.log('main.2.js@:19', time, skip);
  time += skip;
}



console.log('main.js@:24', time);
