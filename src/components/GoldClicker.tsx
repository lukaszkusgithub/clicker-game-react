import styles from "./GoldClicker.module.scss";
import { Config } from "../types/Config.type";
import { useEffect } from "react";
import { Coins, Cpu, Pickaxe, Timer } from "lucide-react";
import AnimatedValue from "./functional/AnimatedValue";
import { motion } from "framer-motion";
import { scaleOnHover } from "./utils/animations";
import useLocalStorageState from "use-local-storage-state";

function GoldClicker() {
	const [gold, setGold] = useLocalStorageState<number>("gold", {
		defaultValue: 0,
	});
	const [clickPower, setClickPower] = useLocalStorageState<number>(
		"clickPower",
		{ defaultValue: 0 }
	);
	const [clickUpgradeCost, setClickUpgradeCost] =
		useLocalStorageState<number>("clickUpgradeCost", { defaultValue: 0 });
	const [autoClickerCost, setAutoClickerCost] = useLocalStorageState<number>(
		"autoClickerCost",
		{ defaultValue: 0 }
	);
	const [autoClickers, setAutoClickers] = useLocalStorageState<number>(
		"autoClickers",
		{ defaultValue: 0 }
	);
	const [timeDecreaseCost, setTimeDecreaseCost] =
		useLocalStorageState<number>("timeDecreaseCost", { defaultValue: 0 });
	const [autoClickerTime, setAutoClickerTime] = useLocalStorageState<number>(
		"autoClickerTime",
		{ defaultValue: 0 }
	);
	const [autoClickerPowerCost, setAutoClickerPowerCost] =
		useLocalStorageState<number>("autoClickerPowerCost", {
			defaultValue: 0,
		});
	const [autoClickerPower, setAutoClickerPower] =
		useLocalStorageState<number>("autoClickerPower", { defaultValue: 0 });
	const [config, setConfig] = useLocalStorageState<Config | null>("config", {
		defaultValue: null,
	});

	useEffect(() => {
		if (
			gold === 0 &&
			clickPower === 0 &&
			clickUpgradeCost === 0 &&
			autoClickerCost === 0 &&
			autoClickers === 0 &&
			timeDecreaseCost === 0 &&
			autoClickerTime === 0 &&
			autoClickerPowerCost === 0 &&
			autoClickerPower === 0
		) {
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
		}
	}, []);

	if (config === null) {
		return <p>Loading configuration...</p>;
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoClickers > 0) {
				setGold(
					(prevGold: number) =>
						prevGold + autoClickers * autoClickerPower
				);
			}
		}, autoClickerTime);
		return () => clearInterval(interval);
	}, [autoClickers, autoClickerTime, autoClickerPower]);

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
			setGold((prevGold: number) => prevGold - clickUpgradeCost);
			setClickPower(
				(prevClickPower: number) => prevClickPower + clickPowerAmount
			);
			setClickUpgradeCost(
				(prevClickUpgradeCost: number) =>
					prevClickUpgradeCost * clickPowerCostFactor
			);
		}
	};

	const buyAutoClicker = () => {
		if (gold >= autoClickerCost) {
			setGold((prevGold: number) => prevGold - autoClickerCost);
			setAutoClickers((prevAutoClickers: number) => prevAutoClickers + 1);
			setAutoClickerCost(
				(prevAutoClickerCost: number) =>
					prevAutoClickerCost * autoClickerCostFactor
			);
		}
	};

	const decreaseAutoClickerTime = () => {
		if (gold >= timeDecreaseCost && autoClickers > 0) {
			setGold((prevGold: number) => prevGold - timeDecreaseCost);
			console.log(autoClickerTimeDecreaseAmount);
			setAutoClickerTime(
				(prevTime: number) => prevTime - autoClickerTimeDecreaseAmount
			);
			setTimeDecreaseCost(
				(prevTimeDecreaseCost: number) =>
					prevTimeDecreaseCost * autoClickerTimeReductionCostFactor
			);
		}
	};

	const increaseAutoClickerPower = () => {
		if (gold >= autoClickerPowerCost && autoClickers > 0) {
			setGold((prevGold: number) => prevGold - autoClickerPowerCost);
			setAutoClickerPowerCost(
				(prevCost: number) => prevCost + autoClickerPowerCostFactor
			);
			setAutoClickerPower(
				(prevPower: number) => prevPower + autoClickerPowerAmount
			);
		}
	};

	return (
		<div>
			<h1>Gold Clicker</h1>
			<div className={styles.textContainer}>
				<Coins className={styles.icon} />
				<p>
					Gold: <AnimatedValue value={gold} />
				</p>
			</div>
			<div className={styles.textContainer}>
				<Pickaxe className={styles.icon} />
				<p>
					Click power: <AnimatedValue value={clickPower} />
				</p>
			</div>
			<div className={styles.textContainer}>
				<Cpu className={styles.icon} />
				<p>
					Auto-Clickers: <AnimatedValue value={autoClickers} />
				</p>
			</div>
			<div className={styles.textContainer}>
				<Timer className={styles.icon} />
				<p>
					Auto-Clickers Time:{" "}
					<AnimatedValue value={autoClickerTime / 1000} />s
				</p>
			</div>
			<div className={styles.textContainer}>
				<Pickaxe className={styles.icon} />
				<p>
					Auto-Clickers Power:{" "}
					<AnimatedValue value={autoClickerPower} />
				</p>
			</div>

			<div className={styles.buttonsContainer}>
				<motion.button
					{...scaleOnHover}
					onClick={() =>
						setGold((prevGold) => prevGold + clickPower)
					}>
					<Coins className={styles.icon} /> Dig gold
				</motion.button>

				<motion.button
					{...scaleOnHover}
					disabled={gold < clickUpgradeCost}
					onClick={upgradeClickPower}>
					<Pickaxe className={styles.icon} /> Upgrade click power
					(Cost: {clickUpgradeCost})
				</motion.button>

				<motion.button
					{...scaleOnHover}
					disabled={gold < autoClickerCost}
					onClick={buyAutoClicker}>
					<Cpu className={styles.icon} />
					Buy Auto-clicker (Cost: {autoClickerCost})
				</motion.button>

				<motion.button
					{...scaleOnHover}
					disabled={gold < timeDecreaseCost || autoClickers === 0}
					onClick={decreaseAutoClickerTime}>
					<Timer className={styles.icon} />
					Decrease Auto-clicker Time (Cost: {timeDecreaseCost})
				</motion.button>

				<motion.button
					{...scaleOnHover}
					disabled={gold < autoClickerPowerCost || autoClickers === 0}
					onClick={increaseAutoClickerPower}>
					<Pickaxe className={styles.icon} />
					Increase Auto-clicker Power (Cost: {autoClickerPowerCost})
				</motion.button>
			</div>
		</div>
	);
}

export default GoldClicker;
