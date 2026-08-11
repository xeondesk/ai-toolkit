/**
 * `changeset version` updates the version and adds a changelog file in
 * the example apps, but we don't want to do that. So this script reverts
 * any "version" field changes and deletes the `CHANGELOG.md` file.
 *
 * Source: https://github.com/TooTallNate/nx.js/blob/main/.github/scripts/cleanup-examples.mjs
 */

import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));

function cleanup(app, dirPath) {
  const appPath = join(dirPath, app);

  console.log('Cleaning up', appPath);

  if (statSync(appPath).isDirectory()) {
    const packageJsonPath = join(appPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = '0.0.0';
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    try {
      const changelogPath = join(appPath, 'CHANGELOG.md');
      console.log('Deleting', changelogPath);
      unlinkSync(changelogPath);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
}

// examples (organized into category subdirectories: examples/<category>/<example>)
const examplesPath = join(here, '../../examples');
for (const category of readdirSync(examplesPath)) {
  const categoryPath = join(examplesPath, category);
  if (!statSync(categoryPath).isDirectory()) continue;
  for (const app of readdirSync(categoryPath)) {
    cleanup(app, categoryPath);
  }
}

// next test server (moved to packages/adapters/rsc during Phase 1)
cleanup('.', join(here, '../../packages/adapters/rsc/tests/e2e/next-server'));
