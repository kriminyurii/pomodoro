import { memo, ReactNode } from "react";
import clsx from "clsx";
import styles from "./listview.module.css";

interface ListViewProps {
	className?: string;
	children: ReactNode[];
	ariaLabel?: string;
}

const ListView = ({ className, children, ariaLabel }: ListViewProps) => {
	return (
		<div className={clsx(styles.listView, className)} aria-label={ariaLabel}>
			{children}
		</div>
	);
};

export default memo(ListView);
