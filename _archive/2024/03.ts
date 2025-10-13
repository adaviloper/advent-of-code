import { input } from "./data/03.data.ts";

const env = 'prod';
const data = input[env][0];

const p1 = () => {
  const mults = data.match(/mul\((\d*),(\d*)\)/gm);
  return mults?.map(mult => {
    const m = mult.match(/\d*,\d*/g)
    if (!m?.length) return;
      
    return m[0].split(',')
      .map(n => parseInt(n, 10))
      .reduce((acc, n) => acc * n, 1);
  })
    .reduce((acc, n) => acc + n, 0);
};

const p2 = () => {
  const mults = data
    .replace(/don't\(\).*?do\(\)/gm, '')
    .match(/mul\((\d*),(\d*)\)/gm);
  return mults?.map(mult => {
    const m = mult.match(/\d*,\d*/g)
    if (!m?.length) return;
      
    return m[0].split(',')
      .map(n => parseInt(n, 10))
      .reduce((acc, n) => acc * n, 1);
  })
    .reduce((acc, n) => acc + n, 0);
};

console.log('03.ts:p1', p1());
console.log('03.ts:p2', p2());
