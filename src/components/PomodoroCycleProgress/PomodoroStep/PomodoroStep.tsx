import { memo } from "react";
import clsx from "clsx";
import { usePomodoro } from "../PomodoroContext";
import styles from "./pomodorostep.module.css";

interface PomodoroStepProps {
	children: string;
	className?: string;
}

const PomodoroStep = ({ children, className }: PomodoroStepProps) => {
	const { currentStep } = usePomodoro();

	return (
		<div
			className={clsx(styles.item, className, {
				[styles.active]: children === currentStep,
			})}
		>
			{children}
		</div>
	);
};

export default memo(PomodoroStep);
