import { memo } from "react";
import clsx from "clsx";
import styles from "./pomodorocycleprogress.module.css";

interface PomodoroCycleProgressProps {
	className?: string;
}

const PomodoroCycleProgress: React.FC<PomodoroCycleProgressProps> = ({
	className,
}) => {
	let active = true;

	return (
		<div className={clsx(styles.pomodoroCycleProgress, className)}>
			<div className={clsx(styles.item, { [styles.active]: active })}>
				Pomodoro
			</div>
			<div className={styles.item}>Short Break</div>
			<div className={styles.item}>Long break</div>
		</div>
	);
};

export default memo(PomodoroCycleProgress);
