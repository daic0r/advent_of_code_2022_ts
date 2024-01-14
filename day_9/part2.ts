import { readFileSync } from 'fs';

type Direction = "R" | "U" | "L" | "D";

const lines = readFileSync("input3.txt", "utf8").split("\n").filter(l => l.length);

const theSet = new Set<string>();

let pos: [number, number][] = [];
for (let i = 0; i < 10; ++i)
   pos.push([0, 0]);
let last_pos: [number, number][] = [];
// for (let i = 0; i < 10; ++i)
//    last_pos.push([0, 0]);

let check = false;
function move(amount: number, dir: Direction) {
   for (let i = 1; i <= amount; ++i) {
      for (let j = 0; j < 10; ++j)
         last_pos[j] = [...pos[j]];
      switch (dir) {
         case "R":
            pos[0] = [pos[0][0]+1, pos[0][1]];
            break;
         case "L":
            pos[0] = [pos[0][0]-1, pos[0][1]];
            break;
         case "D":
            pos[0] = [pos[0][0], pos[0][1]+1];
            break;
         case "U":
            pos[0] = [pos[0][0], pos[0][1]-1];
            break;
         default:
            throw new Error("invalid direction");
      }
      for (let j = 1; j < 10; ++j) {
         if (Math.abs(pos[j][0]-pos[j-1][0]) > 1 || Math.abs(pos[j][1]-pos[j-1][1]) > 1) {
            pos[j] = last_pos[j-1];
         } else
            break;
      }
      theSet.add([...pos[9]].toString());
   } 
   console.log(pos[9]);
}

for (const line of lines) {
   const dir: Direction = line[0] as Direction;
   const amount: number = parseInt(line.slice(2));
   move(amount, dir);
}

console.log(theSet);
console.log("Number of visited fields by the tail = ", theSet.size);
