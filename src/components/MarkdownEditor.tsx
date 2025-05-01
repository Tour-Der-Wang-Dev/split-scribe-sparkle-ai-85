import React, { useState, useEffect, useRef } from 'react';
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from "@/components/ui/card";
import Toolbar from './Toolbar';
import { useToast } from "@/components/ui/use-toast";
import { FileService } from '@/services/FileService';
import { Button } from "@/components/ui/button";
import { Save, Upload, FolderOpen } from 'lucide-react'; 

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>('# Welcome to MarkdownEditor\n\nThis is a **live preview** markdown editor with _syntax highlighting_.\n\n## Features\n\n- Split pane view\n- Live preview\n- Syntax highlighting\n- Toolbar with formatting options\n\n```js\n// Example code block\nfunction greeting() {\n  return "Hello, world!";\n}\n```\n\n> This is a blockquote with a [link](https://lovable.dev)');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle inserting text at cursor position
  const insertAtCursor = (textarea: HTMLTextAreaElement, textToInsert: string) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    setMarkdown(before + textToInsert + after);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + textToInsert.length;
      textarea.selectionEnd = start + textToInsert.length;
    }, 0);
  };

  const handleFormat = (type: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    switch (type) {
      case 'bold':
        insertAtCursor(textarea, selectedText ? `**${selectedText}**` : '**bold text**');
        break;
      case 'italic':
        insertAtCursor(textarea, selectedText ? `*${selectedText}*` : '*italic text*');
        break;
      case 'heading1':
        insertAtCursor(textarea, selectedText ? `# ${selectedText}` : '# Heading 1');
        break;
      case 'heading2':
        insertAtCursor(textarea, selectedText ? `## ${selectedText}` : '## Heading 2');
        break;
      case 'heading3':
        insertAtCursor(textarea, selectedText ? `### ${selectedText}` : '### Heading 3');
        break;
      case 'quote':
        insertAtCursor(textarea, selectedText ? `> ${selectedText}` : '> Blockquote');
        break;
      case 'code':
        insertAtCursor(textarea, selectedText ? `\`${selectedText}\`` : '`inline code`');
        break;
      case 'codeblock':
        insertAtCursor(textarea, selectedText ? 
          `\`\`\`\n${selectedText}\n\`\`\`` : 
          '```\ncode block\n```');
        break;
      case 'link':
        insertAtCursor(textarea, selectedText ? `[${selectedText}](url)` : '[link text](url)');
        break;
      case 'image':
        insertAtCursor(textarea, '![alt text](image-url)');
        break;
      case 'list':
        insertAtCursor(textarea, selectedText ? 
          `- ${selectedText.split('\n').join('\n- ')}` : 
          '- List item 1\n- List item 2\n- List item 3');
        break;
      case 'numbered-list':
        insertAtCursor(textarea, selectedText ? 
          selectedText.split('\n').map((item, i) => `${i + 1}. ${item}`).join('\n') : 
          '1. List item 1\n2. List item 2\n3. List item 3');
        break;
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Markdown content copied successfully!",
        duration: 2000,
      });
    }).catch((err) => {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    });
  };

  const handleSaveFile = () => {
    try {
      FileService.saveMarkdownToFile(markdown);
      toast({
        title: "File saved",
        description: "Markdown content saved to document.md",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to save",
        description: "An error occurred while saving the file",
        variant: "destructive",
      });
    }
  };

  const handleOpenFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const content = await FileService.loadMarkdownFromFile(files[0]);
      setMarkdown(content);
      toast({
        title: "File loaded",
        description: `${files[0].name} loaded successfully`,
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to load file",
        description: "Please try again with a valid markdown file",
        variant: "destructive",
      });
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Toolbar onFormat={handleFormat} onCopy={handleCopyToClipboard} />
        <div className="flex items-center gap-2 p-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSaveFile}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpenFileClick}
            className="flex items-center gap-1"
          >
            <FolderOpen className="h-4 w-4" />
            <span>Open</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-0 flex flex-col">
            <div className="bg-card text-card-foreground p-2 font-medium text-sm border-b">
              Editor
            </div>
            <textarea
              className="flex-1 w-full resize-none bg-editor-bg text-editor-text font-mono p-4 focus:outline-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your markdown here..."
            />
          </div>
        </ResizablePanel>
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-card text-card-foreground p-2 font-medium text-sm border-b">
              Preview
            </div>
            <Card className="flex-1 overflow-auto p-4 markdown-preview font-serif">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !className?.includes('language-') ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match ? match[1] : ''}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
                  }
                }}
              >
                {markdown}
              </ReactMarkdown>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MarkdownEditor;
