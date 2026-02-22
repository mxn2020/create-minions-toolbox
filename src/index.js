#!/usr/bin/env node

import { Command } from 'commander';
import { runInteractivePrompts } from './prompts.js';
import { generateProject } from './generator.js';
import { setupGitHub } from './github.js';
import chalk from 'chalk';
import ora from 'ora';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import * as dotenv from 'dotenv';
import { parse } from 'smol-toml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the CLI's installation directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
    .name('create-minions-app')
    .description('Scaffold a new Minions ecosystem project with established patterns')
    .version(pkg.version)
    .argument('[project-name]', 'Name of the project (e.g., minions-tasks)')
    .option('-d, --description <desc>', 'Short project description')
    .option('-o, --org <org>', 'GitHub org/user', 'mxn2020')
    .option('-a, --author <name>', 'Author name', 'Mehdi Nabhani')
    .option('-e, --email <email>', 'Author email', 'mehdi@the-mehdi.com')
    .option('--github', 'Setup GitHub repository (requires gh CLI)')
    .option('--dry-run', 'Print what would be created without writing files')
    .option('--license <license>', 'License type', 'MIT')
    .action(async (projectName, options) => {
        console.log('');
        console.log(chalk.bold.hex('#8B5CF6')('  🚀 create-minions-app'));
        console.log(chalk.dim('  Scaffold a new Minions ecosystem project\n'));

        let config;
        let tomlData = null;

        // Check if the argument is a TOML config file
        if (projectName && extname(projectName) === '.toml') {
            try {
                const tomlContent = readFileSync(projectName, 'utf-8');
                tomlData = parse(tomlContent);
                console.log(chalk.dim(`  Loaded configuration from ${projectName}`));
                // Extract project name from the TOML or fallback to the filename without .toml
                projectName = tomlData.name || projectName.replace(/\.toml$/, '');
                if (tomlData.description) options.description = tomlData.description;
                if (tomlData.org) options.org = tomlData.org;
            } catch (err) {
                console.error(chalk.red(`  Failed to parse TOML file: ${err.message}`));
                process.exit(1);
            }
        }

        if (projectName && options.description) {
            // Non-interactive mode — all required flags provided
            config = buildConfigFromFlags(projectName, options);
        } else {
            // Interactive mode — prompt for missing values
            config = await runInteractivePrompts(projectName, options);
        }

        // Attach tables if parsed from TOML
        if (tomlData && tomlData.tables) {
            config.tables = tomlData.tables;
        }

        // Generate the project
        const spinner = ora({ text: 'Generating project...', color: 'magenta' }).start();

        try {
            const result = await generateProject(config);
            spinner.succeed(chalk.green(`Project generated at ${chalk.bold(result.outputDir)}`));

            console.log('');
            console.log(chalk.dim('  ─────────────────────────────────────'));
            console.log(`  📁 ${chalk.bold(result.filesCreated)} files created`);
            console.log(`  📂 ${chalk.bold(result.dirsCreated)} directories created`);
            console.log('');

            // Optional GitHub setup
            if (config.setupGitHub) {
                const ghSpinner = ora({ text: 'Setting up GitHub repository...', color: 'cyan' }).start();
                try {
                    await setupGitHub(config);
                    ghSpinner.succeed(chalk.green('GitHub repository configured'));
                } catch (err) {
                    ghSpinner.fail(chalk.red(`GitHub setup failed: ${err.message}`));
                    console.log(chalk.yellow('  You can set up the repo manually. See MANUAL.md'));
                }
            }

            // Print next steps
            console.log(chalk.bold('\n  📋 Next steps:\n'));
            console.log(`  ${chalk.cyan('cd')} ${config.projectName}`);
            console.log(`  ${chalk.cyan('pnpm install')}`);
            console.log(`  ${chalk.cyan('pnpm run build')}`);
            console.log(`  ${chalk.cyan('pnpm run test')}`);
            console.log('');
            console.log(chalk.yellow(`  📖 Read ${chalk.bold('MANUAL.md')} for manual setup steps`));
            console.log(chalk.dim('     (GitHub secrets, Netlify sites, DNS, etc.)\n'));

        } catch (err) {
            spinner.fail(chalk.red(`Failed: ${err.message}`));
            process.exit(1);
        }
    });

function buildConfigFromFlags(projectName, options) {
    const slug = projectName.replace(/^minions-/, '');
    const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        projectName,
        projectSlug: slug,
        projectCapitalized: `Minions ${capitalizedSlug}`,
        projectDescription: options.description || `A Minions ecosystem project for ${slug}`,
        sdkName: `@${projectName}/sdk`,
        cliName: `@${projectName}/cli`,
        cliCommand: slug,
        pythonPackage: projectName.replace(/-/g, '-'),
        pythonModule: projectName.replace(/-/g, '_'),
        authorName: options.author,
        authorEmail: options.email,
        authorUrl: 'https://the-mehdi.com',
        githubOrg: options.org,
        githubRepo: `${options.org}/${projectName}`,
        license: options.license,
        domainHelp: `${slug}.minions.help`,
        domainBlog: `${slug}.minions.blog`,
        domainApp: `${slug}.minions.wtf`,
        keywords: [slug, 'ai', 'minions'],
        year: new Date().getFullYear().toString(),
        setupGitHub: options.github || false,
        dryRun: options.dryRun || false,
    };
}

program.parse();
