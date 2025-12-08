import { Question } from "@/app/lib/types";

interface RadioQuestionProps {
  question: Question;
  value: number | null;
  onChange: (value: number) => void;
}

export default function RadioQuestion({
  question,
  value,
  onChange,
}: RadioQuestionProps) {
  if (!question.choices) return null;

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-gray-900">{question.question}</p>
      <div className="space-y-2">
        {question.choices.map((choice, index) => (
          <label
            key={index}
            className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={value === index}
              onChange={() => onChange(index)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{choice}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
