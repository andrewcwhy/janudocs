import { Command } from "commander";
import { createRequire } from "node:module";

import { build } from "./build";
import { clear } from "./clear";
import { dev } from "./dev";
import { generate } from "./generate";

const require = createRequire(import.meta.url);
const { version } = require("package.json");

export function createCli() {
	const program = new Command();

	program.name("janudocs").description("The Janudocs CLI").version(version);

	program.command("build").description("Build the documentation site");

	program.command("clear");

	program.command("dev").description("Start the development server");

	program
		.command("generate")
		.alias("gen")
		.description("Generate the docs manifest");

	return program;
}
