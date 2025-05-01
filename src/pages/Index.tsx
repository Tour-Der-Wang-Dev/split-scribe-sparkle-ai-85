
import MarkdownEditor from '@/components/MarkdownEditor';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-md-primary">MarkdownEditor</h1>
          <p className="text-muted-foreground">A powerful markdown editor with live preview</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/groq-api">Try Groq API</Link>
          </Button>
          <Button asChild>
            <Link to="/ai-tools">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Tools
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex-1">
        <MarkdownEditor />
      </div>
      <footer className="mt-4 text-center text-sm text-muted-foreground">
        <p>Created with <span className="text-md-primary">❤</span> using React + Tailwind</p>
      </footer>
    </div>
  );
};

export default Index;
