
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from "@/components/ui/card";
import Toolbar from './Toolbar';
import { useToast } from "@/components/ui/use-toast";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>('# Welcome to MarkdownEditor\n\nThis is a **live preview** markdown editor with _syntax highlighting_.\n\n## Features\n\n- Split pane view\n- Live preview\n- Syntax highlighting\n- Toolbar with formatting options\n\n```js\n// Example code block\nfunction greeting() {\n  return "Hello, world!";\n}\n```\n\n> This is a blockquote with a [link](https://lovable.dev)');
  const { toast } = useToast();

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
  
  return (
    <div className="flex flex-col h-full">
      <Toolbar onFormat={handleFormat} onCopy={handleCopyToClipboard} />
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
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
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
