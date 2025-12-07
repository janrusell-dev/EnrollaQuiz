import { describe, expect, it } from "vitest";
import app from "..";

describe("GET /api/quiz", () => {
  it("should return 200 and array of questions", async () => {
    const res = await app.request("/api/quiz");

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should return 8-12 questions", async () => {
    const res = await app.request("/api/quiz");
    const data = await res.json();

    expect(data.length).toBeGreaterThanOrEqual(8);
    expect(data.length).toBeLessThanOrEqual(12);
  });

  it("should not include answer keys in response", async () => {
    const res = await app.request("/api/quiz");
    const data = await res.json();

    data.forEach((question: unknown) => {
      expect(question).not.toHaveProperty("correctIndex");
      expect(question).not.toHaveProperty("correctIndexes");
      expect(question).not.toHaveProperty("correctText");
    });
  });

  it("should have required fields for all questions", async () => {
    const res = await app.request("/api/quiz");
    const data = await res.json();

    data.forEach((question: any) => {
      expect(question).toHaveProperty("id");
      expect(question).toHaveProperty("type");
      expect(question).toHaveProperty("question");
      expect(typeof question.id).toBe("number");
      expect(["text", "radio", "checkbox"]).toContain(question.type);
      expect(typeof question.question).toBe("string");
    });
  });

  it("should include choices for radio and checkbox questions", async () => {
    const res = await app.request("/api/quiz");
    const data = await res.json();

    data.forEach((question: any) => {
      if (question.type === "radio" || question.type === "checkbox") {
        expect(question).toHaveProperty("choices");
        expect(Array.isArray(question.choices)).toBe(true);
        expect(question.choices.length).toBeGreaterThan(0);
      }
    });
  });

  it("should not include choices for text questions", async () => {
    const res = await app.request("/api/quiz");
    const data = await res.json();

    data.forEach((question: any) => {
      if (question.type === "text") {
        expect(question).not.toHaveProperty("choices");
      }
    });
  });
});
