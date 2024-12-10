import "./App.scss";
import ClassicToggleButton from "./components/ClassicToggleButton";
import GoldClicker from "./components/GoldClicker";
import PWAInstallButton from "./components/PWAInstallButton";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { ThemeProvider } from "./components/contexts/ThemeContext";

function App() {
	return (
		<>
			<ThemeProvider>
				<PWAInstallButton />
				<ClassicToggleButton />
				<GoldClicker />
				<ThemeToggleButton />
			</ThemeProvider>
		</>
	);
}

export default App;
