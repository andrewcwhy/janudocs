import { createFileRoute, Link } from "@tanstack/react-router";

import { useJanudocsContext } from "@/core/useJanudocsContext";
import { FaMarkdown, FaReact, FaRust } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import type { IconType } from "react-icons";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		title: "Janudocs",
		meta: [
			{
				name: "description",
				content: "",
			},
		],
	}),
});

function App() {
	const { siteConfig } = useJanudocsContext();

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
			<header className="px-6 py-20 text-center">
				<h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
					{siteConfig.metaData.title}
				</h1>
				<p className="text-xl max-w-2xl mx-auto text-gray-300">
					A documentation framework.
					<br />
					Powered by TypeScript React and TanStack Router.
				</p>
				<div className="mt-8">
					<Link
						to="/docs"
						className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition"
					>
						Get Started
					</Link>
				</div>
			</header>

			<section className="px-6 py-12 bg-slate-800 text-gray-200">
				<div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
					<FeatureCard
						title="Markdown & MDX"
						description="Write in Markdown or MDX."
						icon={FaMarkdown}
					/>
					<FeatureCard
						title="React"
						description="Built with modern React components and designed to be flexible."
						icon={FaReact}
					/>
					<FeatureCard
						title="TanStack Router"
						description="Advanced routing, layouts, loaders, and performance with TanStack Router."
					/>
					<FeatureCard
						title="TypeScript & ESM"
						description="Written in TypeScript from the core, for safety and performance."
						icon={SiTypescript}
					/>						
					<FeatureCard 
						title="Rust"
						description="Fast and efficient, with a focus on performance."
						icon={FaRust}
					/>
				</div>
			</section>

			<section className="px-6 py-16 bg-slate-900 text-center text-gray-300">
				<h2 className="text-3xl font-semibold mb-4">Why Janudocs?</h2>
				<p className="max-w-3xl mx-auto text-lg">Because why not?</p>
			</section>
		</main>
	);
}

function FeatureCard({
	icon: Icon,
	title,
	description,
}: {
	icon?: IconType;
	title: string;
	description: string;
}) {
	return (
		<section className="bg-slate-700/30 p-6 rounded-xl border border-slate-600 hover:border-amber-500 transition duration-300 shadow-md">
			{Icon && <Icon size={32} />}
			<h3 className="text-lg font-semibold text-amber-400 mb-2">{title}</h3>
			<p className="text-sm text-gray-300">{description}</p>
		</section>
	);
}
