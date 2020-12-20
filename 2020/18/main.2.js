const input = require('./data').input;
const { sum } = require('../utilities/functions');

const additionRegex = /([0-9]+)([+])([0-9]+)/;
const multiplicationRegex = /([0-9]+)([*])([0-9]+)/;
const parenthesesRegex = /\(([0-9]+)([*+]([0-9]+))+\)/g;

const add = (operation) => {
  let currentProblem = operation;
  while(additionRegex.test(currentProblem)) {
    const [section] = currentProblem.match(additionRegex);
    currentProblem = currentProblem.replace(section, eval(section))
  }
  return currentProblem;
};

const multiply = (operation) =>  {
  let currentProblem = operation;
  while(multiplicationRegex.test(currentProblem)) {
    const [section] = currentProblem.match(multiplicationRegex);
    currentProblem = currentProblem.replace(section, eval(section));
  }
  return currentProblem;
};

const solve = (operation) => {
  let newOperation = `${operation}`;
  while (parenthesesRegex.test(newOperation)) {
    const problems = newOperation.match(parenthesesRegex);
    if (problems.length) {
      problems.map(problem => {
        return add(problem);
      }).map(problem => {
        return multiply(problem);
      }).map(problem => {
        return problem.replace(/\(([0-9]+)\)/, "$1");
      }).forEach((solution, index) => {
        newOperation = newOperation.replace(problems[index], solution);
      });
    }
  }

  return multiply(add(newOperation));
}

const totals = input.map(problem => {
  return parseInt(solve(problem.replace(/\s/g, '')));
})

/*
51
46
1445
669060
23340

 ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (15 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (15 * 14) + 6) + 2 + 4 * 2
 ((54) * (15 * 14) + 6) + 2 + 4 * 2
 ((54) * (210) + 6) + 2 + 4 * 2
 (54 * 210 + 6) + 2 + 4 * 2
 (54 * 216) + 2 + 4 * 2
 (11664) + 2 + 4 * 2
 11664 + 2 + 4 * 2
 11666 + 4 * 2
 11670 * 2
 23340


 ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (15 * 8 + 6) + 6) + 2 + 4 * 2
 ((6 * 9) * (15 * 14) + 6) + 2 + 4 * 2
 ((6 * 9) * (15 * 14) + 6) + 2 + 4 * 2
 */

console.log('main.1.js@:31', totals);
console.log('main.1.js@:31', sum(totals));
