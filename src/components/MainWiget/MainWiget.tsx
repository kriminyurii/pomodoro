import { memo, useCallback, useEffect, useRef, useState } from "react";
import PomodoroCycleProgress, {
	LONG_BREAK,
	POMODORO,
	SHORT_BREAK,
} from "../PomodoroCycleProgress/PomodoroCycleProgress";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";
import clsx from "clsx";
import styles from "./mainwidget.module.css";
import {
	isPermissionGranted,
	requestPermission,
	sendNotification,
	Visibility,
} from "@tauri-apps/plugin-notification";

const SECOND = 1000;
const SEC_IN_MINUTE = 60;

const POMODORO_TIMER = 25 * SEC_IN_MINUTE * SECOND;
const SHORT_BREAK_TIMER = 5 * SEC_IN_MINUTE * SECOND;
const LONG_BREAK_TIMER = 30 * SEC_IN_MINUTE * SECOND;
const LAST_POMODORO_CYCLE = 4;

const checkPermission = async () => {
	let permissionGranted = await isPermissionGranted();
	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === "granted";
	}
	return permissionGranted;
};

const INITIAL_CYCLE = 0;

function MainWidget({
	className,
	onTimerReset,
}: {
	className?: string;
	onTimerReset?: () => void;
}) {
	const pomodoroCycle = useRef(INITIAL_CYCLE);
	const [currentPomodoroStep, setCurrentPomodoroStep] = useState(POMODORO);
	const [timerDuration, setTimerDuration] = useState(POMODORO_TIMER);
	const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

	useEffect(() => {
		const checkPermissionGranted = async () => {
			const permission = await checkPermission();
			setPermissionGranted(permission);
		};
		checkPermissionGranted();
	}, []);

	const handleFinish = () => {
		switch (true) {
			case currentPomodoroStep === POMODORO &&
				pomodoroCycle.current < LAST_POMODORO_CYCLE - 1:
				setTimerDuration(SHORT_BREAK_TIMER);
				setCurrentPomodoroStep(SHORT_BREAK);
				if (permissionGranted) {
					sendNotification({
						title: "Cycle has been changed",
						body: `Current Step: ${SHORT_BREAK} - 5mins. Cycles passed: ${pomodoroCycle.current}`, // TODO: Do not hardcode duration.
						visibility: Visibility.Public,
					});
				}
				break;
			case currentPomodoroStep === POMODORO &&
				pomodoroCycle.current === LAST_POMODORO_CYCLE - 1:
				setTimerDuration(LONG_BREAK_TIMER);
				setCurrentPomodoroStep(LONG_BREAK);
				if (permissionGranted) {
					sendNotification({
						title: "Cycle has been changed",
						body: `Current Step: ${LONG_BREAK} - 30mins. Cycles passed: ${pomodoroCycle.current}`,
						visibility: Visibility.Public,
					});
				}
				break;
			case currentPomodoroStep === SHORT_BREAK:
				pomodoroCycle.current += 1;
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				if (permissionGranted) {
					sendNotification({
						title: "Cycle has been changed",
						body: `Current Step: ${POMODORO} - 25mins. Cycles passed: ${pomodoroCycle.current}`,
						visibility: Visibility.Public,
					});
				}
				break;

			case currentPomodoroStep === LONG_BREAK:
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				if (permissionGranted) {
					sendNotification({
						title: "Cycle has been changed",
						body: `Current Step: ${POMODORO} - 25mins. Good job all cycles has been passed!`,
						visibility: Visibility.Public,
					});
				}
				pomodoroCycle.current = INITIAL_CYCLE;
				break;
			default:
				setTimerDuration(POMODORO_TIMER);
				setCurrentPomodoroStep(POMODORO);
				break;
		}
	};

	const handleReset = useCallback(() => {
		setTimerDuration(POMODORO_TIMER);
		setCurrentPomodoroStep(POMODORO);
		pomodoroCycle.current = INITIAL_CYCLE;
		onTimerReset?.();
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

export default memo(MainWidget);
