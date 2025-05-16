
import React from 'react';
import { GroqPrompt } from '@/components/GroqPrompt';
import { SavedResponses } from '@/components/SavedResponses';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, History, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

// Get the API key from environment variables
const defaultApiKey = import.meta.env.VITE_GROQ_API_KEY || '';

const GroqAPI = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4">
      <header className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/ai-tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Link>
          </Button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Groq API Integration</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center">
          Generate text using Groq's powerful language models
        </p>
        <div className="flex justify-center mb-4">
          <Button asChild size={isMobile ? "sm" : "default"}>
            <Link to="/prompt-engineering">
              <Sparkles className="mr-2 h-4 w-4" />
              Try Prompt Engineering
            </Link>
          </Button>
        </div>
      </header>
      
      <Tabs defaultValue="generate" className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <div className="mb-6 p-3 sm:p-4 bg-muted rounded-lg text-sm sm:text-base">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Available Models</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Llama 3.1 70B:</strong> Most capable Llama model for versatile tasks</li>
              <li><strong>Llama 3.1 8B:</strong> Fast and efficient for routine tasks</li>
              <li><strong>Mixtral 8x7B:</strong> Strong performance across various domains</li>
              <li><strong>Gemma 7B:</strong> Google's lightweight yet capable model</li>
            </ul>
          </div>
          <GroqPrompt defaultApiKey={defaultApiKey} />
        </TabsContent>
        
        <TabsContent value="history">
          <SavedResponses />
        </TabsContent>
      </Tabs>
      
      <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t text-center text-xs sm:text-sm text-muted-foreground">
        <p>To use this feature, you will need a Groq API key. You can get one from the <a href="https://console.groq.com/keys" className="text-primary hover:underline" target="_blank" rel="noreferrer">Groq Console</a>.</p>
      </footer>
    </div>
  );
};

export default GroqAPI;
