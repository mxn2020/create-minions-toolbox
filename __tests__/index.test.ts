import { test, expect, describe } from 'vitest';
import { render, buildVariables } from '../src/template.js';
import { generateProject } from '../src/generator.js';

// ─── render() ──────────────────────────────────────────────────────────────────

describe('render', () => {
  test('replaces single placeholder', () => {
    expect(render('Hello {{name}}', { name: 'World' })).toBe('Hello World');
  });

  test('replaces multiple placeholders', () => {
    const result = render('{{a}} + {{b}} = {{c}}', { a: '1', b: '2', c: '3' });
    expect(result).toBe('1 + 2 = 3');
  });

  test('handles whitespace inside braces', () => {
    expect(render('{{ name }}', { name: 'Minions' })).toBe('Minions');
  });

  test('leaves unresolved placeholders as-is', () => {
    expect(render('{{known}} {{unknown}}', { known: 'ok' })).toBe('ok {{unknown}}');
  });

  test('handles empty string values', () => {
    expect(render('pre-{{val}}-post', { val: '' })).toBe('pre--post');
  });

  test('returns input unchanged when no placeholders', () => {
    expect(render('no placeholders here', { x: 'y' })).toBe('no placeholders here');
  });
});

// ─── buildVariables() ──────────────────────────────────────────────────────────

describe('buildVariables', () => {
  const config = {
    projectName: 'minions-test',
    projectSlug: 'test',
    projectCapitalized: 'Minions Test',
    projectDescription: 'A test toolbox',
    sdkName: '@minions-test/sdk',
    cliName: '@minions-test/cli',
    cliCommand: 'test',
    pythonPackage: 'minions-test',
    pythonModule: 'minions_test',
    authorName: 'Test Author',
    authorEmail: 'test@example.com',
    authorUrl: 'https://example.com',
    githubOrg: 'testorg',
    githubRepo: 'testorg/minions-test',
    license: 'MIT',
    domainHelp: 'test.minions.help',
    domainBlog: 'test.minions.blog',
    domainApp: 'test.minions.wtf',
    keywords: ['test', 'minions'],
    year: '2026',
    accentColor: '#8B5CF6',
    accentHoverColor: '#7C3AED',
    tables: {},
  };

  test('produces all required keys', () => {
    const vars = buildVariables(config);
    expect(vars.projectName).toBe('minions-test');
    expect(vars.projectSlug).toBe('test');
    expect(vars.projectCapitalized).toBe('Minions Test');
    expect(vars.sdkName).toBe('@minions-test/sdk');
    expect(vars.cliName).toBe('@minions-test/cli');
    expect(vars.pythonPackage).toBe('minions-test');
    expect(vars.pythonModule).toBe('minions_test');
    expect(vars.authorName).toBe('Test Author');
    expect(vars.githubOrg).toBe('testorg');
    expect(vars.license).toBe('MIT');
    expect(vars.year).toBe('2026');
  });

  test('produces keywordsJson as valid JSON', () => {
    const vars = buildVariables(config);
    expect(() => JSON.parse(vars.keywordsJson)).not.toThrow();
    expect(JSON.parse(vars.keywordsJson)).toEqual(['test', 'minions']);
  });

  test('generates derived names correctly', () => {
    const vars = buildVariables(config);
    expect(vars.docsName).toBe('@minions-test/docs');
    expect(vars.blogName).toBe('@minions-test/blog');
    expect(vars.webName).toBe('@minions-test/web');
  });
});

// ─── generateProject() dry-run ─────────────────────────────────────────────────

describe('generateProject (dry-run)', () => {
  const config = {
    projectName: 'minions-drytest',
    projectSlug: 'drytest',
    projectCapitalized: 'Minions Drytest',
    projectDescription: 'Dry run test',
    sdkName: '@minions-drytest/sdk',
    cliName: '@minions-drytest/cli',
    cliCommand: 'drytest',
    pythonPackage: 'minions-drytest',
    pythonModule: 'minions_drytest',
    authorName: 'Test',
    authorEmail: 'test@example.com',
    authorUrl: 'https://example.com',
    githubOrg: 'testorg',
    githubRepo: 'testorg/minions-drytest',
    license: 'MIT',
    domainHelp: 'drytest.minions.help',
    domainBlog: 'drytest.minions.blog',
    domainApp: 'drytest.minions.wtf',
    keywords: ['drytest'],
    year: '2026',
    accentColor: '#8B5CF6',
    accentHoverColor: '#7C3AED',
    tables: {},
    dryRun: true,
  };

  test('returns zero files and dirs in dry-run mode', async () => {
    const result = await generateProject(config);
    expect(result.filesCreated).toBe(0);
    expect(result.dirsCreated).toBe(0);
  });

  test('returns correct output directory', async () => {
    const result = await generateProject(config);
    expect(result.outputDir).toContain('minions-drytest');
  });
});
