import { createFileRoute } from "@tanstack/react-router";
import Renderer from "@/components/docs/Renderer";
import Error from "@/components/Error";

// This route is for the loose documentation pages
export const Route = createFileRoute("/docs/$doc")({
	component: LooseDoc,
	head: ({ params }) => ({
		meta: [
			{
				title: `${params.doc}`,
			},
			{
				name: "description",
				content: `Janudocs documentation for ${params.doc}`,
			},
		],
	}),
	loader: async ({ params }) => {
		return {
			doc: params.doc,
		};
	},
	errorComponent: () => {
		return <Error />;
	},
});

function LooseDoc() {
	return <Renderer />;
}
