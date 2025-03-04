const socket = new WebSocket("ws://localhost:8000/ws");

socket.onopen = () => {
	console.log("Websocket connection opened.");
};

socket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log("Message from server: ", data);
	if (data.type == "init")
	{
		Object.entries(data.players).forEach(([id, position]) => addPlayer(id, position));
	}
};

export function sendWebsocketData(data)
{
	if (socket.readyState == WebSocket.OPEN)
	{
		socket.send(JSON.stringify(data));
	}
}
