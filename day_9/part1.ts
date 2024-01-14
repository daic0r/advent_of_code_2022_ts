import { readFileSync } from 'fs';

type Direction = "R" | "U" | "L" | "D";

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

const theSet = new Set<string>();

let head_pos: [number, number] = [0, 0];
let last_head_pos: [number, number] = [...head_pos];
let tail_pos: [number, number] = [0, 0];

function move(amount: number, dir: Direction) {
   for (let i = 1; i <= amount; ++i) {
      last_head_pos = [...head_pos];
      switch (dir) {
         case "R":
            head_pos = [head_pos[0]+1, head_pos[1]];
            break;
         case "L":
            head_pos = [head_pos[0]-1, head_pos[1]];
            break;
         case "D":
            head_pos = [head_pos[0], head_pos[1]+1];
            break;
         case "U":
            head_pos = [head_pos[0], head_pos[1]-1];
            break;
         default:
            throw new Error("invalid direction");
      }
      if (Math.abs(head_pos[0]-tail_pos[0]) > 1 || Math.abs(head_pos[1]-tail_pos[1]) > 1) {

         tail_pos = last_head_pos;
      }
      theSet.add([...tail_pos].toString());
   } 
}

for (const line of lines) {
   const dir: Direction = line[0] as Direction;
   const amount: number = parseInt(line.slice(2));
   move(amount, dir);
}

console.log("Number of visited fields by the tail = ", theSet.size);
