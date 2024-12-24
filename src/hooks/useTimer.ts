import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import useInterval from "./useInterval";

const MILISECONDS_IN_SECOND = 1000;

export const getDuration = (targetDate: Date | null) => {
  if (!targetDate) return null;
  const targetTime = targetDate.getTime();
  const nowTime = Date.now();
  return Number.isFinite(targetTime) ? targetTime - nowTime : null;
};

const getDelay = (duration: number | null) => {
  if (!duration) return duration;
  const milisecondsToNextSecond =
    duration % MILISECONDS_IN_SECOND || MILISECONDS_IN_SECOND;
  return milisecondsToNextSecond;
};

const useTimer = (finishDate: Date, isRunning: boolean = true) => {
  const [duration, setDuration] = useState<number | null>(
    getDuration(finishDate),
  );
  const [finished, setFinished] = useState(false);

  const delay = useMemo(() => {
    if (duration !== null && duration <= 0) {
      setFinished(true);
      return null;
    } else {
      return getDelay(duration);
    }
  }, [duration]);

  const handleChange = useCallback(() => {
    setDuration(getDuration(finishDate));
  }, [finishDate]);

  useInterval(handleChange, isRunning ? delay : null);

  return { duration, finished };
};

export default useTimer;
