
import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { generateFeedback } from "../services/aiService";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { questions, answers, topic } = useQuiz();
  const navigate = useNavigate();
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0),
    0
  );
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    (async () => {
      const msg = await generateFeedback(score, topic);
      setFeedback(msg);
    })();
  }, [score, topic]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Your Score: {score}/{questions.length}</h1>
      <p className="text-center max-w-md">{feedback}</p>
      <button onClick={() => navigate("/")} className="px-6 py-3 bg-blue-600 text-white rounded-md">
        Take Another Quiz
      </button>
    </div>
  );
}


