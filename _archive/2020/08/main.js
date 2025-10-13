import { data } from './data.js'

const srcCommands = data.map(command => {
  let [operation, value] = command.split(' ');
  const multiplier = value.substr(0, 1);
  value = parseInt(value.substr(1));
  return {
    operation,
    executed: false,
    loops: false,
    multiplier: multiplier === '+' ? 1 : -1,
    tested: false,
    value,
  };
});

let finalOutput = [];

const getTick = (command) => {
  if (command.operation === 'jmp') {
    return command.multiplier * command.value;
  }

  return 1;
};

let shouldFix;

const willLoop = (commands, index, testing) => {
  let localCommands = commands.map(command => ({...command}));
  for (let i = index; i < localCommands.length;) {
    if (localCommands[i].executed) {
      if (!testing) {
        finalOutput = localCommands;
      }
      return true;
    } else {
      localCommands[i].executed = true;
    }

    let nextIndex = i + getTick(localCommands[i]);

    if (!shouldFix && !testing && (localCommands[i].operation === 'jmp' || localCommands[i].operation === 'nop')) {
      localCommands[i].operation = localCommands[i].operation === 'jmp' ? 'nop' : 'jmp';
      nextIndex = i + getTick(localCommands[i]);
      if (!localCommands[i].loops && willLoop(localCommands, nextIndex, true)) {
        localCommands[i].tested = true;
        localCommands[i].loops = true;
        localCommands[i].operation = localCommands[i].operation === 'jmp' ? 'nop' : 'jmp';
      } else {
        shouldFix = true;
      }
    }

    nextIndex = i + getTick(localCommands[i]);

    if (localCommands[i].operation === 'acc') {
      i++;
    } else if (localCommands[i].operation === 'nop') {
      i++;
    } else if (localCommands[i].operation === 'jmp') {
      i = nextIndex;
    }
  }

  finalOutput = localCommands;

  return false;
};

shouldFix = true
willLoop(srcCommands, 0, false);
const part1 = finalOutput.filter(command => command.operation === 'acc' && command.executed)
  .reduce((accumulator, command) => {
    return accumulator + (command.multiplier * command.value);
  }, 0);


shouldFix = false
willLoop(srcCommands, 0, false);
const part2 = finalOutput.filter(command => command.operation === 'acc' && command.executed)
  .reduce((accumulator, command) => {
    return accumulator + (command.multiplier * command.value);
  }, 0);
console.log('main.js@:44', part1, part2);
