# {{projectName}}

**{{projectDescription}}**

Built on the [Minions SDK](https://github.com/mxn2020/minions).

---

## Quick Start

```bash
# TypeScript / Node.js
npm install {{sdkName}} minions-sdk

# Python
pip install {{pythonPackage}}

# CLI (global)
npm install -g {{cliName}}
```

---

## CLI

```bash
# Show help
{{cliCommand}} --help
```

---

## Python SDK

```python
from {{pythonModule}} import create_client

client = create_client()
```

---

## Project Structure

```
{{projectName}}/
  packages/
    core/           # TypeScript core library ({{sdkName}} on npm)
    python/         # Python SDK ({{pythonPackage}} on PyPI)
    cli/            # CLI tool ({{cliName}} on npm)
  apps/
    web/            # Playground web app
    docs/           # Astro Starlight documentation site
    blog/           # Blog
  examples/
    typescript/     # TypeScript usage examples
    python/         # Python usage examples
```

---

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Type check
pnpm run lint
```

---

## Documentation

- Docs: [{{domainHelp}}](https://{{domainHelp}})
- Blog: [{{domainBlog}}](https://{{domainBlog}})
- App: [{{domainApp}}](https://{{domainApp}})

---

## License

[{{license}}](LICENSE)
