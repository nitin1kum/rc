
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions } from "../services/aiService";
import { useQuiz } from "../context/QuizContext";
import { Loader } from "../components/Loader";
import { QuestionCard } from "../components/QuestionCard";
import { ProgressBar } from "../components/ProgressBar";

export default function Quiz() {
  const navigate = useNavigate();
  const { topic, questions, setQuestions, answers, setAnswers } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      if (questions.length === 0) {
        try {
          const q = await generateQuestions(topic);
          setQuestions(q);
          setAnswers(Array(q.length).fill(-1));
        } catch (e) {
          alert("Failed to generate questions. Please retry.");
          navigate("/");
        }
      }
      setLoading(false);
    })();
  }, [topic, questions, setQuestions, setAnswers, navigate]);

  if (loading) return <Loader />;

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else navigate("/result");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const selectAnswer = (idx: number) => {
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <ProgressBar progress={progress} />
      <QuestionCard
        question={questions[current].question}
        options={questions[current].options}
        selected={answers[current]}
        onSelect={selectAnswer}
      />
      <div className="flex justify-between mt-4">
        <button disabled={current === 0} onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded">
          Previous
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
          {current === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}


