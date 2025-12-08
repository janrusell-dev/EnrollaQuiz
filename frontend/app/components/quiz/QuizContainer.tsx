"use client";

import { useState, useEffect } from "react";
import QuestionRenderer from "./QuestionRenderer";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";
import { Answer, GradeResponse, Question } from "@/app/lib/types";
import { fetchQuiz, submitAnswers } from "@/app/lib/api";

export default function QuizContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<
    Record<number, string | number | number[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const QUIZ_TIME = 600;
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  useEffect(() => {
    loadQuiz();
  }, []);

  useEffect(() => {
    if (loading || result) return;

    if (timeLeft === 0) {
      handleSubmit(); // auto-submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, result]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      setTimeLeft(QUIZ_TIME);
      const data = await fetchQuiz();
      setQuestions(data);

      const initialAnswers: Record<number, string | number | number[]> = {};
      data.forEach((q) => {
        if (q.type === "text") initialAnswers[q.id] = "";
        if (q.type === "radio") initialAnswers[q.id] = -1;
        if (q.type === "checkbox") initialAnswers[q.id] = [];
      });
      setAnswers(initialAnswers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (
    questionId: number,
    value: string | number | number[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (submitting || result) return;
    try {
      setSubmitting(true);
      setError(null);

      const answerArray: Answer[] = Object.entries(answers).map(
        ([id, value]) => ({
          id: Number(id),
          value,
        })
      );

      const gradeResult = await submitAnswers(answerArray);
      setResult(gradeResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete = () => {
    return questions.every((q) => {
      const answer = answers[q.id];

      if (q.type === "text") {
        return typeof answer === "string" && answer.trim().length > 0;
      }
      if (q.type === "radio") {
        return typeof answer === "number" && answer >= 0;
      }
      if (q.type === "checkbox") {
        return Array.isArray(answer) && answer.length > 0;
      }
      return false;
    });
  };

  const handleRetake = () => {
    setResult(null);
    setError(null);
    loadQuiz();
  };

  if (loading) {
    return (
      <Card className="max-w-3xl mx-auto">
        <Spinner />
        <p className="text-center text-gray-600 mt-4">Loading quiz...</p>
      </Card>
    );
  }

  if (error && !result) {
    return (
      <Card className="max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadQuiz}>Try Again</Button>
        </div>
      </Card>
    );
  }

  if (result) {
    const percentage = Math.round((result.score / result.total) * 100);

    return (
      <Card className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
          <div className="mb-6">
            <p className="text-6xl font-bold text-blue-600">
              {result.score}/{result.total}
            </p>
            <p className="text-xl text-gray-600 mt-2">{percentage}% Correct</p>
          </div>

          <div className="space-y-3 mb-6">
            {questions.map((q, index) => {
              const answerResult = result.results.find((r) => r.id === q.id);
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg text-left ${
                    answerResult?.correct
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className="font-medium">
                    Question {index + 1}:{" "}
                    {answerResult?.correct ? "✅ Correct" : "❌ Incorrect"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{q.question}</p>
                </div>
              );
            })}
          </div>

          <Button onClick={handleRetake}>Retake Quiz</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Enrolla Quiz Challenge
      </h1>
      <p className="text-center text-red-600 font-semibold mb-4">
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="pb-6 border-b border-gray-200 last:border-b-0"
          >
            <p className="text-sm text-gray-500 mb-2">
              Question {index + 1} of {questions.length}
            </p>
            <QuestionRenderer
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <Button
          onClick={handleSubmit}
          disabled={submitting || !isComplete() || timeLeft === 0}
        >
          {submitting ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            "Submit Quiz"
          )}
        </Button>
        {!isComplete() && (
          <p className="text-sm text-red-600 mt-2 text-center">
            Please answer all questions before submitting
          </p>
        )}
      </div>
    </Card>
  );
}
