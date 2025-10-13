const input = require('./data').input;
const {tap} = require('../utilities/functions');

const terminalRegex = /[ab]/;

const rules = input.rules.reduce((acc, rule) => {
  const [key, constraints] = rule.split(': ');
  if (terminalRegex.test(constraints)) {
    return tap(acc, (acc) => {
      acc.set(key, {
        leaf: true,
        value: [constraints.replace(/"/g, '')],
      });
    })
  }

  return tap(acc, (acc) => {
    acc.set(key, {
      leaf: false,
      value: constraints.split(' | ').map(keys => keys.split(' ')),
    });
  });
}, new Map());

const getLeaf = (key) => {
  if (rules.get(key).leaf) {
    return rules.get(key).value
  }
  return rules.get(key).value.reduce((acc, ruleSet) => {
    return ruleSet.reduce((acc, ruleKey) => {
      return acc + getLeaf(ruleKey);
    }, '')
  }, []);
}

rules.forEach(((rule, key) => {
  if (!rule.leaf) {
    const string = rule.value.reduce((acc, ruleSet) => {
      return ruleSet.reduce((acc, ruleKey) => {
        return acc + getLeaf(ruleKey);
      }, '')
    }, []);
    console.log('main.1.js@:38', string);
  }
}))

console.log('main.1.js@:final', rules);

/*
0
 4 1 5
 a (2 3 | 3 2) b
 a ((4 4 | 5 5) 3 | 3 (4 4 | 5 5)) b
 a ((4 4 | 5 5) (4 5 | 5 4) | (4 5 | 5 4) (4 4 | 5 5)) b

 a ((a a | b b) (a b | b a) | (a b | b a) (a a | b b)) b
 a ((a a | b b) (a b | b a) | (a b | b a) (a a | b b)) b
 a a a a b b
 a a a b a b
 a b b a b b
 a b b b a b

 */
