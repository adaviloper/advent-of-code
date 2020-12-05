const input = require('./data.js').input;

const tap = (data, callback) => {
  callback(data);
  return data;
};

const seatIds = input.map(seat => seat.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'))
  .reduce((accumulator, seat) => {
    return tap(accumulator, (accumulator) => {
      const row = parseInt(seat.substr(0, 7), 2);
      const column = parseInt(seat.substr(7), 2);
      const seatId = row * 8 + column;
      accumulator[`${seatId}`] = seatId;
    })
  }, {});

const assignedSeat = Object.values(seatIds).filter(seatId => {
  return seatIds[`${seatId + 1}`] === undefined
    || seatIds[`${seatId - 1}`] === undefined
}).reduce((seatId, possibleSeat) => {
  if (seatIds[`${possibleSeat + 1}`] === undefined && seatIds[`${possibleSeat + 2}`] !== undefined) {
    return possibleSeat + 1;
  }

  return seatId;
}, 0);



console.log(Object.values(seatIds).reverse()[0], assignedSeat);
