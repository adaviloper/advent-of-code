import { input } from './data/04.data.ts';
import { transpose } from './utils/helpers.ts';

const env = 'test';
const data = input[env];

const regEx = /XMAS|SAMX/g;

const filterMatches = (data: string[]) => {
  return data.filter(row => {
    return row.match(regEx);
  })
  .map(row => row.match(regEx)?.length);
};

const getNeDiagonals = (arr: string[][]) => {
  return arr.map((row, i) => {
    return row.map((_, j) => {
      if (arr[i + 1] && arr[i + 1][i - j - 1]) {
        return arr[i + 1][i - j - 1];
      }

      return ''
    }).reduce((acc, s) => acc + s, '');
  })
};
const getSeDiagonals = (arr: string[][]) => {
  return arr.map((row, i) => {
    return row.map((_, j) => {
      if (arr[j] && arr[j][i + j]) {
        return arr[j][i + j];
      }

      return ''
    }).reduce((acc, s) => acc + s, '');
  })
};

const p1 = () => {
  const rows = filterMatches(data);
  const cols = filterMatches(transpose(data.map(n => n.split(''))).map(n => n.join('')));
  const splitData = data.map(s => s.split(''))
  const transposedSplitData = transpose(splitData)
  const seDiagonals = getSeDiagonals(splitData);
  getSeDiagonals(transposedSplitData)
    .slice(1)
    .forEach(r => seDiagonals.push(r));
  const neDiagonals = getSeDiagonals(transposedSplitData);
  // getNeDiagonals(transposedSplitData.reverse())
  //   .slice(1)
  //   .forEach(r => neDiagonals.push(r));
  const counts = [
    rows.length,
    cols.length,
    filterMatches(seDiagonals).length,
    // filterMatches(neDiagonals).length,
  ];

  // return counts.reduce((acc, n) => acc + n, 0);

  console.log(
    neDiagonals.reduce((acc, v) => {
      if (!acc[v]) {
        acc[v] = 0;
      }
      acc[v]++;
      return acc;
    }, {}),
    seDiagonals[0] == 'MSXMAXSAMX',
    `${seDiagonals[0] == 'MSXMAXSAMX'} ${seDiagonals[0]} === 'MSXMAXSAMX'`,
    seDiagonals.length,
    // neDiagonals[0] == 'MSAMMMMXAM',
    // `${neDiagonals[0] == 'MSAMMMMXAM'} ${neDiagonals[0]}, 'MSAMMMMXAM'`,
    // neDiagonals.length,
    // `${neDiagonals[5] == 'XXSAMX'} ${neDiagonals[5]}, 'XXSAMX'`,
    counts.reduce((acc, n) => acc + n, 0),
  );
}

    // 'MASAMXXAM',
    // 'MMAMXXSSMM'

// MSAMMMMXAM

// XXSAMX

    // "MAMXMASAMX"
    // "SSMMMMSAMS"
    // "AMASAAXAMA"
    // "MSAMXXSSMM"
    // "XMMSMXAAXX"
    // "XXXAAMSMMA"
    // "SMSMSMMAMX"
    // "MAXAAASXMM"
    // "MSMSMXMAAX"
    // "MMAMXXSSMM"

    // 'MMMSXXMASM',
    // 'MSAMXMSMSA',
    // 'AMXSXMAAMM',
    // 'MSAMASMSMX',
    // 'XMASAMXAMM',
    // 'XXAMMXXAMA',
    // 'SMSMSASXSS',
    // 'SAXAMASAAA',
    // 'MAMMMXMMMM',
    // 'MXMXAXMASX',

const p2 = () => {
}

console.log('p1', p1())
console.log('p2', p2())
