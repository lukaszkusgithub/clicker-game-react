import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
	readonly platform: string;
	readonly userChoice: Promise<{ outcome: string; platform: string }>;
	prompt(): Promise<{ outcome: string; platform: string }>;
}

function PWAInstallButton() {
	const [showInstallButton, setShowInstallButton] = useState(false);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);

	useEffect(() => {
		const handleBeforeInstallPrompt = (event: Event) => {
			const beforeInstallEvent = event as BeforeInstallPromptEvent;
			beforeInstallEvent.preventDefault();
			setDeferredPrompt(beforeInstallEvent);
			setShowInstallButton(true);
		};
		window.addEventListener(
			"beforeinstallprompt",
			handleBeforeInstallPrompt
		);
		return () =>
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
	}, []);

	const handleInstallClick = async () => {
		if (deferredPrompt) {
			const userChoice = await deferredPrompt.prompt();

			if (userChoice.outcome === "accepted") {
				setDeferredPrompt(null);
				setShowInstallButton(false);
			}
		}
	};

	return showInstallButton ? (
		<button onClick={handleInstallClick}>Install PWA app</button>
	) : null;
}

export default PWAInstallButton;
