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
  {
    id: 4,
    type: "radio",
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctIndex: 2,
  },
  {
    id: 5,
    type: "checkbox",
    question: "Select all prime numbers:",
    choices: ["2", "4", "5", "6", "7"],
    correctIndexes: [0, 2, 4],
  },
  {
    id: 6,
    type: "text",
    question: "What is the chemical symbol for water?",
    correctText: "H2O",
  },
  {
    id: 7,
    type: "radio",
    question: 'Who wrote "Romeo and Juliet"?',
    choices: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    type: "checkbox",
    question: "Which of these are continents?",
    choices: ["Asia", "Greenland", "Africa", "Iceland", "Europe"],
    correctIndexes: [0, 2, 4],
  },
];
