import { readFileSync } from 'fs';

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

let scores: number[][] = [];
for (let y = 0; y < lines.length; ++y) {
   scores[y] = [];
   for (let x = 0; x < lines[0].length; ++x) {
      scores[y][x] = -1;
   }
}

function calculateScore(x: number, y: number): number {
   let cnt_left = 0;
   for (let tmp_x = x-1; tmp_x >= 0; --tmp_x) {
      ++cnt_left;
      if (lines[y][tmp_x] >= lines[y][x])
         break;
   }
   let cnt_right = 0;
   for (let tmp_x = x+1; tmp_x < lines[0].length; ++tmp_x) {
      ++cnt_right;
      if (lines[y][tmp_x] >= lines[y][x])
         break;
   }
   let cnt_top = 0;
   for (let tmp_y = y-1; tmp_y >= 0; --tmp_y) {
      ++cnt_top;
      if (lines[tmp_y][x] >= lines[y][x])
         break;
   }
   let cnt_bottom = 0;
   for (let tmp_y = y+1; tmp_y < lines.length; ++tmp_y) {
      ++cnt_bottom;
      if (lines[tmp_y][x] >= lines[y][x])
         break;
   }
   return cnt_left * cnt_right * cnt_top * cnt_bottom;
}

for (let y = 0; y < lines.length; ++y) {
   for (let x = 0; x < lines[0].length; ++x) {
      scores[y][x] = calculateScore(x, y);
   }
}

const maxScore = Math.max(...scores.flat());

console.log("Max scenic score = ", maxScore);
