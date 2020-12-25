import { data } from './data.js'

const ROW_COUNT = data.length;
const COL_COUNT = data[0].length;
let PART_2 = false;

let iterationCount = 0;
let hasStabilized = false;

class SpaceFactory {
  static make(seat, row, col) {
    if (seat === '.') {
      return new Floor(seat, row, col);
    }
    return new Seat(seat, row, col);
  }
}

class Seat {
  constructor(state, row, col) {
    this.state = state;
    this.row = row;
    this.col = col;
    this.next = null;
    this.prev = null;
  }

  update() {
    this.prev = this.state;
    this.state = this.next;
  }

  hasStabilized() {
    return this.prev === this.state;
  }

  prepare() {
    const adjacentSeats = [
      this.southWest(),
      this.south(),
      this.southEast(),
      this.east(),
      this.northEast(),
      this.north(),
      this.northWest(),
      this.west(),
    ];

    if (this.state === 'L') {
      this.prepareAvailable(adjacentSeats);
    } else if (this.state === '#') {
      this.prepareOccupied(adjacentSeats);
    } else {
      this.next = this.state;
    }
  }

  prepareAvailable(seats) {
    const openCount = seats.filter(seat => seat.occupied()).length;
    if (openCount === 0) {
      this.next = '#';
    } else {
      this.next = this.state;
    }
  }

  prepareOccupied(seats) {
    const openCount = seats.filter(seat => seat.occupied()).length;
    if (openCount >= (PART_2 ? 5 : 4)) {
      this.next = 'L';
    } else {
      this.next = this.state;
    }
  }

  occupied() {
    return this.state === '#';
  }

  checkSeat(row, col) {
    const seat = seats[row] && seats[row][col] && seats[row][col];
    if (!seat) {
      return false;
    }
    return seat.state === 'L' || seat.state === '#';
  }

  /// <editor-fold desc="check corners">
  southWest() {
    let row = this.row - 1;
    let col = this.col - 1;
    if (PART_2) {
      while (row >= 0 && col >= 0) {
        if (this.checkSeat(row, col)) {
          return seats[row][col];
        }
        if (row >= 0) {
          row--;
        }
        if (col >= 0) {
          col--;
        }
      }
    } else {
      if (this.row > 0 && this.col > 0) {
        return seats[this.row - 1][this.col - 1];
      }
    }
    return new NullSpace();
  }

  south() {
    let row = this.row - 1;
    if (PART_2) {
      while (row >= 0) {
        if (this.checkSeat(row, this.col)) {
          return seats[row][this.col];
        }
        row--;
      }
    } else {
      if (this.row > 0) {
        return seats[this.row - 1][this.col];
      }
    }
    return new NullSpace();
  }

  southEast() {
    let row = this.row - 1;
    let col = this.col + 1;
    if (PART_2) {
      while (row >= 0 || col < COL_COUNT) {
        if (this.checkSeat(row, col)) {
          return seats[row][col];
        }
        if (row >= 0) {
          row--;
        }
        if (col < COL_COUNT) {
          col++;
        }
      }
    } else {
      if (this.row > 0 && this.col < COL_COUNT - 1) {
        return seats[this.row - 1][this.col + 1];
      }
    }
    return new NullSpace();
  }

  west() {
    let col = this.col - 1;
    if (PART_2) {
      while (col >= 0) {
        if (this.checkSeat(this.row, col)) {
          return seats[this.row][col];
        }
        col--;
      }
    } else {
      if (this.col > 0) {
        return seats[this.row][this.col - 1];
      }
    }
    return new NullSpace();
  }

  east() {
    let col = this.col + 1;
    if (PART_2) {
      while (col < COL_COUNT) {
        if (seats[col] && this.checkSeat(this.row, col)) {
          return seats[this.row][col];
        }
        col++;
      }
    } else {
      if (this.col < COL_COUNT - 1) {
        return seats[this.row][this.col + 1];
      }
    }
    return new NullSpace();
  }

  north() {
    let row = this.row + 1;
    if (PART_2) {
      while (row < ROW_COUNT) {
        if (this.checkSeat(row, this.col)) {
          return seats[row][this.col];
        }
        if (row < ROW_COUNT) {
          row++;
        }
      }
    } else {
      if (this.row < ROW_COUNT - 1) {
        return seats[this.row + 1][this.col];
      }
    }
    return new NullSpace();
  }

  northWest() {
    let row = this.row + 1;
    let col = this.col - 1;
    if (PART_2) {
      while (row < ROW_COUNT || col >= 0) {
        if (this.checkSeat(row, col)) {
          return seats[row][col];
        }
        if (row < ROW_COUNT) {
          row++;
        }
        if (col >= 0) {
          col--;
        }
      }
    } else {
      if (this.row < ROW_COUNT - 1 && this.col > 0) {
        return seats[this.row + 1][this.col - 1];
      }
    }
    return new NullSpace();
  }

  northEast() {
    let row = this.row + 1;
    let col = this.col + 1;
    if (PART_2) {
      while (row < ROW_COUNT || col < COL_COUNT) {
        if (this.checkSeat(row, col)) {
          return seats[row][col];
        }
        if (row < ROW_COUNT) {
          row++;
        }
        if (col < COL_COUNT) {
          col++;
        }
      }
    } else {
      if (this.row < ROW_COUNT - 1 && this.col < COL_COUNT - 1) {
        return seats[this.row + 1][this.col + 1];
      }
    }
    return new NullSpace();
  }
  /// </editor-fold>
}

class NullSpace extends Seat {
  constructor() {
    super(null, null, null);
  }

  occupied() {
    return false;
  }

  prepare() {
    this.next = '';
  }

  prepareOccupied(seats) {
    this.next = '';
  }

  prepareAvailable(seats) {
    this.next = '';
  }

  southWest() {
    return this;
  }

  south() {
    return this;
  }

  southEast() {
    return this;
  }

  west() {
    return this;
  }

  east() {
    return this;
  }

  north() {
    return this;
  }

  northWest() {
    return this;
  }

  northEast() {
    return this;
  }
}

class Floor extends Seat {
  prepare() {
    this.next = '.';
  }
}

const seats = data.map(row => row.split(''))
  .map((seatRow, row) => {
    return [
      ...seatRow.map((seat, col) => {
        return SpaceFactory.make(seat, row, col);
      }),
    ];
  });

const board = () => {
  while (!hasStabilized) {
    getOutput();
    seats.forEach(row => {
      row.forEach(seat => {
        seat.prepare();
      });
    })
    hasStabilized = seats.map(row => {
      const stability = row.map(seat => {
        seat.update();
        return seat.hasStabilized();
      });

      return stability.every(isStable => isStable);
    }).every(isStable => isStable);
    iterationCount++;
  }
};

const getOutput = () => {
  let output = '';
  seats.forEach(row => {
    let line = '';
    line += row.reduce((str, seat) => {
      str += seat.state;
      return str;
    }, '');
    output += line
  })
  return output;
}

PART_2 = true;
board();
console.log(iterationCount, getOutput().replace(/[^#]/g, '').length);
