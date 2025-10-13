import { input } from './data/02.data.ts';

const env = 'prod';
const data = input[env];

const withinRange = (n: number) => n < 4 && n > 0;

const p1 = () => {
  const safe = input.filter(report => {
    const levels = report.split(' ').map(level => parseInt(level, 10));
    if (levels.sort((a, b) => a > b ? 1 : -1).join(' ') === report) {
      return true;
    }
    if (levels.sort((a, b) => a < b ? 1 : -1).join(' ') === report) {
      return true;
    }

    return false;
  })
  .filter(report => {
    const levels = report.split(' ').map(n => parseInt(n, 10));
    return levels.every((level, i) => {
      if (i === 0) return true;
      const diff = Math.abs(level - levels[i - 1]);
      return diff <= 3 && diff > 0;
    })
  });

  console.log(safe.length);
};

// const p2 = () => {
//   const safe = data
//   .filter(report => {
//     const levels = report.split(' ').map(n => parseInt(n, 10));
//     console.log('02.ts:43', levels);
//     const safeLevels = levels.filter((level, i) => {
//       if (i < levels.length - 1) {
//         return withinRange(Math.abs(level - levels[i + 1]));
//       }
//       if (i > 0) {
//         return withinRange(Math.abs(level - levels[i - 1]));
//       }
//     })
//
//     if (levels.length - safeLevels.length < 2) {
//       return levels.every((level, i) => {
//         if (i < levels.length - 1) {
//           return withinRange(Math.abs(level - levels[i + 1]));
//         }
//         if (i > 0) {
//           return withinRange(Math.abs(level - levels[i - 1]));
//         }
//       })
//     }
//
//     return false;
//   });
//
//   console.log(safe);
// };

p1();
// p2();
