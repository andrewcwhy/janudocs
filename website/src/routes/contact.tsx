import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
	component: Contact,
	head: () => ({
		meta: [
			{
				title: "Contact",
			},
			{
				name: "description",
				content: "",
			},
		],
	}),
});

function Contact() {
	return (
		<>
			<header>
				<h1 className="text-3xl font-bold">Contact</h1>
				<p>Get in touch with us.</p>
			</header>
		</>
	);
}
