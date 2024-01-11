import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8').split('\n');

// for (let i = 0; i < 26; ++i) {
//    console.log(String.fromCharCode(i + 65));
// }
//
// for (let i = 0; i < 26; ++i) {
//    console.log(String.fromCharCode(i + 97));
// }

function letterToPriority(letter: string): number {
   const firstCode = letter.charCodeAt(0);
   let ret = 0;
   if (firstCode >= 65 && firstCode < 91) {
      ret = firstCode - 64 + 26;
   }
   else {
      ret = firstCode - 96;
   }
   return ret;
}

let prio_sum = 0;
for (let line_num = 0; line_num < lines.length; line_num+=3) {
   const line1 = lines[line_num];
   const line2 = lines[line_num+1];
   const line3 = lines[line_num+2];
   
   for (let i = 0; i < line1.length; ++i) {
      if (line2.indexOf(line1[i]) > -1 && line3.indexOf(line1[i]) > -1) {
         prio_sum += letterToPriority(line1[i]);
         break;
      }
   }
}

console.log("Priority sum = ", prio_sum);
