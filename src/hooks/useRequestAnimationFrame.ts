import { useEffect, useRef, useCallback } from "react";

const useRequestAnimationFrame = (
  onNext: ((perfNow: number) => void) | null,
  onStop?: (perfNow: number) => void,
) => {
  const requestRef = useRef<number | null>(null);
  const isPaused = useRef(false);

  const handleNext = () => {
    onNext(performance.now());
    requestRef.current = requestAnimationFrame(handleNext);
  };

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
};

export default useRequestAnimationFrame;
