const cards = [
  ["Spade", "A"],
  ["Diamond", "J"],
  ["Club", "3"],
  ["Heart", "6"],
  ["Heart", "K"],
  ["Heart", "2"],
  ["Spade", "K"],
  ["Club", "2"],
  ["Heart", "Q"],
  ["Spade", "6"],
  ["Heart", "J"],
  ["Spade", "10"],
  ["Club", "4"],
  ["Diamond", "Q"],
  ["Diamond", "3"],
  ["Diamond", "A"],
  ["Heart", "4"],
  ["Club", "7"],
];

function compareCard(cardA, cardB) {
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const suits = ["Diamond", "Club", "Heart", "Spade"];

  const [suitA, rankA] = cardA;
  const [suitB, rankB] = cardB;

  const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB);

  if (ranksDiff !== 0) {
    return ranksDiff;
  } else {
    return suits.indexOf(suitA) - suits.indexOf(suitB);
  }
}

console.log("1. Count the number of card which is of suit Spade ♠️");
console.log(cards.reduce((acc, card) => acc + (card[0] == "Spade" ? 1 : 0), 0));
console.log(
  cards.reduce((acc, card) => (card[0] == "Spade" ? acc + 1 : acc), 0)
);

console.log('2. Remove all the card that is smaller than ["Club", "3"]');
console.log(cards.filter((card) => compareCard(card, ["Club", "3"]) >= 0));

console.log(
  "3. Count the number of card which is of (suit Diamond ♦️ or Heart ♥️) and with the rank larger than or equal to J."
);
console.log(
  cards.filter(
    ([suit, rank]) =>
      (suit == "Diamond" || suit == "Heart") &&
      compareCard([suit, rank], [suit, "J"]) >= 0
  )
);

console.log(
  "4. Replace all of the cards with suit Club ♣️ to suit Diamond ♦️, keeping the same rank"
);
console.log(
  cards.map(([suit, rank]) =>
    suit == "Club" ? ["Diamond", rank] : [suit, rank]
  )
);
console.log(
  cards.map(([suit, rank]) => [suit == "Club" ? "Diamond" : suit, rank])
);
console.log(
  cards.map(([suit, rank]) => {
    if (suit == "Club") {
      return ["Diamond", rank];
    } else {
      return [suit, rank];
    }
  })
);

console.log(
  "5. Replace all of the cards with rank A to rank 2. Keeping the same suit"
);
console.log(cards.map(([suit, rank]) => [suit, rank == "A" ? "2" : rank]));
