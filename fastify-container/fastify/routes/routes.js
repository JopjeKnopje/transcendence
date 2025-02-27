import {getRoot, getLogin} from "../controllers/controllers.js";
import {createNewUser} from "../controllers/createUser.controller.js";

async function routes (fastify, options) {
	fastify.get('/', getRoot);
	fastify.get('/login', getLogin);

	fastify.register(async function (postRoutes) {
		postRoutes.post("/", createNewUser);},
		{prefix: "/post"}
	);
};

export default routes;
