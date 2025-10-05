import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicSelection from "./screens/TopicSelection";
import Quiz from "./screens/Quiz";
import Result from "./screens/Result";
import { QuizProvider } from "./context/QuizContext";

export default function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopicSelection />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}
