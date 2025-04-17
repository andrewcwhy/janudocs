import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

export function useScrollDirection(
	initialState: ScrollDirection = "up",
	threshold = 10,
) {
	const [scrollDirection, setScrollDirection] =
		useState<ScrollDirection>(initialState);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const onScroll = () => {
			const currentY = window.scrollY;
			const diff = Math.abs(currentY - lastScrollY);

			if (diff < threshold) return;

			setScrollDirection(currentY > lastScrollY ? "down" : "up");
			lastScrollY = currentY;
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [threshold]);

	return scrollDirection;
}
