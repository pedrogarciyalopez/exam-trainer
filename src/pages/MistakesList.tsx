import React from "react";
import { useNavigate } from "react-router-dom";
import { loadMistakesSet } from "../utils/storage";
import { Header } from './Header';
import { Result } from './Result';

const TICKET_SIZE = 30;

const MistakesList: React.FC = () => {
  const navigate = useNavigate();
  const mistakes = Array.from(loadMistakesSet());


  return (
    <div className="app-container list-container">
      <Header>
        <h4>Текущие ошибки</h4>
      </Header>
      <div className={'page-container'}>
        {mistakes.length === 0 ? (
          <Result>
            Ошибок пока нет 👏
          </Result>
        ) : (
          <div>
            {mistakes.map((globalIndex) => {
              const ticketNumber = Math.floor(globalIndex / TICKET_SIZE) + 1;
              const questionNumber = (globalIndex % TICKET_SIZE) + 1;
              return (
                <div
                  className={'ticket-button'}
                  key={globalIndex}
                  onClick={() =>
                    navigate("/mistaken-questions", {
                      state: {
                        custom: mistakes,
                        startIndex: mistakes.indexOf(globalIndex),
                        removeOnCorrect: true,
                      },
                    })
                  }
                >
                  Билет {ticketNumber} вопрос {questionNumber}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
    ;
};

export default MistakesList;
