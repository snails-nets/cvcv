import { expectTypeOf } from "vitest";
import type { Flight } from "./flight";
import type { Assert } from "./type";

export type After<N extends number> = [any, ...Flight<any, N>]["length"] &
  number;

export type Before<N extends number> =
  Flight<any, N> extends [any, ...infer R] ? R["length"] : never;

expectTypeOf<Before<0>>().toEqualTypeOf<never>();
expectTypeOf<Before<1>>().toEqualTypeOf<0>();
expectTypeOf<Before<2>>().toEqualTypeOf<1>();
expectTypeOf<Before<3>>().toEqualTypeOf<2>();

export type Plus<M extends number, N extends number> = [
  ...Flight<any, M>,
  ...Flight<any, N>,
]["length"];

export const plus = <M extends number, N extends number>(m: M, n: N) =>
  (m + n) as Assert<Plus<M, N>>;

export type Minus<M extends number, N extends number> =
  Flight<any, M> extends [...Flight<any, N>, ...infer R] ? R["length"] : never;

export const minus = <M extends number, N extends number>(m: M, n: N) =>
  (m - n) as Assert<Minus<M, N>>;

export type Row<N extends number> = number extends N
  ? number[]
  : N extends 0
    ? []
    : [...Row<Before<N>>, Before<N>];

export const row = <N extends number, T>(length: N, f: (n: number) => T) => {
  return Array.from(Array(length).keys()).map((n) => f(n)) as Flight<T, N>;
};

export type Upto<N extends number> = number extends N ? number : Row<N>[number];

expectTypeOf<Upto<0>>().toEqualTypeOf<never>();
expectTypeOf<Upto<1>>().toEqualTypeOf<0>();
expectTypeOf<Upto<2>>().toEqualTypeOf<0 | 1>();
expectTypeOf<Upto<3>>().toEqualTypeOf<0 | 1 | 2>();

export const chooseRime = <N extends number>(upto: N) => {
  return Math.floor(upto * Math.random()) as Upto<N>;
};

export const weave = (start: number, end: number) => (t: number) => {
  return start + (end - start) * t;
};

export const mod = (n: number, d: number) => {
  return ((n % d) + d) % d;
};
