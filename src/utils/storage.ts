import { Question } from "../types";

const KEY_TICKET_STATS = "et_ticket_stats_v1";
const KEY_MISTAKES_SET = "et_mistakes_set_v1";
const KEY_QUESTION_STATS = "et_question_stats_v1";

export const loadTicketStats = (): Record<
  number,
  { maxErrorsEver: number; lastErrors: number; lastPassed: boolean }
> => {
  const raw = localStorage.getItem(KEY_TICKET_STATS);
  return raw ? JSON.parse(raw) : {};
};
export const saveTicketStats = (s: Record<number, any>) =>
  localStorage.setItem(KEY_TICKET_STATS, JSON.stringify(s));

export const loadMistakesSet = (): number[] => {
  const raw = localStorage.getItem(KEY_MISTAKES_SET);
  return raw ? JSON.parse(raw) : [];
};
export const saveMistakesSet = (arr: number[]) =>
  localStorage.setItem(KEY_MISTAKES_SET, JSON.stringify(arr));

export type QuestionStat = { wrong: number; right: number; consecRight: number };
export const loadQuestionStats = (): Record<number, QuestionStat> => {
  const raw = localStorage.getItem(KEY_QUESTION_STATS);
  return raw ? JSON.parse(raw) : {};
};
export const saveQuestionStats = (s: Record<number, QuestionStat>) =>
  localStorage.setItem(KEY_QUESTION_STATS, JSON.stringify(s));
