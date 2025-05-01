
import MarkdownEditor from '@/components/MarkdownEditor';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-md-primary">MarkdownEditor</h1>
        <p className="text-muted-foreground">A powerful markdown editor with live preview</p>
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
