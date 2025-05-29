
import React from 'react';
import { OpenRouterPrompt } from '@/components/OpenRouterPrompt';
import { SavedResponses } from '@/components/SavedResponses';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, History, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

// Get the API key from environment variables
const defaultApiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';

const OpenRouterAPI = () => {
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">OpenRouter API Integration</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center">
          Access GPT-4, Claude, Llama and other cutting-edge AI models
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
              <li><strong>GPT-4 Omni:</strong> Most capable OpenAI model with vision support</li>
              <li><strong>Claude 3.5 Sonnet:</strong> Latest Anthropic model with enhanced reasoning</li>
              <li><strong>Llama 3.1 70B:</strong> Most capable open-source model</li>
              <li><strong>GPT-4 Omni Mini:</strong> Fast and cost-effective for most tasks</li>
            </ul>
          </div>
          <OpenRouterPrompt defaultApiKey={defaultApiKey} />
        </TabsContent>
        
        <TabsContent value="history">
          <SavedResponses />
        </TabsContent>
      </Tabs>
      
      <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t text-center text-xs sm:text-sm text-muted-foreground">
        <p>To use this feature, you will need an OpenRouter API key. You can get one from the <a href="https://openrouter.ai/keys" className="text-primary hover:underline" target="_blank" rel="noreferrer">OpenRouter Console</a>.</p>
      </footer>
    </div>
  );
};

export default OpenRouterAPI;
