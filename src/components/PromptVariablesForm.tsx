
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PromptTemplate } from '@/services/PromptEngineeringService';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "sonner";

interface PromptVariablesFormProps {
  template: PromptTemplate;
  onVariablesSubmit: (variables: Record<string, string>) => void;
}

export function PromptVariablesForm({ template, onVariablesSubmit }: PromptVariablesFormProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [variableTypes, setVariableTypes] = useState<Record<string, 'text' | 'textarea'>>({});
  const isMobile = useIsMobile();
  
  // Extract variable names from template when template changes
  useEffect(() => {
    if (template) {
      const variableRegex = /{{([^}]+)}}/g;
      const matches = [...template.template.matchAll(variableRegex)];
      
      const extractedVariables: Record<string, string> = {};
      const detectedTypes: Record<string, 'text' | 'textarea'> = {};
      
      matches.forEach(match => {
        const varName = match[1];
        extractedVariables[varName] = '';
        
        // Detect if this should be a textarea based on variable name
        if (varName.includes('code') || 
            varName.includes('description') || 
            varName.includes('content') || 
            varName.includes('text') ||
            varName.includes('message') ||
            varName.includes('commit')) {
          detectedTypes[varName] = 'textarea';
        } else {
          detectedTypes[varName] = 'text';
        }
      });
      
      setVariables(extractedVariables);
      setVariableTypes(detectedTypes);
    }
  }, [template]);
  
  const handleInputChange = (variableName: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variableName]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate non-empty required fields
    const emptyFields = Object.entries(variables)
      .filter(([_, value]) => !value.trim())
      .map(([name]) => formatVariableName(name));
    
    if (emptyFields.length > 0) {
      toast.warning(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return;
    }
    
    onVariablesSubmit(variables);
  };
  
  // Format variable names for display
  const formatVariableName = (name: string): string => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get help text for variable
  const getVariableHelpText = (variableName: string): string => {
    if (variableName.includes('code')) {
      return 'Paste your code snippet here';
    } else if (variableName.includes('description')) {
      return 'Provide a detailed description';
    } else if (variableName.includes('feature')) {
      return 'Name and describe the feature';
    } else if (variableName.includes('requirement')) {
      return 'List specific requirements';
    } else if (variableName.includes('application_type')) {
      return 'E.g. web app, mobile app, desktop app';
    } else {
      return '';
    }
  };
  
  // If no variables found, return null
  if (Object.keys(variables).length === 0) {
    return (
      <Card className="p-4">
        <p className="text-sm">This template has no variables to fill in. You can use it directly.</p>
        <Button 
          onClick={() => onVariablesSubmit({})}
          className="mt-2"
        >
          Use Template As Is
        </Button>
      </Card>
    );
  }
  
  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium">Fill in Template Variables</h3>
        
        {Object.keys(variables).map((variableName) => (
          <div key={variableName} className="space-y-2">
            <Label htmlFor={`var-${variableName}`} className="font-medium block">
              {formatVariableName(variableName)}
            </Label>
            
            {variableTypes[variableName] === 'textarea' ? (
              <Textarea
                id={`var-${variableName}`}
                value={variables[variableName]}
                onChange={(e) => handleInputChange(variableName, e.target.value)}
                placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
                className="w-full min-h-[120px]"
              />
            ) : (
              <Input
                id={`var-${variableName}`}
                value={variables[variableName]}
                onChange={(e) => handleInputChange(variableName, e.target.value)}
                placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
                className="w-full"
              />
            )}
            
            {getVariableHelpText(variableName) && (
              <p className="text-xs text-muted-foreground mt-1">
                {getVariableHelpText(variableName)}
              </p>
            )}
          </div>
        ))}
        
        <Button type="submit" className={isMobile ? "w-full" : undefined}>
          Apply Template
        </Button>
      </form>
    </Card>
  );
}
