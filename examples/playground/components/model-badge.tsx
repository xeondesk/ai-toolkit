'use client';

import { Check } from 'lucide-react';

interface ModelBadgeProps {
  modelName: string;
  isSelected: boolean;
  onSelect: (modelName: string) => void;
}

export function ModelBadge({
  modelName,
  isSelected,
  onSelect,
}: ModelBadgeProps) {
  return (
    <button
      onClick={() => onSelect(modelName)}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium smooth-transition ${
        isSelected
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
          : 'bg-muted text-foreground hover:bg-muted/80 hover:border-primary/30'
      } border border-transparent`}
    >
      {modelName}
      {isSelected && (
        <Check className="h-3 w-3 ml-1" />
      )}

      {isSelected && (
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-primary to-accent opacity-20 blur" />
      )}
    </button>
  );
}
