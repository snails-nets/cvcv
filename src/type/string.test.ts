import { expect, suite, test } from "vitest";
import { isAlphabetic, isLowercase, isUppercase } from "./string";
import { stringToList } from "./list";

suite("string.test.ts", () => {
  suite("isAlphabetic", () => {
    test("passes lowercase", () => {
      expect(
        stringToList("abcdefghijklmnopqrstvuwxyz").every(isAlphabetic),
      ).toBe(true);
    });
    test("passes uppercase", () => {
      expect(
        stringToList("ABCDEFGHIJKLMNOPQRSTVUWXYZ").every(isAlphabetic),
      ).toBe(true);
    });
    test("fails nonalphabetic", () => {
      expect(stringToList("1234567890!@#$%^&*()").some(isAlphabetic)).toBe(
        false,
      );
    });
  });
  suite("isUppercase", () => {
    test("fails lowercase", () => {
      expect(stringToList("abcdefghijklmnopqrstvuwxyz").some(isUppercase)).toBe(
        false,
      );
    });
    test("passes uppercase", () => {
      expect(
        stringToList("ABCDEFGHIJKLMNOPQRSTVUWXYZ").every(isUppercase),
      ).toBe(true);
    });
    test("fails lowercase", () => {
      expect(stringToList("1234567890!@#$%^&*()").some(isUppercase)).toBe(
        false,
      );
    });
  });
  suite("isLowercase", () => {
    test("passes lowercase", () => {
      expect(
        stringToList("abcdefghijklmnopqrstvuwxyz").every(isLowercase),
      ).toBe(true);
    });
    test("fails uppercase", () => {
      expect(stringToList("ABCDEFGHIJKLMNOPQRSTVUWXYZ").some(isLowercase)).toBe(
        false,
      );
    });
    test("fails nonalphabetic", () => {
      expect(stringToList("1234567890!@#$%^&*()").some(isLowercase)).toBe(
        false,
      );
    });
  });
});
