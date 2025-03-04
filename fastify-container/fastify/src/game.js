import {Application, Assets, Sprite, Graphics} from "pixi.js";
import {keys} from "/src/input.js";
import * as network from "/src/network.js";

// Globals
let gameState = {
	players: {},
};

const WIDTH = 800;
const HEIGHT = 600;
const BG_COLOR = '#01010101';

function addPlayer(id, position)
{
	console.log(`New player ${id} connected at ${position}`);
	const player = new Graphics();
	player.beginFill(0xff0000);
	player.circle(0, 0, 10);
	player.endFill();
	player.x = position.x;
	player.y = position.y;
	gameState.players[id] = player;
	return player;
}

function removePlayer(id, app)
{
	console.log(`Removing player ${id}`);
	if (players[id])
	{
		delete players[id];
		app.stage.removeChild(players[id]);
	}
}

(async () =>
{

	// INIT
    const app = new Application();
    await app.init({ background: BG_COLOR, width: WIDTH, height: HEIGHT });
	document.body.appendChild(app.canvas);
	let player = addPlayer(1, {x: WIDTH/2, y: HEIGHT/2});

	// LOOP
    app.ticker.add((time) =>
    {
		const moveSpeed = 2;
		if (keys['KeyW']) player.y -= moveSpeed * time.deltaTime;
		if (keys['KeyS']) player.y += moveSpeed * time.deltaTime;
		if (keys['KeyA']) player.x -= moveSpeed * time.deltaTime;
		if (keys['KeyD']) player.x += moveSpeed * time.deltaTime;
		//network.sendWebSocketData({type: "move", position: {x: skelly.x, y: skelly.y}});
    });

	app.stage.addChild(player);
})();

