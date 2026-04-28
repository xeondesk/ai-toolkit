'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { aiProviders, type AIProvider } from '@/lib/providers';
import { Search, ChevronDown } from 'lucide-react';
import { ProviderCard } from '@/components/provider-card';
import { ModelBadge } from '@/components/model-badge';

interface ProviderSelectorProps {
  selectedProvider: string;
  selectedModel: string;
  onProviderChange: (providerId: string) => void;
  onModelChange: (modelId: string) => void;
}

export function ProviderSelector({
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange,
}: ProviderSelectorProps) {
  const [isProviderOpen, setIsProviderOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProvider = aiProviders.find(p => p.id === selectedProvider);
  const currentModels = currentProvider?.models || [];

  // Filter providers based on search
  const filteredProviders = aiProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsProviderOpen(false);
        setIsModelOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProviderSelect = (providerId: string) => {
    onProviderChange(providerId);
    const provider = aiProviders.find(p => p.id === providerId);
    if (provider && provider.models.length > 0) {
      onModelChange(provider.models[0]);
    }
    setIsProviderOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Provider Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            AI Provider
          </label>
          <span className="text-xs text-muted-foreground">
            {aiProviders.length} available
          </span>
        </div>

        {/* Provider Grid - Always visible, with overflow handling */}
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isSelected={selectedProvider === provider.id}
              onSelect={handleProviderSelect}
              modelCount={provider.models.length}
            />
          ))}
        </div>

        {/* Search field (only visible on desktop or when expanded) */}
        <div className="hidden sm:block relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search providers..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-3 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Model
          </label>
          <span className="text-xs text-muted-foreground">
            {currentModels.length} available
          </span>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="w-full justify-between"
            disabled={!currentProvider}
          >
            <span className="truncate text-sm">
              {selectedModel || 'Select Model'}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isModelOpen ? 'rotate-180' : ''}`} />
          </Button>

          {/* Model dropdown with improved styling */}
          {isModelOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              <div className="max-h-48 overflow-y-auto p-2 space-y-2">
                {currentModels.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      onModelChange(model);
                      setIsModelOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                      model === selectedModel
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Model badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {currentModels.slice(0, 3).map((model) => (
            <ModelBadge
              key={model}
              modelName={model}
              isSelected={model === selectedModel}
              onSelect={onModelChange}
            />
          ))}
          {currentModels.length > 3 && (
            <button className="text-xs text-muted-foreground hover:text-foreground py-1 px-2">
              +{currentModels.length - 3} more
            </button>
          )}
        </div>
      </div>

      {/* Provider Info Card */}
      {currentProvider && (
        <div className="border-t border-border pt-6">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Current Provider
            </p>
            <p className="text-lg font-bold text-foreground">
              {currentProvider.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentModels.length} models available • Using <span className="text-primary font-semibold">{selectedModel}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
