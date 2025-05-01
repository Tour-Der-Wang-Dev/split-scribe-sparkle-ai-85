
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  Quote, 
  Code,
  Link, 
  Image, 
  ListOrdered, 
  ListUnordered, 
  Copy 
} from "lucide-react";

interface ToolbarProps {
  onFormat: (type: string) => void;
  onCopy: () => void;
}

const Toolbar = ({ onFormat, onCopy }: ToolbarProps) => {
  return (
    <div className="bg-card border-b p-1 flex items-center overflow-auto">
      <TooltipProvider delayDuration={300}>
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('bold')}
                className="h-8 w-8"
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold (Ctrl+B)</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('italic')}
                className="h-8 w-8"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic (Ctrl+I)</TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('heading1')}
                className="h-8 w-8"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('heading2')}
                className="h-8 w-8"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('heading3')}
                className="h-8 w-8"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('quote')}
                className="h-8 w-8"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('code')}
                className="h-8 w-8"
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inline Code</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('codeblock')}
                className="h-8 w-8 font-mono text-xs"
              >
                {`{ }`}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code Block</TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('link')}
                className="h-8 w-8"
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('image')}
                className="h-8 w-8"
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Image</TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('list')}
                className="h-8 w-8"
              >
                <ListUnordered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onFormat('numbered-list')}
                className="h-8 w-8"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onCopy}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Markdown</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
