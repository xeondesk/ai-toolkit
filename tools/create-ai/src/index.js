#!/usr/bin/env node

import { createAIProject } from './src/create.js';
import { parseArgs } from './src/args.js';
import { logger } from './src/logger.js';

const main = async () => {
  const args = parseArgs(process.argv);

  if (args.help) {
    logger.info(`
AI App Scaffolder

Usage: create-ai <project-name> [options]

Options:
  --template <name>    Template to use (next-react, next-rsc, vite-react, vue, svelte, node)
  --provider <name>   AI provider (openai, anthropic, google, azure, bedrock)
  --no-install      Skip dependency installation
  --yes, -y        Skip prompts and use defaults
  --help           Show this help message

Examples:
  create-ai my-chat-app
  create-ai my-app --template next-react --provider openai
  create-ai my-app -y --no-install

Templates:
  • next-react    Next.js + React
  • next-rsc    Next.js + React Server Components
  • vite-react  Vite + React
  • vue        Vue 3
  • svelte    SvelteKit
  • node      Node.js API

Providers:
  • openai    OpenAI (GPT-4, GPT-4o)
  • anthropic Anthropic (Claude)
  • google   Google (Gemini)
  • azure   Azure OpenAI
  • bedrock  AWS Bedrock
`);
    process.exit(0);
  }

  const { name, template, provider, noInstall, skipPrompts } = args;

  try {
    await createAIProject({
      name,
      template: template || (skipPrompts ? 'next-react' : undefined),
      provider: provider || (skipPrompts ? 'openai' : undefined),
      install: !noInstall,
      interactive: !skipPrompts,
    });
  } catch (error) {
    logger.error(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
};

main();