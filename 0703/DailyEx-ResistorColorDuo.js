const data = {
  black: "0",
  brown: "1",
  red: "2",
  orange: "3",
  yellow: "4",
  green: "5",
  blue: "6",
  violet: "7",
  grey: "8",
  white: "9",
};

function ResistorColorDuo(input) {
  let ans = [];
  let inputArray = input.split("-").slice(0, 2);
  for (let key in data) {
    let value = data[key];
    // console.log(`${key}: ${value}`);
    for (let inputKey in inputArray) {
      let inputValue = inputArray[inputKey];
      //   console.log(`${inputKey}: ${inputValue}`);
      while ((inputKey = 3)) {
        break;
      }
      if (key === inputValue) {
        ans.push(value);
        // console.log(ans);
      }
    }
    finalAns = ans.join("");
  }
  return parseInt(finalAns);
}

console.log(ResistorColorDuo("green-white-brown"));
