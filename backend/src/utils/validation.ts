import { Answer, GradeRequest } from "../types/quiz";

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateGradeRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be an object" };
  }

  const data = body as { answers?: unknown };

  if (!data.answers) {
    return { valid: false, error: "Missing required field: answers" };
  }

  if (!Array.isArray(data.answers)) {
    return { valid: false, error: "Answers must be an array" };
  }

  if (data.answers.length === 0) {
    return { valid: false, error: "Answers cannot be empty" };
  }

  for (let i = 0; i < data.answers.length; i++) {
    const answer = data.answers[i];
    if (!answer || typeof answer !== "object") {
      return { valid: false, error: `Answer at index ${i} must be an object` };
    }

    const ans = answer as { id?: unknown; value?: unknown };

    if (ans.id === undefined) {
      return { valid: false, error: `Answer at index ${i} missing id` };
    }

    if (ans.value === undefined) {
      return { valid: false, error: `Answer at index ${i} missing value` };
    }
  }

  return { valid: true };
}
