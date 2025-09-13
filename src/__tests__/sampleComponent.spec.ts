import { sum } from "../lib/sum";

test("2と3を渡したら5が返る", () => {
  expect(sum(2, 3)).toBe(5);
});
