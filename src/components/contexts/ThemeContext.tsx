import { createContext, useEffect } from "react";
import {
	ThemeContextType,
	ThemeProviderProps,
} from "../../types/ThemeContext.type";
import useLocalStorageState from "use-local-storage-state";

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	setTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [theme, setTheme] = useLocalStorageState("theme", {
		defaultValue: "dark",
	});

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
