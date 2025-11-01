import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TicketsList from "./pages/TicketsList";
import QuestionPlayer from "./pages/QuestionPlayer";
import MistakesList from "./pages/MistakesList";
import MistakesAggregate from "./pages/MistakesAggregate";
import { Question } from "./types";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((r) => r.json())
      .then(setQuestions)
      .catch((e) => console.error("Не удалось загрузить questions.json", e));
  }, []);

  if (!questions) return <div>Загрузка вопросов...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tickets" element={<TicketsList />} />
      <Route path="/ticket/:id" element={<QuestionPlayer questions={questions} />} />
      <Route path="/mistaken-questions" element={<QuestionPlayer questions={questions} hideTimer={true} />} />
      <Route path="/mistakes" element={<MistakesList />} />
      <Route path="/mistakes-all" element={<MistakesAggregate />} />
    </Routes>
  );
};

export default App;
