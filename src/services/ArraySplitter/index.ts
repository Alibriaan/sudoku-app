export function sliceArrayIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];

  for (let index = 0; index < arr.length; index += chunkSize) {
      const chunk = arr.slice(index, index + chunkSize);

      res.push(chunk);
  }
  return res;
}