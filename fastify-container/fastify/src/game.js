import {Application, Assets, Sprite, Graphics} from "pixi.js";

const KEY = {
	W: 87,
	S: 83,
	A: 65,
	D: 68
};

let players = {};
let keys = {};

const socket = new WebSocket("ws://localhost:8000/ws");

socket.onopen = () => {
	console.log("Websocket connection opened.");
};

function sendWebSocketData(data) 
{
	if (socket.readyState == WebSocket.OPEN)
	{
		socket.send(JSON.stringify(data));
	}
}

(async () =>
{
	// FUNCTIONS
	window.addEventListener('keydown', (event) => {
		// console.log(`Key down: ${event.code}`);
		keys[event.code] = true;
	});
	window.addEventListener('keyup', (event) => {
		// console.log(`Key up: ${event.code}`);
		keys[event.code] = false;
	})

	function addPlayer(id, position)
	{
		console.log(`New player ${id} connected at ${position}`);
		const player = new Graphics();
		player.beginFill(0xff0000);
		player.circle(0, 0, 10);
		player.endFill();
		player.x = position.x;
		player.y = position.y;
		players[id] = player;
		app.stage.addChild(player);
	}

	function removePlayer(id)
	{
		console.log(`Removing player ${id}`);
		if (players[id])
		{
			delete players[id];
			app.stage.removeChild(players[id]);
		}
	}

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type == "init")
		{
			Object.entries(data.players).forEach(([id, position]) => addPlayer(id, position));
		}
		else if (data.type == "newPlayer")
		{
			addPlayer(data.id, data.position);
		}
		else if (data.type == "update")
		{
			// console.log(`updating player ${players[data.id]}`);
			if (players[data.id])
			{
				players[data.id].x = data.position.x;
				players[data.id].y = data.position.y;
			}
		}
		else if (data.type == "removePlayer")
		{
			removePlayer(data.id);
		}
	};



	// INIT
    const app = new Application();
    await app.init({ background: '#01010101', width: 800, height: 600 });
	document.body.appendChild(app.canvas);


	// RESOURCES
    const texture = await Assets.load('public/skelly.png');
    const skelly = new Sprite(texture);
    skelly.anchor.set(0.5);
    skelly.x = Math.floor(Math.random() * app.screen.width);
    skelly.y = Math.floor(Math.random() * app.screen.height);

	// LOOP
    app.ticker.add((time) =>
    {
		const moveSpeed = 2;
		if (keys['KeyW']) skelly.y -= moveSpeed * time.deltaTime;
		if (keys['KeyS']) skelly.y += moveSpeed * time.deltaTime;
		if (keys['KeyA']) skelly.x -= moveSpeed * time.deltaTime;
		if (keys['KeyD']) skelly.x += moveSpeed * time.deltaTime;
		sendWebSocketData({type: "move", position: {x: skelly.x, y: skelly.y}});
    });

	app.stage.addChild(skelly);
})();

