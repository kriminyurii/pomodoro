import React, {
	createContext,
	memo,
	ReactNode,
	useMemo,
	useState,
} from "react";
import clsx from "clsx";
import styles from "./listview.module.css";

interface ListViewProps {
	className?: string;
	selectionMode?: "multiple" | "single";
	children: ReactNode[];
	ariaLabel?: string;
}

interface ListState {
	selectedKeys: Set<React.Key>;
	toggleKey: (key: React.Key) => void;
}

interface ListViewContextValue {
	state: ListState;
	onAction?: (key: React.Key) => void;
}

export const ListViewContext = createContext<ListViewContextValue | undefined>(
	undefined
);

const ListView = ({
	className,
	selectionMode = "single",
	children,
	ariaLabel,
}: ListViewProps) => {
	const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());

	const toggleKey = (key: React.Key) => {
		setSelectedKeys((prevSelectedKeys) => {
			const newSelectedKeys = new Set(prevSelectedKeys);
			if (selectionMode === "single") {
				newSelectedKeys.clear();
			}
			if (newSelectedKeys.has(key)) {
				newSelectedKeys.delete(key);
			} else {
				newSelectedKeys.add(key);
			}
			return newSelectedKeys;
		});
	};

	const contextValue = useMemo(
		() => ({
			state: { selectedKeys, toggleKey },
		}),
		[selectedKeys, toggleKey]
	);

	return (
		<ListViewContext.Provider value={contextValue}>
			<div className={clsx(styles.listView, className)} aria-label={ariaLabel}>
				{children}
			</div>
		</ListViewContext.Provider>
	);
};

export default memo(ListView);
