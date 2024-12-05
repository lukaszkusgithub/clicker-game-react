import "./App.scss";
import ClassicToggleButton from "./components/ClassicToggleButton";
import GoldClicker from "./components/GoldClicker";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { ThemeProvider } from "./components/contexts/ThemeContext";

function App() {
	return (
		<>
			<ThemeProvider>
				<ClassicToggleButton />
				<GoldClicker />
				<ThemeToggleButton />
			</ThemeProvider>
		</>
	);
}

export default App;
