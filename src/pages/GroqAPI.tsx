
import React from 'react';
import { GroqPrompt } from '@/components/GroqPrompt';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

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
        <GroqPrompt />
      </div>
      
      <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>To use this feature, you will need a Groq API key. You can get one from the <a href="https://console.groq.com/keys" className="text-primary hover:underline" target="_blank" rel="noreferrer">Groq Console</a>.</p>
      </footer>
    </div>
  );
};

export default GroqAPI;
