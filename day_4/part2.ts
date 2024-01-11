import { readFileSync } from 'fs';

type Interval = [number, number];
type Pair = [Interval, Interval];

function overlaps_with(interval1: Interval, interval2: Interval): boolean {
   return (interval1[0] >= interval2[0] && interval1[0] <= interval2[1]) ||
         (interval2[0] >= interval1[0] && interval2[0] <= interval1[1]);
}


const lines = readFileSync("input.txt", "utf8").split('\n').filter(l => l.length);

let pairs: Pair[] = [];
for (const line of lines) {
      const intervals: Interval[] = line.split(',').map(interval => {
      const nums = interval.split('-');
      return [ parseInt(nums[0]), parseInt(nums[1]) ];
   });
   pairs.push([ intervals[0], intervals[1] ]);
   console.log(pairs[pairs.length - 1]);
}

const count = pairs.reduce((acc, x: Pair) => acc + Number(overlaps_with(x[0], x[1]) || overlaps_with(x[1], x[0])), 0);
console.log("Number of overlapping intervals: ", count);
