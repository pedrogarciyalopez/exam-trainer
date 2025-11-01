import React from "react";
import { useNavigate } from "react-router-dom";
import { loadQuestionStats } from "../utils/storage";
import { Header } from './Header';
import { Result } from './Result';

const TICKET_SIZE = 30;

const MistakesAggregate: React.FC = () => {
  const navigate = useNavigate();
  const stats = loadQuestionStats();

  const arr = Object.entries(stats)
    .map(([ idx, s ]) => ({ idx: +idx, ...s }))
    .filter((s) => s.wrong > 0 && s.consecRight < 3) // убираем те, где 3 подряд правильных
    .sort((a, b) => b.wrong - a.wrong);

  return (
    <div className="app-container list-container">
      <Header>
        <h4>История ошибок</h4>
      </Header>
      <div className={'page-container'}>
        {arr.length === 0 ? (
          <Result>
            Ошибок пока нет 👏
          </Result>
        ) : (
          <div>
            {arr.map((s) => {
              const globalIndex = s.idx;
              const ticketNumber = Math.floor(globalIndex / TICKET_SIZE) + 1;
              const questionNumber = (globalIndex % TICKET_SIZE) + 1;
              return (
                <div
                  className={'ticket-button'}
                  key={globalIndex}
                  onClick={() =>
                    navigate("/mistaken-questions", {
                      state: {
                        custom: arr.map((x) => x.idx),
                        startIndex: arr.findIndex((x) => x.idx === globalIndex),
                        removeOnCorrect: false,
                      },
                    })
                  }
                >
                  <div>Билет {ticketNumber} вопрос {questionNumber}</div>
                  <span style={{ fontSize: 13 }}>{`Кол-во ошибок: ${s.wrong} / Правильных ответов: ${s.right}`}</span>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MistakesAggregate;
