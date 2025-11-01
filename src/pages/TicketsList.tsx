import React from "react";
import { useNavigate } from "react-router-dom";
import { loadTicketStats } from "../utils/storage";
import { Header } from './Header';

const TicketsList: React.FC = () => {
  const navigate = useNavigate();
  const tstats = loadTicketStats();
  const tickets = Array.from({ length: 101 }, (_, i) => i + 1);

  return (
    <div className="app-container">
      <Header>
        <h4>Список билетов</h4>
      </Header>
      <div className={'page-container'}>
        <div>
          {tickets.map((id) => {
            const stat = tstats[id];
            const color = stat
              ? stat.lastPassed
                ? "green"
                : "red"
              : "black";
            const maxErrors = stat?.maxErrorsEver || 0;
            const lastErrors = stat?.lastErrors ?? "-";
            return (
              <div
                className={'ticket-button'}
                key={id}
                style={{ color }}
                onClick={() => navigate(`/ticket/${id}`)}
              >
                <div>Билет {id}</div>
                <span style={{ fontSize: 13 }}>{stat ? `Кол-во ошибок: ${lastErrors} / Макс кол-во ошибок: ${maxErrors}` : ""}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketsList;
