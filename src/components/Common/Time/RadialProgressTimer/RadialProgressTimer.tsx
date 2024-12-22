import { memo, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import RadialProgress from "../../RadialProgress/RadialProgress";
import { getDuration } from "../../../../hooks/useTimer";
import Timer, { TimerProps } from "../Timer";
import useRequestAnimationFrame from "../../../../hooks/useRequestAnimationFrame";
import styles from "./radialprogresstimer.module.css";

const calculateValue = (startDuration: number, finishTime: number) => {
  const currentDuration = getDuration(finishTime) || 0;
  return startDuration > 0
    ? Math.max(0, (startDuration - currentDuration) / startDuration)
    : 0;
};

function RadialProgressTimer({
  className,
  children,
  isRunning = true,
  onFinish,
  onPause,
  onResume,
}: TimerProps) {
  const [finishTime, setFinishTime] = useState<number>(children.getTime());
  const [finished, setFinished] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const startDuration = useMemo(() => getDuration(children.getTime()) || 0, []);

  const handleNext = useCallback(() => {
    const value = calculateValue(startDuration, finishTime);
    setValue(value);
  }, [finishTime]);

  useRequestAnimationFrame(finished || !isRunning ? null : handleNext);

  const handleFinished = useCallback(() => {
    setFinished(true);
    onFinish?.();
  }, [onFinish]);

  const handleTimerResume = useCallback(
    (finishTime: number) => {
      setFinishTime(finishTime);
      const value = calculateValue(startDuration, finishTime);
      setValue(value);
      onResume?.();
    },
    [onResume],
  );

  return (
    <RadialProgress
      className={clsx(styles.radialProgressTimer, className)}
      value={value}
      min={0}
      max={1}
    >
      <Timer
        onFinish={handleFinished}
        onPause={onPause}
        onResume={handleTimerResume}
        isRunning={isRunning}
        className={styles.time}
      >
        {children}
      </Timer>
    </RadialProgress>
  );
}

export default RadialProgressTimer;
