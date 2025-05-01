
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { GroqService } from "@/services/GroqService";

interface GroqPromptProps {
  initialPrompt?: string;
  defaultApiKey?: string;
}

export function GroqPrompt({ initialPrompt = '', defaultApiKey = '' }: GroqPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
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
    
    try {
      const response = await GroqService.generateContent(prompt, apiKey);
      setResult(response);
      toast.success("Response generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setLoading(false);
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
          <h3 className="text-lg font-medium mb-2">Result</h3>
          <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
            {result}
          </div>
        </Card>
      )}
    </div>
  );
}
