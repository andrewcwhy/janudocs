#!/usr/bin/env node

import { execSync } from 'child_process';
import readline from 'readline';

const args = process.argv.slice(2);
let projectName = args[0];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function promptForName() {
    return new Promise((resolve) => {
        rl.question('🚀 Please enter a name for your DocuJanus project: ', (name) => {
            rl.close();
            resolve(name.trim());
        });
    });
}

async function init() {
    if (!projectName) {
        projectName = await promptForName();

        if (!projectName) {
            console.error('❌ Project name cannot be empty. Please run again with a valid name.');
            process.exit(1);
        }
    }

    console.log(`\n📦 Creating a new DocuJanus project in '${projectName}'...\n`);

    try {
        execSync(`git clone https://github.com/andrewcwhy/docujanus.git ${projectName}`, { stdio: 'inherit' });

        console.log('\n📥 Installing dependencies...\n');
        execSync(`cd ${projectName} && bun install`, { stdio: 'inherit' });

        console.log(`\n🎉 Project created successfully! Next steps:`);
        console.log(`\n  cd ${projectName}`);
        console.log(`  bun dev\n`);
    } catch (error) {
        console.error('⚠️ An error occurred while creating the project:', error);
    }
}

init();
