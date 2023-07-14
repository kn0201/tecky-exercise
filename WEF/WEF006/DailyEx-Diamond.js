let data = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function Diamond(str) {
  let index = data.indexOf(str);
  let point = "‧";

  // console.log(index);

  let size = index * 2 + 1;
  // console.log(times);

  let pointString = Array.from({ length: size }, () =>
    new Array(size).fill(point)
  );

  pointString.forEach((row, i) => {
    let position = Math.min(i, size - 1 - i);
    row[index - position] = data[position];
    row[index + position] = data[position];
  });
  return pointString.map((row) => row.join("")).join("\n");
}

console.log(Diamond("Z"));
