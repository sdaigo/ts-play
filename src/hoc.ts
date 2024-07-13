type AddT = (_: number) => (_: number) => number;

const add: AddT = l => r => l + r;

type FoldArrT = (_: (_: number) => (_: number) => number) => (_: number) => (_: number[]) => number;

const foldArr: FoldArrT = f => z => arr => arr.reduce((acc, val) => f(acc)(val), z);

foldArr(add)(0)([1, 2, 3, 4, 5]); // 15
