import { Dispatch, SetStateAction } from "react";

export interface ThemeContextType {
	theme: string;
	setTheme: Dispatch<SetStateAction<string>>;
}

export interface ThemeProviderProps {
	children: React.ReactNode;
}
