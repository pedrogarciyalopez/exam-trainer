export type Question = {
  pic: string;
  question: string;
  answers: string[];
  correctAnswer: number;
};

export type TicketResult = {
  ticketId: number;
  maxErrorsEver: number;
  lastPassed: boolean;
};
