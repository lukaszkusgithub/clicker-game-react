import { useEffect, useState } from "react";
import "./GoldClicker.scss";
import { Config } from "../types/Config";
function GoldClicker() {
	const [gold, setGold] = useState(0);
	const [clickPower, setClickPower] = useState(0);
	const [clickUpgradeCost, setClickUpgradeCost] = useState(0);
	const [autoClickerCost, setAutoClickerCost] = useState(0);
	const [autoClickers, setAutoClickers] = useState(0);
	const [timeDecreaseCost, setTimeDecreaseCost] = useState(0);
	const [autoClickerTime, setAutoClickerTime] = useState(0);
	const [autoClickerPowerCost, setAutoClickerPowerCost] = useState(0);
	const [autoClickerPower, setAutoClickerPower] = useState(0);
	const [config, setConfig] = useState<Config | null>(null);

	useEffect(() => {
		fetch("/data/config.json")
			.then((response) => response.json())
			.then((config) => {
				setConfig(config);
				setGold(config.initialValues.gold);
				setClickPower(config.initialValues.clickPower);
				setClickUpgradeCost(config.initialValues.clickUpgradeCost);
				setAutoClickerCost(config.initialValues.autoClickerCost);
				setAutoClickers(config.initialValues.autoClickers);
				setAutoClickerPower(config.initialValues.autoClickPower);
				setTimeDecreaseCost(config.initialValues.timeDecreaseCost);
				setAutoClickerTime(config.initialValues.autoClickerTime);
				setAutoClickerPowerCost(
					config.initialValues.autoClickerPowerCost
				);
			})
			.catch((error) =>
				console.error(
					"Error when loading the configuration file:",
					error
				)
			);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoClickers > 0) {
				setGold(
					(prevGold) => prevGold + autoClickers * autoClickerPower
				);
			}
		}, autoClickerTime);
		return () => clearInterval(interval);
	}, [autoClickers, autoClickerTime, autoClickerPower]);

	if (config === null) {
		return <p>Loading configuration...</p>;
	}

	const autoClickerPowerCostFactor = config.autoClicker.powerCostFactor;
	const autoClickerTimeReductionCostFactor =
		config.autoClicker.timeReductionCostFactor;
	const autoClickerTimeDecreaseAmount =
		config.autoClicker.timeReductionAmount;
	const autoClickerCostFactor = config.autoClicker.costFactor;
	const autoClickerPowerAmount = config.autoClicker.powerAmount;

	const clickPowerCostFactor = config.click.costFactor;
	const clickPowerAmount = config.click.powerAmount;

	const upgradeClickPower = () => {
		if (gold >= clickUpgradeCost) {
			setGold((prevGold) => prevGold - clickUpgradeCost);
			setClickPower(
				(prevClickPower) => prevClickPower + clickPowerAmount
			);
			setClickUpgradeCost(
				(prevClickUpgradeCost) =>
					prevClickUpgradeCost * clickPowerCostFactor
			);
		}
	};

	const buyAutoClicker = () => {
		if (gold >= autoClickerCost) {
			setGold((prevGold) => prevGold - autoClickerCost);
			setAutoClickers((prevAutoClickers) => prevAutoClickers + 1);
			setAutoClickerCost(
				(prevAutoClickerCost) =>
					prevAutoClickerCost * autoClickerCostFactor
			);
		}
	};

	const decreaseAutoClickerTime = () => {
		if (gold >= timeDecreaseCost && autoClickers > 0) {
			setGold((prevGold) => prevGold - timeDecreaseCost);
			console.log(autoClickerTimeDecreaseAmount);
			setAutoClickerTime(
				(prevTime) => prevTime - autoClickerTimeDecreaseAmount
			);
			setTimeDecreaseCost(
				(prevTimeDecreaseCost) =>
					prevTimeDecreaseCost * autoClickerTimeReductionCostFactor
			);
		}
	};

	const increaseAutoClickerPower = () => {
		if (gold >= autoClickerPowerCost && autoClickers > 0) {
			setGold((prevGold) => prevGold - autoClickerPowerCost);
			setAutoClickerPowerCost(
				(prevCost) => prevCost + autoClickerPowerCostFactor
			);
			setAutoClickerPower(
				(prevPower) => prevPower + autoClickerPowerAmount
			);
		}
	};

	return (
		<div>
			<h1>Gold Clicker</h1>
			<p>Gold: {gold}</p>
			<p>Click power: {clickPower}</p>
			<p>Auto-Clickers: {autoClickers}</p>
			<p>Auto-Clickers Power: {autoClickerPower}</p>
			<p>Auto-Clickers Time: {(autoClickerTime / 1000).toFixed(2)}s</p>
			<div className="buttons-container">
				<button
					onClick={() =>
						setGold((prevGold) => prevGold + clickPower)
					}>
					Dig gold
				</button>
				<button
					disabled={gold < clickUpgradeCost}
					onClick={upgradeClickPower}>
					Upgrade click power (Cost: {clickUpgradeCost})
				</button>
				<button
					disabled={gold < autoClickerCost}
					onClick={buyAutoClicker}>
					Buy Auto-clicker (Cost: {autoClickerCost})
				</button>
				<button
					disabled={gold < timeDecreaseCost || autoClickers === 0}
					onClick={decreaseAutoClickerTime}>
					Decrease Auto-clicker Time (Cost: {timeDecreaseCost})
				</button>
				<button
					disabled={gold < autoClickerPowerCost || autoClickers === 0}
					onClick={increaseAutoClickerPower}>
					Increase Auto-clicker Power (Cost: {autoClickerPowerCost})
				</button>
			</div>
		</div>
	);
}

export default GoldClicker;
