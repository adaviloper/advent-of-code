import { data } from './data.js'
import { tap } from '../utilities/functions.js';

const convertToBags = (rule) => {
  return rule.split(', ')
    .map(bagRule => {
      const quantity = parseInt(bagRule.replace(/[ a-zA-Z]*/g, '')) || 0;
      const label = bagRule.replace(/(^[0-9]*)/g, '').trim();
      return {
        quantity,
        label,
      }
    });
}

const bags = data.reduce((accumulator, rule) => {
  const [label, contains] = rule.replace(/( bags?|\.)/g, '').split(' contain ')
  const subBags = convertToBags(contains);
  return tap(accumulator, (bags) => {
    bags[label] = subBags;
  });
}, {});

const labels = Object.keys(bags);

const contains = (label, target) => {
  let containTarget = [];
  if (bags[label]) {
    if (bags[label].some(bag => bag.label === target)) {
      return true;
    }

    containTarget = bags[label].filter(bag => {
      return contains(bag.label, target);
    });
  }

  return !!containTarget.length;
}

const containShinyGold = labels.filter(label => {
  return contains(label, 'shiny gold');
}).reduce((accumulator, label) => {
  return tap(accumulator, (labels) => {
    labels[label] =label;
  })
}, {})

const requiredCount = (label) => {
  if (label === 'no other') {
    return 0;
  }
  return bags[label].reduce((accumulator, bag) => {
    return accumulator + bag.quantity + bag.quantity * requiredCount(bag.label);
  }, 0);
}

console.log('main.js@:44', Object.keys(containShinyGold).length, requiredCount('shiny gold'));
