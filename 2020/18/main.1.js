const input = require('./data').input;
const { sum } = require('../utilities/functions');

const operatorRegex = /([0-9]+)([+*])([0-9]+)/;
const parenthesesRegex = /(\(([0-9]+)([*+])([0-9]+)?\))/;

const solve = (operation, regex) => {
  let newOperation = `${operation}`;
  while (regex.test(newOperation)) {
    const [problem, operandA, operator, operandB] = newOperation.match(regex);
    newOperation = newOperation.replace(`/${problem}/`, eval(problem));
    newOperation = newOperation.replace(problem, eval(problem)).replace(/\(([0-9]+)\)/, "$1");
  }

  return newOperation;
}

const totals = input.map(problem => {
  const foo = solve(problem.replace(/\s/g, ''), parenthesesRegex);
  return eval(solve(foo.replace(/\s/g, ''), operatorRegex));
})

console.log('main.1.js@:31', sum(totals));
