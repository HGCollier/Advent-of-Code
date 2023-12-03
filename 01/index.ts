import * as fs from "fs";
import { getIndicesOf } from "../utils/matching";

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

type NumberMatch = {
  index: number;
  number: number;
};

let sumOfAllValues = 0;
lines.forEach((value, _) => {
  const numberMatches: NumberMatch[] = [];

  numberWords.forEach((number, index) => {
    const numberWordMatch = getIndicesOf(number, value);
    if (numberWordMatch.length > 0) {
      numberMatches.push(
        ...numberWordMatch.map((match): NumberMatch => {
          return {
            index: match,
            number: index + 1,
          };
        })
      );
    }
  });

  [...value.matchAll(/\d/g)]?.forEach((number, _) => {
    if (number.index == null || number[0] == null) {
      return;
    }

    numberMatches.push({
      index: number.index,
      number: parseInt(number[0]),
    });
  });

  const sortedNumberMatches = numberMatches
    .sort((a, b) => a.index - b.index)
    .map((x) => x.number);
  const firstNumber = sortedNumberMatches[0];
  const lastNumber = sortedNumberMatches[sortedNumberMatches.length - 1];
  console.log(`${firstNumber}${lastNumber}`, value);
  sumOfAllValues += parseInt(`${firstNumber}${lastNumber}`);
});
console.log(sumOfAllValues);
