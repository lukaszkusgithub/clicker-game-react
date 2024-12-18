import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";
function HelloFromExpress() {
	const [fetchMessage, setFetchMessage] = useState("");

	useEffect(() => {
		const fetchMessage = async () => {
			toast.info("Loading...");
			const response = await fetch("/api/hello");
			const data = await response.text();

			setFetchMessage(data);
			toast.dismiss();
			toast.success("Loaded!");
		};

		fetchMessage();
	}, []);

	return <h1>{fetchMessage ? fetchMessage : <GridLoader size={60} />}</h1>;
}

export default HelloFromExpress;
