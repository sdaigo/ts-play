function memo<T extends any[], U>(fn: (...args: T) => U) {
  const cache = new Map<string, U>();

  return (...args: T) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("hit");
      return cache.get(key) as U;
    }

    console.log("set");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}

const memoizedFactorial = memo(factorial);

console.time("factorial:first");
memoizedFactorial(5);
console.timeEnd("factorial:first");

console.time("factorial:second");
memoizedFactorial(5);
console.timeEnd("factorial:second");
