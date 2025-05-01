
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { GroqService } from "@/services/GroqService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponseHistoryService } from '@/services/ResponseHistoryService';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface GroqPromptProps {
  initialPrompt?: string;
  defaultApiKey?: string;
}

// Available Groq models
const GROQ_MODELS = [
  { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B' },
  { id: 'llama-3.1-8b-versatile', name: 'Llama 3.1 8B' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
  { id: 'gemma-7b-it', name: 'Gemma 7B' }
];

export function GroqPrompt({ initialPrompt = '', defaultApiKey = '' }: GroqPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(GROQ_MODELS[0].id);
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter your Groq API key");
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
      const response = await GroqService.generateContent(prompt, apiKey, selectedModel);
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
            Groq API Key
          </label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Groq API key"
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
              {GROQ_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Different models have different capabilities and pricing
          </p>
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
