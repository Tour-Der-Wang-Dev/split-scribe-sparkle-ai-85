
/**
 * Service for managing saved AI responses
 */
export interface SavedResponse {
  id: string;
  prompt: string;
  response: string;
  model: string;
  timestamp: number;
}

export class ResponseHistoryService {
  private static readonly STORAGE_KEY = 'groq_saved_responses';
  
  /**
   * Save a new response to local storage
   */
  static saveResponse(prompt: string, response: string, model: string): SavedResponse {
    const savedResponses = this.getSavedResponses();
    
    const newResponse: SavedResponse = {
      id: crypto.randomUUID(),
      prompt,
      response,
      model,
      timestamp: Date.now()
    };
    
    savedResponses.unshift(newResponse);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedResponses));
    
    return newResponse;
  }
  
  /**
   * Get all saved responses from local storage
   */
  static getSavedResponses(): SavedResponse[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (!storedData) return [];
    
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing saved responses:', error);
      return [];
    }
  }
  
  /**
   * Delete a saved response by ID
   */
  static deleteResponse(id: string): boolean {
    const savedResponses = this.getSavedResponses();
    const updatedResponses = savedResponses.filter(response => response.id !== id);
    
    if (updatedResponses.length === savedResponses.length) {
      return false;
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedResponses));
    return true;
  }
  
  /**
   * Clear all saved responses
   */
  static clearAllResponses(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
