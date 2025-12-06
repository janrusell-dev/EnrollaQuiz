export type QuestionType = "text" | "radio" | "checkbox";

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio";
  choices: string[];
  correctIndex: number;
}

export interface CheckBoxQuestion extends BaseQuestion {
  type: "checkbox";
  choices: string[];
  correctIndexes: number[];
}

export interface TextBoxQuestion extends BaseQuestion {
  type: "text";
  correctText: string;
}

export type Question = RadioQuestion | CheckBoxQuestion | TextBoxQuestion;

export interface Answer {
  id: number;
  value: string | number | number[];
}

export interface GradeRequest {
  answers: Answer[];
}

export interface GradeResponse {
  score: number;
  total: number;
  results: Array<{
    id: number;
    correct: boolean;
  }>;
}
