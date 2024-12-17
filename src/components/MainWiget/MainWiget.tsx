import { useState } from "react";
import Timer from "../Common/Time/Timer";
import styles from "./mainwidget.module.css";

const twentyFiveMinutesFromNow = new Date(Date.now() + 25 * 60 * 1000);

export default function MainWidget() {
	const [message, setMessage] = useState<string | null>(null);

	const handleFinish = () => {
		setMessage("Time is up!");
	};

	return (
		<div className={styles.mainWidget}>
			<Timer className={styles.timer} onFinish={handleFinish}>
				{twentyFiveMinutesFromNow}
			</Timer>
			{message && <div>finished message {message}</div>}
		</div>
	);
}
