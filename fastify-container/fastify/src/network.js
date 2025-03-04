//import {localPlayer} from "/src/game.js";
//import * as game from "/src/gamestate.js";
//const socket = new WebSocket("ws://localhost:8000/ws");

//socket.onopen = () => {
//	console.log("Websocket connection opened.");
//};
//
//socket.onmessage = (event) => {
//	const data = JSON.parse(event.data);
//	console.log("Message from server: ", data);
//	if (data.type == "init")
//	{
//		Object.entries(data.gameState.players).forEach(([id, position]) => addPlayer(id, position));
//		localPlayer = game.addPlayer(data.id, data.position);
//	}
//};
//
//socket.onerror = (event) => {
//	console.log("Websocket error: ", event);
//};
//
//socket.close = (event) => {
//	console.log("Websocket closed: ", event);
//};
//
//export function sendToServer(data)
//{
//	if (socket.readyState == WebSocket.OPEN)
//	{
//		socket.send(JSON.stringify(data));
//	}
//}
