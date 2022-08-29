import express, { response } from "express";
import cors from "cors";

let userData = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	},
];

let tweetData = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "1",
	},
];

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", (request, response) => {
	console.log("recebi o post da rota /sign-up");
	console.log(request.body);
	userData = [...userData, request.body];
	console.log(userData);
	response.sendStatus(201);
});

server.post("/tweets", (request, response) => {
	console.log("recebi um post na rota /tweets");
	const userAvatar = userData.find(
		(item) => request.body.username === item.username
	);
	console.log(userAvatar);
	tweetData = [...tweetData, request.body];
	console.log(tweetData);
	response.sendStatus(201);
});

server.get("/tweets", (request, response) => {
	console.log("recebi um GET na rota /tweets");
	const lastArray = [];
	let quantity = tweetData.length;
	if (quantity > 10) {
		for (let i = 0; i < 10; i++) {
			let item = tweetData[quantity - i - 1];
			lastArray.push(item);
		}
	} else {
		for (let i = 0; i < quantity; i++) {
			lastArray.push(tweetData[i]);
		}
		lastArray.reverse();
	}

	response.send(lastArray);
});

server.listen(5000, console.log("Listening to port 5000.."));
