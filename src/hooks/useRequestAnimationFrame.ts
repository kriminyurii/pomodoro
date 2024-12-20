import { useEffect, useRef, useCallback } from "react";

const useRequestAnimationFrame = (
	onNext: ((perfNow: number) => void) | null,
	onStop?: (perfNow: number) => void
) => {
	const requestRef = useRef<number | null>(null);
	const isPaused = useRef(false);

	const handleNext = () => {
		if (!isPaused.current && onNext) {
			onNext(performance.now());
			requestRef.current = requestAnimationFrame(handleNext);
		}
	};

	const pause = useCallback(() => {
		isPaused.current = true;
		if (requestRef.current !== null) {
			cancelAnimationFrame(requestRef.current);
		}
	}, []);

	const resume = useCallback(() => {
		if (isPaused.current && onNext) {
			isPaused.current = false;
			requestRef.current = requestAnimationFrame(handleNext);
		}
	}, [onNext]);

	useEffect(() => {
		if (onNext) {
			requestRef.current = requestAnimationFrame(handleNext);
		}
		return () => {
			if (requestRef.current !== null) {
				cancelAnimationFrame(requestRef.current);
				onStop?.(performance.now());
			}
		};
	}, [onNext, onStop]);

	return { pause, resume };
};

export default useRequestAnimationFrame;
