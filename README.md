# create-minions-toolbox

**Scaffold new Minions ecosystem projects in seconds.** Creates a full monorepo with TypeScript SDK, Python SDK, CLI, docs site, blog, and web app — all pre-configured with CI/CD, release automation, and Netlify deployment.

---

## Quick Start

```bash
# Interactive mode
npx create-minions-toolbox

# Non-interactive mode
npx create-minions-toolbox --name minions-tasks \
  --description "Task management for AI agents" \
  --org mxn2020
```

## What Gets Created

```
minions-tasks/
├── packages/
│   ├── core/           # TypeScript SDK (@minions-tasks/sdk)
│   ├── cli/            # CLI tool (@minions-tasks/cli)
│   └── python/         # Python SDK (minions-tasks on PyPI)
├── apps/
│   ├── web/            # React + Vite playground
│   ├── docs/           # Astro Starlight documentation
│   └── blog/           # Astro + MDX blog
├── .github/
│   ├── workflows/      # CI, publish, release-please
│   └── ISSUE_TEMPLATE/ # Bug report & feature request
├── package.json        # pnpm workspace root
├── MANUAL.md           # Manual setup steps (secrets, Netlify, DNS)
└── ...                 # All configs pre-wired
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--name <name>` | Project name (must start with `minions-`) | _(prompted)_ |
| `--description <desc>` | Short project description | _(prompted)_ |
| `--org <org>` | GitHub org/user | `mxn2020` |
| `--author <name>` | Author name | `Mehdi Nabhani` |
| `--email <email>` | Author email | `mehdi@the-mehdi.com` |
| `--license <license>` | License type | `MIT` |
| `--github` | Setup GitHub repo (requires `gh` CLI) | `false` |
| `--dry-run` | Print what would be created | `false` |

## GitHub Setup (Optional)

When you pass `--github`, the CLI will:

1. Create a GitHub repository using `gh` CLI
2. Push initial code to `main`
3. Create a `dev` branch
4. Set repo topics

**Prerequisites**: Install and authenticate [GitHub CLI](https://cli.github.com/):
```bash
brew install gh
gh auth login
```

## Manual Steps

After scaffolding, a **MANUAL.md** is generated in your project with:

- GitHub repository secrets (NPM_TOKEN, PYPI_TOKEN)
- Netlify site setup (3 sites: web, docs, blog)
- DNS configuration (CNAME records)
- First npm/PyPI publish commands
- Release Please verification
- Branch protection rules

## Development

```bash
# Install dependencies
npm install

# Test by scaffolding a project
node src/index.js --name minions-test --description "Test project" --dry-run
```

## License

[MIT](LICENSE)
