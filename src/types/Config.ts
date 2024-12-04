export interface Config {
	autoClicker: {
		powerCostFactor: number;
		timeReductionCostFactor: number;
		timeReductionAmount: number;
		costFactor: number;
		powerAmount: number;
	};
	click: {
		costFactor: number;
		powerAmount: number;
	};
	initialValues: {
		gold: number;
		clickPower: number;
		autoClickPower: number;
		clickUpgradeCost: number;
		autoClickerCost: number;
		autoClickers: number;
		timeDecreaseCost: number;
		autoClickerTime: number;
		autoClickerPowerCost: number;
	};
}
