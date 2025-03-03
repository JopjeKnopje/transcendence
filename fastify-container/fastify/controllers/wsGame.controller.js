
const connectedClients = new Set();
const players = new Set();

export async function handleWebsocketEvents(socket, req)
{
	fastify.websocketServer.on("connection", (client) => {
		connectedClients.add(client);
	});

	const playerId = Math.random().toString(36).substr(2, 9);
	players[playerId] = {x: Math.random() * 800, y: Math.random() * 600};
	socket.send(JSON.stringify({ type: "init", players}));
	broadcast({ type: "newPlayer", id: playerId, position: players[playerId]});

	socket.on('message', message => {
		const data = JSON.parse(message);
		if (data.type == "move")
		{
			players[playerId] = data.position;
			broadcast({ type: "update", id: playerId, position: players[playerId]});
		}
	});

	//Disconnection
	socket.on("close", () => {
		delete players[playerId];
		broadcast({ type: "removePlayer", id: playerId });
	});
};

function broadcast(message)
{
	connectedClients.forEach((client) => {
		if (client.readyState == 1)
		{
			client.send(JSON.stringify(message));
		}
	});
}
