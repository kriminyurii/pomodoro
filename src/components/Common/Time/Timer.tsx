import { memo, useCallback, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import clsx from "clsx";
import styles from "./timer.module.css";
import Button from "../Button/Button";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;
const MINS_IN_HOUR = 60;

export interface TimerProps {
	className?: string;
	children: number;
	isRunning?: boolean;
	onFinish?: () => void;
	onPause?: () => void;
	onResume?: (finishTime: number) => void;
}

const formatTime = (duration: number | null) => {
	if (duration === null) return "00:00";

	const durationSeconds = Math.ceil(duration / SECOND);
	let seconds = durationSeconds % SEC_IN_MINUTE;
	let minutes = Math.floor(durationSeconds / SEC_IN_MINUTE) % MINS_IN_HOUR;

	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
};

const getCurrentFinishDate = (duration: number) =>
	new Date(Date.now() + duration);

const Timer = ({ className, children, onFinish }: TimerProps) => {
	const [finishDate, setFinishDate] = useState(getCurrentFinishDate(children));
	const { duration, start, pause, resume } = useTimer(finishDate, onFinish);

	const handleStart = useCallback(() => {
		const finishDate = getCurrentFinishDate(children);
		setFinishDate(finishDate);
		start(finishDate);
	}, [children, start]);

	const handleResume = useCallback(() => {
		resume(finishDate);
	}, [resume]);

	return (
		<div className={clsx(styles.timer, className)}>
			<time className={styles.time}>{formatTime(duration)}</time>
			<Button onClick={handleStart}>Start</Button>
			<Button onClick={pause}>Pause</Button>
			<Button onClick={handleResume}>Resume</Button>
		</div>
	);
};

export default memo(Timer);
