import {getRoot, getHello} from "../controllers/controllers.js";
// import {handleWebsocketEvents} from "../controllers/wsGame.controller.js";

export default async function routes (fastify, options) {
	fastify.get('/', getRoot);
	fastify.get('/hello', getHello);
	fastify.get('/ws', handleWebsocketEvents);
};

