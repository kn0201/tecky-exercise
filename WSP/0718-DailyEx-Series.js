function series(string, digit) {
  for (let i = 0; i < string.length; i++) {
    if (digit > string.length) break;
    let ans = string.slice(i, digit);
    digit++;
    console.log(ans);
  }
}

series("49142", 3);

series("49142", 4);

series("49142", 5);
