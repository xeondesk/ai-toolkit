'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Bot, User, Copy, Check } from 'lucide-react';
import { MessageSkeleton } from '@/components/loading-skeleton';

interface ChatInterfaceProps {
  providerId: string;
  modelId: string;
}

export function ChatInterface({ providerId, modelId }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input: currentInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      providerId,
      modelId,
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isLoading) {
      handleSubmit(e);
    }
  };

  const copyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] border border-border rounded-lg bg-card overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">
              Start a conversation
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Chat with {modelId} powered by AI Toolkit
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 fade-in ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg group relative ${
                  message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 smooth-transition ${
                    message.role === 'user'
                      ? 'message-user shadow-lg shadow-primary/10'
                      : 'message-assistant'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                </div>

                {/* Copy button */}
                {message.role === 'assistant' && (
                  <button
                    onClick={() => copyMessage(message.content, message.id)}
                    className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 smooth-transition p-1 hover:bg-muted rounded"
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                )}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-end gap-3 fade-in">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="h-4 w-4 text-accent-foreground animate-pulse" />
              </div>
            </div>
            <div className="max-w-xs sm:max-w-md message-assistant rounded-2xl px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={onSubmit} className="border-t border-border bg-card p-4 sm:p-6">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary smooth-transition placeholder-muted-foreground"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {currentInput.length > 0 && `${currentInput.length} chars`}
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !currentInput.trim()}
            size="icon"
            className="h-10 w-10 rounded-lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {isLoading && (
          <p className="text-xs text-muted-foreground mt-2">
            Waiting for response...
          </p>
        )}
      </form>
    </div>
  );
}
