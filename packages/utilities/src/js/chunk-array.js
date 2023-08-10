export default (array, chunkSize) => {
  const arr = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    arr.push(chunk);
  }
  return arr;
}
