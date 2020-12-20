module.exports = {
  flatten: (arr, depth = 1) =>
    arr.reduce(
      (a, v) =>
        a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
      []
    ),
  sum: (array) => {
    return array.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  },
  tap: (data, callback) => {
    callback(data);
    return data;
  },
}
