export async function getDashboard(request, reply)
{
	return reply.view("dashboard", {title: "Dashboard"});
};
