
import MarkdownEditor from '@/components/MarkdownEditor';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Settings, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4">
      <header className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-md-primary">MarkdownEditor</h1>
            <p className="text-sm sm:text-base text-muted-foreground">A powerful markdown editor with live preview</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto">
              <Link to="/groq-api">
                <Zap className="mr-2 h-4 w-4" />
                Groq API
              </Link>
            </Button>
            <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto">
              <Link to="/openrouter-api">OpenRouter API</Link>
            </Button>
            <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto">
              <Link to="/plans">
                <Settings className="mr-2 h-4 w-4" />
                Plans
              </Link>
            </Button>
            <Button asChild size={isMobile ? "sm" : "default"} className="w-full sm:w-auto">
              <Link to="/ai-tools">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Tools
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1">
        <MarkdownEditor />
      </div>
      <footer className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
        <p>Created with <span className="text-md-primary">❤</span> using React + Tailwind</p>
      </footer>
    </div>
  );
};

export default Index;
