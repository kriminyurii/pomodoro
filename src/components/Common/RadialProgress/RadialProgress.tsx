import clsx from "clsx";
import styles from "./radialprogress.module.css";

interface RadialProgressProps {
	className: string;
	children: React.ReactNode;
	value: number;
	min: number;
	max: number;
}

const HALF_CIRCLE_DEGREE = 180;

const percentToDegree = (rate: number) => {
	const FULL_CIRCLE_DEGREE = 360;
	let degree = rate * FULL_CIRCLE_DEGREE;
	degree = Math.max(degree, -FULL_CIRCLE_DEGREE);
	degree = Math.min(degree, FULL_CIRCLE_DEGREE);
	return degree;
};

export default function RadialProgress({
	className,
	children = null,
	value = 0,
	min = 0,
	max = Infinity,
}: Partial<RadialProgressProps>) {
	min = Math.min(min, max);
	const rate = (value - min) / (max - min) || 0;
	const progressDegree = Math.max(0, percentToDegree(rate));
	const firstHalfDegree = Math.min(HALF_CIRCLE_DEGREE, progressDegree);
	const secondHalfDegree = Math.max(0, progressDegree - HALF_CIRCLE_DEGREE);

	return (
		<div className={clsx(styles.radialProgress, className)}>
			<div className={clsx(styles.clip, styles.secondHalf)}>
				<div
					className={styles.progress}
					style={{
						transform: `rotateZ(${secondHalfDegree}deg)`,
					}}
				/>
			</div>
			<div className={clsx(styles.clip, styles.firstHalf)}>
				<div
					className={styles.progress}
					style={{
						transform: `rotateZ(${firstHalfDegree}deg)`,
					}}
				/>
			</div>
			{children}
		</div>
	);
}
