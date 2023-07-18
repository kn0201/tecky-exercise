// Declaration of Class and its methods
class Player {
  private strength: number;
  private name: string;
  private exp: number;

  constructor(strength: number, name: string) {
    this.strength = strength;
    this.name = name;
    this.exp = 0;
  }

  attack(monster: Monster) {
    if (Math.random() > 0.1) {
      let damage: number = this.strength;
      monster.injure(damage);
      console.log(
        `Player ${this.name} attacks(Damage :${damage}) a monster (HP: ${monster.hp})`
      );
      this.gainExperience(1);
    } else {
      let damage: number = this.strength * 2;
      monster.injure(damage);
      console.log(
        `Player ${this.name} attacks(Damage :${damage}) a monster (HP: ${monster.hp}) [CRITICAL]`
      );
      this.gainExperience(2);
    }
  }

  gainExperience(exp: number) {
    this.exp += exp;
    if (this.exp == 10) {
      this.strength++;
      this.exp = 0;
      console.log(`Level Up - Strength become ${this.strength}`);
    }
  }
}

class Monster {
  hp: number;
  constructor() {
    this.hp = 500;
  }
  injure(damage: number) {
    this.hp -= damage;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }
}

// Invocations of the class and its methods
const player = new Player(20, "Peter");
const monster = new Monster();
console.log(`Monster HP: ${monster.hp}`);
while (monster.hp > 0) {
  player.attack(monster);
}

// English counterpart: Player attacks monster
