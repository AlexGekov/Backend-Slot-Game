import { describe, it, expect } from "vitest";
import { SlotMachine } from "../src/slotMachine";

// Tiny config: 3 reels, 1 row, 1 line. Symbol 1 pays 5 for three in a row.
const winningConfig = {
  reelsCount: 3,
  rowsCount: 1,
  lines: [[0, 0, 0]],
  symbols: { 1: [0, 0, 5], 2: [0, 0, 5] },
  reels: [[1], [1], [1]],
};

const losingConfig = { ...winningConfig, reels: [[1], [2], [1]] };

describe("SlotMachine", () => {
  it("throws when bet is zero or negative", () => {
    const machine = new SlotMachine();
    expect(() => machine.spin(0)).toThrow();
    expect(() => machine.spin(-5)).toThrow();
  });

  it("pays out for three matching symbols", () => {
    const machine = new SlotMachine(winningConfig as any, () => 0);
    const result = machine.spin(2);
    expect(result.totalWin).toBe(10); // payout 5 × bet 2
    expect(result.lineResults).toHaveLength(1);
  });

  it("pays nothing when symbols don't match", () => {
    const machine = new SlotMachine(losingConfig as any, () => 0);
    expect(machine.spin(2).totalWin).toBe(0);
  });

  it("returns a matrix of rowsCount × reelsCount", () => {
    const machine = new SlotMachine();
    const { matrix } = machine.spin(1);
    expect(matrix.length).toBeGreaterThan(0);
    matrix.forEach((row) => expect(row.length).toBe(matrix[0].length));
  });
});