import { useEffect, useRef } from "react";

const useRequestAnimationFrame = (
	onNext: (perfNow: number) => void,
	onStop?: (perfNow: number) => void
) => {
	const requestRef = useRef<number | null>(null);

	const handleNext = () => {
		onNext(performance.now());
		requestRef.current = requestAnimationFrame(handleNext);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(handleNext);
		return () => {
			if (requestRef.current !== null) {
				cancelAnimationFrame(requestRef.current);
				onStop?.(performance.now());
			}
		};
	}, [onNext, onStop]);
};

export default useRequestAnimationFrame;
