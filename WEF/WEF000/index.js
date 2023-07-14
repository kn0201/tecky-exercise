var a = 1;
let b = 3;
const c = 5;

console.log(a + b);
console.log(c - b);
console.log(c * b);
console.log(b / a);
console.log(c % b);

let PTS = 32;
let REB = 18;
let AST = 9;
let STL = 2;
let BS = 0;
let FGA = 33;
let FGM = 13;
let FTA = 8;
let FTM = 4;
let TO = 6;

let efficiency = PTS + REB + AST + STL + BS - (FGA - FGM + (FTA - FTM) + TO);

console.log(`Efficiency = ${efficiency}`);
