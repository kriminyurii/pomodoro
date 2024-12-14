import "./styles/palette.css";
import "./App.css";

import Header from "./components/Header/Header";
import MainWidget from "./components/MainWiget/MainWiget";

import styles from "./app.module.css";

function App() {
	return (
		<div className={styles.mainWindow}>
			<Header className={styles.header} />
			<main className={styles.container}>
				<MainWidget />
			</main>
		</div>
	);
}

export default App;
