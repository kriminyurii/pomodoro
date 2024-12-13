import "./styles/palette.css";
import "./App.css";

import MainWidget from "./components/MainWiget/MainWiget";

import styles from "./app.module.css";

function App() {
	return (
		<main className={styles.mainContainer}>
			<MainWidget />
		</main>
	);
}

export default App;
