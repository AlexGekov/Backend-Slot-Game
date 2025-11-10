import config from "./configuration";
import { SpinResult, SlotConfiguration, LineResult } from "./types";

export class slotMachine {
  private configuration: SlotConfiguration;

  constructor(configuration: SlotConfiguration = config) {
    this.configuration = configuration;
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
        const stopIndex = Math.floor(Math.random() * reelSymbols.length);
        matrix[row][reel] = reelSymbols[stopIndex];
      }
    }

    let totalWin = 0;
    const lineresult: LineResult[] = [];
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
        } if (matchCount >= 3) {
            const winAmount = symbols[firstSymbol][matchCount - 1] * betPerLine;
            totalWin += winAmount;
            lineresult.push({
                lineIndex,
                symbol: firstSymbol,
                count: matchCount,
                winAmount,
            });
        }
    }

    formatMatric(matrix);

    if (totalWin > 0) {
        console.log("YOU JUST GOT RICHER! You win:", totalWin, ":D");
    } else {
        console.log("Tuff luck :( Try again!");
    }
    return {
      matrix,
      totalWin,
      lineresult,
    };
  }
}


function formatMatric(matrix: number[][]) {
    console.log("---- SLOT MATRIX ----");
    for (let row = 0; row < matrix.length; row++) {
        console.log(matrix[row].join(" | "));
    }
    console.log("-----------------------");
}