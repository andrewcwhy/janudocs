import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
	head: () => ({
		meta: [
			{
				title: "About",
			},
			{
				name: "description",
				content: "",
			},
		],
	}),
});

function About() {
	return (
		<>
			<header>
				<h1>About</h1>
				<p></p>
			</header>
		</>
	);
}
