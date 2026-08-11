// AI TOOLKIT App Scaffolding — Template & Provider Metadata
// ----------------------------------------------------------

export const providers = {
  openai: {
    name: 'openai',
    package: '@ai-toolkit/openai',
    importName: 'openai',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4.1', 'o1', 'o1-mini'],
  },
  anthropic: {
    name: 'anthropic',
    package: '@ai-toolkit/anthropic',
    importName: 'anthropic',
    models: [
      'claude-3-7-sonnet-20250219',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
    ],
  },
  google: {
    name: 'google',
    package: '@ai-toolkit/google',
    importName: 'google',
    models: ['gemini-2-flash', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-1.5-pro'],
  },
  azure: {
    name: 'azure',
    package: '@ai-toolkit/azure',
    importName: 'azure',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  },
  bedrock: {
    name: 'bedrock',
    package: '@ai-toolkit/amazon-bedrock',
    importName: 'bedrock',
    models: ['claude-3-7-sonnet', 'llama-3-1-405b', 'amazon.nova'],
  },
  groq: {
    name: 'groq',
    package: '@ai-toolkit/groq',
    importName: 'groq',
    models: ['llama-3-70b', 'mixtral-8x7b', 'gemma2-9b'],
  },
  deepseek: {
    name: 'deepseek',
    package: '@ai-toolkit/deepseek',
    importName: 'deepseek',
    models: ['deepseek-chat', 'deepseek-coder'],
  },
  xai: {
    name: 'xai',
    package: '@ai-toolkit/xai',
    importName: 'xai',
    models: ['grok-2', 'grok-2-vision', 'grok-beta'],
  },
};

// ---------------------------------------------------------------------------
// Template definitions
// ---------------------------------------------------------------------------

export const templates = {
  'next-react': {
    name: 'next-react',
    description: 'Next.js + React chat app with streaming via useChat',
    framework: 'nextjs',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/react': 'latest',
      [p.package]: 'latest',
      next: '^15',
      react: '^19',
      'react-dom': '^19',
      tailwindcss: '^3',
      'lucide-react': '^0.545',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      '@tailwindcss/postcss7-compat': '^2',
      autoprefixer: '^10',
      eslint: '^8',
      'eslint-config-next': '^15',
      postcss: '^8',
      tailwindcss: '^3',
      typescript: '^5',
    },
    packageJsonScripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    files: [
      'package.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.local.example',
      '.gitignore',
      'README.md',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/api/chat/route.ts',
      'src/lib/ai.ts',
      'src/components/chat-input.tsx',
      'src/styles/globals.css',
    ],
  },

  'next-agent': {
    name: 'next-agent',
    description: 'Next.js agentic app with tools, streaming, and multi-step execution',
    framework: 'nextjs',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/react': 'latest',
      [p.package]: 'latest',
      next: '^15',
      react: '^19',
      'react-dom': '^19',
      tailwindcss: '^3',
      'lucide-react': '^0.545',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      '@tailwindcss/postcss7-compat': '^2',
      autoprefixer: '^10',
      eslint: '^8',
      'eslint-config-next': '^15',
      postcss: '^8',
      tailwindcss: '^3',
      typescript: '^5',
    },
    packageJsonScripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    files: [
      'package.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.local.example',
      '.gitignore',
      'README.md',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/api/agent/route.ts',
      'src/lib/ai.ts',
      'src/components/chat-interface.tsx',
      'src/components/chat-input.tsx',
      'src/tools/weather-tool.ts',
      'src/styles/globals.css',
    ],
  },

  'next-rsc': {
    name: 'next-rsc',
    description: 'Next.js with React Server Components and server actions',
    framework: 'nextjs',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/react': 'latest',
      '@ai-toolkit/rsc': 'latest',
      [p.package]: 'latest',
      next: '^15',
      react: '^19',
      'react-dom': '^19',
      tailwindcss: '^3',
      'lucide-react': '^0.545',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      '@tailwindcss/postcss7-compat': '^2',
      autoprefixer: '^10',
      eslint: '^8',
      'eslint-config-next': '^15',
      postcss: '^8',
      tailwindcss: '^3',
      typescript: '^5',
    },
    packageJsonScripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    files: [
      'package.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.local.example',
      '.gitignore',
      'README.md',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/actions.ts',
      'src/lib/ai.ts',
      'src/styles/globals.css',
    ],
  },

  'vite-react': {
    name: 'vite-react',
    description: 'Vite + React chat app with client-side streaming',
    framework: 'vite',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/react': 'latest',
      [p.package]: 'latest',
      react: '^19',
      'react-dom': '^19',
      tailwindcss: '^3',
      'lucide-react': '^0.545',
      dotenv: '^16',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      '@vitejs/plugin-react': '^5',
      eslint: '^8',
      typescript: '^5',
      vite: '^5',
    },
    packageJsonScripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      lint: 'eslint . --ext .ts,.tsx',
    },
    files: [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.example',
      '.gitignore',
      'README.md',
      'index.html',
      'src/main.tsx',
      'src/App.tsx',
      'src/lib/ai.ts',
      'src/components/chat-input.tsx',
      'src/components/chat-interface.tsx',
      'src/styles/globals.css',
    ],
  },

  vue: {
    name: 'vue',
    description: 'Vue 3 + Vite chat app with streaming',
    framework: 'vite',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/vue': 'latest',
      [p.package]: 'latest',
      vue: '^3',
      tailwindcss: '^3',
      'lucide-vue-next': '^0.545',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@vitejs/plugin-vue': '^5',
      eslint: '^8',
      typescript: '^5',
      'vue-tsc': '^2',
      vite: '^5',
    },
    packageJsonScripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      lint: 'eslint . --ext .ts,.vue',
    },
    files: [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.example',
      '.gitignore',
      'README.md',
      'index.html',
      'src/main.ts',
      'src/App.vue',
      'src/lib/ai.ts',
      'src/components/ChatInput.vue',
      'src/components/ChatInterface.vue',
      'src/styles/globals.css',
    ],
  },

  svelte: {
    name: 'svelte',
    description: 'SvelteKit chat app with streaming',
    framework: 'svelte',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      '@ai-toolkit/svelte': 'latest',
      [p.package]: 'latest',
      svelte: '^2',
      tailwindcss: '^3',
      'lucide-svelte': '^0.545',
    }),
    packageJsonDevDeps: {
      '@types/node': '^20',
      '@sveltejs/adapter-auto': '^3',
      '@sveltejs/kit': '^2',
      '@sveltejs/vite-plugin-svelte': '^4',
      eslint: '^8',
      'svelte-preprocess': '^6',
      typescript: '^5',
      vite: '^5',
    },
    packageJsonScripts: {
      dev: 'vite dev',
      build: 'vite build',
      preview: 'vite preview',
      lint: 'eslint . --ext .ts,.svelte',
    },
    files: [
      'package.json',
      'svelte.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.mjs',
      '.env.example',
      '.gitignore',
      'README.md',
      'src/app.html',
      'src/routes/+page.svelte',
      'src/routes/+server.ts',
      'src/lib/ai.ts',
      'src/styles/globals.css',
    ],
  },

  node: {
    name: 'node',
    description: 'Node.js API server with streaming text generation',
    framework: 'node',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      [p.package]: 'latest',
      express: '^4',
      dotenv: '^16',
    }),
    packageJsonDevDeps: {
      '@types/express': '^4',
      '@types/node': '^20',
      tsx: '^4',
      typescript: '^5',
      eslint: '^8',
      prettier: '^3',
    },
    packageJsonScripts: {
      dev: 'tsx src/server.ts',
      start: 'node dist/server.js',
      build: 'tsc',
      lint: 'eslint src --ext .ts',
    },
    files: [
      'package.json',
      'tsconfig.json',
      'eslint.config.mjs',
      '.env.example',
      '.gitignore',
      'README.md',
      'src/server.ts',
      'src/lib/ai.ts',
    ],
  },

  'node-streaming': {
    name: 'node-streaming',
    description: 'Node.js streaming server with UIMessage streams and tools',
    framework: 'node',
    packageJsonDeps: (p) => ({
      ai: 'latest',
      [p.package]: 'latest',
      express: '^4',
      dotenv: '^16',
    }),
    packageJsonDevDeps: {
      '@types/express': '^4',
      '@types/node': '^20',
      tsx: '^4',
      typescript: '^5',
      eslint: '^8',
      prettier: '^3',
    },
    packageJsonScripts: {
      dev: 'tsx src/server.ts',
      start: 'node dist/server.js',
      build: 'tsc',
      lint: 'eslint src --ext .ts',
    },
    files: [
      'package.json',
      'tsconfig.json',
      'eslint.config.mjs',
      '.env.example',
      '.gitignore',
      'README.md',
      'src/server.ts',
      'src/lib/ai.ts',
      'src/lib/tools.ts',
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getTemplate(name) {
  return templates[name] || templates['next-react'];
}

export function getProvider(name) {
  return providers[name] || providers.openai;
}

export function getAllTemplates() {
  return Object.values(templates);
}

export function getAllProviders() {
  return Object.values(providers);
}

export function buildPackageJson(projectName, templateConfig, providerConfig) {
  return {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: templateConfig.packageJsonScripts,
    dependencies: templateConfig.packageJsonDeps(providerConfig),
    devDependencies: templateConfig.packageJsonDevDeps,
  };
}
