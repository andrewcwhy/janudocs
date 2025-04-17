import {
	text,
	select,
	multiselect,
	intro,
	outro,
	isCancel,
	cancel,
	spinner,
} from "@clack/prompts";
import picocolors from "picocolors";
import {
	existsSync,
	mkdirSync,
	cpSync,
	readdirSync,
	statSync,
	copyFileSync,
} from "node:fs";
import path, { resolve } from "node:path";
import { installDependencies } from "@/setupDependencies";

// Helper to check for cancellation after a prompt.
function ensure<T>(result: T | symbol): T {
	if (isCancel(result)) {
		cancel("Operation cancelled.");
		process.exit(0);
	}
	return result as T;
}

// Helper to run a task with a spinner.
function runTask(taskDescription: string, task: () => void) {
	const s = spinner();
	s.start(taskDescription);
	try {
		task();
		s.stop(`${taskDescription} completed successfully.`);
	} catch (err) {
		s.stop(`${taskDescription} failed.`);
		console.error(err);
		process.exit(1);
	}
}

// Recursively copy files from shared into target without overwriting existing files
function copySharedFiles(source: string, target: string) {
	const entries = readdirSync(source);
	for (const entry of entries) {
		const srcPath = path.join(source, entry);
		const destPath = path.join(target, entry);

		if (statSync(srcPath).isDirectory()) {
			if (!existsSync(destPath)) mkdirSync(destPath);
			copySharedFiles(srcPath, destPath);
		} else {
			if (!existsSync(destPath)) {
				copyFileSync(srcPath, destPath);
			}
		}
	}
}

async function main() {
	intro(picocolors.inverse("create-janudocs"));

	const cwd = process.cwd();
	const projectName = ensure(
		await text({
			message: "What is your project name?",
			placeholder: "my-janudocs",
			validate: (input) => {
				const projectDir = resolve(cwd, input);
				return existsSync(projectDir)
					? `Directory "${input}" already exists. Choose a different name.`
					: undefined;
			},
		}),
	);

	const projectDir = resolve(cwd, projectName);

	const template = ensure(
		await select({
			message: "Choose a starter template:",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Full", value: "full" },
				{ label: "Vite", value: "vite" },
			],
		}),
	);

	const devTools = ensure(
		await multiselect({
			message: "Add optional developer tools.",
			options: [
				{ label: "Bifront", value: "bifront", hint: "recommended" },
				{ label: "Biome", value: "biome", hint: "recommended" },
			],
		}),
	);

	const packageManager = ensure(
		await select({
			message: "Which package manager do you want to use?",
			options: [
				{ label: "bun", value: "bun", hint: "my favorite" },
				{ label: "npm", value: "npm" },
				{ label: "pnpm", value: "pnpm" },
				{ label: "yarn", value: "yarn" },
			],
		}),
	);

	const templateDir = resolve(import.meta.dir, "../templates", template);
	const sharedDir = resolve(import.meta.dir, "../templates/shared");

	runTask("Scaffolding project", () => {
		mkdirSync(projectDir, { recursive: true });
		cpSync(templateDir, projectDir, { recursive: true });
		copySharedFiles(sharedDir, projectDir);
	});

	installDependencies(
		projectDir,
		devTools as ("eslint" | "prettier")[],
		packageManager as any,
	);

	outro(picocolors.green(`Project setup complete at: ${projectDir}`));
	console.log();
}

export { main };
