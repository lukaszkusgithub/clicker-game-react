import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

console.log(`Server is running on port ${PORT}`);

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
