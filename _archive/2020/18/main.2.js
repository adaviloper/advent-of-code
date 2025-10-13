import { data } from './data.js'
import { sum } from '../utilities/functions.js';

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

const totals = data.map(problem => {
  return parseInt(solve(problem.replace(/\s/g, '')));
})

console.log('main.1.js@:31', sum(totals));
