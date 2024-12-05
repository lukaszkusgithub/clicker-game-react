import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function ClassicToggleButton() {
	const { theme, setTheme } = useContext(ThemeContext);

	return (
		<>
			<Classic
				style={{
					color: theme === "light" ? "black" : "yellow",
					backgroundColor: "var(--background-color)",
					fontSize: "1.6em",
				}}
				toggled={theme === "light"}
				toggle={() => setTheme(theme === "light" ? "dark" : "light")}
				duration={750}
				placeholder={undefined}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
		</>
	);
}

export default ClassicToggleButton;
