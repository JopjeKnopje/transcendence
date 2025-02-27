export async function getRoot(request, reply)
{
	// const { db } = request.server;
	// const users = db.prepare("SELECT * FROM users").all();
	// console.log("users: " + users);
	// return reply.view("index", {title: "Home", users});
	return ("Root");
};
