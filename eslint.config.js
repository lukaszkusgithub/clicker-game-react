import { Linter } from "eslint";
import tseslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

/** @type {Linter.FlatConfig[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: 2020,
				sourceType: "module",
			},
		},
	},

	{
		plugins: {
			"@typescript-eslint": tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules, // Typowe zasady TypeScript z weryfikacją typów
			"@typescript-eslint/explicit-module-boundary-types": "off", // Wyłączamy regułę dotyczącą typów w metodach
			"@typescript-eslint/no-explicit-any": "warn", // Ostrzeżenie dla `any`
		},
	},

	// Konfiguracja dla React
	{
		plugins: {
			react: reactPlugin,
		},
		settings: {
			react: {
				version: "detect", // Automatycznie wykrywa wersję Reacta
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules, // Zalecane reguły dla Reacta
			...reactPlugin.configs["jsx-runtime"].rules, // Obsługuje JSX Runtime (React 17+)
		},
	},
];
