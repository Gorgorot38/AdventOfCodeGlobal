import { PriorityQueue } from './utils';

export class Node {
  name: string;
  weight: number;
  distance: number = Number.MAX_SAFE_INTEGER;
  isVisited = false;
  neighbors: Node[] = [];
  value: string | number;
  isOpened = false;

  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }
}

export function dijkstra(target: Node, startName: string, vertices: Map<string, Node>) {
  const queue = new PriorityQueue<Node>();
  vertices.get(startName).distance = 0;
  queue.insert(0, vertices.get(startName));

  while (!queue.isEmpty()) {
    const current = queue.pop();
    if (current.isVisited) {
      continue;
    }
    current.isVisited = true;
    vertices.get(current.name).isVisited = true;

    if (current.name === target.name) {
      return target.distance;
    }

    getNeighbours(current, vertices).forEach((n) => {
      const dist = current.distance + n.weight;
      if (dist < n.distance) {
        n.distance = dist;
        vertices.get(n.name).distance = dist;
      }

      if (n.distance !== Number.MAX_SAFE_INTEGER) {
        queue.insert(n.distance, n);
      }
    });
  }
  return target.distance;
}

export function getNeighbours(node: Node, vertices: Map<string, Node>): Node[] {
  return vertices
    .get(node.name)
    .neighbors.filter((n) => !vertices.get(n.name).isVisited)
    .map((n) => vertices.get(n.name));
}
