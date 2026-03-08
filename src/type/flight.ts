import { expectTypeOf } from "vitest";

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
