import {getRoot} from "../controllers/controllers.js";

async function routes (fastify, options) {
	fastify.get('/', getRoot);
};

export default routes;
