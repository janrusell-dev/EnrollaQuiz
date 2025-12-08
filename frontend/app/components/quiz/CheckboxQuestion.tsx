import { Question } from "@/app/lib/types";

interface CheckboxQuestionProps {
  question: Question;
  value: number[];
  onChange: (value: number[]) => void;
}

export default function CheckboxQuestion({
  question,
  value,
  onChange,
}: CheckboxQuestionProps) {
  if (!question.choices) return null;

  const handleToggle = (index: number) => {
    if (value.includes(index)) {
      onChange(value.filter((v) => v !== index));
    } else {
      onChange([...value, index]);
    }
  };

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
              type="checkbox"
              checked={value.includes(index)}
              onChange={() => handleToggle(index)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{choice}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
