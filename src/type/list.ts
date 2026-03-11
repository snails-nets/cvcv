import { expectTypeOf } from "vitest";
import type { Assert, ReadWrite, Write } from "./type";
import { chooseRime, type After, type Before } from "./rime";

export type List<T = any> = T[] | readonly T[];

export type StringToList<S extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer F}${infer R}`
      ? [F, ...StringToList<R>]
      : never;

export const stringToList = <S extends string>(s: S) => {
  return s.split("") as Assert<StringToList<S>>;
};

expectTypeOf<StringToList<"">>().toEqualTypeOf<[]>();
expectTypeOf<StringToList<"a">>().toEqualTypeOf<["a"]>();
expectTypeOf<StringToList<"ab">>().toEqualTypeOf<["a", "b"]>();
expectTypeOf<StringToList<"abc">>().toEqualTypeOf<["a", "b", "c"]>();

export const choose = <T>(...xs: T[]): T => {
  return xs[chooseRime(xs.length)] as Assert<T>;
};

export type Index<Ts extends List, U, N extends number = 0> = U extends Ts[0]
  ? N
  : Write<Ts> extends [any, ...infer R]
    ? Index<R, U, After<N>>
    : never;

type Tail<T extends List> = Write<T> extends [any, ...infer R] ? R : never;

export type At<Ts extends List, N extends number> =
  Write<Ts> extends [] ? never : N extends 0 ? Ts[0] : At<Tail<Ts>, Before<N>>;

export const zip = <T, U>(xs: List<T>, ys: List<U>) => {
  const zs = [];
  for (let i = 0; i < xs.length; i++) {
    zs.push([xs[i], ys[i]]);
  }
  return zs as Assert<[T, U][]>;
};

export const unzip = <T, U>(zs: List<ReadWrite<[T, U]>>): [T[], U[]] => {
  const xs = [];
  const ys = [];
  for (let i = 0; i < zs.length; i++) {
    xs.push(zs[i]![0]);
    ys.push(zs[i]![1]);
  }
  return [xs, ys] as Assert<[T[], U[]]>;
};
