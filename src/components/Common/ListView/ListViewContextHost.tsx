import { createContext, memo, ReactNode, useContext, useMemo } from "react";

export type Task = {
	id: number;
	value: string;
	completed: boolean;
};

interface ListViewContextValue {
	tasks: Set<Task>;
	toggleTask: (task: Task) => void;
	onAction?: (task: Task) => void;
}

export const ListViewContext = createContext<ListViewContextValue | undefined>(
	undefined
);

function ListViewContextHost({
	children,
	tasks,
	toggleTask,
	onAction,
}: { children: ReactNode } & ListViewContextValue) {
	const contextValue = useMemo(
		() => ({
			tasks,
			toggleTask,
			onAction,
		}),
		[tasks, toggleTask, onAction]
	);

	return (
		<ListViewContext.Provider value={contextValue}>
			{children}
		</ListViewContext.Provider>
	);
}

export const useListView = (): ListViewContextValue => {
	const context = useContext(ListViewContext);
	if (!context) {
		throw new Error("Item must be used within a ListView");
	}
	return context;
};

export default memo(ListViewContextHost);
