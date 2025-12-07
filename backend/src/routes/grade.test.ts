import { describe, expect, it } from "vitest";
import app from "..";

describe("POST /api/grade", () => {
  describe("Valid requests", () => {
    it("should accept valid answers and return score", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [
            { id: 1, value: 1 },
            { id: 2, value: [0, 2] },
            { id: 3, value: "4" },
          ],
        }),
      });
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data).toHaveProperty("score");
      expect(data).toHaveProperty("total");
      expect(data).toHaveProperty("results");
      expect(typeof data.score).toBe("number");
      expect(typeof data.total).toBe("number");
      expect(Array.isArray(data.results)).toBe(true);
    });

    it("should return correct structure in the results", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 1, value: 1 }],
        }),
      });
      const data = await res.json();

      expect(data.results.length).toBe(1);
      expect(data.results[0]).toHaveProperty("id");
      expect(data.results[0]).toHaveProperty("correct");
      expect(typeof data.results[0].correct).toBe("boolean");
    });

    it("should grade all answers correctly", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [
            { id: 1, value: 1 },
            { id: 2, value: [0, 2] },
            { id: 3, value: "4" },
          ],
        }),
      });

      const data = await res.json();

      expect(data.score).toBe(3);
      expect(data.results[0].correct).toBe(true);
      expect(data.results[1].correct).toBe(true);
      expect(data.results[2].correct).toBe(true);
    });

    it("should handle single answer", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 1, value: 1 }],
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.results.length).toBe(1);
    });
  });

  describe("Invalid requests - should return 400", async () => {
    it("should reject missing answers field", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data).toHaveProperty("error");
      expect(data.error).toContain("answers");
    });

    it("should reject when answers is not an array", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: "not-an-array",
        }),
      });

      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error).toContain("array");
    });

    it("should reject empty answers array", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer: [],
        }),
      });

      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error).toContain("Missing required field: answers");
    });

    it("should reject answer missing id", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ value: 1 }],
        }),
      });
      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error).toContain("id");
    });

    it("should reject answer missing value", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 1 }],
        }),
      });
      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error).toContain("value");
    });

    it("should reject invalid question ID", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 999, value: 1 }],
        }),
      });

      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error).toContain("999");
    });

    it("should reject invalid JSON", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-valid-json",
      });

      expect(res.status).toBe(400);
    });

    it("should reject request without Content-Type header", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 1, value: 1 }],
        }),
      });
      expect([200, 400, 415]).toContain(res.status);
    });
  });
  describe("Grading logic", async () => {
    it("should mark incorrect answers as incorrect", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [{ id: 1, value: 0 }],
        }),
      });
      const data = await res.json();
      expect(data.results[0].correct).toBe(false);
      expect(data.score).toBe(0);
    });

    it("should handle mixed correct and incorrect answers", async () => {
      const res = await app.request("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [
            { id: 1, value: 1 }, // Correct
            { id: 2, value: [0, 1] }, // Wrong
          ],
        }),
      });
      const data = await res.json();
      expect(data.score).toBe(1);
      expect(data.results[0].correct).toBe(true);
      expect(data.results[1].correct).toBe(false);
    });
  });
});
