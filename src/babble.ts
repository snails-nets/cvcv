import { choose, stringToList } from "./type/list";
import { Loud, type Mark } from "./loud";
import { type Repeat, repeat } from "./type/string";

const makeChoke = (): Mark["chokelike"] => {
  return choose(...stringToList(Loud.chokelike));
};

type Breath<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = { choke: Ch; bear: B };

export const makeBreath = (): Breath => {
  return { choke: makeChoke(), bear: choose(...stringToList(Loud.tight)) };
};

export type Babble<
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
> = Repeat<`${Ch}${B}`, 2>;

export const makeBabble = <
  Ch extends Mark["chokelike"] = Mark["chokelike"],
  B extends Mark["bearlike"] = Mark["tight"],
>(
  choke: Ch,
  bear: B,
): Babble<Ch, B> => {
  return repeat(`${choke}${bear}`, 2);
};
