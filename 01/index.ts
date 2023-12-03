import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let sumOfAllValues = 0;
lines.forEach((value, _) => {
  const numbersInValue = value.replace(/\D/g, "");
  const firstNumber = numbersInValue[0];
  const lastNumber = numbersInValue[numbersInValue.length - 1];
  sumOfAllValues += parseInt(`${firstNumber}${lastNumber}`);
});
console.log(sumOfAllValues);
