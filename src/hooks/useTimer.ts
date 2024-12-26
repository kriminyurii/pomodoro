import { useCallback, useState } from "react";
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

const calculateFinishDate = (finishDate: Date, currentDuration: number) => {
	const actualDuration = getDuration(finishDate);
	const diff = Math.max(currentDuration - (actualDuration || 0), 0);
	const newFinishDate = new Date(finishDate.getTime() + diff);
	return newFinishDate;
};

const useTimer = (finishDateProps: Date, onFinish?: () => void) => {
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [delay, setDelay] = useState<number | null>(null);
	const [finishDate, setFinishDate] = useState<Date>(finishDateProps);
	const [duration, setDuration] = useState<number | null>(
		getDuration(finishDate)
	);

	const start = useCallback(
		(finishDate: Date) => {
			setIsRunning(true);
			setFinishDate(finishDate);
			setDelay(getDelay(duration));
		},
		[duration]
	);

	const pause = useCallback(() => {
		setIsRunning(false);
	}, []);

	const resume = useCallback(
		(finishDate: Date) => {
			const newFinishDate = calculateFinishDate(finishDate, duration || 0);
			setIsRunning(true);
			setFinishDate(newFinishDate);
			setDelay(getDelay(duration));
		},
		[duration]
	);

	const reset = useCallback((finishDate: Date) => {
		const fullDuration = getDuration(finishDate);
		setDuration(fullDuration);
		setIsRunning(false);
		setFinishDate(finishDate);
	}, []);

	const handleChange = useCallback(() => {
		const newDuration = getDuration(finishDate);
		if (newDuration && newDuration <= 0) {
			setIsRunning(false);
			onFinish?.();
		}
		setDuration(getDuration(finishDate));
	}, [finishDate, onFinish]);

	useInterval(handleChange, isRunning ? delay : null);

	return { duration, isRunning, start, pause, resume, reset };
};

export default useTimer;
