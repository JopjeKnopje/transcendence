export async function getLogin(request, reply)
{
	return reply.view("login", {title: "Login"});
};
