export type Assert<T> = T;
export type Maybe<T> = T | undefined;

export const maybe = <T>(x: T) => {
  return (x === undefined ? [] : [x]) as Assert<T extends undefined ? [] : [T]>;
};

export type Write<T> = { -readonly [K in keyof T]: T[K] };

export const union = <T extends object>(...xs: T[]) => {
  const ys = {};
  for (let i = 0; i < xs.length; i++) {
    Object.assign(ys, xs[i]);
  }

  return ys as Assert<T>;
};
