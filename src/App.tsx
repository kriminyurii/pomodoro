import "./styles/palette.css";
import "./App.css";

import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import MainWidget from "./components/MainWiget/MainWiget";
import Form from "./components/Common/Form/Form";
import Input from "./components/Common/Form/Input/Input";
import ListView from "./components/Common/ListView/ListView";
import Item from "./components/Common/ListView/Item";
import Modal from "./components/Common/Modal/Modal";
import ListViewContextHost from "./components/Common/ListView/ListViewContextHost";
import type { Task } from "./components/Common/ListView/ListViewContextHost";
import styles from "./app.module.css";

function App() {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [tasks, setTasks] = useState<Set<Task>>(new Set());
	const arrayTasks = useMemo(() => Array.from(tasks), [tasks]).sort(
		(a, b) => a.id - b.id
	);

	// const resetTasks = () => {
	// 	setTasks(new Set());
	// }; // TODO: сброс по кнопке ресет

	const addTask = (task: Task) => {
		const newTasks = new Set(tasks);
		newTasks.add(task);
		setTasks(newTasks);
	};

	const toggleTask = useCallback(
		(task: Task) => {
			if (!tasks.has(task)) return;
			const newTasks = new Set(tasks);
			newTasks.delete(task);
			task.completed = !task.completed;
			newTasks.add(task);
			setTasks(newTasks);
		},
		[tasks]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let taskValue = data.get("task") as string;

		if (taskValue) {
			const lastTask = arrayTasks[arrayTasks.length - 1];
			const id = (lastTask?.id || 0) + 1;
			const newTask = {
				id,
				value: taskValue,
				completed: false,
			};
			addTask(newTask);
		}

		e.currentTarget.reset();
	};

	const handleHideModal = useCallback(() => {
		setModalVisible(false);
	}, []);

	const handleShowModal = () => {
		setModalVisible(true);
	};

	return (
		<div className={styles.mainWindow}>
			<Header className={styles.header} />
			<main className={styles.container}>
				<MainWidget className={styles.mainWidget} />
				<div className={styles.tasksTitle}>
					Tasks{" "}
					<button
						onClick={handleShowModal}
						className={styles.tasksButton}
						type="button"
					>
						<span className={styles.dot}>•</span>
						<span className={styles.dot}>•</span>
						<span className={styles.dot}>•</span>
					</button>
				</div>
				<Form className={styles.tasksForm} onSubmit={handleSubmit}>
					<Input name="task" ariaLabel="tasks" type="text" />
					<input type="submit" style={{ display: "none" }} />
				</Form>
				<Modal onClose={handleHideModal} in={modalVisible}>
					<h2 className={styles.modalTitle}>Tasks</h2>
					{arrayTasks.length === 0 ? (
						<div className={styles.emptyText}>
							There is not tasks at the moment
						</div>
					) : (
						<ListViewContextHost tasks={tasks} toggleTask={toggleTask}>
							<ListView>
								{arrayTasks.map((task) => (
									<Item key={task.id} task={task}>
										{task.value}
									</Item>
								))}
							</ListView>
						</ListViewContextHost>
					)}
				</Modal>
			</main>
		</div>
	);
}

export default App;
