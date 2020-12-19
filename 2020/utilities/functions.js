const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

const tap = (data, callback) => {
  callback(data);
  return data;
};

module.exports = {
  flatten,
  tap,
}
