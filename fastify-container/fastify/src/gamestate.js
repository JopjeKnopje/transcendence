import {Graphics} from "pixi.js";

export let state = {
	players: {},
};

export function addPlayer(id, position)
{
	console.log(`New player ${id} connected at (${position.x}, ${position.y})`);
	const player = new Graphics();
	player.beginFill(0xff0000);
	player.circle(0, 0, 10);
	player.endFill();
	player.x = position.x;
	player.y = position.y;
	state.players[id] = player;
	return player;
}

export function removePlayer(id, app)
{
	console.log(`Removing player ${id}`);
	if (players[id])
	{
		delete players[id];
		app.stage.removeChild(players[id]);
	}
}
