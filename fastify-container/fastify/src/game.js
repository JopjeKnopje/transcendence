import {Application, Assets, Sprite, Graphics} from "pixi.js";
import * as network from "/src/network.js";
import * as game from "/src/gamestate.js";
import * as appdata from "/src/appinfo.js";
import * as input from "/src/input.js";


(async () =>
{
	// INIT
    const app = new Application();
    await app.init({ background: appdata.BG_COLOR, width: appdata.WIDTH, height: appdata.HEIGHT });
	const moveSpeed = 2;
	document.body.appendChild(app.canvas);
	let player = game.addPlayer(1, {x: appdata.WIDTH/2, y: appdata.HEIGHT/2});

	// LOOP
    app.ticker.add((time) =>
    {
		if (input.keyIsPressed['KeyW']) player.y -= moveSpeed * time.deltaTime;
		if (input.keyIsPressed['KeyS']) player.y += moveSpeed * time.deltaTime;
		if (input.keyIsPressed['KeyA']) player.x -= moveSpeed * time.deltaTime;
		if (input.keyIsPressed['KeyD']) player.x += moveSpeed * time.deltaTime;
		//network.sendWebSocketData({type: "move", position: {x: skelly.x, y: skelly.y}});
    });

	app.stage.addChild(player);
})();

