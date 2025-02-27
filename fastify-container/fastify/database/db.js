import fp from "fastify-plugin";
import Database from "better-sqlite3";
import fs from "fs";
import path from "node:path";

const databasePath = path.join(import.meta.dirname, "/data.db");

async function dbConnector(fastify, options)
{
	if (fs.existsSync(databasePath))
	{
		console.log("dbConnector: trying to create the database but it already exists");
		return;
	}
	const dbFile = "./database/data.db";
	const db = new Database(dbFile, { verbose: console.log });

	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			password TEXT NOT NULL
		);
		`);

	fastify.decorate("db", db);

	fastify.addHook("onClose", (fastify, done) => {
		db.close();
		done();
	});

	console.log("Database and posts table created succesfully");

};

export default fp(dbConnector);
