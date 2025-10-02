import { input } from './data/04.data.ts';

const env = 'prod';
const data = input[env];

const p1 = () => {
  data
} 

const p2 = () => {
  const foo = [];
}

console.log('p1', p1())
console.log('p2', p2())
