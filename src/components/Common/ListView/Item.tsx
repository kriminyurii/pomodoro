import { ReactNode, memo } from "react";
import clsx from "clsx";
import { Task, useListView } from "./ListViewContextHost";
import styles from "./item.module.css";

interface ItemProps {
	task: Task;
	children: ReactNode;
	className?: string;
}

const Item = ({ task, children, className }: ItemProps) => {
	const { toggleTask, onAction } = useListView();

	const handleClick = () => {
		toggleTask(task);
		onAction?.(task);
	};

	return (
		<div
			className={clsx(styles.item, className, {
				[styles.active]: task.completed,
			})}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default memo(Item);
