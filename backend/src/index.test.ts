import app from ".";
import { describe, it, expect } from "vitest";

describe("Health Check", () => {
  it("GET / should return health status", async () => {
    const res = await app.request("/");

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("status");
    expect(data.status).toBe("healthy");
  });

  it("should return information", async () => {
    const res = await app.request("/");
    const data = await res.json();

    expect(data).toHaveProperty("endpoints");
    expect(data.endpoints).toHaveProperty("quiz");
    expect(data.endpoints).toHaveProperty("grade");
  });
});
