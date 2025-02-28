export async function getRoot(request, reply)
{
	return reply.view("game", {title: "Game"});
};
