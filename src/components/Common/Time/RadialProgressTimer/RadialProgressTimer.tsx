import { memo, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import RadialProgress from "../../RadialProgress/RadialProgress";
import { getDuration } from "../../../../hooks/useTimer";
import Timer from "../Timer";
import useRequestAnimationFrame from "../../../../hooks/useRequestAnimationFrame";
import styles from "./radialprogresstimer.module.css";

interface RadialProgressTimerProps {
	children: Date;
	className?: string;
	paused?: boolean;
	finished?: boolean;
	onChange?: (duration: number | null) => void;
	onFinish?: () => void;
	onPause?: () => void;
	onResume?: () => void;
}

function RadialProgressTimer({
	className,
	children,
	onFinish,
	onPause,
	onResume,
	paused = false,
}: RadialProgressTimerProps) {
	const [finishTime, setFinishTime] = useState<number>(children.getTime());
	const [finished, setFinished] = useState<boolean>(false);
	const [value, setValue] = useState<number>(0);
	const startDuration = useMemo(() => getDuration(children.getTime()) || 0, []);

	const handleNext = useCallback(() => {
		const currentDuration = getDuration(finishTime) || 0;

		let value =
			startDuration > 0
				? Math.max(0, (startDuration - currentDuration) / startDuration)
				: 0;
		setValue(value);
	}, [finishTime]);

	const { pause: pauseRaf, resume: resumeRaf } = useRequestAnimationFrame(
		finished ? null : handleNext
	);

	const handleFinished = useCallback(() => {
		setFinished(true);
		onFinish?.();
	}, [onFinish]);

	const handleTimerResume = useCallback(
		(finishTime: number) => {
			setFinishTime(finishTime);
			onResume?.();
		},
		[onResume]
	);

	useEffect(() => {
		if (paused) {
			pauseRaf();
			onPause?.();
		} else {
			resumeRaf();
			onResume?.();
		}
	}, [paused, onPause, onResume]);

	return (
		<RadialProgress
			className={clsx(styles.radialProgressTimer, className)}
			value={value}
			min={0}
			max={1}
		>
			<Timer
				onFinish={handleFinished}
				onResume={handleTimerResume}
				paused={paused}
				className={styles.time}
			>
				{children}
			</Timer>
		</RadialProgress>
	);
}

export default memo(RadialProgressTimer);
