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
for (const line of lines) {
   const comp1 = line.slice(0, line.length / 2);
   const comp2 = line.slice(line.length / 2);
   
   for (let i = 0; i < comp1.length; ++i) {
      if (comp2.indexOf(comp1[i]) > -1) {
         prio_sum += letterToPriority(comp1[i]);
         break;
      }
   }
}

console.log("Priority sum = ", prio_sum);
