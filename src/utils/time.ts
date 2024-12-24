import { getDuration } from "../hooks/useTimer";

export const calculateFinishTime = (
  currentFinishDate: Date,
  duration: number,
) => {
  const currentDuration = getDuration(currentFinishDate);
  const diff = currentDuration && duration - currentDuration;
  const currentFinishTime = currentFinishDate.getTime();
  const newFinishDate = new Date(currentFinishTime + (diff || 0));
  return newFinishDate;
};
