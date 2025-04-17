import { Link, useLocation } from "@tanstack/react-router";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";

import { getDocsRoutes, type RouteProps } from "@/utils";

interface PaginationProps {
	alignment: "start" | "end";
	direction: "previous" | "next";
	Icon: IconType;
	route: RouteProps;
}

export default function DocsPagination() {
	const location = useLocation();
	const routes = getDocsRoutes();
	const currentIndex = routes.findIndex(
		(route) => route.href === location.pathname,
	);

	if (currentIndex === -1) return null;

	const pagination: PaginationProps[] = [
		{
			alignment: "start",
			direction: "previous",
			route: routes[currentIndex - 1],
			Icon: FiArrowLeft,
		},
		{
			alignment: "end",
			direction: "next",
			route: routes[currentIndex + 1],
			Icon: FiArrowRight,
		},
	];

	return (
		<nav
			className="mt-16 border-t pt-10"
			aria-label="Pagination navigation for documentation pages"
		>
			<ul className="grid grid-cols-1 [@media(min-width:400px)]:grid-cols-2 gap-4">
				{pagination.map(({ direction, route, Icon, alignment }) =>
					route ? (
						<li key={direction}>
							<Link
								to={route.href}
								className={`group flex items-center justify-${alignment} gap-3 p-4 border rounded-2xl hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500`}
								aria-label={`Go to ${direction} page: ${route.title}`}
								title={`Go to ${direction} page: ${route.title}`}
							>
								{direction === "previous" && (
									<Icon
										className="text-xl text-gray-500 group-hover:text-gray-700"
										aria-hidden="true"
									/>
								)}
								<div
									className={`flex flex-col ${direction === "next" ? "text-right" : "text-left"}`}
								>
									<span className="text-xs text-gray-500">
										{direction === "previous" ? "Previous" : "Next"}
									</span>
									<span className="font-medium text-gray-800 group-hover:underline">
										{route.title}
									</span>
								</div>
								{direction === "next" && (
									<Icon
										className="text-xl text-gray-500 group-hover:text-gray-700"
										aria-hidden="true"
									/>
								)}
							</Link>
						</li>
					) : (
						<li key={direction} aria-hidden="true" />
					),
				)}
			</ul>
		</nav>
	);
}
