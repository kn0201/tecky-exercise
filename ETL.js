const point = [
  {
    1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
    2: ["D", "G"],
    3: ["B", "C", "M", "P"],
    4: ["F", "H", "V", "W", "Y"],
    5: ["K"],
    8: ["J", "X"],
    10: ["Q", "Z"],
  },
];
console.log(point);
for (let key in point) {
  console.log(parseInt(`${point[key]}`));
}
function ETL(value) {
  //   let score = 0;
  let checkArray = value.split("");
  console.log(checkArray);
}

console.log(ETL("GTA"));
