import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container main-page">
      <button onClick={() => navigate("/tickets")}>Список билетов</button>
      <button onClick={() => navigate("/mistakes")}>Текущие ошибки</button>
      <button onClick={() => navigate("/mistakes-all")}>История ошибок</button>
    </div>
  );
};

export default Home;
