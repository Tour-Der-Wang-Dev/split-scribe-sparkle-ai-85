
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromptTemplate } from '@/services/PromptEngineeringService';

interface PromptVariablesFormProps {
  template: PromptTemplate;
  onVariablesSubmit: (variables: Record<string, string>) => void;
}

export function PromptVariablesForm({ template, onVariablesSubmit }: PromptVariablesFormProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  
  // Extract variable names from template when template changes
  useEffect(() => {
    if (template) {
      const variableRegex = /{{([^}]+)}}/g;
      const matches = [...template.template.matchAll(variableRegex)];
      
      const extractedVariables: Record<string, string> = {};
      matches.forEach(match => {
        extractedVariables[match[1]] = '';
      });
      
      setVariables(extractedVariables);
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
    onVariablesSubmit(variables);
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
            <label className="text-sm font-medium block">
              {variableName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <Input
              value={variables[variableName]}
              onChange={(e) => handleInputChange(variableName, e.target.value)}
              placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
              className="w-full"
            />
          </div>
        ))}
        
        <Button type="submit">Apply Template</Button>
      </form>
    </Card>
  );
}
