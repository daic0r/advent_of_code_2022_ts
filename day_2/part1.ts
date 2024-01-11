import { BinaryHeap } from '../utils/BinaryHeap.js';

console.log("Starting...");

let heap = new BinaryHeap(99, 10, 11, 0, 120, 43, 1000);
// for (let i = 0; i < 500; i+=50) {
//    heap.push(i);
// }

let val: number | undefined;
while (val = heap.pop()) {
   console.log(val);
}
