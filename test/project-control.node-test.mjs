import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const readText = (path) => readFileSync(path, 'utf8')

test('project manifest is the vendor-neutral GroundAtlas control file', () => {
	const manifest = readJson('project.manifest.json')

	assert.equal(manifest.schemaVersion, 1)
	assert.equal(manifest.project.id, 'codec')
	assert.equal(manifest.project.repository, 'https://github.com/SylphxAI/codec')
	assert.equal(manifest.project.visibility, 'open-source')
	assert.equal(manifest.adoption.status, 'adopted')
	assert.equal(manifest.truth.agentAdapter, 'AGENTS.md')
	assert.ok(
		manifest.surfaces.some(
			(surface) =>
				surface.path === '.doctrine/project.json' &&
				surface.description.includes('not the vendor-neutral GroundAtlas default')
		)
	)
})

test('Doctrine adapter remains Sylphx-specific and package proof stays package-owned', () => {
	const doctrine = readJson('.doctrine/project.json')

	assert.equal(doctrine.project.repo, 'SylphxAI/codec')
	assert.equal(doctrine.adoption.status, 'adopted')
	assert.ok(
		doctrine.boundaries.publicSurfaces.some(
			(surface) => surface.type === 'manifest' && surface.location === 'project.manifest.json'
		)
	)
	assert.ok(doctrine.delivery.productionProof.includes('GroundAtlas package dogfood'))
	assert.ok(doctrine.delivery.productionProof.includes('bun run validate'))
	assert.ok(doctrine.adoption.gaps.some((gap) => gap.id === 'lint-baseline'))
})

test('CI runs package validation and dogfoods the released GroundAtlas package/action', () => {
	const workflow = readText('.github/workflows/ci.yml')

	assert.ok(workflow.includes('bun install --frozen-lockfile'))
	assert.ok(workflow.includes('bun run validate'))
	assert.ok(workflow.includes('uses: SylphxAI/groundatlas@v0.1.2'))
	assert.ok(workflow.includes('package-spec: groundatlas@0.1.2'))
	assert.ok(workflow.includes('require-atlas: "true"'))
	assert.ok(workflow.includes('strict: "true"'))
	assert.ok(workflow.includes('project.manifest.json'))
	assert.ok(workflow.includes('.doctrine/project.json'))
})

test('root validation proves the current package build/test baseline', () => {
	const manifest = readJson('package.json')

	assert.equal(manifest.scripts.validate, 'bun run build && bun run test')
	assert.ok(manifest.scripts.build.includes('@sylphx/codec-core'))
	assert.ok(manifest.scripts.build.includes('@sylphx/codec'))
	assert.ok(manifest.scripts.build.includes('@sylphx/codec-cli'))
})

test('release caller grants trusted publish identity token permission', () => {
	const workflow = readText('.github/workflows/release.yml')

	assert.ok(workflow.includes('id-token: write'))
	assert.ok(workflow.includes('secrets: inherit'))
	assert.ok(workflow.includes('SylphxAI/.github/.github/workflows/release.yml@main'))
})
