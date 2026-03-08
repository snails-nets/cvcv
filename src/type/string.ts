import { expectTypeOf } from "vitest";
import type { Before } from "./rime";
import type { Assert } from "./type";
import type { At, List, StringToList } from "./list";

export type Split<S extends string> = S extends `${infer F}${infer R}`
  ? F | Split<R>
  : never;

export type Join<T extends List<string>> = T extends [
  infer F extends string,
  ...infer R extends List<string>,
]
  ? `${F}${Join<R>}`
  : "";

export const Alphabet = "abcdefghijklmnopqrstuvwxyz" as const;
export type Alphabetic = Split<typeof Alphabet>;

/**
 * @param N `0` and `1` are alike in yield
 */
export type Repeat<S extends string, N extends number> = S extends any
  ? N extends 0
    ? ""
    : `${S}${Repeat<S, Before<N>>}`
  : never;

export const repeat = <S extends string, N extends number>(s: S, n: N) => {
  return s.repeat(n) as Assert<Repeat<S, N>>;
};

expectTypeOf<Repeat<"a", 0>>().toEqualTypeOf<"">();
expectTypeOf<Repeat<"a", 1>>().toEqualTypeOf<"a">();
expectTypeOf<Repeat<"a", 2>>().toEqualTypeOf<"aa">();
expectTypeOf<Repeat<"a", 3>>().toEqualTypeOf<"aaa">();

export const isAlphabetic = (s: string): s is Alphabetic => {
  return Alphabet.includes(s.toLocaleLowerCase());
};

export const isUppercase = (s: string): s is Uppercase<string> => {
  return isAlphabetic(s) && s === s.toLocaleUpperCase();
};

export const isLowercase = (s: string): s is Lowercase<string> => {
  return isAlphabetic(s) && s === s.toLocaleLowerCase();
};

export const charAt = <S extends string, N extends number>(s: S, i: N) => {
  return s[i] as Assert<At<StringToList<S>, N>>;
};

expectTypeOf(charAt("abcd", 0)).toEqualTypeOf("a" as const);
expectTypeOf(charAt("abcd", 1)).toEqualTypeOf("b" as const);
expectTypeOf(charAt("abcd", 2)).toEqualTypeOf("c" as const);
expectTypeOf(charAt("abcd", 3)).toEqualTypeOf("d" as const);
