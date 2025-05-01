
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { PromptEngineeringService, PromptTemplate } from '@/services/PromptEngineeringService';

interface PromptTemplateSelectorProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

export function PromptTemplateSelector({ onSelectTemplate }: PromptTemplateSelectorProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  
  // Load categories on component mount
  useEffect(() => {
    const availableCategories = PromptEngineeringService.getCategories();
    setCategories(availableCategories);
    
    // Set default category if available
    if (availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0]);
    }
  }, []);
  
  // Load templates when category changes
  useEffect(() => {
    if (selectedCategory) {
      const categoryTemplates = PromptEngineeringService.getPromptTemplatesByCategory(selectedCategory);
      setTemplates(categoryTemplates);
      
      // Reset selected template
      setSelectedTemplateId('');
    }
  }, [selectedCategory]);
  
  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const selectedTemplate = PromptEngineeringService.getPromptTemplate(templateId);
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <label htmlFor="category-select" className="block text-sm font-medium">
          Template Category
        </label>
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger id="category-select" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {selectedCategory && (
        <div className="space-y-2">
          <label htmlFor="template-select" className="block text-sm font-medium">
            Prompt Template
          </label>
          <Select 
            value={selectedTemplateId} 
            onValueChange={handleTemplateChange}
            disabled={templates.length === 0}
          >
            <SelectTrigger id="template-select" className="w-full">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Templates</SelectLabel>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {selectedTemplateId && (
            <p className="text-sm text-muted-foreground mt-1">
              {PromptEngineeringService.getPromptTemplate(selectedTemplateId)?.description}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
