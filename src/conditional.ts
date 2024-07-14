type X = { x: number };
type Y = { y: number };
type XY = { x: number; y: number };

type Cond<T, V> = T extends V ? number : string;

type N = Cond<XY, X>; // = number
type E = Cond<Y, X>; // = string

type Exclude<T, U> = T extends U ? never : T;

type A = "a" | "b" | "c";
type B = Exclude<A, "a" | "b">; // = "c"
type C = Exclude<A, "a" | "b" | "c">; // = never
type D = Exclude<A, "z">; // = "a" | "b" | "c"

// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Point = {
  x: number;
  y: number;
  z: number;
};

type PointX = Omit<Point, "y" | "z">; // = { x: number }
type PointY = Omit<Point, "x" | "z">; // = { y: number }
