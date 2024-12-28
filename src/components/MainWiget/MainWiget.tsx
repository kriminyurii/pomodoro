import { useState } from "react";
import PomodoroCycleProgress, {
	LONG_BREAK,
	POMODORO,
	SHORT_BREAK,
} from "../PomodoroCycleProgress/PomodoroCycleProgress";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";
import styles from "./mainwidget.module.css";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;

const POMODORO_TIMER = 25 * SEC_IN_MINUTE * SECOND;
const SHORT_BREAK_TIMER = 5 * SEC_IN_MINUTE * SECOND;
const LONG_BREAK_TIMER = 30 * SEC_IN_MINUTE * SECOND;

export default function MainWidget() {
	const [currentPomodoroStep, setCurrentPomodoroStep] = useState(POMODORO);
	const [timerDuration, setTimerDuration] = useState(POMODORO_TIMER);

	const handleFinish = () => {
		switch (currentPomodoroStep) {
			case POMODORO:
				setTimerDuration(SHORT_BREAK_TIMER);
				setCurrentPomodoroStep(SHORT_BREAK);
				break;
			case "Short Break":
				setTimerDuration(LONG_BREAK_TIMER);
				setCurrentPomodoroStep(LONG_BREAK);
				break;
			case "Long Break":
			default:
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				break;
		}
	};

	return (
		<div className={styles.mainWidget}>
			<PomodoroCycleProgress
				currentStep={currentPomodoroStep}
				className={styles.progress}
			/>
			<PomodoroTimer
				key={timerDuration}
				onFinish={handleFinish}
				className={styles.timer}
			>
				{timerDuration}
			</PomodoroTimer>
		</div>
	);
}
