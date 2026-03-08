import { expect, suite, test } from "vitest";
import { emphasizeByword } from "./byspell";

suite("emphasizeByword", () => {
  test("Bay", () => {
    expect(emphasizeByword("Bay")).toBe("<em>B</em>AY");
  });
  test("flEEce", () => {
    expect(emphasizeByword("tEA")).toBe("T<em>EA</em>");
  });
});
