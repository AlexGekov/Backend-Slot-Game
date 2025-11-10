export interface SlotConfiguration {
    reelsCount: number;
    rowsCount: number;
    symbols: { [key: number]: number[] };
    lines: number[][];
    reels: number[][];
}

export interface LineResult {
    lineIndex: number;
    symbol: number;
    count: number;
    winAmount: number;
}

export interface SpinResult {
    matrix: number[][];
    totalWin: number;
    lineresult: LineResult[];
}

