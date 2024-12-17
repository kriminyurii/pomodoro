import { useEffect } from "react";
import useTimer from "../../../hooks/useTimer";

const SECOND = 1000;

interface TimerProps {
	className?: string;
	children: Date;
	onFinish?: () => void;
}

const formatTime = (duration: number | null) => {
	if (duration === null) return "00:00";
	const totalSeconds = Math.floor(duration / SECOND);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
};

const Timer = ({ className, children, onFinish }: TimerProps) => {
	const { duration, finished } = useTimer(children);

	useEffect(() => {
		if (finished && onFinish) {
			onFinish();
		}
	}, [finished, onFinish]);

	return <div className={className}>{formatTime(duration)}</div>;
};

export default Timer;
