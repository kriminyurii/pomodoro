import { memo, useEffect } from "react";
import useTimer from "../../../hooks/useTimer";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;
const MINS_IN_HOUR = 60;

interface TimerProps {
	className?: string;
	children: Date;
	paused?: boolean;
	onFinish?: () => void;
	onPause?: () => void;
	onResume?: () => void;
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

const Timer = ({
	className,
	children,
	paused = false,
	onFinish,
	onPause,
	onResume,
}: TimerProps) => {
	const { duration, finished, pause, resume } = useTimer(children);

	if (finished && onFinish) {
		onFinish();
	}

	useEffect(() => {
		if (paused) {
			pause();
			onPause?.();
		} else {
			resume();
			onResume?.();
		}
	}, [paused, pause, resume, onPause, onResume]);

	return <time className={className}>{formatTime(duration)}</time>;
};

export default memo(Timer);
