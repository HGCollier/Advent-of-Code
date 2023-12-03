import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const games = input.split("\r\n");

const gamePowers: number[] = [];
games.forEach((game, gameIndex) => {
  const cubes: {
    red: number[];
    green: number[];
    blue: number[];
  } = {
    red: [],
    green: [],
    blue: [],
  };

  game
    .split(": ")[1]
    .split("; ")
    .forEach((set, setIndex) => {
      set.split(", ").forEach((cubeInSet, cubeInSetIndex) => {
        const splitCubeInSet = cubeInSet.split(" ");
        const amount = splitCubeInSet[0];
        const color = splitCubeInSet[1] as "blue" | "red" | "green";
        cubes[color].push(parseInt(amount));
      });
    });

  gamePowers.push(
    cubes.red.sort((a, b) => b - a)[0] *
      cubes.green.sort((a, b) => b - a)[0] *
      cubes.blue.sort((a, b) => b - a)[0]
  );
});

console.log(gamePowers.reduce((a, b) => a + b, 0));
