export class FSNode {
   _name: string

   constructor(name: string) {
      this._name = name;
   }

   get name(): string {
      return this._name;
   }
}

export class File extends FSNode {
   _size: number;

   constructor(
      name: string,
      size: number
   ) 
   {
      super(name);
      this._size = size;
   }

   get size(): number {
      return this._size;
   }   
}
export class Directory extends FSNode {
   _dirs: Directory[] = [];
   _files: File[] = [];
   _parent: Directory | null;

   constructor(name: string, parent: Directory | null) {
      super(name);
      this._parent = parent;
   }

   get dirs(): Directory[] {
      return this._dirs;
   }

   get files(): File[] {
      return this._files;
   }

   get parent(): Directory | null  {
      return this._parent;
   }

   private static sizeImpl(dir: Directory): number {
      let sizeThis = dir._files.reduce((acc, x) => acc + x.size, 0);
      for (const d of dir._dirs)
         sizeThis += Directory.sizeImpl(d);
      return sizeThis;
      
   }
   get size(): number {
      return Directory.sizeImpl(this);
   }

   addDir(name: string): Directory {
      let dir = this._dirs.find(dir => dir.name === name);
      if (dir === undefined) {
         const new_len = this._dirs.push(new Directory(name, this));
         dir = this._dirs[new_len-1];
      }
      return dir;
   }

   addFile(name: string, size: number) {
      let file = this._files.find(f => f.name === name);
      if (file === undefined) {
         this._files.push(new File(name, size));
      }
   }
}
