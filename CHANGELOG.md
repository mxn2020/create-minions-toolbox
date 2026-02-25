# Changelog

## [1.1.0](https://github.com/mxn2020/create-minions-toolbox/compare/v1.0.0...v1.1.0) (2026-02-25)


### Features

* CLI template uses minions-sdk JsonFileStorageAdapter (v1.3.0) ([bfe2ef2](https://github.com/mxn2020/create-minions-toolbox/commit/bfe2ef250a223e1e19da36cbcd179d6a4384aed0))
* enrich SKILLS metadata and registry sync ([fdf9f6c](https://github.com/mxn2020/create-minions-toolbox/commit/fdf9f6c82a9c4851afa4355ad8c5f67d66de9545))
* fix scoped app naming and add SKILLS.md template (v1.1.0) ([f8b4d9a](https://github.com/mxn2020/create-minions-toolbox/commit/f8b4d9a187ec2a0f98f9f07898b6677e73d8ce05))
* full CLI template with CRUD, types, validate, stats (v1.2.0) ([c69b744](https://github.com/mxn2020/create-minions-toolbox/commit/c69b744420a8259e4e846c7349fc5410c5125355))
* generate vitest unit tests from TOML type definitions ([2ae25dd](https://github.com/mxn2020/create-minions-toolbox/commit/2ae25ddbb7f755f8fc95f56953881d92cb41d2fd))


### Bug Fixes

* test template should not assert populated array when no TOML types defined ([27c55a1](https://github.com/mxn2020/create-minions-toolbox/commit/27c55a168f9389e4ce2ff827972d07fd5b2b4fc0))
* update CLI template to use getById() and 3-arg updateMinion() to match minions-sdk API ([0c26531](https://github.com/mxn2020/create-minions-toolbox/commit/0c26531726f86beb3ce13dd9f4ea6dabce51da90))
* website UI tweaks and add OSS configuration ([4ec1312](https://github.com/mxn2020/create-minions-toolbox/commit/4ec131296c9a842ad95ea5042d6da427ca232550))

## 1.0.0 (2026-02-22)


### Features

* auto-configure NPM and PyPI github secrets from .env ([55ba674](https://github.com/mxn2020/create-minions-toolbox/commit/55ba674eba20b502d3d09c928a44cefde7d2e01a))
* support custom UI accent color overrides via toml config ([68a8ab4](https://github.com/mxn2020/create-minions-toolbox/commit/68a8ab45cf1e90716ca22cccc264b2c9fb63b68e))
* support TOML configuration for table schema generation ([b9bb4f6](https://github.com/mxn2020/create-minions-toolbox/commit/b9bb4f61090d9ce18887e405f498b9830e62402b))
