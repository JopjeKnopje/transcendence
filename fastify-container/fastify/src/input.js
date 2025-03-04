export let keyIsPressed = {};
// FUNCTIONS
window.addEventListener('keydown', (event) => {
	// console.log(`Key down: ${event.code}`);
	keyIsPressed[event.code] = true;
});
window.addEventListener('keyup', (event) => {
	// console.log(`Key up: ${event.code}`);
	keyIsPressed[event.code] = false;
})
