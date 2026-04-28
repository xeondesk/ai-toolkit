'use client';

import { Check, Zap } from 'lucide-react';
import type { AIProvider } from '@/lib/providers';

interface ProviderCardProps {
  provider: AIProvider;
  isSelected: boolean;
  onSelect: (providerId: string) => void;
  modelCount: number;
}

export function ProviderCard({
  provider,
  isSelected,
  onSelect,
  modelCount,
}: ProviderCardProps) {
  return (
    <button
      onClick={() => onSelect(provider.id)}
      className={`provider-card group relative w-full text-left transition-all ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
          : 'hover:border-primary/30'
      }`}
    >
      {/* Gradient accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 rounded-lg" />
      </div>

      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-base group-hover:text-primary smooth-transition">
                {provider.name}
              </h3>
              {isSelected && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {modelCount} model{modelCount !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={`rounded-lg p-2 ${
            isSelected
              ? 'bg-primary/20 text-primary'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          } smooth-transition`}>
            <Zap className="h-4 w-4" />
          </div>
        </div>

        {/* Model preview */}
        <div className="flex flex-wrap gap-1">
          {provider.models.slice(0, 2).map((model) => (
            <span
              key={model}
              className="inline-block text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded truncate"
            >
              {model}
            </span>
          ))}
          {modelCount > 2 && (
            <span className="inline-block text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
              +{modelCount - 2}
            </span>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      {isSelected && (
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-br from-primary to-accent opacity-0 blur group-hover:opacity-20 smooth-transition" />
      )}
    </button>
  );
}
