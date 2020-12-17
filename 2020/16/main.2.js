const input = require('./data').input;

const sum = (array) => {
  return array.reduce((accumulator, ticketValue) => {
    return accumulator + ticketValue;
  }, 0);
}

const transpose = (array) => {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
};


let rules = Object.keys(input.rules).reduce((accumulator, ruleKey) => {
  const [lower, upper] = input.rules[ruleKey]
    .split(' or ')
    .map(range => {
      return range.split('-').map(n => parseInt(n)).sort((a, b) => a - b);
    });
  accumulator[ruleKey] = {
    ruleKey,
    lower,
    upper,
    index: -1,
    possibleIndices: [],
  };
  return accumulator;
}, {});

const tickets = input.nearbyTickets
  .map(ticket => ticket.split(',').map(n => parseInt(n)));

const validTickets = tickets
  .filter(ticket => {
    return ticket.every(ticketValue => {
      return Object.values(rules).some((ranges, n) => {
        return ((ticketValue >= ranges.lower[0] && ticketValue <= ranges.lower[1])
          || (ticketValue >= ranges.upper[0] && ticketValue <= ranges.upper[1]))
      });
    })
  });

const ruleKeys = [];
const transposedTickets = transpose(validTickets);

transposedTickets
  .forEach((ticketValues, index) => {
    let entries = Object.entries(rules).filter(([key, ranges]) => {
      const passes = ticketValues.every(value => {
        return ((value >= ranges.lower[0] && value <= ranges.lower[1])
          || (value >= ranges.upper[0] && value <= ranges.upper[1]))
      });
      if (passes) {
        rules[key].possibleIndices.push(index);
      }
    });

    entries = entries.filter(entry => {
      return ruleKeys.every(key => key !== entry[0]);
    })

    if (entries.length === 1) {
      ruleKeys[index] = entries[0][0];
    }

    // console.log('main.2.js@:53', entries);
  })

rules = Object.values(rules).sort((a, b) => a.possibleIndices.length - b.possibleIndices.length);

while (!rules.every(rule => rule.index !== -1)) {
  let foundIndex;
  rules.forEach(rule => {
    if (rule.possibleIndices.length === 1) {
      rule.index = rule.possibleIndices[0];
      foundIndex = rule.index;
    }
  })
  rules.forEach(rule => {
    rule.possibleIndices = rule.possibleIndices.filter(i => i !== foundIndex)
  })
}

rules = rules.sort((a, b) => a.index - b.index);
let product = 1;

const myTicket = input.yourTicket.split(',')
  .map(n => parseInt(n))
  .reduce((ticket, value, index) => {
    if (rules[index].ruleKey.startsWith('departure')) {
      product *= value;
    }
    ticket[rules[index].ruleKey] = value;
    return ticket;
  }, {});

console.log('main.1.js@:16', rules, myTicket, product);
