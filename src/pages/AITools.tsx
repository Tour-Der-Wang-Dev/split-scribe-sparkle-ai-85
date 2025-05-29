
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MessageSquare, 
  Sparkles, 
  Wand2, 
  ImagePlus, 
  AudioLines, 
  VideoIcon,
  FileText,
  Code,
  Search,
  Zap
} from 'lucide-react';

const AITools = () => {
  const tools = [
    {
      id: 'text-generation-groq',
      title: 'Groq API',
      description: 'Ultra-fast text generation using Groq\'s optimized AI models',
      icon: <Zap className="h-5 w-5" />,
      href: '/groq-api',
      available: true
    },
    {
      id: 'text-generation-openrouter',
      title: 'OpenRouter API',
      description: 'Access GPT-4, Claude, Llama and other cutting-edge AI models',
      icon: <MessageSquare className="h-5 w-5" />,
      href: '/openrouter-api',
      available: true
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'Craft effective prompts with templates optimized for different use cases',
      icon: <Sparkles className="h-5 w-5" />,
      href: '/prompt-engineering',
      available: true
    },
    {
      id: 'image-generation',
      title: 'Image Generation',
      description: 'Create images from text descriptions using AI models',
      icon: <ImagePlus className="h-5 w-5" />,
      available: false
    },
    {
      id: 'speech-to-text',
      title: 'Speech to Text',
      description: 'Convert spoken language into written text',
      icon: <AudioLines className="h-5 w-5" />,
      available: false
    },
    {
      id: 'text-to-speech',
      title: 'Text to Speech',
      description: 'Convert written text into natural-sounding speech',
      icon: <AudioLines className="h-5 w-5" />,
      available: false
    },
    {
      id: 'video-generation',
      title: 'Video Generation',
      description: 'Create videos from text descriptions or images',
      icon: <VideoIcon className="h-5 w-5" />,
      available: false
    },
    {
      id: 'document-analysis',
      title: 'Document Analysis',
      description: 'Extract insights and information from documents',
      icon: <FileText className="h-5 w-5" />,
      available: false
    },
    {
      id: 'code-generation',
      title: 'Code Generation',
      description: 'Generate code snippets and solutions from descriptions',
      icon: <Code className="h-5 w-5" />,
      available: false
    },
    {
      id: 'semantic-search',
      title: 'Semantic Search',
      description: 'Search content based on meaning rather than keywords',
      icon: <Search className="h-5 w-5" />,
      available: false
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">AI Tools Hub</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Access a collection of powerful AI tools designed to enhance your productivity and creativity
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className={`transition-all ${!tool.available && 'opacity-60'}`}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {tool.icon}
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {tool.available ? (
                <Button asChild className="w-full">
                  <Link to={tool.href}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Open Tool
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AITools;
