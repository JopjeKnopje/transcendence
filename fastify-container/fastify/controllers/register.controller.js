export async function getRegister(request, reply)
{
	return reply.view("register", {title: "Register"});
};
