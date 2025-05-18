
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PromptTemplate } from '@/services/PromptEngineeringService';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface PromptVariablesFormProps {
  template: PromptTemplate;
  onVariablesSubmit: (variables: Record<string, string>) => void;
}

type VariableType = 'text' | 'textarea' | 'select' | 'number';

interface VariableConfig {
  type: VariableType;
  required: boolean;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  defaultValue?: string;
}

export function PromptVariablesForm({ template, onVariablesSubmit }: PromptVariablesFormProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [variableConfigs, setVariableConfigs] = useState<Record<string, VariableConfig>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();
  
  // Extract variable names from template when template changes
  useEffect(() => {
    if (template) {
      const variableRegex = /{{([^}]+)}}/g;
      const matches = [...template.template.matchAll(variableRegex)];
      
      const extractedVariables: Record<string, string> = {};
      const detectedConfigs: Record<string, VariableConfig> = {};
      const initialTouched: Record<string, boolean> = {};
      
      matches.forEach(match => {
        const varName = match[1];
        extractedVariables[varName] = '';
        initialTouched[varName] = false;
        
        // Detect variable type and configurations based on name
        const config = detectVariableConfig(varName);
        detectedConfigs[varName] = config;
        
        // Apply default value if available
        if (config.defaultValue) {
          extractedVariables[varName] = config.defaultValue;
        }
      });
      
      setVariables(extractedVariables);
      setVariableConfigs(detectedConfigs);
      setTouched(initialTouched);
      setErrors({});
    }
  }, [template]);
  
  // Detect variable configuration based on variable name
  const detectVariableConfig = (variableName: string): VariableConfig => {
    const config: VariableConfig = {
      type: 'text',
      required: true,
    };
    
    // Detect type based on variable name
    if (variableName.includes('code') || 
        variableName.includes('description') || 
        variableName.includes('content') || 
        variableName.includes('text') ||
        variableName.includes('message') ||
        variableName.includes('commit')) {
      config.type = 'textarea';
      config.minLength = 10;
    } else if (variableName.includes('count') || 
               variableName.includes('size') ||
               variableName.includes('limit') ||
               variableName.includes('number')) {
      config.type = 'number';
    } else if (variableName.includes('language')) {
      config.type = 'select';
      config.options = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Other'];
    } else if (variableName.includes('application_type')) {
      config.type = 'select';
      config.options = ['Web Application', 'Mobile App', 'Desktop Application', 'API Service', 'CLI Tool', 'Other'];
    } else if (variableName.includes('component_type')) {
      config.type = 'select';
      config.options = ['Button', 'Form', 'Card', 'Modal', 'Table', 'Navigation', 'List', 'Layout', 'Other'];
    }
    
    return config;
  };
  
  const handleInputChange = (variableName: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variableName]: value
    }));
    
    // Mark as touched
    setTouched(prev => ({
      ...prev,
      [variableName]: true
    }));
    
    // Validate on change
    const error = validateField(variableName, value);
    setErrors(prev => ({
      ...prev,
      [variableName]: error
    }));
  };
  
  const validateField = (variableName: string, value: string): string => {
    const config = variableConfigs[variableName];
    
    if (!config) return '';
    
    if (config.required && !value.trim()) {
      return 'This field is required';
    }
    
    if (config.minLength && value.trim().length < config.minLength) {
      return `Minimum ${config.minLength} characters required`;
    }
    
    if (config.maxLength && value.trim().length > config.maxLength) {
      return `Maximum ${config.maxLength} characters allowed`;
    }
    
    return '';
  };
  
  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(variables).forEach(varName => {
      allTouched[varName] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    Object.entries(variables).forEach(([varName, value]) => {
      const error = validateField(varName, value);
      if (error) {
        newErrors[varName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateAllFields()) {
      onVariablesSubmit(variables);
    } else {
      toast.error("Please fix the errors in the form");
    }
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
    } else if (variableName.includes('component_type')) {
      return 'The type of UI component you want to create';
    } else if (variableName.includes('language')) {
      return 'Select the programming language';
    } else if (variableName.includes('count') || variableName.includes('size')) {
      return 'Enter a numeric value';
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
        
        {Object.keys(variables).map((variableName) => {
          const config = variableConfigs[variableName];
          const error = touched[variableName] ? errors[variableName] : '';
          
          return (
            <div key={variableName} className="space-y-2">
              <Label 
                htmlFor={`var-${variableName}`} 
                className="font-medium block"
              >
                {formatVariableName(variableName)}
                {config?.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              
              {config?.type === 'textarea' ? (
                <Textarea
                  id={`var-${variableName}`}
                  value={variables[variableName]}
                  onChange={(e) => handleInputChange(variableName, e.target.value)}
                  placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
                  className={`w-full min-h-[120px] ${error ? 'border-red-500' : ''}`}
                />
              ) : config?.type === 'select' && config.options ? (
                <Select
                  value={variables[variableName]}
                  onValueChange={(value) => handleInputChange(variableName, value)}
                >
                  <SelectTrigger className={`w-full ${error ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder={`Select ${variableName.replace(/_/g, ' ')}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {config.options.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : config?.type === 'number' ? (
                <Input
                  id={`var-${variableName}`}
                  type="number"
                  value={variables[variableName]}
                  onChange={(e) => handleInputChange(variableName, e.target.value)}
                  placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
                  className={`w-full ${error ? 'border-red-500' : ''}`}
                />
              ) : (
                <Input
                  id={`var-${variableName}`}
                  value={variables[variableName]}
                  onChange={(e) => handleInputChange(variableName, e.target.value)}
                  placeholder={`Enter ${variableName.replace(/_/g, ' ')}`}
                  className={`w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
              
              {getVariableHelpText(variableName) && !error && (
                <p className="text-xs text-muted-foreground mt-1">
                  {getVariableHelpText(variableName)}
                </p>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          );
        })}
        
        <Button type="submit" className={isMobile ? "w-full" : undefined}>
          Apply Template
        </Button>
      </form>
    </Card>
  );
}
