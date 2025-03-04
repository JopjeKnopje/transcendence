import {getRoot, getHello} from "../controllers/controllers.js";
 import {handleWebsocketEvents} from "../controllers/wsGame.controller.js";

export default async function routes (fastify, options) {
	fastify.get('/', getRoot);
	fastify.get('/hello', getHello);
	fastify.get('/ws', {websocket: true}, handleWebsocketEvents);
	//fastify.get('/ws', { websocket: true }, (connection, request) => {
	//	console.log("OK");
	//});
};

