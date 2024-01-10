import { BinaryHeap } from "../utils/BinaryHeap.js";
import { readFileSync } from "fs";
const lines = readFileSync("input.txt", "utf8").split('\n');
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
const max_elf = elves.pop();
console.log("Max elf = ", max_elf);
