import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
	beforeLoad: () => {
		throw redirect({
			to: "/docs/$category/$doc",
			params: { category: "getting-started", doc: "installation" },
		});
	},
});
