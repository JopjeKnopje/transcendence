export async function getRoot(request, reply)
{
	const { db } = request.server;
	const users = db.prepare("SELECT * FROM users").all();
	return reply.view("index", {title: "Home", users});
};

export async function getLogin(request, reply)
{
	return reply.view("layout", {title: "Login"});
};

export async function loginUser(request, reply)
{
	//return reply.view("layout", {title: "Login"});
};
