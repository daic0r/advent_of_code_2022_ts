export class BinaryHeap {
   values: number[] = [];

   constructor(...args : number[]) {
      for (const arg of args) {
         this.push(arg);
      }
   }

   private static left_child(n: number): number {
      return 2 * n + 1;
   }

   private static right_child(n: number): number {
      return 2 * n + 2;
   }

   private static parent(n: number): number {
      return Math.floor((n - 1) / 2);
   }

   private max_of_children(idx: number): number {
      const left_idx = BinaryHeap.left_child(idx);
      const right_idx = BinaryHeap.right_child(idx);
      return this.values[left_idx] > this.values[right_idx] ? left_idx : right_idx;
   }

   push(val: number) {
      this.values.push(val);
      if (this.values.length === 1)
         return;
      let cur_idx = this.values.length - 1;
      let parent_idx = BinaryHeap.parent(cur_idx);
      while (val > this.values[parent_idx]) {
         [this.values[cur_idx], this.values[parent_idx]] = [this.values[parent_idx], this.values[cur_idx]];
         cur_idx = parent_idx;
         parent_idx = BinaryHeap.parent(cur_idx);
      }
   }

   pop(): number | undefined {
      if (this.values.length === 0) {
         return undefined;
      }
      [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
      let ret = this.values.pop();
      if (this.values.length < 2) {
         return ret;
      }
      let cur_idx = 0;
      let max_idx = this.max_of_children(cur_idx);
      while (this.values[cur_idx] < this.values[max_idx]) {
         [this.values[cur_idx], this.values[max_idx]] = [this.values[max_idx], this.values[cur_idx]];
         cur_idx = max_idx; 
         max_idx = this.max_of_children(cur_idx);
      }

      return ret;

   }
}
