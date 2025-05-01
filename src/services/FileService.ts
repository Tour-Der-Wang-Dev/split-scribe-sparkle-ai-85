
/**
 * Service for handling file operations related to markdown content
 */
export class FileService {
  /**
   * Saves the current markdown content to a file
   * @param content The markdown content to save
   * @param fileName Optional custom filename (defaults to 'document.md')
   */
  static saveMarkdownToFile(content: string, fileName: string = 'document.md'): void {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append to the document, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
  
  /**
   * Loads markdown content from a file
   * @param file The file to load
   * @returns A promise that resolves to the file content
   */
  static loadMarkdownFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }
}
