
import React from 'react';
import { SavedResponse, ResponseHistoryService } from '@/services/ResponseHistoryService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, Trash2, Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export function SavedResponses() {
  const [responses, setResponses] = React.useState<SavedResponse[]>([]);
  
  // Load saved responses on component mount
  React.useEffect(() => {
    const loadResponses = () => {
      const savedResponses = ResponseHistoryService.getSavedResponses();
      setResponses(savedResponses);
    };
    
    loadResponses();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', loadResponses);
    
    return () => {
      window.removeEventListener('storage', loadResponses);
    };
  }, []);
  
  // Format timestamp to relative time
  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Copy response content to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }, () => {
      toast.error('Failed to copy to clipboard');
    });
  };
  
  // Delete response
  const handleDelete = (id: string) => {
    ResponseHistoryService.deleteResponse(id);
    setResponses(responses.filter(response => response.id !== id));
    toast.success('Response deleted');
  };
  
  // Clear all responses
  const handleClearAll = () => {
    ResponseHistoryService.clearAllResponses();
    setResponses([]);
    toast.success('All responses cleared');
  };
  
  if (responses.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/30">
        <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No saved responses yet</h3>
        <p className="text-muted-foreground">
          Generate responses and save them to see them here.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Responses</h2>
        <Button variant="outline" size="sm" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4">
        {responses.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg truncate max-w-[80%]">{item.prompt}</CardTitle>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimestamp(item.timestamp)}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Model: {item.model}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="max-h-40 overflow-y-auto">
                <p className="whitespace-pre-wrap text-sm">{item.response}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(item.response)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
