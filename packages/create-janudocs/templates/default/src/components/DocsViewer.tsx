import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DocsViewer() {
	const { category, doc } = useParams();
	const [content, setContent] = useState("");

	useEffect(() => {
		let mdPath = "";
		if (category) {
			mdPath = `/docs/${category}/${doc}.md`;
		} else {
			mdPath = `/docs/${doc}.md`;
		}

		fetch(mdPath)
			.then((res) => res.text())
			.then(setContent);
	}, [category, doc]);

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({ node, ...props }) => (
					<h1 className="text-4xl font-bold mb-4" {...props} />
				),
				h2: ({ node, ...props }) => (
					<h2 className="text-3xl font-semibold mt-3 mb-3" {...props} />
				),
				h3: ({ node, ...props }) => (
					<h3 className="text-2xl font-semibold mt-3 mb-3" {...props} />
				),
				p: ({ node, ...props }) => (
					<p className="mb-4 leading-relaxed text-gray-800" {...props} />
				),
				ul: ({ node, ...props }) => (
					<ul className="list-disc list-inside mb-4" {...props} />
				),
				ol: ({ node, ...props }) => (
					<ol className="list-decimal list-inside mb-4" {...props} />
				),
				li: ({ node, ...props }) => <li className="mb-2" {...props} />,
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
						{...props}
					/>
				),
				code: ({ node, inline, ...props }: any) =>
					inline ? (
						<code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
							{props.children}
						</code>
					) : (
						<pre className="bg-gray-900 text-white rounded p-4 overflow-x-auto mb-4">
							<code className="font-mono text-sm">{props.children}</code>
						</pre>
					),
				table: ({ node, ...props }) => (
					<table className="table-auto w-full border mb-4" {...props} />
				),
				th: ({ node, ...props }) => (
					<th className="border p-2 bg-gray-200 text-left" {...props} />
				),
				td: ({ node, ...props }) => <td className="border p-2" {...props} />,
				a: ({ node, ...props }) => (
					<a className="text-blue-600 underline" {...props} />
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
