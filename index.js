import express, { response } from "express";

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
		tweet: "1",
	},
	{
		username: "bobesponja",
		tweet: "2",
	},
	{
		username: "bobesponja",
		tweet: "3",
	},
	{
		username: "bobesponja",
		tweet: "4",
	},
	{
		username: "bobesponja",
		tweet: "5",
	},
	{
		username: "bobesponja",
		tweet: "6",
	},
	{
		username: "bobesponja",
		tweet: "7",
	},
	{
		username: "bobesponja",
		tweet: "8",
	},
	{
		username: "bobesponja",
		tweet: "9",
	},
	{
		username: "bobesponja",
		tweet: "10",
	},
];

const server = express();
server.use(express.json());

server.post("/sign-up", (request, response) => {
	console.log("recebi o post da rota /sign-up");
	console.log(request.body);
	userData = [...userData, request.body];
	console.log(userData);
	response.status(201).send("OK");
});

server.post("/tweets", (request, response) => {
	console.log("recebi um post na rota /tweets");
	tweetData = [...tweetData, request.body];
	console.log(tweetData);
	response.status(201).send("OK");
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
