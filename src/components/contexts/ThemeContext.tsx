import { createContext, useEffect, useState } from "react";
import {
	ThemeContextType,
	ThemeProviderProps,
} from "../../types/ThemeContext.type";

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	setTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [theme, setTheme] = useState("dark");

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
