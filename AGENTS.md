# Agent Instructions

This repository consumes the Sylphx engineering doctrine from [SylphxAI/doctrine](https://github.com/SylphxAI/doctrine).

Before changing files here:

- Read [PROJECT.md](./PROJECT.md), [`project.manifest.json`](./project.manifest.json), and [`.doctrine/project.json`](./.doctrine/project.json) for this repository's goal, lifecycle, boundary, public surfaces, and adoption gaps.
- Read `SylphxAI/doctrine` `AGENTS.md`, `PRINCIPLES.md`, and `ADR.md`, then load any triggered standards.
- Keep codec behavior generic to media decoding, encoding, conversion, and processing; consuming products own their media workflows.

Do not add product-specific media pipeline behavior here. This repository owns codec and conversion packages only.

Generated `.groundatlas*` reports are evidence/navigation only. Do not treat them as source of truth.
