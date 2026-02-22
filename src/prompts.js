import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Run interactive prompts to collect project configuration.
 * Pre-fills with any values already provided via CLI flags.
 */
export async function runInteractivePrompts(projectName, options = {}) {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: projectName || 'minions-example',
            validate: (input) => {
                if (!/^minions-[a-z][a-z0-9-]*$/.test(input)) {
                    return 'Must start with "minions-" followed by lowercase letters/numbers/hyphens';
                }
                return true;
            },
            when: !projectName,
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: 'Short description:',
            default: (ans) => {
                const name = projectName || ans.projectName;
                const slug = name.replace(/^minions-/, '');
                return `A Minions ecosystem project for ${slug}`;
            },
            when: !options.description,
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'Author name:',
            default: options.author || 'Mehdi Nabhani',
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'Author email:',
            default: options.email || 'mehdi@the-mehdi.com',
        },
        {
            type: 'input',
            name: 'githubOrg',
            message: 'GitHub org/user:',
            default: options.org || 'mxn2020',
        },
        {
            type: 'list',
            name: 'license',
            message: 'License:',
            choices: ['MIT', 'Apache-2.0', 'AGPL-3.0'],
            default: options.license || 'MIT',
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'Keywords (comma-separated):',
            default: (ans) => {
                const name = projectName || ans.projectName;
                const slug = name.replace(/^minions-/, '');
                return `${slug}, ai, minions`;
            },
            filter: (input) => input.split(',').map((k) => k.trim()).filter(Boolean),
        },
        {
            type: 'confirm',
            name: 'setupGitHub',
            message: 'Setup GitHub repository? (requires gh CLI)',
            default: false,
            when: options.github === undefined,
        },
    ]);

    const name = projectName || answers.projectName;
    const slug = name.replace(/^minions-/, '');
    const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    const config = {
        projectName: name,
        projectSlug: slug,
        projectCapitalized: `Minions ${capitalizedSlug}`,
        projectDescription: options.description || answers.projectDescription,
        sdkName: `@${name}/sdk`,
        cliName: `@${name}/cli`,
        cliCommand: slug,
        pythonPackage: name, // e.g. minions-tasks
        pythonModule: name.replace(/-/g, '_'), // e.g. minions_tasks
        authorName: answers.authorName || options.author || 'Mehdi Nabhani',
        authorEmail: answers.authorEmail || options.email || 'mehdi@the-mehdi.com',
        authorUrl: 'https://the-mehdi.com',
        githubOrg: answers.githubOrg || options.org || 'mxn2020',
        githubRepo: `${answers.githubOrg || options.org || 'mxn2020'}/${name}`,
        license: answers.license || options.license || 'MIT',
        domainHelp: `${slug}.minions.help`,
        domainBlog: `${slug}.minions.blog`,
        domainApp: `${slug}.minions.wtf`,
        keywords: answers.keywords || [slug, 'ai', 'minions'],
        year: new Date().getFullYear().toString(),
        setupGitHub: answers.setupGitHub || options.github || false,
        dryRun: options.dryRun || false,
    };

    // Confirmation
    console.log('');
    console.log(chalk.bold('  📦 Project Configuration:'));
    console.log(chalk.dim('  ─────────────────────────────────────'));
    console.log(`  Name:         ${chalk.cyan(config.projectName)}`);
    console.log(`  Description:  ${config.projectDescription}`);
    console.log(`  SDK:          ${chalk.green(config.sdkName)}`);
    console.log(`  CLI:          ${chalk.green(config.cliName)}`);
    console.log(`  Python:       ${chalk.green(config.pythonPackage)}`);
    console.log(`  GitHub:       ${chalk.blue(`github.com/${config.githubRepo}`)}`);
    console.log(`  Domains:      ${config.domainHelp} / ${config.domainBlog} / ${config.domainApp}`);
    console.log(`  License:      ${config.license}`);
    console.log(`  GitHub setup: ${config.setupGitHub ? chalk.green('Yes') : chalk.dim('No')}`);
    console.log('');

    const { confirmed } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmed',
            message: 'Proceed with these settings?',
            default: true,
        },
    ]);

    if (!confirmed) {
        console.log(chalk.yellow('\n  Aborted.\n'));
        process.exit(0);
    }

    return config;
}
