import {Graphics} from "pixi.js";
import {pixiStage} from "/src/game.js";

const socket = new WebSocket("ws://localhost:8000/ws");

class GameState 
{
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

	getLocalPlayerID()
	{
		return this.localPlayerId;
	}

	updatePlayers(players)
	{
		this.players = players;
	}
	updatePlayer(id, position)
	{
		this.players[id] = position;
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
		gameState.setLocalPlayer(data.player.id, data.player.position);
		pixiStage.addChild(gameState.getLocalPlayer());

		Object.entries(data.gameState.players).forEach(([id, position]) => {
			if (gameState.getLocalPlayerID() !== id)
			{
				let otherPlayer = gameState.addPlayer(id, position);
				pixiStage.addChild(otherPlayer);
			}
		});
	}
	//if (data.type == "move")
	//{
	//	gameState.updatePlayer(data.id, data.position);
	//}
};

socket.onerror = (event) => {
	console.log("Websocket error: ", event);
};

socket.close = (event) => {
	console.log("Websocket closed: ", event);
};

