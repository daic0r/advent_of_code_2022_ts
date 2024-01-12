import { readFileSync } from 'fs';
import { Directory, File } from './types.js';
//import assert from 'assert';

type Mode = "ReadCmd" | "ReadLsOutput";

const lines = readFileSync("input.txt", "utf8").split("\n").filter(l => l.length);

function listDir(dir: Directory, indent: number = 0) {
   console.log(`${dir.name}/ (size=${dir.size})`)
   for (const d of dir.dirs) {
      for (let i = 0; i < indent; ++i)
         process.stdout.write(' ');
      listDir(d, indent+1);
   }
   for (const f of dir.files) {
      for (let i = 0; i < indent; ++i)
         process.stdout.write(' ');
      console.log(`${f.name}  ${f.size}`);
   }
}

function sumRelevantDirSizes(dir: Directory, maxSize: number): number {
   let sum = 0;
   if (dir.size <= maxSize) {
      sum += dir.size;
   }
   for (const d of dir.dirs) {
      sum += sumRelevantDirSizes(d, maxSize);
   }
   return sum;
}

const root = new Directory("/", null);
let cur_dir = root;
let mode: Mode = "ReadCmd";
for (const line of lines) {
   if (line[0] === '$') {
      mode = "ReadCmd";
   }
   switch (mode) {
      case "ReadCmd":
         //assert(line[0] === '$');
         const cmd_line = line.substr(2);
         console.log(cmd_line);
         const splits = cmd_line.split(" ");
         const cmd = splits[0];
         switch (cmd) {
            case "cd":
               console.log("CDing: ", splits[1]);
               if (splits[1] === "..") {
                  cur_dir = cur_dir.parent; 
               }
               else
               if (splits[1] === "/") {
                  cur_dir = root;
               }
               else {
                  cur_dir = cur_dir.addDir(splits[1]);
               }
               break;
            case "ls":
               mode = "ReadLsOutput";
               break;
         }
         break;
      case "ReadLsOutput":
         const splits2 = line.split(" ");
         const dirOrSize = splits2[0];
         const name = splits2[1];
         switch (dirOrSize) {
            case "dir":
               cur_dir.addDir(name);
               break;
            default:
               const size = parseInt(dirOrSize);
               cur_dir.addFile(name, size);
               break;
         }
         break;
   }
}

listDir(root);

const sum = sumRelevantDirSizes(root, 100000);
console.log("Sum of relevant directories: ", sum);
