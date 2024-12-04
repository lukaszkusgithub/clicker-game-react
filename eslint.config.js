import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true, // Włącz JSX
				},
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			"react/react-in-jsx-scope": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
