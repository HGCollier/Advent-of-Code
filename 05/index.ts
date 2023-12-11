import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const [seedsInput, ...blocks] = input.split("\r\n\r\n");
let seeds: number[] = seedsInput
  .split(": ")[1]
  .split(" ")
  .map((x) => parseInt(x));

blocks.forEach((block) => {
  const [_, ...lines] = block.split("\r\n");
  const ranges: number[][] = [];
  lines.forEach((line) => {
    ranges.push(line.split(" ").map((x) => parseInt(x)));
  });
  const seedResults: number[] = [];
  seeds.forEach((seed: number) => {
    let seedResult: number | undefined;
    for (const [destRangeStart, srcRangeStart, rangeLength] of ranges) {
      if (srcRangeStart <= seed && seed < srcRangeStart + rangeLength) {
        seedResult = seed - srcRangeStart + destRangeStart;
        break;
      }
    }
    seedResults.push(seedResult ?? seed);
  });
  seeds = seedResults;
});
console.log(Math.min(...seeds));
