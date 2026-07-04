# SylphxAI Codec

Universal media codec, image-processing, conversion, and CLI packages for the SylphxAI ecosystem. Codec is a foundation library: it owns reusable codec primitives and package contracts, not application-specific media workflows.

## Packages

- `@sylphx/codec-core` — shared codec primitives and interfaces.
- `@sylphx/codec` — primary media codec package.
- `@sylphx/codec-cli` — command-line package surface.
- `@mconv/*` packages — transform, color, filter, composite, draw, histogram, metadata, text, mconv, and optional WASM package surfaces.

## Boundary

Codec owns generic codec/conversion package code, tests, progress tracking, and release workflow. Consumers own product workflows, media storage, CDN behavior, UI, deployment, external licensing decisions, and operational policy.

## Commands

```bash
bun install --frozen-lockfile
bun run validate
node --test test/project-control.node-test.mjs
npm exec --yes --package groundatlas@0.1.2 -- ga fleet . --out .groundatlas-pilot --require-atlas --strict --json
```

`bun run validate` runs the current release-critical package build and all-workspace package test baseline. The existing Biome/lint backlog is tracked in `.doctrine/project.json` as `lint-baseline` and should be fixed in a dedicated package-quality slice before lint becomes required CI. The all-workspace build backlog is tracked separately as `workspace-build-baseline`; CI preserves the existing release-critical build while running all workspace tests.

## Project Control and Release Proof

This repository dogfoods [GroundAtlas](https://github.com/SylphxAI/groundatlas) through CI. The vendor-neutral project facts live in `project.manifest.json`; Sylphx-specific governance facts stay in `.doctrine/project.json`; generated `.groundatlas*` reports are evidence/navigation only, not source of truth.

Package releases run through the shared Sylphx release workflow and are complete only after CI, the Release workflow, and npm registry readback for changed codec packages. Codec behavior changes additionally require package tests, fixture evidence, and consumer smoke evidence for affected codec contracts.

## License

MIT © SylphxAI
