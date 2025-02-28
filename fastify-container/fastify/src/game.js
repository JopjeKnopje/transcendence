import {Application, Assets, Sprite} from "pixi.js";

const KEY = {
	W: 87,
	S: 83,
	A: 65,
	D: 68
};


(async () =>
{
	let keys = {};
	window.addEventListener('keydown', (event) => {
		console.log(`Key down: ${event.code}`);
		keys[event.code] = true;
	});
	window.addEventListener('keyup', (event) => {
		console.log(`Key up: ${event.code}`);
		keys[event.code] = false;
	})

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
    });

	app.stage.addChild(skelly);
})();

