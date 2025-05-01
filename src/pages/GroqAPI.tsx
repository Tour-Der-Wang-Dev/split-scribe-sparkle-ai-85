
import React from 'react';
import { GroqPrompt } from '@/components/GroqPrompt';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// Get the API key from environment variables
const defaultApiKey = import.meta.env.VITE_GROQ_API_KEY || '';

const GroqAPI = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Groq API Integration</h1>
        <p className="text-muted-foreground mb-4">
          Generate text using Groq's powerful language models
        </p>
        <Button asChild className="mb-4">
          <Link to="/prompt-engineering">
            <Sparkles className="mr-2 h-4 w-4" />
            Try Prompt Engineering
          </Link>
        </Button>
      </header>
      
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Available Models</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Llama 3.1 70B:</strong> Most capable Llama model for versatile tasks</li>
            <li><strong>Llama 3.1 8B:</strong> Fast and efficient for routine tasks</li>
            <li><strong>Mixtral 8x7B:</strong> Strong performance across various domains</li>
            <li><strong>Gemma 7B:</strong> Google's lightweight yet capable model</li>
          </ul>
        </div>
        <GroqPrompt defaultApiKey={defaultApiKey} />
      </div>
      
      <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>To use this feature, you will need a Groq API key. You can get one from the <a href="https://console.groq.com/keys" className="text-primary hover:underline" target="_blank" rel="noreferrer">Groq Console</a>.</p>
      </footer>
    </div>
  );
};

export default GroqAPI;
