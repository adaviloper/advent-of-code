export const flatten = (arr, depth = 1) => {
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )
};

export const sum = (array, key = null) => {
  return array.reduce((accumulator, value) => {
    return accumulator + (key ? value[key] : value);
  }, 0);
};

export const tap = (data, callback) => {
  callback(data);
  return data;
};
