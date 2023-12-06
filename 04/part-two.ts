import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const lines = input.split("\r\n");

const cardMatchCounts = lines.map((x) => {
  const card = x.split(": ")[1].split(" | ");
  console.log(card[0], "|", card[1]);
  const cardNumbers = card[1].split(" ").filter((x) => x.trim() !== "");
  const cardWinningNumbers = card[0].split(" ").filter((x) => x.trim() !== "");
  const cardNumberMatches = cardNumbers.filter((x) =>
    cardWinningNumbers.includes(x)
  );
  return cardNumberMatches.length;
});

const cardInstances = Array(cardMatchCounts.length).fill(1);
for (let i = 0; i < cardMatchCounts.length; i++) {
  for (let j = 0; j < cardMatchCounts[i]; j++) {
    if (i + j < cardMatchCounts.length - 1) {
      cardInstances[i + j + 1] += cardInstances[i];
    }
  }
}

console.log(cardInstances.reduce((a, b) => a + b, 0));
