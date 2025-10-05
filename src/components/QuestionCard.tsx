

import React from "react";

interface Props {
  question: string;
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
}

export const QuestionCard: React.FC<Props> = ({ question, options, selected, onSelect }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">{question}</h2>
    {options.map((opt, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        className={`block w-full text-left p-2 rounded mb-2 border 
          ${selected === idx ? "bg-blue-500 text-white" : "bg-gray-100"}`}
      >
        {opt}
      </button>
    ))}
  </div>
);
