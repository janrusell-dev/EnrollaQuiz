import { Question } from "@/app/lib/types";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";

interface QuestionRendererProps {
  question: Question;
  value: string | number | number[];
  onChange: (value: string | number | number[]) => void;
}

export default function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  switch (question.type) {
    case "text":
      return (
        <TextQuestion
          question={question}
          value={value as string}
          onChange={onChange as (value: string) => void}
        />
      );

    case "radio":
      return (
        <RadioQuestion
          question={question}
          value={value as number | null}
          onChange={onChange as (value: number) => void}
        />
      );

    case "checkbox":
      return (
        <CheckboxQuestion
          question={question}
          value={value as number[]}
          onChange={onChange as (value: number[]) => void}
        />
      );

    default:
      return null;
  }
}
