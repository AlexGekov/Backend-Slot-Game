import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("API", () => {
  it("GET /health returns ok @smoke", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("POST /spin returns a result", async () => {
    const res = await request(app).post("/spin").send({ betPerLine: 1 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("matrix");
    expect(res.body).toHaveProperty("totalWin");
  });

  it("POST /spin rejects an invalid bet", async () => {
    const res = await request(app).post("/spin").send({ betPerLine: 0 });
    expect(res.status).toBe(400);
  });
}); 