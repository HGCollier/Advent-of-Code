import { readFileSync } from "fs";
import { specialCharacterRegexNoDecimal } from "../utils/regex";

const input = readFileSync("input.txt", "utf8");
const lines = input.split("\r\n");

function getAdjacentValues<T>(y: number, x: number, array: T[][]) {
  const adjacentValues = [
    array[x - 1]?.[y - 1],
    array[x - 1]?.[y],
    array[x - 1]?.[y + 1],
    array[x]?.[y - 1],
    array[x]?.[y + 1],
    array[x + 1]?.[y - 1],
    array[x + 1]?.[y],
    array[x + 1]?.[y + 1],
  ];
  return adjacentValues;
}

// Mutate input so that numbers are replaced with identifiers
const partNumbers: RegExpMatchArray[] = [];
const lineChars: string[][] = [];
lines.forEach((line, lineIndex) => {
  const chars = line.split("");
  const linePartNumbers = [...line.matchAll(/\d+/g)];
  linePartNumbers.forEach((linePartNumber, linePartNumberIndex) => {
    if (linePartNumber.index == null) return;
    chars.splice(
      linePartNumber.index,
      linePartNumber[0].length,
      ...Array(linePartNumber[0].length).fill([
        partNumbers.length + linePartNumberIndex,
      ])
    );
  });
  partNumbers.push(...linePartNumbers);
  lineChars.push(chars);
});

let gearRatios = 0;
const lineSymbols = [...lines.join("").matchAll(/\*/g)];
lineSymbols.forEach((symbol, symbolIndex) => {
  if (symbol.index == null) return;
  const adjacent = getAdjacentValues(
    symbol.index % lines[0].length,
    Math.floor(symbol.index / lines[0].length),
    lineChars
  )
    .filter((x) => x != null && Array.isArray(x))
    .map((x) => parseInt(x));
  const uniqueAdjacents = [...new Set(adjacent)];
  if (uniqueAdjacents.length === 2) {
    gearRatios +=
      parseInt(partNumbers[uniqueAdjacents[0]][0]) *
      parseInt(partNumbers[uniqueAdjacents[1]][0]);
  }
});

console.log(gearRatios);
