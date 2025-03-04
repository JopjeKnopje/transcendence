let clients = new Set();

let gameState = {
	players: {},
}

function generateRandomPlayer()
{
	return {
		id: (Math.random() * 100).toString(32).substr(3, 8),
		position: {
			x: Math.floor(Math.random() * 800),
			y: Math.floor(Math.random() * 600)
		}
	};
}

function broadcast(message)
{
	clients.forEach((client) => {
		if (client.readyState == 1)
		{
			client.send(JSON.stringify(message));
		}
	});
}

export async function handleWebsocketEvents(client, req)
{
	// Generate playerId and generate random spawn position
	const player = generateRandomPlayer();
	console.log("New connection: ", player);
	// Add new player to gamestate object and clients Set
	gameState.players[player.id] = player.position;
	clients.add(client);

	// Initialize player and players for newly connected client
	client.send(JSON.stringify({type: "init", player, gameState}));

	client.on('message', message => {
		const data = JSON.parse(message);
		console.log("Server received: ", data); 

		//if (data.type == "move")
		//{
		//	gameState.players[data.id].position = data.position;
		//	broadcast(data);
		//}
	});

	client.on('close', message => {
		const data = JSON.parse(message);
		console.log("Client closed: ", data); 
		clients.delete(client);
		delete gameState.players[player.id];
	});

};

