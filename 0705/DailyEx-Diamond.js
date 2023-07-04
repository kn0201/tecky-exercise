// let pattern = "+-+-+-+";

// // expect outcome
// // console.log('+-+-+-+');
// // console.log(' -+-+- ');
// // console.log('  +-+  ');
// // console.log('   -   ');

// let start = 0;
// let end = pattern.length;
// let space = " ";
// // while (end > start) {
// //   console.log(space + pattern.slice(start, end));
// //   end--;
// //   start++;
// //   space += " ";
// // }

// for (let i = 0; i < pattern.length / 2; i++) {
//   console.log(space + pattern.slice(start, end));
//   end--;
//   start++;
//   space += " ";
// }

let data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function Diamond(str) {
  let index = data.indexOf(str);
  let value = data[index];
  let point = "‧";
  console.log(index);
  console.log(value);
  let times = index * 2 + 1;
  console.log(times);
  let pointString = point.repeat(times);
  console.log(pointString);
  let pointArray = pointString.split("");
  console.log(pointArray);
  let ans = pointArray.splice(index, index + 1, value);
  console.log(ans.join(""));
}

Diamond("C");
