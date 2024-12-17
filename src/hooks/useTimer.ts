import { useCallback, useMemo, useState } from "react";
import useInterval from "./useInterval";

const MILISECONDS_IN_SECOND = 1000;

const getDuration = (targetTime: number) => {
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

const useTimer = (finishDate: Date) => {
	const [duration, setDuration] = useState<number | null>(
		getDuration(finishDate.getTime())
	);
	const [finished, setFinished] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
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
	}, [isPaused]);

	const pause = useCallback(() => {
		setIsPaused(true);
	}, []);

	const resume = useCallback(() => {
		if (isPaused) {
			const currentDuration = getDuration(finishTime);
			const diff = duration && currentDuration && duration - currentDuration;
			const newFinishTime = diff && finishTime + diff;
			newFinishTime && setFinishTime(newFinishTime);
		}
		setIsPaused(false);
	}, [isPaused]);

	useInterval(handleChange, isPaused ? null : delay);

	return { duration, finished, pause, resume, isPaused };
};

export default useTimer;
