import { BinaryHeap } from "../utils/BinaryHeap.js"
import { readFileSync } from "fs";

const lines: string[] = readFileSync("input.txt", "utf8").split('\n');

let elves = new BinaryHeap();

let cur_elf = 0;
for (const line of lines) {
   if (line.length === 0) {
      elves.push(cur_elf);
      cur_elf = 0;
      continue;
   }
   cur_elf += parseInt(line);
}

let top_3_sum = 0;
for (let i = 0; i < 3; ++i) {
   top_3_sum += elves.pop();
}
console.log("Top 3 elves = ", top_3_sum);
