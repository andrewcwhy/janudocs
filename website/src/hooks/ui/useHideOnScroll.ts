import { useEffect, useState } from "react";

export function useHideOnScroll(initialState = true, threshold = 10): boolean {
	const [isVisible, setIsVisible] = useState(initialState);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		function handleScroll() {
			const currentY = window.scrollY;
			setIsVisible(currentY < lastScrollY || currentY < threshold);
			setLastScrollY(currentY);
		}

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, threshold]);

	return isVisible;
}
