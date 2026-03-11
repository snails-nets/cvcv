import { expect, suite, test } from "vitest";
import { unzip, zip } from "../type/list";

const rimes = [0, 1, 2, 3] as const;
const staves = ["a", "b", "c", "d"] as const;
const zipping = [
  [0, "a"],
  [1, "b"],
  [2, "c"],
  [3, "d"],
] as const;

suite("list.test.ts", () => {
  test("zip", () => {
    expect(zip(rimes, staves)).toStrictEqual(zipping);
  });
  test("unzip", () => {
    expect(unzip(zipping)).toStrictEqual([rimes, staves]);
  });
  test("unzip * zip", () => {
    expect(unzip(zip(rimes, staves))).toStrictEqual([rimes, staves]);
  });
  test("zip * unzip", () => {
    expect(zip(...unzip(zipping))).toStrictEqual(zipping);
  });
});
