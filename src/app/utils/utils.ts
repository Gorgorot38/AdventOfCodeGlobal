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

export function* range(start: number, end: number, step: number) {
  while (start < end) {
    yield start;
    start += step;
  }
}

export function memoize<Args extends unknown[], T>(func: (...args: Args) => T): (...args: Args) => T {
  const stored = new Map<string, T>();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k)!;
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

/**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a
 * @example getUniqueId(4) : 6a22-a5e6-3489-896b
 */
export function getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}

export function dumbEquals(obj1: unknown, obj2: unknown) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function pointInPolygon(p: Point, points: Array<Point>): boolean {
  let wn = 0; // winding number

  points.forEach((a, i) => {
    const b = points[(i + 1) % points.length];
    if (a.y <= p.y) {
      if (b.y > p.y && cross(a, b, p) > 0) {
        wn += 1;
      }
    } else if (b.y <= p.y && cross(a, b, p) < 0) {
      wn -= 1;
    }
  });

  return wn !== 0;
}

export function cross(x: Point, y: Point, z: Point): number {
  return (y.x - x.x) * (z.y - x.y) - (z.x - x.x) * (y.y - x.y);
}

export class Point {
  x: number;
  y: number;
}

export function calculatePolygonArea(vertices: Point[]): number {
  const n: number = vertices.length;
  let area: number = 0.0;

  for (let i = 0; i < n - 1; i++) {
    area += vertices[i].x * vertices[i + 1].y - vertices[i + 1].x * vertices[i].y;
  }

  area += vertices[n - 1].x * vertices[0].y - vertices[0].x * vertices[n - 1].y;

  area = Math.abs(area) / 2.0;

  return area;
}
