import { useContext, ReactNode, memo } from "react";
import clsx from "clsx";
import { ListViewContext } from "./ListView";
import styles from "./item.module.css";

interface ItemProps {
	id: React.Key;
	children: ReactNode;
	className?: string;
}

const Item = ({ id, children, className }: ItemProps) => {
	const context = useContext(ListViewContext);

	if (!context) {
		throw new Error("Item must be used within a ListView");
	}

	const { state, onAction } = context;
	const { selectedKeys, toggleKey } = state;

	const handleClick = () => {
		toggleKey(id);
		onAction?.(id);
	};

	return (
		<div
			className={clsx(styles.item, className, {
				[styles.active]: selectedKeys.has(id),
			})}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default memo(Item);
