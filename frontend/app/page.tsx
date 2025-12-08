import Image from "next/image";
import QuizContainer from "./components/quiz/QuizContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <QuizContainer />
    </main>
  );
}
