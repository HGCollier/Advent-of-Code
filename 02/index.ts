import * as fs from "fs";

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const input = fs.readFileSync("input.txt", "utf8");
const games = input.split("\r\n");

const impossibleGameIndexes: number[] = [];
games.forEach((game, gameIndex) => {
  const gameSets = game.replace(`Game ${gameIndex + 1}: `, "").split("; ");
  gameSets.forEach((set, setIndex) => {
    const cubesInSet = set.split(", ");
    cubesInSet.forEach((cubeInSet) => {
      const cubeInSetSplit = cubeInSet.split(" ");
      const amount = parseInt(cubeInSetSplit[0]);
      const color = cubeInSetSplit[1];
      if (!(color in cubes)) {
        return;
      }
      if (amount > cubes[color as "red" | "blue" | "green"]) {
        impossibleGameIndexes.push(gameIndex + 1);
        return;
      }
    });
  });
});

console.log(
  games
    .map((_, index) => {
      if (impossibleGameIndexes.indexOf(index + 1) === -1) {
        return index + 1;
      }
      return -1;
    })
    .filter((x) => x != -1)
    .reduce((a, b) => a + b, 0)
);
