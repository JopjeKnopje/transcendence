import {getRoot, getHello} from "../controllers/controllers.js";

export default async function routes (fastify, options) {
	fastify.get('/', getRoot);
	fastify.get('/hello', getHello);
	fastify.get('/hello-ws', {websocket: true}, (socket, req) => {
		socket.on('message', message => {
			socket.send('Hello Fastify Websockets');
		});
	});
	fastify.get('/*', {websocket: true}, (socket, req) => {
		socket.on('message', message => {
			socket.send('Hello Fastify Websockets');
		});
	});
};
