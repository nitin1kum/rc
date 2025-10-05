

// import { useNavigate } from "react-router-dom";
// import { useQuiz } from "../context/QuizContext";

// export default function TopicSelection() {
//   const navigate = useNavigate();
//   const { setTopic, setQuestions, setAnswers } = useQuiz();
//   const topics = ["Wellness", "Tech Trends", "Science", "History"];

//   const handleSelect = (t: string) => {
//     setTopic(t);
//     setQuestions([]); // clear old questions so quiz refetches
//     setAnswers([]);   // clear old answers
//     navigate("/quiz");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//       <h1 className="text-2xl font-bold mb-4">Select a Topic</h1>
//       {topics.map((t) => (
//         <button
//           key={t}
//           onClick={() => handleSelect(t)}
//           className="px-6 py-3 bg-blue-600 text-white rounded-md w-48 hover:bg-blue-700"
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { FaBrain, FaLaptopCode, FaFlask, FaLandmark } from "react-icons/fa";

export default function TopicSelection() {
  const navigate = useNavigate();
  const { setTopic, setQuestions, setAnswers } = useQuiz();

  const topics = [
    {
      name: "Wellness",
      desc: "Health & mindfulness tips",
      icon: <FaBrain className="text-pink-600 text-3xl" />,
      bg: "bg-pink-100 hover:bg-pink-200",
    },
    {
      name: "Tech Trends",
      desc: "Latest in technology & AI",
      icon: <FaLaptopCode className="text-blue-600 text-3xl" />,
      bg: "bg-blue-100 hover:bg-blue-200",
    },
    {
      name: "Science",
      desc: "Discoveries & innovations",
      icon: <FaFlask className="text-purple-600 text-3xl" />,
      bg: "bg-purple-100 hover:bg-purple-200",
    },
    {
      name: "History",
      desc: "World events & culture",
      icon: <FaLandmark className="text-yellow-600 text-3xl" />,
      bg: "bg-yellow-100 hover:bg-yellow-200",
    },
  ];

  const handleSelect = (t: string) => {
    setTopic(t);
    setQuestions([]);
    setAnswers([]);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-3 text-center">
        AI Knowledge Quiz
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-md">
        Choose a topic and test your knowledge with AI-generated questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {topics.map((t) => (
          <div
            key={t.name}
            onClick={() => handleSelect(t.name)}
            className={`cursor-pointer rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl ${t.bg}`}
          >
            <div className="flex items-center gap-4">
              {t.icon}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{t.name}</h2>
                <p className="text-gray-700 text-sm">{t.desc}</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-green-700 font-semibold hover:underline">
                Start Quiz →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
