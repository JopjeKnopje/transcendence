import {Application, Assets, Sprite} from "pixi.js";

function move(key)
{
	if (key.keyCode == 87 || key.keyCode == 38)
	{


	}

}

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load the bunny texture
    const texture = await Assets.load('public/skelly.png');

    // Create a bunny Sprite
    const bunny = new Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *
        bunny.rotation += 0.1 * time.deltaTime;
    });

	document.addEventListener('keydown', onKeyDown);

})();

//import * as PIXI from "pixi.js";
//
//// Create a PixiJS Application
//const app = new PIXI.Application({
//  width: 800,
//  height: 600,
//  backgroundColor: 0x1099bb, // Light blue
//});
//
//// Append the view (canvas) to the body
//document.body.appendChild(app.view);
//
//// Create a simple PixiJS sprite (Example)
//const sprite = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
//sprite.anchor.set(0.5);
//sprite.x = app.screen.width / 2;
//sprite.y = app.screen.height / 2;
//
//// Add sprite to the stage
//app.stage.addChild(sprite);
