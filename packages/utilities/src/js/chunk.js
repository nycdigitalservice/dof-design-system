const chunki = (arr, cond) => {
  const res = [];
  let chunk = [];

  // Iterative
  for (const i of arr) {
    if (cond(arr[i]) && chunk.length > 0) {
      res.push(chunk);
      chunk = []
    }
    chunk.push(arr[i])      
  }

  if (chunk.length > 0) {
    res.push(chunk);
  }

  return res;
}

const chunkr = (arr, cond) => {
  const res = [];
  let chunk = [];

  // Recursive
  (function chunky(ns){
    if (Array.isArray(ns) && !ns.length) {
      res.push(chunk);
      return;
    }
    if (cond(ns[0]) && chunk.length > 0) {
      res.push(chunk);
      chunk = []
    }
    chunk.push(ns.shift())
    return chunky(ns);
  })(arr)

  return res;
}

export { chunki, chunkr };
