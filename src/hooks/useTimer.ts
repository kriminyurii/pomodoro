import { useCallback, useState } from "react";
import useInterval from "./useInterval";

const MILISECONDS_IN_SECOND = 1000;

const getDuration = (date: Date) => {
	if (!date) return null;
	const nowTime = new Date().getTime();
	const targetTime = date.getTime();
	const duration = Number.isFinite(targetTime) ? targetTime - nowTime : null;
	return duration;
};

const getDelay = (duration: number | null) => {
	if (duration === null) return null;
	const milisecondsToNextSecond =
		duration % MILISECONDS_IN_SECOND || MILISECONDS_IN_SECOND;
	return milisecondsToNextSecond;
};

const useTimer = (finishDate: Date) => {
	const [duration, setDuration] = useState(getDuration(finishDate));
	const [delay, setDelay] = useState<number | null>(
		getDelay(getDuration(finishDate))
	);
	const [finished, setFinished] = useState(false);

	const handleChange = useCallback(() => {
		const newDuration = getDuration(finishDate);
		if (newDuration && newDuration <= 0) {
			setFinished(true);
			setDuration(null);
			setDelay(null);
		} else if (newDuration !== null) {
			setDuration(newDuration);
			setDelay(getDelay(newDuration));
		} else {
			setDelay(null);
		}
	}, [finishDate]);

	useInterval(handleChange, delay);

	return { duration, finished };
};

export default useTimer;
