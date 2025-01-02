import { useCallback, useRef, useState } from "react";
import PomodoroCycleProgress, {
	LONG_BREAK,
	POMODORO,
	SHORT_BREAK,
} from "../PomodoroCycleProgress/PomodoroCycleProgress";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";
import clsx from "clsx";
import styles from "./mainwidget.module.css";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;

const POMODORO_TIMER = 25 * SEC_IN_MINUTE * SECOND;
const SHORT_BREAK_TIMER = 5 * SEC_IN_MINUTE * SECOND;
const LONG_BREAK_TIMER = 30 * SEC_IN_MINUTE * SECOND;
const LAST_POMODORO_CYCLE = 4;

export default function MainWidget({ className }: { className?: string }) {
	const pomodoroCycle = useRef(0);
	const [currentPomodoroStep, setCurrentPomodoroStep] = useState(POMODORO);
	const [timerDuration, setTimerDuration] = useState(POMODORO_TIMER);

	const handleFinish = () => {
		switch (true) {
			case currentPomodoroStep === POMODORO &&
				pomodoroCycle.current < LAST_POMODORO_CYCLE:
				setTimerDuration(SHORT_BREAK_TIMER);
				setCurrentPomodoroStep(SHORT_BREAK);
				pomodoroCycle.current += 1;
				break;
			case currentPomodoroStep === SHORT_BREAK &&
				pomodoroCycle.current < LAST_POMODORO_CYCLE:
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				break;
			case currentPomodoroStep === SHORT_BREAK &&
				pomodoroCycle.current === LAST_POMODORO_CYCLE:
				setTimerDuration(LONG_BREAK_TIMER);
				setCurrentPomodoroStep(LONG_BREAK);
				break;
			case currentPomodoroStep === LONG_BREAK:
			default:
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				break;
		}
	};

	const handleReset = useCallback(() => {
		setTimerDuration(POMODORO_TIMER);
		setCurrentPomodoroStep(POMODORO);
	}, []);

	return (
		<div className={clsx(styles.mainWidget, className)}>
			<PomodoroCycleProgress
				currentStep={currentPomodoroStep}
				className={styles.progress}
			/>
			<PomodoroTimer
				key={timerDuration}
				onFinish={handleFinish}
				onReset={handleReset}
				className={styles.timer}
			>
				{timerDuration}
			</PomodoroTimer>
		</div>
	);
}
