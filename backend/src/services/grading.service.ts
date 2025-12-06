import { questions } from "../data/questions";
import { Answer, GradeResponse } from "../types/quiz";

export function gradeAnswers(answers: Answer[]): GradeResponse {
  let score = 0;

  const results = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.id);

    if (!question) {
      return { id: answer.id, correct: false };
    }

    let correct = false;

    switch (question.type) {
      case "radio": {
        if (typeof answer.value === "number") {
          correct = answer.value === question.correctIndex;
        }
        break;
      }
      case "checkbox": {
        if (Array.isArray(answer.value)) {
          const userAnswers = [...answer.value].sort((a, b) => a - b);
          const correctAnswers = [...question.correctIndexes].sort(
            (a, b) => a - b
          );

          correct =
            JSON.stringify(userAnswers) === JSON.stringify(correctAnswers);
        }
        break;
      }
      case "text": {
        if (typeof answer.value === "string") {
          const userText = answer.value.trim().toLowerCase();
          const correctText = question.correctText.trim().toLowerCase();
          correct = userText === correctText;
        }
        break;
      }
    }

    if (correct) {
      score++;
    }

    return { id: answer.id, correct };
  });

  return {
    score,
    total: questions.length,
    results,
  };
}
