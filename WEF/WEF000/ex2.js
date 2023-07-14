function checkLeapYear(n) {
  if (n % 4 == 0) {
    if (n % 100 == 0) {
      if (n % 400 == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

console.log(checkLeapYear(1997));
console.log(checkLeapYear(1996));
console.log(checkLeapYear(1900));
console.log(checkLeapYear(2000));
