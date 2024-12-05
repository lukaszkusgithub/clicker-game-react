import styles from "./ThemeToggle.module.scss";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function ThemeToggleButton() {
	const { theme, setTheme } = useContext(ThemeContext);

	return (
		<>
			<div className={styles.buttonsContainer}>
				<button
					className={styles.toggleButton}
					onClick={() =>
						setTheme(theme === "light" ? "dark" : "light")
					}>
					{theme === "light" ? "Dark" : "Light"}
				</button>
			</div>
		</>
	);
}

export default ThemeToggleButton;
