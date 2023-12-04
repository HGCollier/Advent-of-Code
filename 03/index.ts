import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const lines = input.split("\r\n");

function adjacent<T>(y: number, x: number, array: string[]) {
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

const validPartNumbers: number[] = [];
lines.forEach((line, lineIndex) => {
  const partNumbers = [...line.matchAll(/\d+/g)];
  partNumbers.forEach((partNumber, _) => {
    if (partNumber.index == null) {
      return;
    }
    for (let i = 0; i < partNumber[0].length; i++) {
      if (
        adjacent(partNumber.index + i, lineIndex, lines).some(
          (x) => x != null && !x.match(/[.\d]+/)
        )
      ) {
        validPartNumbers.push(parseInt(partNumber[0]));
        break;
      }
    }
  });
});

console.log(validPartNumbers.reduce((a, b) => a + b, 0));
