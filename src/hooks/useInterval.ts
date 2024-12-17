import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!delay) return;

		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}

		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}

export default useInterval;
