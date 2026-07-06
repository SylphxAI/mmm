# ADR 0001: Add GroundAtlas Project-Control Gate

## Status

Accepted

## Context

Codec is a public foundation package monorepo for media codec and conversion packages. It already had a main-branch Release workflow with trusted publish identity, but it did not expose a vendor-neutral project manifest, did not run PR/merge-group validation, and did not dogfood the released GroundAtlas package/action.

The project-control surface must not make `.doctrine/project.json` a public default and must not make generated `.groundatlas*` files or GroundAtlas JSON/Markdown reports authoritative. This change must not alter codec behavior, WASM behavior, package versions, external codec licensing posture, or downstream media workflows.

The current `bun run lint`/Biome baseline has a broad pre-existing backlog. Blocking this adoption slice on a repo-wide lint cleanup would hide the actual delivery boundary, so lint is recorded as a separate adoption gap and the CI gate uses the current release-critical build plus all-workspace test baseline.

## Decision

Add:

- a vendor-neutral `project.manifest.json`;
- a CI workflow that runs `bun run validate` and project-control tests;
- a CI step using `SylphxAI/groundatlas@v0.1.3` with `groundatlas@0.1.3`;
- assertions that GroundAtlas selects `project.manifest.json`, reports `.doctrine/project.json` only as an adapter, and has zero strict fleet warnings/blockers;
- a small Node project-control boundary test;
- README/PROJECT/AGENTS updates that clarify GroundAtlas as evidence/navigation, not SSOT;
- a tracked `lint-baseline` adoption gap for the existing Biome backlog.

## Consequences

- Pull requests and merge groups now get package build/test validation plus GroundAtlas package/action dogfooding.
- `.doctrine/project.json` remains the Sylphx Doctrine adapter and local governance catalog.
- Release proof remains a successful main Release workflow plus npm registry readback for changed packages.
- Generated `.groundatlas*` files plus GroundAtlas JSON/Markdown reports remain evidence/navigation only.
- Lint is not falsely presented as green; it is a separate cleanup slice before it can become a required context.
