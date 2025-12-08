import { Question } from "@/app/lib/types";

interface TextQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export default function TextQuestion({
  question,
  value,
  onChange,
}: TextQuestionProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={`question-${question.id}`}
        className="block text-lg font-medium text-gray-900"
      >
        {question.question}
      </label>
      <input
        id={`question-${question.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="Type your answer..."
      />
    </div>
  );
}
