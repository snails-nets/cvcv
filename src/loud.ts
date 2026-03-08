import { expectTypeOf } from "vitest";
import type { Split } from "./type/string";

export const Loud = {
  bearing: "iɪʊueɛəɔoæɑ",
  smooth: "mnlrwjiɪʊueɛəɔoæɑ",
  nose: "mn",
  spread: "ʧʤfvθðszʃʒh",
  staved: "bdʤgvðzʒmnlrwjiɪʊueɛəɔoæɑ",
  thru: "fvθðszʃʒhrjwiɪʊueɛəɔoæɑ",
  choking: "pbtdʧʤkgfvθðszʃʒmnlr",
  lip: "pbfvmwʊuɔo",
  ring: "wʊuɔo",
  blade: "tdθðsznlr",
  wide: "θð",
  high: "ʧʤʃʒkgwjiɪʊu",
  low: "æɑ",
  fore: "ʧʤʃʒjiɪeɛæ",
  tight: "iueəoɑ",
  chokelike: "pbtdʧʤkgfvθðszʃʒmnlrhjw",
  bearlike: "iɪʊueɛəɔoæɑ",
} as const;

export const Book = {
  p: "p",
  b: "b",
  f: "f",
  v: "v",
  m: "m",
  w: "w",
  t: "t",
  d: "d",
  s: "s",
  z: "z",
  θ: "th",
  ð: "th",
  n: "n",
  l: "l",
  r: "r",
  ʧ: "ch",
  ʤ: "j",
  ʃ: "sh",
  ʒ: "zh",
  j: "y",
  k: "k",
  g: "g",
  h: "h",
  i: "ee",
  ɪ: "i",
  ʊ: "u",
  u: "oo",
  e: "ay",
  ɛ: "e",
  ə: "uh",
  ɔ: "aw",
  o: "o",
  æ: "a",
  ɑ: "ah",
} as const;

export const Shoal = {
  p: "pʰ",
  b: "b",
  f: "f",
  v: "v",
  m: "m",
  w: "w",
  t: "tʰ",
  d: "d",
  s: "s",
  z: "z",
  θ: "θ",
  ð: "ð",
  n: "n",
  l: "l",
  r: "ɹ",
  ʧ: "ʧʰ",
  ʤ: "ʤ",
  ʃ: "ʃ",
  ʒ: "ʒ",
  j: "j",
  k: "kʰ",
  g: "g",
  h: "h",
  i: "i",
  ɪ: "ɪ",
  ʊ: "ʊ",
  u: "u",
  e: "e͡ɪ̯",
  ɛ: "ɛ",
  ə: "ə",
  ɔ: "ɔ",
  o: "o͡ʊ̯",
  æ: "æ",
  ɑ: "ɑ",
} as const;

type Book<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Staff
    ? `${(typeof Book)[F]}${Book<R>}`
    : `${F}${Book<R>}`
  : S;

export const book = <S extends string>(s: S) => {
  const staffs = [];
  for (let i = 0; i < s.length; i++) {
    const staff = s[i]!;
    staffs.push(Book[staff as Staff] ?? s[i]);
  }

  return staffs.join("") as Book<S>;
};

type Shoal<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Staff
    ? `${(typeof Shoal)[F]}${Shoal<R>}`
    : `${F}${Shoal<R>}`
  : S;

export const shoal = <S extends string>(s: S) => {
  const staffs = [];
  for (let i = 0; i < s.length; i++) {
    const staff = s[i]!;
    staffs.push(Shoal[staff as Staff] ?? s[i]);
  }

  return staffs.join("") as Shoal<S>;
};

export type Staff = Split<(typeof Loud)[keyof typeof Loud]>;

type Chokelike = Split<typeof Loud.chokelike>;
type Bearlike = Split<typeof Loud.bearlike>;

type Bearing = Split<typeof Loud.bearing>;

type Smooth = Split<typeof Loud.smooth>;
type Nose = Split<typeof Loud.nose>;
type Spread = Split<typeof Loud.spread>;
type Staved = Split<typeof Loud.staved>;
type Thru = Split<typeof Loud.thru>;

type Choking = Split<typeof Loud.choking>;

type Lip = Split<typeof Loud.lip>;
type Ring = Split<typeof Loud.ring>;

type Blade = Split<typeof Loud.blade>;
type Wide = Split<typeof Loud.wide>;

type High = Split<typeof Loud.high>;
type Low = Split<typeof Loud.low>;
type Fore = Split<typeof Loud.fore>;

type Tight = Split<typeof Loud.tight>;

export type Mark = {
  bearing: Bearing;
  smooth: Smooth;
  nose: Nose;
  spread: Spread;
  staved: Staved;
  thru: Thru;
  choking: Choking;
  lip: Lip;
  ring: Ring;
  blade: Blade;
  wide: Wide;
  high: High;
  low: Low;
  fore: Fore;
  tight: Tight;
  chokelike: Chokelike;
  bearlike: Bearlike;
};

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

expectTypeOf<Exclude<Lip, Smooth | Spread | Staved>>().toEqualTypeOf<"p">();
expectTypeOf<Exclude<Lip & Staved, Smooth | Spread>>().toEqualTypeOf<"b">();
expectTypeOf<Exclude<Lip & Spread, Smooth | Staved>>().toEqualTypeOf<"f">();
expectTypeOf<Exclude<Lip & Spread & Staved, Smooth>>().toEqualTypeOf<"v">();
expectTypeOf<Lip & Nose>().toEqualTypeOf<"m">();
expectTypeOf<Exclude<Lip, Bearing | Choking>>().toEqualTypeOf<"w">();

expectTypeOf<Exclude<Blade, Smooth | Spread | Staved>>().toEqualTypeOf<"t">();
expectTypeOf<Exclude<Blade & Staved, Smooth | Spread>>().toEqualTypeOf<"d">();
expectTypeOf<Exclude<Blade & Spread, Staved | Wide>>().toEqualTypeOf<"s">();
expectTypeOf<Exclude<Blade & Spread & Staved, Wide>>().toEqualTypeOf<"z">();
expectTypeOf<Exclude<Wide, Staved>>().toEqualTypeOf<"θ">();
expectTypeOf<Wide & Staved>().toEqualTypeOf<"ð">();
expectTypeOf<Blade & Nose>().toEqualTypeOf<"n">();
expectTypeOf<Exclude<Blade & Smooth, Nose | Thru>>().toEqualTypeOf<"l">();
expectTypeOf<Blade & Smooth & Thru>().toEqualTypeOf<"r">();

expectTypeOf<Exclude<Fore, Staved | Thru>>().toEqualTypeOf<"ʧ">();
expectTypeOf<Exclude<Fore & Staved, Smooth | Thru>>().toEqualTypeOf<"ʤ">();
expectTypeOf<Exclude<Fore & Thru, Smooth | Staved>>().toEqualTypeOf<"ʃ">();
expectTypeOf<Exclude<Fore & Staved & Thru, Smooth>>().toEqualTypeOf<"ʒ">();
expectTypeOf<Exclude<Fore, Bearing | Choking>>().toEqualTypeOf<"j">();

expectTypeOf<Exclude<High, Fore | Smooth | Staved>>().toEqualTypeOf<"k">();
expectTypeOf<Exclude<High & Staved, Fore | Smooth>>().toEqualTypeOf<"g">();

expectTypeOf<Exclude<Spread, Bearing | Choking>>().toEqualTypeOf<"h">();

expectTypeOf<High & Fore & Tight>().toEqualTypeOf<"i">();
expectTypeOf<Exclude<Bearing & High & Fore, Tight>>().toEqualTypeOf<"ɪ">();
expectTypeOf<Exclude<Bearing & High & Ring, Tight>>().toEqualTypeOf<"ʊ">();
expectTypeOf<High & Ring & Tight>().toEqualTypeOf<"u">();

expectTypeOf<Exclude<Fore & Tight, High>>().toEqualTypeOf<"e">();
expectTypeOf<Exclude<Fore, High | Low | Tight>>().toEqualTypeOf<"ɛ">();
expectTypeOf<Exclude<Tight, High | Low | Fore | Ring>>().toEqualTypeOf<"ə">();
expectTypeOf<Exclude<Ring, High | Low | Tight>>().toEqualTypeOf<"ɔ">();
expectTypeOf<Exclude<Ring & Tight, High>>().toEqualTypeOf<"o">();

expectTypeOf<Low & Fore>().toEqualTypeOf<"æ">();
expectTypeOf<Low & Tight>().toEqualTypeOf<"ɑ">();
