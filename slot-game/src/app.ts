import express from "express";
import { SlotMachine } from "./slotMachine";

export const app = express();
app.use(express.json());

const machine = new SlotMachine();

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/spin", (req, res) => {
  const betPerLine = Number(req.body?.betPerLine);
  if (!Number.isFinite(betPerLine) || betPerLine <= 0) {
    res.status(400).json({ error: "betPerLine must be a positive number" });
    return;
  }
  const result = machine.spin(betPerLine);
  res.json(result);
});