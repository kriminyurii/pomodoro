import { memo } from "react";
import clsx from "clsx";
import styles from "./pomodorocycleprogress.module.css";
import { PomodoroStepsHost } from "./PomodoroStepsHost";
import PomodoroStep from "./PomodoroStep/PomodoroStep";

interface PomodoroCycleProgressProps {
	className?: string;
	currentStep: string;
}

export const POMODORO = "Pomodoro";
export const SHORT_BREAK = "Short Break";
export const LONG_BREAK = "Long Break";
const steps = [POMODORO, SHORT_BREAK, LONG_BREAK];

const PomodoroCycleProgress: React.FC<PomodoroCycleProgressProps> = ({
	currentStep = POMODORO,
	className,
}) => {
	return (
		<PomodoroStepsHost currentStep={currentStep}>
			<div className={clsx(styles.pomodoroCycleProgress, className)}>
				{steps.map((step) => (
					<PomodoroStep key={step} className={styles.item}>
						{step}
					</PomodoroStep>
				))}
			</div>
		</PomodoroStepsHost>
	);
};

export default memo(PomodoroCycleProgress);
