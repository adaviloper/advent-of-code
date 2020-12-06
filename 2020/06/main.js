const input = require('./data.js').input;

const tap = (value, callback) => {
  callback(value);
  return value;
}

const sum = (array) => {
  return array.reduce((accumulator, set) => {
    return accumulator + set.size;
  }, 0);
}

const unique = (group) => {
  return new Set(group.reduce((accumulator, answers) => {
    return accumulator + answers;
  }, '').split(''));
}

const affirmed = input.map(group => unique(group))

const consensus = input.map(group => {
  const uniqueAnswers = unique(group);
  return tap(new Set(uniqueAnswers.values()), (agreedOnByAll) => {
    group.forEach(answers => {
      Array.from(uniqueAnswers).filter(affirmedAnswer => {
        return !(new RegExp(affirmedAnswer)).test(answers);
      }).forEach(affirmedAnswer => {
        agreedOnByAll.delete(affirmedAnswer)
      })
    });
  })
})

console.log(sum(affirmed), sum(consensus));
