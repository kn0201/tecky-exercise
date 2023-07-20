let studentsArray: [] = [];

class Student {
  name: string;
  grade: number;

  constructor(name: string, grade: number) {
    this.name = name;
    this.grade = grade;
  }

  add() {
    // let studentName = this.name;
    studentsArray.push();
  }
}

const Anna = new Student("Anna", 1);
const Barb = new Student("Barb", 1);
const Charlie = new Student("Charlie", 1);
const Alex = new Student("Alex", 2);
const Peter = new Student("Peter", 2);
const Zoe = new Student("Zoe", 2);
const Jim = new Student("Jim", 5);

Anna.add();
console.log(studentsArray);
