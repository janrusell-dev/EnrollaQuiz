import { Hono } from "hono";
import { validateGradeRequest } from "../utils/validation";
import { gradeAnswers } from "../services/grading.service";
import { logger } from "hono/logger";
import { Answer } from "../types/quiz";
import { questions } from "../data/questions";

const grade = new Hono();

grade.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Validate request
    const validation = validateGradeRequest(body);
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }

    const { answers } = body as { answers: Answer[] };

    for (const answer of answers) {
      const questionExists = questions.some((q) => q.id === answer.id);
      if (!questionExists) {
        return c.json(
          {
            error: `Question with ID ${answer.id}`,
          },
          400
        );
      }
    }

    const result = gradeAnswers(body.answers);
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Invalid request payload" }, 400);
  }
});

export default grade;
