import { Question } from "../types/quiz";

export const questions: Question[] = [
  {
    id: 1,
    type: "radio",
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    correctIndex: 1,
  },
  {
    id: 2,
    type: "checkbox",
    question: "Which of these are programming languages?",
    choices: ["Python", "HTML", "JavaScript", "CSS"],
    correctIndexes: [0, 2],
  },
  {
    id: 3,
    type: "text",
    question: "What is 2 + 2?",
    correctText: "4",
  },
];
