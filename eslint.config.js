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
			...tseslint.configs.recommended.rules,
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},

	// Konfiguracja dla React
	{
		plugins: {
			react: reactPlugin,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs["jsx-runtime"].rules,
		},
	},
];
