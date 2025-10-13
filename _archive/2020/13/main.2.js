import { data } from './data.js'

const fleet = data[1].split(',')
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
  if (passingBuses.length === fleet.length) {
    break;
  }
  time += skip;
}



console.log('main.js@:24', time);
