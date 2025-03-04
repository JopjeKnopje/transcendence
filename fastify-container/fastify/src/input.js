export let keys = {};
// FUNCTIONS
window.addEventListener('keydown', (event) => {
	// console.log(`Key down: ${event.code}`);
	keys[event.code] = true;
});
window.addEventListener('keyup', (event) => {
	// console.log(`Key up: ${event.code}`);
	keys[event.code] = false;
})
