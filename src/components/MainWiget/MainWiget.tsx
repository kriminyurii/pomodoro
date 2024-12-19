import { useState } from "react";
import Timer from "../Common/Time/Timer";
import styles from "./mainwidget.module.css";

const twentyFiveMinutesFromNow = new Date(Date.now() + 30000);

export default function MainWidget() {
	const [paused, setPaused] = useState<boolean>(false);

	const pauseTimer = () => {
		setPaused(true);
	};

	const resumeTimer = () => {
		setPaused(false);
	};

	return (
		<div className={styles.mainWidget}>
			<Timer paused={paused} className={styles.timer}>
				{twentyFiveMinutesFromNow}
			</Timer>
			<button type="button" onClick={pauseTimer}>
				Pause
			</button>
			<button type="button" onClick={resumeTimer}>
				Resume
			</button>
		</div>
	);
}
