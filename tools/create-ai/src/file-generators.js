// AI TOOLKIT App Scaffolding — File Content Generators (Next.js & Vite templates)
// ---------------------------------------------------------------------------

// Shared snippets ----------------------------------------------------------

export function gitignoreDeps() {
  return `# Dependencies
node_modules

# Build output
.next
dist
out
build

# Environment
.env
.env.local

# TypeScript
*.tsbuildinfo

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
`;
}

export function tailwindConfig(contentPattern) {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [${contentPattern}],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
}

export function postcssConfig() {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

export function nextConfig() {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
`;
}

export function nextLayout(title, description) {
  return `import './styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

export function nextGlobalsCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 56.7%;
    --border: 214.3 32% 91%;
    --input: 214.3 32% 91%;
    --ring: 262.1 83.3% 57.8%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 213 31% 91%;
    --card: 222 47.4% 11.2%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47.4% 11.2%;
    --popover-foreground: 210 40% 98%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    --muted: 212 32.5% 14.6%;
    --muted-foreground: 214.3 32% 62.8%;
    --border: 214.3 32% 80%;
    --input: 214.3 32% 80%;
    --ring: 262.2 83.3% 57.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
}
`;
}

export function nextEslint() {
  return `import next from 'eslint-config-next';

export default [...next.coreDirs, ...next.typescriptDirs];
`;
}

export function viteEslint(plugins) {
  return `import js from '@eslint/js';
${plugins}

export default [
  js.configs.recommended,
];
`;
}

export function envExample(provider) {
  return `# ${provider.name.toUpperCase()} API key\n${provider.name.toUpperCase()}_API_KEY=your-api-key-here\n`;
}

export function envLocalExampleNext(provider) {
  return `# ${provider.name.toUpperCase()} API key\n${provider.name.toUpperCase()}_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\n# Optional: Override the default model\n${provider.name.toUpperCase()}_MODEL=${provider.models[0]}\n`;
}

export function chatInputTsx() {
  return `'use client';

import { Send, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  onStop?: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSubmit,
  onStop,
  loading,
  placeholder = 'Ask something...',
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target.elements.text as HTMLInputElement).value;
        if (input.trim() && !loading) {
          onSubmit(input.trim());
          (e.target as HTMLFormElement).reset();
        }
      }}
      className="flex gap-2"
    >
      <input
        name="text"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      {loading ? (
        <button
          type="button"
          onClick={onStop}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <StopCircle size={20} />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!('text' in {})}
          className="p-2 text-blue-500 hover:text-blue-700 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      )}
    </form>
  );
}
`;
}

// ---------------------------------------------------------------------------
// Next.js React template
// ---------------------------------------------------------------------------

export function nextReactFiles(projectName, provider) {
  const p = provider;
  return {
    'package.json': JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          ai: 'latest',
          '@ai-toolkit/react': 'latest',
          [p.package]: 'latest',
          next: '^15',
          react: '^19',
          'react-dom': '^19',
          tailwindcss: '^3',
          'lucide-react': '^0.545',
        },
        devDependencies: {
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
      },
      null,
      2,
    ) + '\n',
    'next.config.js': nextConfig(),
    'tsconfig.json': JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          lib: ['DOM', 'DOM.Iterable', 'ES2022'],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'react-jsx',
          incremental: true,
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ) + '\n',
    'tailwind.config.js': tailwindConfig(`['./src/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}']`),
    'postcss.config.js': postcssConfig(),
    'eslint.config.mjs': nextEslint(),
    '.env.local.example': envLocalExampleNext(p),
    '.gitignore': gitignoreDeps(),
    'README.md': `# ${projectName}\n\nA Next.js + React chat application powered by the AI TOOLKIT with ${p.name}.\n\n## Getting Started\n\n\`\`\`bash\n# Install dependencies\npnpm install\n\n# Set your API key\necho "${p.name.toUpperCase()}_API_KEY=your-key-here" >> .env.local\n\n# Run the development server\npnpm dev\n\`\`\`\n\nOpen [http://localhost:3000](http://localhost:3000) to chat.\n\n## Provider\n\n${p.name} • Models: ${p.models.join(', ')}\n`,
    'src/app/layout.tsx': nextLayout('AI Chat', 'A streaming chat app powered by the AI TOOLKIT'),
    'src/styles/globals.css': nextGlobalsCss(),
    'src/lib/ai.ts': `import { ${p.importName} } from '${p.package}';
import { generateText, streamText, generateObject } from 'ai';
import { z } from 'zod';

// Single text completion
export async function generateCompletion(prompt: string) {
  const result = await generateText({
    model: ${p.importName}('${p.models[0]}'),
    prompt,
  });
  return result.text;
}

// Streaming completion
export async function* streamCompletion(prompt: string) {
  const result = streamText({
    model: ${p.importName}('${p.models[0]}'),
    prompt,
  });

  for await (const chunk of result.textStream) {
    yield chunk;
  }
}

// Structured output
export async function summarize(text: string) {
  const { object } = await generateObject({
    model: ${p.importName}('${p.models[0]}'),
    schema: z.object({
      summary: z.string(),
      keyPoints: z.array(z.string()),
    }),
    prompt: \`Summarize this text:\n\n\${text}\`,
  });
  return object;
}
`,
    'src/app/api/chat/route.ts': `import { ${p.importName} } from '${p.package}';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: ${p.importName}('${p.models[0]}'),
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ totalUsage }) => {
      console.log('Finished', totalUsage);
    },
  });
}
`,
    'src/components/chat-input.tsx': chatInputTsx(),
    'src/app/page.tsx': `'use client';

import { useChat } from '@ai-toolkit/react';
import ChatInput from '@/components/chat-input';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
  } = useChat();

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col max-w-3xl mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>

      <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === 'user'
              ? 'p-3 rounded-lg bg-blue-100 ml-auto max-w-[80%]'
              : 'p-3 rounded-lg bg-gray-100 mr-auto max-w-[80%]'
            }
          >
            {m.parts.map((part, i) => {
              if (part.type === 'text') {
                return <span key={i} className="whitespace-pre-wrap">{part.text}</span>;
              }
              return null;
            })}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error.message}</div>}

      <ChatInput
        onSubmit={(text) => handleSubmit({ target: { value: text } } as any)}
        onStop={stop}
        loading={isLoading}
      />
    </div>
  );
}
`,
  };
}

// ---------------------------------------------------------------------------
// Next.js Agent template
// ---------------------------------------------------------------------------

export function nextAgentFiles(projectName, provider) {
  const p = provider;
  return {
    'package.json': JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          ai: 'latest',
          '@ai-toolkit/react': 'latest',
          [p.package]: 'latest',
          next: '^15',
          react: '^19',
          'react-dom': '^19',
          tailwindcss: '^3',
          'lucide-react': '^0.545',
        },
        devDependencies: {
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
      },
      null,
      2,
    ) + '\n',
    'next.config.js': nextConfig(),
    'tsconfig.json': JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          lib: ['DOM', 'DOM.Iterable', 'ES2022'],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'react-jsx',
          incremental: true,
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ) + '\n',
    'tailwind.config.js': tailwindConfig(`['./src/**/*.{js,ts,jsx,tsx}']`),
    'postcss.config.js': postcssConfig(),
    'eslint.config.mjs': nextEslint(),
    '.env.local.example': envLocalExampleNext(p),
    '.gitignore': gitignoreDeps(),
    'README.md': `# ${projectName}\n\nA Next.js agentic application with tools and multi-step execution, powered by the AI TOOLKIT + ${p.name}.\n\n## Features\n\n- Multi-step agent loop with up to 5 tool calls\n- Weather tool integration (mock data)\n- Streaming responses\n- Error handling and stop button\n\n## Getting Started\n\n\`\`\`bash\npnpm install\npnpm dev\n\`\`\`\n`,
    'src/app/layout.tsx': nextLayout('AI Agent', 'A multi-step AI agent with tool calling'),
    'src/styles/globals.css': nextGlobalsCss(),
    'src/lib/ai.ts': `import { ${p.importName} } from '${p.package}';

export const aiProvider = ${p.importName}('${p.models[0]}');
`,
    'src/tools/weather-tool.ts': `import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the current weather for a location',
  parameters: z.object({
    location: z.string().describe('The city and state to get weather for'),
  }),
  execute: async ({ location }) => {
    // In production, call a real weather API
    return {
      location,
      temperature: Math.floor(Math.random() * 30) + 30,
      condition: 'sunny',
      humidity: 45,
      forecast: 'Expect conditions to remain similar throughout the day.',
    };
  },
});
`,
    'src/app/api/agent/route.ts': `import { ${p.importName} } from '${p.package}';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { weatherTool } from '@/tools/weather-tool';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: ${p.importName}('${p.models[0]}'),
    messages: await convertToModelMessages(messages),
    tools: { weather: weatherTool },
    maxSteps: 5,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
`,
    'src/components/chat-input.tsx': `'use client';

import { Send, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  onStop?: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSubmit,
  onStop,
  loading,
  placeholder = 'Ask something...',
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target.elements.text as HTMLInputElement).value;
        if (input.trim() && !loading) {
          onSubmit(input.trim());
          (e.target as HTMLFormElement).reset();
        }
      }}
      className="flex gap-2"
    >
      <input
        name="text"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      {loading ? (
        <button type="button" onClick={onStop} className="p-2 text-gray-500 hover:text-gray-700">
          <StopCircle size={20} />
        </button>
      ) : (
        <button type="submit" className="p-2 text-blue-500 hover:text-blue-700">
          <Send size={20} />
        </button>
      )}
    </form>
  );
}
`,
    'src/components/chat-interface.tsx': `'use client';

import { useChat } from '@ai-toolkit/react';
import ChatInput from '@/components/chat-input';
import { useEffect, useRef } from 'react';

export default function ChatInterface() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
  } = useChat({ maxSteps: 5 });

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col max-w-3xl mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Agent</h1>

      <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === 'user'
              ? 'p-3 rounded-lg bg-blue-100 ml-auto max-w-[80%]'
              : 'p-3 rounded-lg bg-gray-100 mr-auto max-w-[80%]'
            }
          >
            {m.parts.map((part, i) => {
              if (part.type === 'text') {
                return <span key={i} className="whitespace-pre-wrap">{part.text}</span>;
              }
              if (part.type === 'tool-indicator') {
                return <div key={i} className="text-xs text-gray-500 mb-1">🛠 {part.toolInvocation?.toolName}</div>;
              }
              if (part.type === 'tool-output') {
                return <div key={i} className="text-xs text-gray-600">→ {JSON.stringify(part.toolOutput?.output).slice(0, 100)}...</div>;
              }
              return null;
            })}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error.message}</div>}

      <ChatInput
        onSubmit={(text) => handleSubmit({ target: { value: text } } as any)}
        onStop={stop}
        loading={isLoading}
      />
    </div>
  );
}
`,
    'src/app/page.tsx': `'use client';

import ChatInterface from '@/components/chat-interface';

export default function Page() {
  return <ChatInterface />;
}
`,
  };
}

// ---------------------------------------------------------------------------
// Next.js RSC template
// ---------------------------------------------------------------------------

export function nextRscFiles(projectName, provider) {
  const p = provider;
  return {
    'package.json': JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          ai: 'latest',
          '@ai-toolkit/react': 'latest',
          '@ai-toolkit/rsc': 'latest',
          [p.package]: 'latest',
          next: '^15',
          react: '^19',
          'react-dom': '^19',
          tailwindcss: '^3',
          'lucide-react': '^0.545',
        },
        devDependencies: {
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
      },
      null,
      2,
    ) + '\n',
    'next.config.js': nextConfig(),
    'tsconfig.json': JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          lib: ['DOM', 'DOM.Iterable', 'ES2022'],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'react-jsx',
          incremental: true,
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ) + '\n',
    'tailwind.config.js': tailwindConfig(`['./src/**/*.{js,ts,jsx,tsx}']`),
    'postcss.config.js': postcssConfig(),
    'eslint.config.mjs': nextEslint(),
    '.env.local.example': envLocalExampleNext(p),
    '.gitignore': gitignoreDeps(),
    'README.md': `# ${projectName}\n\nNext.js app with React Server Components and server actions, powered by the AI TOOLKIT + ${p.name}.\n`,
    'src/app/layout.tsx': nextLayout('AI Chat (RSC)', 'AI chat using React Server Components'),
    'src/styles/globals.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
    'src/app/actions.ts': `import { ${p.importName} } from '${p.package}';
import { streamText } from 'ai';

export async function* chat(messages: any[]) {
  const result = streamText({
    model: ${p.importName}('${p.models[0]}'),
    messages,
  });

  for await (const chunk of result.textStream) {
    yield chunk;
  }
}
`,
    'src/app/page.tsx': `'use client';

import { useState } from 'react';
import { chat } from '@/app/actions';
import { Send } from 'lucide-react';

export default function Page() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const stream = await chat([...messages, userMessage]);
    let assistantReply = '';
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    for await (const chunk of stream) {
      assistantReply += chunk;
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = assistantReply;
        return newMessages;
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat (RSC)</h1>
      <div className="space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="font-semibold capitalize">{m.role}:</span> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 border rounded-md"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} className="p-2 text-blue-500">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
`,
    'src/lib/ai.ts': `import { ${p.importName} } from '${p.package}';
export const ai = ${p.importName}('${p.models[0]}');
`,
  };
}
