export function removeFileExtension(input: string): string {
	// Remove the file extension from the input string
	return input.replace(/\.[^/.]+$/, "");
}

export function formatFileName(fileName: string | undefined): string {
	if (!fileName) return "";
	// Replace hyphens and underscores with spaces
	const formatted = fileName.replace(/[-_]/g, " ");
	// Remove the file extension
	return removeFileExtension(formatted);
}
