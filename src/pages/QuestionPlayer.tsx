import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Question } from "../types";
import { useTimer } from "../hooks/useTimer";
import {
  loadTicketStats,
  saveTicketStats,
  loadMistakesSet,
  saveMistakesSet,
  loadQuestionStats,
  saveQuestionStats,
} from "../utils/storage";
import { Header } from './Header';
import { Result } from './Result';

const TICKET_SIZE = 30;

const QuestionPlayer: React.FC<{ questions: Question[]; hideTimer?: boolean }> = ({ questions, hideTimer }) => {

  const [ msg, setMsg ] = useState('');

  const { id } = useParams();
  const ticketId = Number(id);
  const location = useLocation();
  const customIds: number[] = (location.state as any)?.custom || [];
  const startIndex: number = (location.state as any)?.startIndex || 0;
  const removeOnCorrect: boolean = (location.state as any)?.removeOnCorrect || false;

  const ticket =
    customIds.length > 0
      ? customIds.map((i) => questions[i]).filter(Boolean)
      : questions.slice((ticketId - 1) * TICKET_SIZE, ticketId * TICKET_SIZE);

  const ticketGlobalIndexes =
    customIds.length > 0
      ? customIds
      : Array.from({ length: ticket.length }, (_, i) => (ticketId - 1) * TICKET_SIZE + i);

  const [ index, setIndex ] = useState(startIndex);
  const [ answers, setAnswers ] = useState<Record<number, number>>({});
  const [ locked, setLocked ] = useState<Record<number, boolean>>({});
  const [ errors, setErrors ] = useState(0);

  const { seconds } = useTimer(30 * 60);
  const q = ticket[index];

  if (!q) return <div className="app-container">Вопрос не найден</div>;

  const handleAnswer = (answerIndex: number) => {
    if (locked[index]) return;
    const isCorrect = answerIndex === q.correctAnswer;

    setLocked((s) => ({ ...s, [index]: true }));
    setAnswers((s) => ({ ...s, [index]: answerIndex }));
    if (!isCorrect) setErrors((e) => e + 1);

    const globalIndex = ticketGlobalIndexes[index];
    const mistakes = new Set(loadMistakesSet());
    const stats = loadQuestionStats();
    const stat = stats[globalIndex] || { wrong: 0, right: 0, consecRight: 0 };

    if (isCorrect) {
      stat.right++;
      stat.consecRight++;
      if (removeOnCorrect || stat.consecRight >= 3) mistakes.delete(globalIndex);
    } else {
      stat.wrong++;
      stat.consecRight = 0;
      mistakes.add(globalIndex);
    }

    stats[globalIndex] = stat;
    saveQuestionStats(stats);
    saveMistakesSet(Array.from(mistakes));

    if (Object.keys({ ...answers, [index]: answerIndex }).length === ticket.length) {
      const totalErrors = errors + (isCorrect ? 0 : 1);
      //alert(msg);

      setMsg(`${totalErrors <= 3 ? '✅' : '❌'} Всего ошибок: ${totalErrors}`);

      const tstats = loadTicketStats();
      const prev = tstats[ticketId]?.maxErrorsEver || 0;
      const newMax = Math.max(prev, totalErrors);
      tstats[ticketId] = {
        maxErrorsEver: newMax,
        lastErrors: totalErrors,
        lastPassed: totalErrors <= 3,
      };
      saveTicketStats(tstats);
    }
  };

  const timeStr = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="app-container">
      <Header>
        <h4>Вопрос {index + 1}/{ticket.length}</h4>
        {!hideTimer && (
          <div>
            <div className="timer">Время: {timeStr}</div>
            <div className="errors-counter">Ошибок: {errors}</div>
          </div>
        )}
      </Header>

      <div className={'page-container'}>
        {msg.length > 0 ? (
          <Result>
            {msg}
          </Result>
        ) : (
          <>
            {q.pic && <img src={q.pic} alt="Вопрос" className="question-pic"/>}
            <p style={{ fontWeight: 'bold' }}>{q.question}</p>
            <ul className="answers-list">
              {q.answers.map((a, i) => {
                const classes = locked[index]
                  ? i === q.correctAnswer
                    ? "correct"
                    : answers[index] === i
                      ? "incorrect"
                      : ""
                  : "";
                return (
                  <li key={i} className={classes} onClick={() => handleAnswer(i)}>
                    {a}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      {msg.length === 0 && (
        <div className="button-row">
          <button onClick={() => setIndex(Math.max(index - 1, 0))} disabled={index === 0}>
            Назад
          </button>
          <button
            onClick={() => setIndex(Math.min(index + 1, ticket.length - 1))}
            disabled={index === ticket.length - 1}
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionPlayer;
