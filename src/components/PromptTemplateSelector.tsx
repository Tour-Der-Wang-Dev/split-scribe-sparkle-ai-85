
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
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import { PromptEngineeringService, PromptTemplate } from '@/services/PromptEngineeringService';
import { toast } from "sonner";

interface PromptTemplateSelectorProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

export function PromptTemplateSelector({ onSelectTemplate }: PromptTemplateSelectorProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | undefined>(undefined);
  
  // Load categories on component mount
  useEffect(() => {
    const availableCategories = PromptEngineeringService.getCategories();
    setCategories(availableCategories);
    
    // Set default category if available
    if (availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0]);
    }
  }, []);
  
  // Load templates when category or favorite filter changes
  useEffect(() => {
    let categoryTemplates: PromptTemplate[] = [];
    
    if (showFavoritesOnly) {
      categoryTemplates = PromptEngineeringService.getAllFavoriteTemplates();
      if (selectedCategory) {
        categoryTemplates = categoryTemplates.filter(template => template.category === selectedCategory);
      }
    } else if (selectedCategory) {
      categoryTemplates = PromptEngineeringService.getPromptTemplatesByCategory(selectedCategory);
    }
    
    setTemplates(categoryTemplates);
    
    // Reset selected template
    setSelectedTemplateId('');
    setSelectedTemplate(undefined);
  }, [selectedCategory, showFavoritesOnly]);
  
  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = PromptEngineeringService.getPromptTemplate(templateId);
    setSelectedTemplate(template);
    if (template) {
      onSelectTemplate(template);
    }
  };

  // Toggle favorite status of a template
  const toggleFavorite = () => {
    if (selectedTemplate) {
      const isFavorite = PromptEngineeringService.toggleFavorite(selectedTemplate.id);
      setSelectedTemplate({
        ...selectedTemplate,
        isFavorite
      });
      
      toast.success(isFavorite 
        ? `Added "${selectedTemplate.name}" to favorites` 
        : `Removed "${selectedTemplate.name}" from favorites`
      );
      
      // Refresh templates list if viewing favorites only
      if (showFavoritesOnly) {
        let updatedTemplates: PromptTemplate[];
        if (selectedCategory) {
          updatedTemplates = PromptEngineeringService.getPromptTemplatesByCategory(selectedCategory)
            .filter(template => template.isFavorite);
        } else {
          updatedTemplates = PromptEngineeringService.getAllFavoriteTemplates();
        }
        setTemplates(updatedTemplates);
      }
    }
  };
  
  // Toggle showing only favorites
  const toggleFavoritesOnly = () => {
    setShowFavoritesOnly(prev => !prev);
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Template Selection</div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleFavoritesOnly}
          className={showFavoritesOnly ? "text-yellow-500" : ""}
        >
          {showFavoritesOnly ? "All Templates" : "Favorites Only"}
        </Button>
      </div>
      
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
                <SelectLabel>
                  {showFavoritesOnly 
                    ? "Favorite Templates" 
                    : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Templates`}
                </SelectLabel>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.isFavorite ? "★ " : ""}{template.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {selectedTemplateId && selectedTemplate && (
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFavorite}
                  className={selectedTemplate.isFavorite ? "text-yellow-500" : ""}
                >
                  {selectedTemplate.isFavorite ? (
                    <Star className="h-4 w-4" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
