const input = require('./data').input;

const sum = (array) => {
  return array.reduce((accumulator, ticketValue) => {
    return accumulator + ticketValue;
  }, 0);
}

const rules = Object.keys(input.rules).reduce((accumulator, ruleKey) => {
  const [lower, upper] = input.rules[ruleKey]
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

const invalidValues = input.nearbyTickets
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
