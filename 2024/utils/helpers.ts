export const tap = <T>(obj: T, callback: (obj: T) => T) => {
  callback(obj);

  return obj;
};

export const flatten = (arr: any[], depth = 1) => {
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )
};

export const sum = (array: number[], key = null) => {
  return array.reduce((accumulator, value) => {
    return accumulator + (key ? value[key] : value);
  }, 0);
};

