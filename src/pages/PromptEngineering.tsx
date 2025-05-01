
import React, { useState } from 'react';
import { PromptTemplateSelector } from '@/components/PromptTemplateSelector';
import { PromptVariablesForm } from '@/components/PromptVariablesForm';
import { GroqPrompt } from '@/components/GroqPrompt';
import { PromptTemplate, PromptEngineeringService } from '@/services/PromptEngineeringService';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PromptEngineering = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [finalPrompt, setFinalPrompt] = useState<string>('');
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  
  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setFinalPrompt('');
    setShowPromptEditor(false);
  };
  
  const handleVariablesSubmit = (variables: Record<string, string>) => {
    if (selectedTemplate) {
      const filledPrompt = PromptEngineeringService.fillPromptTemplate(selectedTemplate.id, variables);
      if (filledPrompt) {
        setFinalPrompt(filledPrompt);
        setShowPromptEditor(true);
      }
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/ai-tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Prompt Engineering</h1>
        <p className="text-muted-foreground text-center">
          Create effective prompts using pre-built templates optimized for different use cases
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-4">Select a Template</h2>
          <PromptTemplateSelector onSelectTemplate={handleTemplateSelect} />
        </div>
        
        <div className="md:col-span-2">
          {selectedTemplate && !showPromptEditor && (
            <div>
              <h2 className="text-xl font-medium mb-4">Configure Template Variables</h2>
              <PromptVariablesForm 
                template={selectedTemplate} 
                onVariablesSubmit={handleVariablesSubmit} 
              />
            </div>
          )}
          
          {showPromptEditor && (
            <div className="space-y-4">
              <h2 className="text-xl font-medium mb-4">Your Engineered Prompt</h2>
              <GroqPrompt initialPrompt={finalPrompt} />
              
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPromptEditor(false)}
                >
                  Edit Template Variables
                </Button>
              </div>
            </div>
          )}
          
          {!selectedTemplate && (
            <div className="bg-muted p-6 rounded-lg flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <h3 className="text-lg font-medium">Select a template to get started</h3>
                <p className="mt-2">Choose from 50 professionally designed prompt templates</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptEngineering;
