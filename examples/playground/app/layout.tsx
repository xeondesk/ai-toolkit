import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Toolkit Playground - Experiment with AI Models',
  description: 'Interactive playground for experimenting with multiple AI providers and models. Test chat, code generation, and more with OpenAI, Anthropic, Google, and 7+ more providers.',
  keywords: ['AI', 'LLM', 'playground', 'API', 'toolkit'],
  authors: [{ name: 'Vercel' }],
  openGraph: {
    title: 'AI Toolkit Playground',
    description: 'Experiment with multiple AI providers in one unified interface',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
