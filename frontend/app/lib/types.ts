export type QuestionType = "text" | "radio" | "checkbox";

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  choices?: string[];
}

export interface Answer {
  id: number;
  value: string | number | number[];
}

export interface GradeResult {
  id: number;
  correct: boolean;
}

export interface GradeResponse {
  score: number;
  total: number;
  results: GradeResult[];
}
