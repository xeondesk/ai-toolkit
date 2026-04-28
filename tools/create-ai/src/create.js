import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTemplate, getProvider, defaultFiles } from './templates.js';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

export async function createAIProject(options) {
  const { name, template, provider, install = true, interactive = true } = options;

  const targetDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(targetDir)) {
    throw new Error(`Directory "${name}" already exists`);
  }

  const templateConfig = getTemplate(template);
  const providerConfig = getProvider(provider);

  logger.info(`Creating ${templateConfig.description} app: ${name}`);

  fs.mkdirSync(targetDir, { recursive: true });

  createFromTemplate(targetDir, templateConfig.name, providerConfig);

  if (install) {
    logger.info('Installing dependencies...');
    await installDependencies(targetDir);
  }

  logger.success(`\nDone! Created ${name}`);
  logger.info(`
Next steps:
  cd ${name}
  ${install ? '' : 'pnpm install'}
  pnpm dev
  `);
}

function createFromTemplate(dir, templateName, provider) {
  const packageJson = defaultFiles['package.json'].template(
    path.basename(dir),
    provider
  );

  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  fs.mkdirSync(path.join(dir, 'src', 'lib'), { recursive: true });

  fs.writeFileSync(
    path.join(dir, 'src', 'lib', 'ai.ts'),
    defaultFiles['src/lib/ai.ts'].template(null, provider)
  );

  if (templateName.startsWith('next')) {
    fs.mkdirSync(path.join(dir, 'src', 'app'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'src', 'app', 'page.tsx'),
      getNextPage(templateName)
    );
    fs.writeFileSync(
      path.join(dir, 'src', 'app', 'layout.tsx'),
      `'use client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
`
    );
    fs.writeFileSync(
      path.join(dir, 'src', 'app', 'globals.css'),
      `body {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
`
    );
  }

  if (templateName === 'node') {
    fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'src', 'index.ts'),
      getNodeIndex()
    );
  }
}

function getNextPage(templateName) {
  return `'use client';

import { useState } from 'react';
import { generateText } from 'ai';
import { ${templateName === 'next-rsc' ? 'google' : 'openai'} } from '@ai-toolkit/${templateName === 'next-rsc' ? 'google' : 'openai'}';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { text } = await generateText({
        model: ${templateName === 'next-rsc' ? 'google' : 'openai'}('${templateName === 'next-rsc' ? 'gemini-2-flash' : 'gpt-4o'}'),
        prompt: input,
      });
      setOutput(text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main>
      <h1>AI Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {output && <article>{output}</article>}
    </main>
  );
}
`;
}

function getNodeIndex() {
  return `import { generateText } from 'ai';
import { openai } from '@ai-toolkit/openai';

const prompt = process.argv[2] || 'Hello';

async function main() {
  const result = await generateText({
    model: openai('gpt-4o'),
    prompt,
  });

  console.log(result.text);
}

main().catch(console.error);
`;
}

async function installDependencies(dir) {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    await execAsync('pnpm install', { cwd: dir, stdio: 'ignore' });
  } catch {
    try {
      await execAsync('npm install', { cwd: dir, stdio: 'ignore' });
    } catch {
      logger.warn('Could not install dependencies automatically');
    }
  }
}