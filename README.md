
# Clicker Game - React + TypeScript + Vite

This project is a simple idle clicker game called "Clicker", built using **React**, **TypeScript**, and **Vite**. The game features various mechanics such as click power upgrades, auto-clickers, and time reductions for auto-clickers.

## Features

- **Clicking for Gold**: Click the button to earn gold based on your click power.
- **Upgrading Click Power**: Spend gold to upgrade your click power and earn more gold per click.
- **Buying Auto-clickers**: Automatically earn gold over time by purchasing auto-clickers.
- **Decreasing Auto-clicker Time**: Reduce the time delay between auto-clicker actions for faster gold production.
- **Increasing Auto-clicker Power**: Increase the efficiency of auto-clickers for more gold per interval.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Static typing to ensure type safety across the app.
- **Vite**: A modern build tool for fast development and optimized production builds.
- **SCSS**: For styling the components.
- **ESLint**: Linter to ensure code quality and maintain consistent styling across the project.

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/lukaszkusgithub/clicker-game-react
cd clicker-game-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Configuration

The game uses a `config.json` file to manage initial values, clicker mechanics, and cost factors. The configuration file is fetched at runtime and applied to the game.

Here's an example of the `config.json` format:

```json
{
	"autoClicker": {
		"powerCostFactor": 10,
		"timeReductionCostFactor": 10,
		"timeReductionAmount": 10,
		"costFactor": 10,
		"powerAmount": 1
	},
	"click": {
		"costFactor": 10,
		"powerAmount": 1
	},
	"initialValues": {
		"gold": 50,
		"clickPower": 1,
		"autoClickPower": 1,
		"clickUpgradeCost": 10,
		"autoClickerCost": 10,
		"autoClickers": 0,
		"timeDecreaseCost": 10,
		"autoClickerTime": 1000,
		"autoClickerPowerCost": 10
	}
}
```

The game mechanics can be adjusted by editing this configuration.

## ESLint Configuration

This project uses ESLint for code quality and linting. You can expand the ESLint configuration for type-aware linting by following these steps:

1. Update the `parserOptions` property to include your TypeScript configuration files:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
3. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and configure it in your ESLint setup:

```js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Contributing

Feel free to fork this repository and submit pull requests. If you'd like to contribute, make sure to follow the code style and ensure tests pass.

## License

This project is open-source and available under the MIT License.
