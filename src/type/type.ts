export type Assert<T> = T;
export type Maybe<T> = T | undefined;
export type Write<T> = { -readonly [K in keyof T]: T[K] };
export type ReadWrite<T> = T | Readonly<T> | Write<T>;

export const maybe = <T>(x: T) => {
  return (x === undefined ? [] : [x]) as Assert<T extends undefined ? [] : [T]>;
};

export const union = <T extends object>(...xs: T[]) => {
  const ys = {};
  for (let i = 0; i < xs.length; i++) {
    Object.assign(ys, xs[i]);
  }

  return ys as Assert<T>;
};
