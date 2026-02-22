#!/usr/bin/env node

/**
 * {{cliName}} — CLI for {{projectCapitalized}}
 */

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .name('{{cliCommand}}')
    .description('{{projectDescription}}')
    .version('0.1.0');

program
    .command('info')
    .description('Show project info')
    .action(() => {
        console.log(chalk.bold('{{projectCapitalized}}'));
        console.log(chalk.dim('{{projectDescription}}'));
        console.log('');
        console.log(`  SDK:    ${chalk.cyan('{{sdkName}}')}`);
        console.log(`  CLI:    ${chalk.cyan('{{cliName}}')}`);
        console.log(`  Python: ${chalk.cyan('{{pythonPackage}}')}`);
    });

program.parse();
