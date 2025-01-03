import "./styles/palette.css";
import "./App.css";

import { useCallback, useState } from "react";
import Header from "./components/Header/Header";
import MainWidget from "./components/MainWiget/MainWiget";
import Form from "./components/Common/Form/Form";
import Input from "./components/Common/Form/Input/Input";
import ListView from "./components/Common/ListView/ListView";
import Item from "./components/Common/ListView/Item";
import Modal from "./components/Common/Modal/Modal";
import styles from "./app.module.css";

type Task = {
	id: number;
	value: string;
};

function App() {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [tasks, setTasks] = useState<Array<Task>>([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let taskValue = data.get("task") as string;

		if (taskValue) {
			let lastId = tasks[tasks.length - 1]?.id || 0;
			const newTask = { id: lastId + 1, value: taskValue };
			setTasks([...tasks, newTask]);
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
					<Input name="task" type="text" />
					<input type="submit" style={{ display: "none" }} />
				</Form>
				<Modal onClose={handleHideModal} in={modalVisible}>
					<h2 className={styles.modalTitle}>Tasks</h2>
					{tasks.length === 0 ? (
						<div className={styles.emptyText}>
							There is not tasks at the moment
						</div>
					) : (
						<ListView>
							{tasks.map((task) => (
								<Item key={task.id} id={task.id}>
									{task.value}
								</Item>
							))}
						</ListView>
					)}
				</Modal>
			</main>
		</div>
	);
}

export default App;
