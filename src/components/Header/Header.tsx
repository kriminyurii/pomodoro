import clsx from "clsx";
import styles from "./header.module.css";
import checkSvg from "./images/check.svg";

export default function Header({ className }: { className?: string }) {
	return (
		<header className={clsx(styles.header, className)}>
			<h1 className={styles.title}>
				<img className={styles.icon} src={checkSvg} alt="Checkmark" /> Pomofocus
			</h1>
		</header>
	);
}
