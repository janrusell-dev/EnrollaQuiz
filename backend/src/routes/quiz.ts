import { Hono } from "hono";
import { questions } from "../data/questions";

const quiz = new Hono();

quiz.get("/", (c) => {
  try {
    const publicQuestions = questions.map((q) => {
      const { correctIndex, correctIndexes, correctText, ...publicQuestion } =
        q as any;
      return publicQuestion;
    });
    return c.json(publicQuestions);
  } catch (error) {
    return c.json({ error: "Failed to fetch quiz questions" }, 500);
  }
});
export default quiz;
