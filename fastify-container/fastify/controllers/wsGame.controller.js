
export async function handleWebsocketEvents(socket, req)
{

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
