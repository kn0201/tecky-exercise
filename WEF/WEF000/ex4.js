function reverseString(n) {
  n = n + "";
  return n.split("").reverse().join("");
}

console.log(reverseString("cool"));
