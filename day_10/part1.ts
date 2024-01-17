import { readFileSync } from 'fs';

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

let register = 1;
let cycle = 1;
let cmd_cycle = 0;
let idx = 0;
const check_cycles = [ 20, 60, 100, 140, 180, 220 ];
const signal_strengths: number[] = [];
while (idx < lines.length) {
   const line = lines[idx];

   if (check_cycles.includes(cycle)) {
      console.log(`Cycle ${cycle}, register = ${register}`);
      signal_strengths.push(cycle * register);
   }

   const splits = line.split(" ");
   const cmd = splits[0];
   switch (cmd) {
      case "addx":
         ++cmd_cycle;
         if (cmd_cycle === 2) {
            cmd_cycle = 0;
            ++idx;
            register += parseInt(splits[1]);
         }
         break;
      default:
         ++idx;
         break;
   }
   ++cycle;
}

const result = signal_strengths.reduce((acc,x) => acc + x, 0);
console.log("Sum of signal strengths = ", result);
