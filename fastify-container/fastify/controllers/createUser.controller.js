export function createNewUser(request, reply) 
{
	const { username, password } = request.body;
	const { db } = request.server;
	console.log("username" + username);
	console.log("password" + password);
	const insertStatement = db.prepare(
		"INSERT INTO users (username, password) VALUES (?, ?)"
	);
	insertStatement.run(username, password);
	return "New user: " + username + " password: " + password;
}
