import { Routes, Route } from "react-router";
import DocsViewer from "@/components/DocsViewer";
import About from "@/pages/About";
import Home from "@/pages/Home";
import BaseLayout from "@/components/Layout";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import DocsLayout from "@/components/DocsLayout";

export default function App() {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />

				<Route path="docs" element={<DocsLayout />}>
					{/* Route for loose (root-level) files */}
					<Route path=":doc" element={<DocsViewer />} />
					{/* Route for categorized files */}
					<Route path=":category/:doc" element={<DocsViewer />} />
				</Route>
			</Route>
		</Routes>
	);
}
