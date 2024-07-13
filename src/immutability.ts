type A = {
  readonly x: number;
};

const a: A = { x: 1 };
a.x = 2; // Error: Cannot assign to 'x' because it is a read-only property

type B = {
  readonly x: number[];
};

const b: B = { x: [1, 2, 3] };
b.x[0] = 4; // Ok...

const changeA = (arg: { x: number }) => {
  const argC = arg;
  argC.x = 2;
};

changeA(a); // Ok...

// mark all properties as readonly
type C = {
  x: number;
  y: number;
};

type ImmutableC = Readonly<C>;

const c: ImmutableC = { x: 1, y: 2 };
c.x = 3; // Error: Cannot assign to 'x' because it is a read-only property
c.y = 3; // Error: Cannot assign to 'y' because it is a read-only property

const immutableArr: ReadonlyArray<number> = [1, 2, 3];
immutableArr[0] = 4; // Error: Cannot assign to '0' because it is a read-only

const immutableDict: ReadOnlyDict<{ [key: string]: number }> = { a: 1, b: 2 };
immutableDict.a = 10; // Error: Cannot assign to 'a' because it is a read-only

const changeImmutableDict = (arg: { [key: string]: number }) => {
  arg.a = 2;
  return arg;
};

changeImmutableDict(immutableDict); // Error: Cannot assign to { [key: string]: number } because it is a read-only
