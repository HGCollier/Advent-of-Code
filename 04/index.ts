import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const lines = input.split("\r\n");

const totalPoints = lines.map((x) => {
  const card = x.split(": ")[1].split(" | ");
  console.log(card[0], "|", card[1]);
  const cardNumbers = card[1].split(" ").filter((x) => x.trim() !== "");
  const cardWinningNumbers = card[0].split(" ").filter((x) => x.trim() !== "");
  const cardNumberMatches = cardNumbers.filter((x) =>
    cardWinningNumbers.includes(x)
  );
  if (cardNumberMatches.length <= 0) {
    return 0;
  }
  return Math.pow(2, cardNumberMatches.length - 1);
});

console.log(totalPoints.reduce((a, b) => a + b, 0));
