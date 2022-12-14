export function onlyUnique(value: unknown, index: number, self: unknown[]): boolean {
  return self.indexOf(value) === index;
}

export class PriorityQueue<T> {
  heap: Heap<T>[] = [];

  parent = (index: number) => Math.floor((index - 1) / 2);
  left = (index: number) => 2 * index + 1;
  right = (index: number) => 2 * index + 2;
  hasLeft = (index: number) => this.left(index) < this.heap.length;
  hasRight = (index: number) => this.right(index) < this.heap.length;

  swap = (a: number, b: number) => {
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = tmp;
  };

  insert(p: number, i: T) {
    this.heap.push({ key: p, value: i });

    let idx = this.heap.length - 1;
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.heap[p].key < this.heap[idx].key) break;
      const tmp = this.heap[idx];
      this.heap[idx] = this.heap[p];
      this.heap[p] = tmp;
      idx = p;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  pop() {
    if (this.heap.length == 0) return null;

    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop();

    let current = 0;
    while (this.hasLeft(current)) {
      let smallerChild = this.left(current);
      if (this.hasRight(current) && this.heap[this.right(current)].key < this.heap[this.left(current)].key) smallerChild = this.right(current);

      if (this.heap[smallerChild].key > this.heap[current].key) break;

      this.swap(current, smallerChild);
      current = smallerChild;
    }

    return item?.value;
  }
}

export interface Heap<T> {
  key: number;
  value: T;
}
