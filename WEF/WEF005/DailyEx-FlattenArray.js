function flattenArray(array) {
  let output = [];
  array.forEach((element) => {
    let value = Array.isArray(element) ? flattenArray(element) : element;
    if (value === undefined || value === null || value === []) return null;
    if (Array.isArray(value)) {
      output = output.concat(value);
    } else {
      output.push(value);
    }
  });
  return output;
}

console.log(flattenArray([1, [2, 3, null, 4], [null], 5]));
