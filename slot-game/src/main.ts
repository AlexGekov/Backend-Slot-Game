import { SlotMachine} from "./slotMachine";

console.log("Slot Loading...");
const slot = new SlotMachine();
const result = slot.spin(10);

console.log("---- SLOT MATRIX ----");
for (const row of result.matrix) {
  console.log(row.join(" | "));
}
console.log("---------------------");

if (result.totalWin > 0) {
  console.log("YOU JUST GOT RICHER! You win:", result.totalWin, ":D");
} else {
  console.log("Tuff luck :( Try again!");
}