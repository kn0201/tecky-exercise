import readline from "readline";

class IO {
  private terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  ask(question: string) {
    return new Promise<string>((resolve, reject) => {
      this.terminal.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
  close() {
    this.terminal.close();
  }
}

class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  // async create() {
  //   try {
  //     await main()

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

async function createUser() {
  let io = new IO();

  let name = await io.ask("What is your name? ");
  console.log("Hi", name);

  let email = await io.ask("What is your email address? ");
  console.log("Creating account with", email);

  io.close();
}

createUser();
