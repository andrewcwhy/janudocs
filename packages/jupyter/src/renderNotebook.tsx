import type { Notebook } from "./types";
import React from "react";

export function renderNotebook({ notebook }: { notebook: Notebook }) {
	return (
		<div className="notebook prose max-w-none">
			{notebook.cells.map((cell, i) => {
				if (cell.cell_type === "markdown") {
					const html = Array.isArray(cell.source)
						? cell.source.join("")
						: cell.source;
					return (
						<div
							key={i}
							className="mb-6"
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					);
				}

				if (cell.cell_type === "code") {
					const code = Array.isArray(cell.source)
						? cell.source.join("")
						: cell.source;

					return (
						<div key={i} className="my-4">
							<pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
								<code>{code}</code>
							</pre>
							{cell.outputs?.map((output, j) => {
								if (output.output_type === "stream") {
									return (
										<pre
											key={j}
											className="bg-gray-100 text-sm p-2 rounded mt-2 text-gray-800"
										>
											{Array.isArray(output.text)
												? output.text.join("")
												: output.text}
										</pre>
									);
								}
								return null;
							})}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
