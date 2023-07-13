function checkMarkSix(result, bid) {
  let i = 0;
  for (const num of result) {
    for (const b of bid) {
      if (num == b) i++;
    }
  }
  if (i == 2) {
    return true;
  } else {
    return false;
  }
}

console.log(checkMarkSix([1, 3, 5, 7, 9, 11], [1, 3]));
console.log(checkMarkSix([1, 3, 5, 7, 9, 11], [2, 4]));
console.log(checkMarkSix([2, 4, 10, 15, 14, 19], [2, 19]));
console.log(checkMarkSix([2, 4, 10, 15, 14, 19], [3, 19]));
