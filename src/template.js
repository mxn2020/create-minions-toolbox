/**
 * Simple template engine — replaces {{variable}} placeholders with values.
 * Supports dot notation is NOT needed; all variables are flat.
 */

/**
 * Replace all {{variable}} placeholders in a string.
 * @param {string} content - Template string
 * @param {Record<string, string|string[]>} variables - Values to substitute
 * @returns {string}
 */
export function render(content, variables) {
    return content.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
        if (key in variables) {
            const val = variables[key];
            return String(val);
        }
        return match; // leave unresolved placeholders as-is
    });
}

import { generateSchemas, generateTests } from './schemas.js';

/**
 * Build the flat variables map from a config object.
 * @param {object} config
 * @returns {Record<string, string>}
 */
export function buildVariables(config) {
    const { typescriptSchemas, pythonSchemas } = generateSchemas(config);
    const typescriptTests = generateTests(config);

    return {
        projectName: config.projectName,
        projectSlug: config.projectSlug,
        projectCapitalized: config.projectCapitalized,
        projectDescription: config.projectDescription,
        sdkName: config.sdkName,
        cliName: config.cliName,
        cliCommand: config.cliCommand,
        docsName: `@${config.projectName}/docs`,
        blogName: `@${config.projectName}/blog`,
        webName: `@${config.projectName}/web`,
        pythonPackage: config.pythonPackage,
        pythonModule: config.pythonModule,
        authorName: config.authorName,
        authorEmail: config.authorEmail,
        authorUrl: config.authorUrl,
        githubOrg: config.githubOrg,
        githubRepo: config.githubRepo,
        license: config.license,
        domainHelp: config.domainHelp,
        domainBlog: config.domainBlog,
        domainApp: config.domainApp,
        keywords: config.keywords,
        keywordsJson: JSON.stringify(config.keywords),
        year: config.year,
        typescriptSchemas,
        pythonSchemas,
        accentColor: config.accentColor,
        accentHoverColor: config.accentHoverColor,
        typescriptTests,
    };
}
