import { useLayoutEffect } from "react";

export function useLockBodyScroll(isLocked: boolean): void {
	useLayoutEffect(() => {
		// Do nothing if the modal is not open
		if (!isLocked) return;

		// Save the original overflow style of the document body
		const originalOverflow = document.body.style.overflow;

		// Set overflow to 'hidden' to lock scrolling
		document.body.style.overflow = "hidden";

		// Cleanup function restores the original style
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [isLocked]);
}
