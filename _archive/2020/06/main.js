import { data } from './data.js'
import { sum, tap } from '../utilities/functions.js';

const unique = (group) => {
  return new Set(group.reduce((accumulator, answers) => {
    return accumulator + answers;
  }, '').split(''));
}

const affirmed = data.map(group => unique(group))

const consensus = data.map(group => {
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

console.log(sum(affirmed, 'size'), sum(consensus, 'size'));
