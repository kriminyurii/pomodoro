import { memo } from "react";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;
const MINS_IN_HOUR = 60;

export interface TimerFormat {
	className?: string;
	children: number;
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

const TimerFormat = ({ className, children }: TimerFormat) => {
	return <time className={className}>{formatTime(children)}</time>;
};

export default memo(TimerFormat);
