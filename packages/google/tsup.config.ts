import { defineConfig } from 'tsup';

const options = {
  format: ['cjs', 'esm'] as const,
  dts: true,
  sourcemap: true,
  define: {
    __PACKAGE_VERSION__: JSON.stringify(
      (await import('./package.json', { with: { type: 'json' } })).default
        .version,
    ),
  },
};

export default defineConfig(
  process.env.GOOGLE_BUILD_INTERNAL === 'true'
    ? {
        ...options,
        entry: ['src/internal/index.ts'],
        outDir: 'dist/internal',
      }
    : {
        ...options,
        entry: ['src/index.ts'],
      },
);
