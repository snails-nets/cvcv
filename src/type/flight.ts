import { expectTypeOf } from "vitest";
import type { Assert } from "./type";

export type Flight<T, N extends number> = N extends any
  ? number extends N
    ? T[]
    : Fledge<T, N, []>
  : never;

type Fledge<T, N extends number, R extends T[]> = R["length"] extends N
  ? R
  : Fledge<T, N, [T, ...R]>;

expectTypeOf<Flight<number, 0>>().toEqualTypeOf<[]>();
expectTypeOf<Flight<number, 1>>().toEqualTypeOf<[number]>();
expectTypeOf<Flight<number, 2>>().toEqualTypeOf<[number, number]>();
expectTypeOf<Flight<number, 3>>().toEqualTypeOf<[number, number, number]>();

type Sameshift<T, L extends Flight<any, any>> = Flight<T, L["length"]>;

export const sameshift = <T, L extends Flight<any, any>>(
  xs: L,
  f: (u: L[number]) => T,
) => {
  return xs.map(f) as Assert<Sameshift<T, L>>;
};

expectTypeOf(
  sameshift([0, 0, 0, 0] as const, (x) => `${x}` as const),
).toEqualTypeOf<["0", "0", "0", "0"]>();

expectTypeOf(
  sameshift(
    sameshift([0, 0, 0, 0] as const, (x) => `${x}` as const),
    (x) => `${x}${x}` as const,
  ),
).toEqualTypeOf<["00", "00", "00", "00"]>();
