
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { OpenRouterService } from "@/services/OpenRouterService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponseHistoryService } from '@/services/ResponseHistoryService';
import { Bookmark, BookmarkCheck, Zap } from 'lucide-react';

interface OpenRouterPromptProps {
  initialPrompt?: string;
  defaultApiKey?: string;
}

export function OpenRouterPrompt({ initialPrompt = '', defaultApiKey = '' }: OpenRouterPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(OpenRouterService.MODELS[1].id); // Default to GPT-4 Omni Mini
  const [isSaved, setIsSaved] = useState(false);
  
  // Set the initial prompt and API key when provided
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
    if (defaultApiKey) {
      setApiKey(defaultApiKey);
    }
  }, [initialPrompt, defaultApiKey]);
  
  const selectedModelInfo = OpenRouterService.MODELS.find(model => model.id === selectedModel);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter your OpenRouter API key");
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setLoading(true);
    setResult('');
    setIsSaved(false);
    
    try {
      const response = await OpenRouterService.generateContent(prompt, apiKey, selectedModel);
      setResult(response);
      toast.success("Response generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = () => {
    if (result && prompt) {
      ResponseHistoryService.saveResponse(prompt, result, selectedModel);
      setIsSaved(true);
      toast.success("Response saved successfully!");
      
      // Trigger storage event to update other components
      window.dispatchEvent(new Event('storage'));
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="block text-sm font-medium">
            OpenRouter API Key
          </label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenRouter API key"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Your API key is never stored or sent to our servers
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="model" className="block text-sm font-medium">
            Model
          </label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {OpenRouterService.MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ${model.pricing.prompt}/1M tokens
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedModelInfo && (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>{selectedModelInfo.description}</p>
              <p>
                <Zap className="h-3 w-3 inline mr-1" />
                Prompt: {selectedModelInfo.pricing.prompt}/1M • Completion: {selectedModelInfo.pricing.completion}/1M
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium">
            Prompt
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="min-h-[120px] w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Generating..." : "Generate Response"}
        </Button>
      </Card>
      
      {result && (
        <Card className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">Result</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
            {result}
          </div>
        </Card>
      )}
    </div>
  );
}
