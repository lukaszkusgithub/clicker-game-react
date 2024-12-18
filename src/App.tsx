import "./App.scss";
import ClassicToggleButton from "./components/ClassicToggleButton";
import GoldClicker from "./components/GoldClicker";
import PWAInstallButton from "./components/PWAInstallButton";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<ThemeProvider>
				<ToastContainer />
				<PWAInstallButton />
				<ClassicToggleButton />
				<GoldClicker />
				<ThemeToggleButton />
			</ThemeProvider>
		</>
	);
}

export default App;
