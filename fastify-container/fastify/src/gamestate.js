import {Graphics} from "pixi.js";

const socket = new WebSocket("ws://localhost:8000/ws");
//export let state = {
//	players: {},
//};

class GameState {
	constructor()
	{
		if (!GameState.instance)
		{
			this.players = {};
			this.localPlayerId = "";
			this.localPlayer = null;
			this.initialized = false;
			GameState.instance = this;
		}
		return GameState.instance;
	}

	setLocalPlayer(id, position)
	{
		const player = new Graphics();
		player.circle(0, 0, 10);
		player.fill(0x00ff00);
		player.x = position.x;
		player.y = position.y;
		this.localPlayerId = id;
		this.localPlayer = player;
		this.initialized = true;
		console.log(this.initialized);
	}

	getLocalPlayer()
	{
		return this.localPlayer;
	}

	updatePlayers(players)
	{
		this.players = players;
	}

	addPlayer(id, position)
	{
		const player = new Graphics();
		player.circle(0, 0, 10);
		player.fill(0xff0000);
		player.x = position.x;
		player.y = position.y;
		this.players[id] = player;
		return player;
	}

	isInitialized()
	{
		if (this.initialized)
		{
			return true;
		}
		return false;
	}
};

let gameState = new GameState();
//Object.freeze(instance);
export {gameState};

//function addPlayer(id, position)
//{
//	console.log(`New player ${id} connected at (${position.x}, ${position.y})`);
//	const player = new Graphics();
//	player.circle(0, 0, 10);
//	player.fill(0xff0000);
//	player.x = position.x;
//	player.y = position.y;
//	state.players[id] = player;
//	return player;
//}

//function removePlayer(id, app)
//{
//	console.log(`Removing player ${id}`);
//	if (players[id])
//	{
//		delete players[id];
//		app.stage.removeChild(players[id]);
//	}
//}

export function sendToServer(data)
{
	if (socket.readyState == WebSocket.OPEN)
	{
		socket.send(JSON.stringify(data));
	}
}

socket.onopen = () => {
	console.log("Websocket connection opened.");
};

socket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log("Message from server: ", data);
	if (data.type == "init")
	{
		Object.entries(data.gameState.players).forEach(([id, position]) => {
			let otherPlayer = gameState.addPlayer(id, position);
		});
		gameState.setLocalPlayer(data.player.id, data.player.position);
		console.log("isInitialized? ", gameState.isInitialized());
	}
};

socket.onerror = (event) => {
	console.log("Websocket error: ", event);
};

socket.close = (event) => {
	console.log("Websocket closed: ", event);
};

