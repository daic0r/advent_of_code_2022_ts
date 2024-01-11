import { readFileSync } from 'fs';

const input: string[] = readFileSync('./input.txt', 'utf8').split('\n');

let crates: string[] = [];
let line_instr;
for (let i = 0; i < input.length; ++i) {
   if (input[i].length === 0) {
      line_instr = i + 1;
      break;
   }
   crates.push(input[i]);
}
crates.reverse();

// Determine number of crates
const cnt = (() => {
   let cnt = 0;
   for (let i = 0; i < crates[0].length; ++i)
      if (crates[0][i] !== ' ')
         ++cnt;
   return cnt;
})();

let stacks: string[][] = [];
for (let i = 0; i < cnt; ++i)
   stacks.push([]);

for (let i = 1; i < crates.length; ++i) {
   for (let j = 0; j < cnt; ++j) {
      let crate_str = crates[i].substr(j * 4, 3);
      if (crate_str.trim().length !== 0)
         stacks[j].push(crate_str[1]);
   }
}

console.log(stacks);

for (let i = line_instr; i < input.length - 1; ++i) {
   let rex = /move (\d+) from (\d+) to (\d+)/;
   let captures = rex.exec(input[i]);
   let how_many = parseInt(captures[1]);
   let from = parseInt(captures[2]);
   let to = parseInt(captures[3]);
   for (let i = 0; i < how_many; ++i) {
      stacks[to-1].push(stacks[from-1].pop());
   }
}

const top_crates = stacks.reduce((acc, x) => acc + x[x.length - 1], "");
console.log("Top crates: ", top_crates);

