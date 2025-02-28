export async function getRoot(request, reply)
{
	return reply.view("game", {title: "Game"});
};

export async function getHello(request, reply)
{
	reply.send({message: 'Hello Fastify'});
};
