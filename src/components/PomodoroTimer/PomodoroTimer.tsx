import { memo, useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import RadialProgress from "../Common/RadialProgress/RadialProgress";
import useTimer from "../../hooks/useTimer";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFrame";
import Button from "../Common/Button/Button";
import TimerFormat from "../Common/Time/TimerFormat";
import styles from "./pomodorotimer.module.css";

const getCurrentFinishDate = (duration: number) =>
	new Date(Date.now() + duration);

interface RadialProgressTimerProps {
	className?: string;
	children: number;
	onFinish?: () => void;
	onReset?: () => void;
}

function PomodoroTimer({
	className,
	children,
	onFinish,
	onReset,
}: RadialProgressTimerProps) {
	const [valueTime, setValueTime] = useState(Date.now());
	const [finishDate, setFinishDate] = useState(getCurrentFinishDate(children));
	const [startTime, setStartTime] = useState<number>(Date.now());
	const finishTime = useMemo(() => finishDate.getTime(), [finishDate]);
	const [finished, setFinished] = useState(false);

	const handleFinish = useCallback(() => {
		setFinished(true);
		onFinish?.();
	}, [onFinish]);

	const { duration, start, reset, isRunning } = useTimer(
		finishDate,
		handleFinish
	);

	const handleNext = useCallback(() => {
		setValueTime(Date.now());
	}, []);
	useRequestAnimationFrame(finished || !isRunning ? null : handleNext);

	const handleStart = useCallback(() => {
		const finishDate = getCurrentFinishDate(children);
		setStartTime(Date.now());
		setFinishDate(finishDate);
		start(finishDate);
	}, [children, start]);

	const handleReset = useCallback(() => {
		const finishDate = getCurrentFinishDate(children);
		setFinishDate(finishDate);
		setValueTime(startTime);
		reset(finishDate);
		onReset?.();
	}, [reset, children]);

	return (
		<div className={clsx(styles.pomodorTimer, className)}>
			<RadialProgress
				className={styles.radialProgress}
				value={valueTime}
				min={startTime}
				max={finishTime}
			>
				<TimerFormat className={styles.time}>{duration || 0}</TimerFormat>
			</RadialProgress>
			{isRunning ? (
				<Button onClick={handleReset} className={styles.button}>
					Reset
				</Button>
			) : (
				<Button onClick={handleStart} className={styles.button}>
					Start
				</Button>
			)}
		</div>
	);
}

export default memo(PomodoroTimer);
