import { useCallback, useMemo, useState, useEffect } from "react";
import useInterval from "./useInterval";

const MILISECONDS_IN_SECOND = 1000;

export const getDuration = (targetTime: number) => {
  if (!targetTime) return null;
  const nowTime = Date.now();
  return Number.isFinite(targetTime) ? targetTime - nowTime : null;
};

const getDelay = (duration: number | null) => {
  if (!duration) return duration;
  const milisecondsToNextSecond =
    duration % MILISECONDS_IN_SECOND || MILISECONDS_IN_SECOND;
  return milisecondsToNextSecond;
};

const calculateFinishTime = (currentFinishTime: number, duration: number) => {
  const currentDuration = getDuration(currentFinishTime);
  const diff = currentDuration && duration - currentDuration;
  const newFinishTime = diff && currentFinishTime + diff;
  return newFinishTime;
};

const useTimer = (finishDate: Date, isRunning: boolean = true) => {
  const [duration, setDuration] = useState<number | null>(
    getDuration(finishDate.getTime()),
  );
  const [finished, setFinished] = useState(false);
  const [finishTime, setFinishTime] = useState<number>(finishDate.getTime());

  const delay = useMemo(() => {
    if (duration !== null && duration <= 0) {
      setFinished(true);
      return null;
    } else {
      return getDelay(duration);
    }
  }, [duration]);

  const handleChange = useCallback(() => {
    setDuration(getDuration(finishTime));
  }, [finishTime]);

  useEffect(() => {
    const newFinishTime = calculateFinishTime(finishTime, duration);
    newFinishTime && setFinishTime(newFinishTime);
  }, [isRunning]);

  useInterval(handleChange, isRunning ? delay : null);

  return { duration, finished, finishTime };
};

export default useTimer;
