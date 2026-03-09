import { expectTypeOf } from "vitest";
import { type Staff } from "./loud";
import { isUppercase, type Alphabetic } from "../type/string";
import type { Write, Assert } from "../type/type";

type Byspell<S extends Staff> =
  `/${S}/ as in "${OutsideEm<Write<typeof Wordbook>[S][0]>}"`;

export const makeByspell = <S extends Staff>(staff: S) => {
  return (`/${staff}/` +
    ` as in ` +
    `"${emphasizeByword(Wordbook[staff][0])}"`) as Assert<Byspell<S>>;
};

export const emphasizeByword = <W extends Byword>(byword: W) => {
  const xs = [];
  let isInside = false;
  const goIn = () => {
    xs.push("<em>");
    isInside = true;
  };
  const comeOut = () => {
    xs.push("</em>");
    isInside = false;
  };
  for (let i = 0; i < byword.length; i++) {
    const stafflike = byword[i]!;

    if (isInside !== isUppercase(stafflike)) {
      (isInside ? comeOut : goIn)();
    }

    xs.push(stafflike.toLocaleUpperCase());
  }

  if (isInside) {
    comeOut();
  }

  return xs.join("") as Assert<OutsideEm<W>>;
};

type InsideEm<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Uppercase<Alphabetic>
    ? `${F}${InsideEm<R>}`
    : `</em>${Uppercase<F>}${OutsideEm<R>}`
  : `</em>${S}`;

type OutsideEm<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Uppercase<Alphabetic>
    ? `<em>${F}${InsideEm<R>}`
    : `${Uppercase<F>}${OutsideEm<R>}`
  : S;

export const Wordbook = {
  p: ["Pea", "Paw"],
  b: ["Boo", "Bay"],
  f: ["Foe", "Fee"],
  v: ["Vee", "Vow"],
  m: ["May", "Moo"],
  w: ["Way", "Woe"],
  t: ["Tea", "Tow"],
  d: ["Day", "Doe"],
  s: ["See", "Saw"],
  z: ["Zoo", "Zap"],
  θ: ["THin", "THaw"],
  ð: ["THee", "THough"],
  n: ["Now", "Neigh"],
  l: ["Lay", "Low"],
  r: ["Ray", "Row"],
  ʧ: ["CHew", "CHow"],
  ʤ: ["Jay", "Joe"],
  ʃ: ["SHoe", "SHow"],
  ʒ: ["viSIon", "garaGE"],
  j: ["Yam", "You"],
  k: ["Key", "Caw"],
  g: ["Goo", "Gall"],
  h: ["Hat", "Hooves"],
  i: ["tEA", "crEEp"],
  ɪ: ["bIt", "shIp"],
  ʊ: ["fOOt", "pUt"],
  u: ["tOO", "lOOp"],
  e: ["dAY", "tApe"],
  ɛ: ["bEt", "stEp"],
  ə: ["UttEr", "cUp"],
  ɔ: ["dOOr", "wOre"],
  o: ["dOE", "sOAp"],
  æ: ["dAb", "bAck"],
  ɑ: ["pAW", "stOp"],
} as const;

export type Byword = (typeof Wordbook)[keyof typeof Wordbook][number];

expectTypeOf<Byspell<"p">>().toEqualTypeOf<`/p/ as in "<em>P</em>EA"`>();
expectTypeOf<Byspell<"i">>().toEqualTypeOf<`/i/ as in "T<em>EA</em>"`>();
