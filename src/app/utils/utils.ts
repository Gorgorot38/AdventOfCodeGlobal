export function onlyUnique(value: unknown, index: number, self: unknown[]): boolean {
  return self.indexOf(value) === index;
}
