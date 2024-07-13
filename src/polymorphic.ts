// Parametric polymorphism == generics
const arrLength: <T>(_: T[]) => number = arr => arr.length;

arrLength([1, 2, 3]); // 3
arrLength<string>(["a", "b", "c"]); // 3
arrLength<number>([1, 2, 3]); // 3

type NonEmpty<T> = {
  head: T;
  tail: T[];
};

// Ad-hoc polymorphism

interface Eq<T> {
  eq: (f: T, s: T) => boolean;
}

class IntEq implements Eq<number> {
  eq(f: number, s: number) {
    return f === s;
  }
}

class IntArrEq implements Eq<number[]> {
  eq(f: number[], s: number[]) {
    return f.filter(x => s.indexOf(x) < 0).length === 0;
  }
}

new IntEq().eq(3, 4); // false
new IntArrEq().eq([1, 2, 3], [1, 2, 3]); // true

const lookup = <T, K extends Eq<T>, V>(cmp: K, k: T, mp: [T, V][]): V | undefined => {
  let result: V | undefined;
  for (const [kk, v] of mp) {
    if (cmp.eq(k, kk)) {
      result = v;
    }
  }
  return result;
};

const one = lookup(new IntEq(), 1, [
  [1, "one"],
  [2, "two"],
]); // "one"

console.log(one === "one"); // true

const four = lookup(
  new IntArrEq(),
  [1, 2, 3],
  [
    [[1, 3], "one"],
    [[3, 2], "two"],
    [[1, 2, 3], "three"],
    [[2, 1, 3], "four"],
  ],
); // "three"

console.log(four === "four"); // true
