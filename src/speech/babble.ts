import { choose, stringToList } from "../type/list";
import { book, Book, Loud, shoal, Shoal, type Mark, type Staff } from "./loud";
import { type Repeat, repeat } from "../type/string";
import { maybe, type Assert, type Maybe } from "../type/type";

export type Babbles<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = {
  choke: Ch;
  bear: B;
  deep: DeepBabble<Ch, B>;
  shoal: ShoalBabble<Ch, B>;
  book: BookBabble<Ch, B>;
};

export const makeBabbles = (forbiddens: Maybe<Breath> = undefined): Babbles => {
  const { choke, bear } = makeBreath(forbiddens);
  return {
    choke,
    bear,
    deep: makeDeepBabble(choke, bear),
    shoal: makeShoalBabble(choke, bear),
    book: makeBookBabble(choke, bear),
  };
};

type DeepBabble<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = Repeat<`${Ch}${B}`, 2>;

const makeDeepBabble = <
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
>(
  choke: Ch,
  bear: B,
): DeepBabble<Ch, B> => {
  return repeat(`${choke}${bear}`, 2);
};

type ShoalBabble<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = `ˈ${Repeat<`${Shoal<Ch>}${Shoal<B>}`, 2, ".">}`;

const makeShoalBabble = <
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
>(
  choke: Ch,
  bear: B,
) => {
  const ch = shoal(choke);
  return `ˈ${ch}${shoal(stress(bear))}.${ch}${shoal(bear)}` as Assert<
    ShoalBabble<Ch, B>
  >;
};

type Stressed<B extends Mark["bearlike"] = Mark["bearlike"]> = B extends "ə"
  ? "ʌ"
  : B;

const stress = <B extends Mark["bearlike"]>(bear: B) => {
  return (bear === "ə" ? "ʌ" : bear) as Assert<Stressed<B>>;
};

type BookBabble<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = Repeat<`${Book<Ch>}${Book<B>}`, 2>;

const makeBookBabble = <
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
>(
  choke: Ch,
  bear: B,
): BookBabble<Ch, B> => {
  return repeat(`${book(choke)}${book(bear)}`, 2);
};

type Breath<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = { choke: Ch; bear: B };

const makeBreath = (forbiddens: Maybe<Breath> = undefined): Breath => {
  return {
    choke: makeChoke(maybe(forbiddens?.choke)),
    bear: choose(...remove(stringToList(Loud.tight), maybe(forbiddens?.bear))),
  };
};

const makeChoke = <S extends Staff = never>(
  forbiddens: S[] = [],
): Exclude<Mark["chokelike"], S> => {
  return choose(...remove(stringToList(Loud.chokelike), forbiddens));
};

const remove = <T, U>(xs: T[], ys: U[]) => {
  const zs = [];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]!;
    if (!ys.includes(x as any)) {
      zs.push(x);
    }
  }

  return zs as Exclude<T, U>[];
};
