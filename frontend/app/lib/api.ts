import { Answer, GradeResponse, Question } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export async function fetchQuiz(): Promise<Question[]> {
  const response = await fetch(`${API_BASE}/api/quiz`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch quiz: ${response.statusText}`);
  }
  return response.json();
}

export async function submitAnswers(answers: Answer[]): Promise<GradeResponse> {
  const response = await fetch(`${API_BASE}/api/grade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => {
      error: "Unknown error";
    });
    throw new Error(error.error || "Failed to submit answers");
  }
  return response.json();
}
