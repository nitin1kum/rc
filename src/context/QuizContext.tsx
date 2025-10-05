
import React, { createContext, useContext, useState } from "react";

export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  answers: number[];
  setAnswers: (a: number[]) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  return (
    <QuizContext.Provider value={{ topic, setTopic, questions, setQuestions, answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used inside QuizProvider");
  return context;
};
