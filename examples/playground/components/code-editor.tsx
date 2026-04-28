'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Copy, Download, Check, Zap } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onGenerate?: (prompt: string) => void;
  isGenerating?: boolean;
}

export function CodeEditor({ 
  initialCode = '', 
  language = 'typescript',
  onGenerate,
  isGenerating = false 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [prompt, setPrompt] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${language === 'typescript' ? 'ts' : 'js'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (prompt.trim() && onGenerate) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Code Generation</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!code}
              className="smooth-transition"
            >
              {copiedCode ? (
                <>
                  <Check className="h-4 w-4 mr-1.5 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!code}
              className="hidden sm:flex smooth-transition"
            >
              <Download className="h-4 w-4 mr-1.5" />
              Download
            </Button>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground block">
            Generate Code Prompt
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isGenerating && prompt.trim()) {
                  handleGenerate();
                }
              }}
              placeholder="Describe the code you want to generate..."
              className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="h-10 px-4 smooth-transition"
              size="sm"
            >
              {isGenerating ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1.5" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4 sm:p-6 overflow-hidden flex flex-col">
        <div className="relative flex-1 flex flex-col">
          <div className="absolute top-2 right-2 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded z-10">
            {language}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Your ${language} code will appear here...\n// Start by entering a prompt above`}
            className="flex-1 w-full p-4 font-mono text-sm bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary smooth-transition text-foreground placeholder-muted-foreground"
            spellCheck={false}
          />

          {/* Info Badge */}
          {code && (
            <div className="mt-3 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded">
              {code.split('\n').length} lines • {code.length} characters
            </div>
          )}
        </div>
      </div>

      {/* Status Message */}
      {isGenerating && (
        <div className="border-t border-border px-4 sm:px-6 py-3 bg-primary/5 text-sm text-primary flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Generating code...
        </div>
      )}
    </div>
  );
}
