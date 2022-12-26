export function twoDimensionalIntoOneDimensional<T>(twoDimensionalArray: T[][]) {
  return ([] as T[]).concat.apply([], twoDimensionalArray);
}