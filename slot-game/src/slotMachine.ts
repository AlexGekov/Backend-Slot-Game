import config from "./configuration";
import { SpinResult, SlotConfiguration, LineResult } from "./types";

export class SlotMachine {
  private configuration: SlotConfiguration;
  private random: () => number;

  constructor(
    configuration: SlotConfiguration = config,
    random: () => number = Math.random
  ) {
    this.configuration = configuration;
    this.random = random;
  }

  public spin(betPerLine: number): SpinResult {
    if (betPerLine <= 0) {
      throw new Error("Bet per line must be greater than zero.");
    }
    const { reelsCount, rowsCount, lines, symbols, reels } = this.configuration;

    const matrix: number[][] = [];
    for (let row = 0; row < rowsCount; row++) {
      matrix[row] = [];
      for (let reel = 0; reel < reelsCount; reel++) {
        const reelSymbols = reels[reel];
        const stopIndex = Math.floor(this.random() * reelSymbols.length);
        matrix[row][reel] = reelSymbols[stopIndex];
      }
    }

    let totalWin = 0;
    const lineResults: LineResult[] = [];
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const firstSymbol = matrix[line[0]][0];
      let matchCount = 1;

      for (let reel = 1; reel < reelsCount; reel++) {
        if (matrix[line[reel]][reel] === firstSymbol) {
          matchCount++;
        } else {
          break;
        }
      }

      if (matchCount >= 3) {
        const winAmount = symbols[firstSymbol][matchCount - 1] * betPerLine;
        totalWin += winAmount;
        lineResults.push({
          lineIndex,
          symbol: firstSymbol,
          count: matchCount,
          winAmount,
        });
      }
    }

    return {
      matrix,
      totalWin,
      lineResults,
    };
  }
}