import { useState } from "react";
function GoldClicker() {
	const [gold, setGold] = useState(0);
	const [clickPower, setClickPower] = useState(1);
	const [clickUpgradeCost, setClickUpgradeCost] = useState(10);

	const upgradeClickPower = () => {
		if (gold >= clickUpgradeCost) {
			setGold(gold - clickUpgradeCost);
			setClickPower(clickPower + 1);
			setClickUpgradeCost(clickUpgradeCost * 2);
		}
	};

	return (
		<div>
			<h1>Gold Clicker</h1>
			<p>Gold: {gold}</p>
			<p>Click power: {clickPower}</p>
			<button onClick={() => setGold(gold + clickPower)}>Dig gold</button>
			<button
				disabled={gold < clickUpgradeCost}
				onClick={upgradeClickPower}>
				Upgrade click power (Cost: {clickUpgradeCost})
			</button>
		</div>
	);
}

export default GoldClicker;
