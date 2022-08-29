import express, { response } from "express";
import cors from "cors";

let userData = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	},
	{
		username: "naruto",
		avatar:
			"https://i.pinimg.com/736x/74/45/6c/74456c2bd47666329b9dee5dcad4ece7.jpg",
	},
];

let tweetData = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o HUB",
	},
	{
		username: "naruto",
		avatar:
			"https://i.pinimg.com/736x/74/45/6c/74456c2bd47666329b9dee5dcad4ece7.jpg",
		tweet: "Jutsu Clone das Sombras",
	},
];

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", (request, response) => {
	const { username, avatar } = request.body;
	if (!username || !avatar) {
		return response.status(400).send("Todos os campos são obrigatórios!");
	}
	userData = [
		...userData,
		{
			username,
			avatar,
		},
	];
	response.sendStatus(201);
});

server.post("/tweets", (request, response) => {
	const { username, tweet } = request.body;
	if (!username || !tweet) {
		return response.status(400).send("Todos os campos são obrigatórios!");
	}
	const userInfo = userData.find((item) => item.username === username);
	const userAvatar = userInfo.avatar;
	tweetData = [
		...tweetData,
		{
			username,
			avatar: userAvatar,
			tweet,
		},
	];
	response.sendStatus(201);
});

server.get("/tweets", (request, response) => {
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
