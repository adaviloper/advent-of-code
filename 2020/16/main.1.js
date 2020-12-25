import { data } from './data.js'
import { sum } from '../utilities/functions.js';

const rules = Object.keys(data.rules).reduce((accumulator, ruleKey) => {
  const [lower, upper] = data.rules[ruleKey]
    .split(' or ')
    .map(range => {
      return range.split('-').map(n => parseInt(n)).sort((a, b) => a - b);
    });
  accumulator[ruleKey] = {
    lower,
    upper
  };
  return accumulator;
}, {});

const invalidValues = data.nearbyTickets
  .join(',')
  .split(',')
  .map(n => parseInt(n))
  .filter(ticketId => {
    return !Object.values(rules).some(ranges => {
      return ((ticketId >= ranges.lower[0] && ticketId <= ranges.lower[1])
       || (ticketId >= ranges.upper[0] && ticketId <= ranges.upper[1]))
    });
  });

console.log('main.1.js@:16', sum(invalidValues));
