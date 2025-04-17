import {
	Outlet,
	createRootRoute,
	HeadContent,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import NavBar from "@/components/NavBar";
import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
	component: Root,
	// Error boundary for the entire app
	notFoundComponent: () => {
		return <NotFound />;
	},
});

// This route is the root of the application and will be used to wrap all other routes.
function Root() {
	const routerState = useRouterState();
	// Show the mobile header only on documentation pages
	const showMobileHeader = routerState.location.pathname.startsWith("/docs/");
	// Show the sidebar only on documentation pages
	const showSidebar = routerState.location.pathname.startsWith("/docs/");

	return (
		<>
			<HeadContent />
			<NavBar />
			{showSidebar && <Sidebar />}
			<Outlet />
			<Footer />
			<TanStackRouterDevtools />
		</>
	);
}
