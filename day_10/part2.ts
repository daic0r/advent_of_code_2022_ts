import { readFileSync } from 'fs';

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

let register = 1;
let cycle = 1;
let cmd_cycle = 0;
let idx = 0;
const screen: string[][] = [];
for (let i = 0; i < 6; ++i) {
   screen[i] = [];
   for (let j = 0; j < 40; ++j)
      screen[i].push(" ");
}
while (idx < lines.length) {
   const line = lines[idx];

   const draw_pos = [ (cycle - 1) % 40, Math.floor((cycle - 1) / 40) ];
   if (draw_pos[0] >= register-1 && draw_pos[0] <= register+1)
      screen[draw_pos[1]][draw_pos[0]] = '#';

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

for (let i = 0; i < 6; ++i) {
   for (let j = 0; j < 40; ++j)
      process.stdout.write(screen[i][j]);
   console.log();
}
