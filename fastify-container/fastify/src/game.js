import {Application, Assets, Sprite, Graphics} from "pixi.js";
import * as game from "/src/gamestate.js";
import * as appdata from "/src/appinfo.js";
import * as input from "/src/input.js";
import {sendToServer, gameState} from "/src/gamestate.js";
let localPlayerIsInitialized = false;

(async () =>
{
	// INIT
    const app = new Application();
    await app.init({ background: appdata.BG_COLOR, width: appdata.WIDTH, height: appdata.HEIGHT });
	const moveSpeed = 2;
	document.body.appendChild(app.canvas);
	let localPlayer = null;

	// LOOP
    app.ticker.add((time) =>
    {
		//console.log("isGameStateInitialized: ", gameState.isInitialized);
		if (gameState.isInitialized() && !localPlayerIsInitialized)
		{
			localPlayer = gameState.getLocalPlayer();
			app.stage.addChild(localPlayer);
			localPlayerIsInitialized = true;
		}
		else
		{
			if (input.keyIsPressed['KeyW']) localPlayer.y -= moveSpeed * time.deltaTime;
			if (input.keyIsPressed['KeyS']) localPlayer.y += moveSpeed * time.deltaTime;
			if (input.keyIsPressed['KeyA']) localPlayer.x -= moveSpeed * time.deltaTime;
			if (input.keyIsPressed['KeyD']) localPlayer.x += moveSpeed * time.deltaTime;
		}
		//network.sendToServer({type: "move", position: {x: skelly.x, y: skelly.y}});
    });
})();

