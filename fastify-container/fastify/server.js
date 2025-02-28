import Fastify from 'fastify';
import routes from "./routes/routes.js"

// view & EJS stuff
import path from "node:path";
import fastifyView from "@fastify/view";
import ejs from "ejs";
const __dirname = import.meta.dirname;

// Static stuff
import fastifyStatic from "@fastify/static";

// Database
//import dbConnector from "./database/db.js";

const fastify = Fastify({
	logger: true
});

const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

// Registering routes from routes.js
fastify.register(routes);

fastify.register(fastifyView, {
	engine: {
		ejs,
	},
	root: path.join(__dirname, "views"),
	viewExt: "ejs",
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, "public"),
	prefix: "/public/",
});

//fastify.register(dbConnector);

fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
	if (err)
	{
		console.error(err)
		process.exit(1)
	}
  console.log(`Server listening at ${address}`)
});
