import { readFileSync } from 'fs';

const lines = readFileSync("input2.txt", "utf8").split("\n").filter(l => l.length);

type SearchDim = "X" | "Y" | "-X" | "-Y";

function findLastVisibleIndex(map: string[], dim: SearchDim, lineOrCol: number): number {
   const inc = dim[0] === '-' ? -1 : 1;
   let start = 0;
   let last = undefined;
   switch (dim) {
      case "-X":
         start = map[0].length-1;
         for (let x = start-1; x >= 0; --x) {
            if (parseInt(map[lineOrCol][x]) < parseInt(map[lineOrCol][x+1])) {
               console.log(`-X, line ${lineOrCol}: ${x+1}`);
               return x+1;
            }
         }
         break;
      case "X":
         for (let x = 1; x < map[0].length; ++x) {
            if (parseInt(map[lineOrCol][x]) < parseInt(map[lineOrCol][x-1])) {
               console.log(`X, line ${lineOrCol}: ${x-1}`);
               return x-1;
            }
         }
         break;
      case "-Y":
         start = map.length-1;
         for (let y = start; y > 0; --y) {
            if (parseInt(map[y][lineOrCol]) > parseInt(map[y-1][lineOrCol])) {
               console.log(`-Y, col ${lineOrCol}: ${y}`);
               return y;
            }
         }
         break;
      case "Y":
         for (let y = 0; y < map.length-1; ++y) {
            if (parseInt(map[y][lineOrCol]) > parseInt(map[y+1][lineOrCol])) {
               console.log(`Y, col ${lineOrCol}: ${y}`);
               return y;
            }
         }
         break;
   }
   return -1;
}

let visibleMap: boolean[][] = [];
for (let y = 0; y < lines.length; ++y) {
   visibleMap[y] = [];
   for (let x = 0; x < lines[0].length; ++x) {
      visibleMap[y][x] = false;
   }
}

for (const line of visibleMap) {
   for (const b of line)
      process.stdout.write(`${Number(b)}`);
   console.log();
}
console.log();

for (let y = 0; y < lines.length; ++y) {
   const min_x = findLastVisibleIndex(lines, "X", y);
   const max_x = findLastVisibleIndex(lines, "-X", y);
   for (let x = 0; x <= min_x; ++x) {
      visibleMap[y][x] = true;
   }
   for (let x = max_x; x < lines[0].length; ++x) {
      visibleMap[y][x] = true;
   }
   // visibleMap[y][min_x] = true; 
   // visibleMap[y][max_x] = true; 
   // visibleMap[y][0] = true;
   // visibleMap[y][lines[0].length-1] = true;
}
for (let x = 0; x < lines[0].length; ++x) {
   let min_y = findLastVisibleIndex(lines, "Y", x);
   let max_y = findLastVisibleIndex(lines, "-Y", x);
   for (let y = 0; y <= min_y; ++y) {
      visibleMap[y][x] = true;
   }
   for (let y = max_y; y < lines.length; ++y) {
      visibleMap[y][x] = true;
   }
   // visibleMap[min_y][x] = true; 
   // visibleMap[max_y][x] = true; 
   // visibleMap[0][x] = true;
   // visibleMap[lines.length-1][x] = true;
}

console.log();

for (const line of visibleMap) {
   for (const b of line)
      process.stdout.write(`${Number(b)}`);
   console.log();
}

console.log();

let sumInnerVisible = visibleMap.reduce((acc, y) => acc + y.reduce((acc2, x) => acc2 + Number(x), 0), 0);
// Add outer trees
//sumInnerVisible += 2*lines[0].length + 2*(lines.length-2);

console.log("# of visible trees = ", sumInnerVisible);
