import { readFileSync } from 'fs';

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

type SearchDim = "X" | "Y" | "-X" | "-Y";

function markVisibleFields(map: string[], 
                           dim: SearchDim, 
                           lineOrCol: number,
                           visible: boolean[][])
{
   let cur_max = -1;
   const doX = x => {
      const cur = parseInt(map[lineOrCol][x]); 
      if (cur > cur_max) {
         visible[lineOrCol][x] = true;
         cur_max = cur;
      }
   };
   const doY = y => {
      const cur = parseInt(map[y][lineOrCol]); 
      if (cur > cur_max) {
         visible[y][lineOrCol] = true;
         cur_max = cur;
      }
   };
   switch (dim) {
      case "-X":
         for (let x = map[0].length-1; x >= 0; --x) {
            doX(x);
         }
         break;
      case "X":
         for (let x = 0; x < map[0].length; ++x) {
            doX(x);
         }
         break;
      case "-Y":
         for (let y = map.length-1; y >= 0; --y) {
            doY(y);
         }
         break;
      case "Y":
         for (let y = 0; y < map.length-1; ++y) {
            doY(y);
         }
         break;
   }
}

let visibleMap: boolean[][] = [];
for (let y = 0; y < lines.length; ++y) {
   visibleMap[y] = [];
   for (let x = 0; x < lines[0].length; ++x) {
      visibleMap[y][x] = false;
   }
}

// for (const line of visibleMap) {
//    for (const b of line)
//       process.stdout.write(`${Number(b)}`);
//    console.log();
// }
// console.log();

for (let y = 0; y < lines.length; ++y) {
   markVisibleFields(lines, "X", y, visibleMap);
   markVisibleFields(lines, "-X", y, visibleMap);
}
for (let x = 0; x < lines[0].length; ++x) {
   markVisibleFields(lines, "Y", x, visibleMap);
   markVisibleFields(lines, "-Y", x, visibleMap);
}

// console.log();

// for (const line of visibleMap) {
//    for (const b of line)
//       process.stdout.write(`${Number(b)}`);
//    console.log();
// }
//
// console.log();

let sumInnerVisible = visibleMap.reduce((acc, y) => acc + y.reduce((acc2, x) => acc2 + Number(x), 0), 0);

console.log("# of visible trees = ", sumInnerVisible);
