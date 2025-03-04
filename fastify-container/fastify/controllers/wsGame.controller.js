let clients = new Map();

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
	const playerId = generateRandomPlayer();
	console.log("New connection!, playerId: ", playerId);
	client.send(JSON.stringify("Jo from server!"));
	// Send the "init" message to client
	// Send the newly created playerId an Position to client and assign ot localplayer
	// Send all the other players to client, client spawns all players but itself

};

