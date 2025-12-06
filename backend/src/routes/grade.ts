import { Hono } from "hono";
import { validateGradeRequest } from "../utils/validation";
import { gradeAnswers } from "../services/grading.service";
import { logger } from "hono/logger";

const grade = new Hono();

grade.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Validate request
    const validation = validateGradeRequest(body);
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }
    const result = gradeAnswers(body.answer);
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Invalid request payload" }, 400);
  }
});

export default grade;
