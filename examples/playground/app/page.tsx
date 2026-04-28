'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Code, MessageSquare, TrendingUp, Zap, Clock } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';
import { ProviderSelector } from '@/components/provider-selector';
import { CodeEditor } from '@/components/code-editor';
import { ExampleTemplates } from '@/components/example-templates';
import { Header } from '@/components/header';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleGenerateCode = async (prompt: string) => {
    setIsGeneratingCode(true);
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          providerId: selectedProvider,
          modelId: selectedModel,
          language: 'typescript',
        }),
      });

      const result = await response.json();
      if (result.code) {
        setGeneratedCode(result.code);
      }
    } catch (error) {
      console.error('Failed to generate code:', error);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleSelectExample = (prompt: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {[
                  { id: 'chat', label: 'Chat', icon: MessageSquare },
                  { id: 'code', label: 'Code Generation', icon: Code },
                  { id: 'examples', label: 'Examples', icon: Play },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeTab === id ? 'default' : 'outline'}
                    onClick={() => setActiveTab(id)}
                    className="gap-2 smooth-transition whitespace-nowrap"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                ))}
              </div>

              {/* Content Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                  {activeTab === 'chat' && (
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                          Chat Interface
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          Interact with {selectedModel} from {selectedProvider}
                        </p>
                      </div>
                      <ChatInterface
                        providerId={selectedProvider}
                        modelId={selectedModel}
                      />
                    </div>
                  )}

                  {activeTab === 'code' && (
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                          Code Generation
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          Generate code with {selectedModel}
                        </p>
                      </div>
                      <CodeEditor
                        initialCode={generatedCode}
                        onGenerate={handleGenerateCode}
                        isGenerating={isGeneratingCode}
                      />
                    </div>
                  )}

                  {activeTab === 'examples' && (
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                          Example Templates
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          Try out pre-built examples
                        </p>
                      </div>
                      <ExampleTemplates onSelectExample={handleSelectExample} />
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Provider Selector */}
                  <div className="border border-border rounded-lg p-4 sm:p-6 bg-card sticky top-24">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>Settings</span>
                    </h3>
                    <ProviderSelector
                      selectedProvider={selectedProvider}
                      selectedModel={selectedModel}
                      onProviderChange={setSelectedProvider}
                      onModelChange={setSelectedModel}
                    />
                  </div>

                  {/* Quick Stats Card */}
                  <div className="border border-border rounded-lg p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                      <TrendingUp className="h-4 w-4" />
                      <span>Usage</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Requests
                          </span>
                        </div>
                        <span className="font-semibold text-lg text-foreground">
                          0
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted-foreground">
                            Tokens Used
                          </span>
                        </div>
                        <span className="font-semibold text-lg text-foreground">
                          0
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                        <p className="text-primary font-semibold mb-1">
                          Current: {selectedModel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Gateway Badge */}
                  <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                      Powered by
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      Vercel AI Gateway
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Unified API for all major AI providers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
