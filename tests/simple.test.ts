import {describe, expect, test} from "@jest/globals";

describe("simple test to check test", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect((1+2)).toBe(3);
  });
});