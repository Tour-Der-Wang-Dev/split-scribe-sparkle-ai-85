
/**
 * Service for interacting with the Groq API
 */
export class GroqService {
  private static readonly API_URL = "https://api.groq.com/openai/v1/chat/completions";
  
  /**
   * Generate content using the Groq API
   * @param prompt The prompt to send to the model
   * @param apiKey The Groq API key
   * @param model The model to use (defaults to llama-3.1-70b-versatile)
   * @returns A promise that resolves to the generated content
   */
  static async generateContent(
    prompt: string, 
    apiKey: string,
    model: string = "llama-3.1-70b-versatile"
  ): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      throw error;
    }
  }
  
  /**
   * List available models from Groq API
   * @param apiKey The Groq API key
   * @returns A promise that resolves to an array of available models
   */
  static async listModels(apiKey: string): Promise<Array<{id: string, name: string}>> {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/models", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.data.map((model: any) => ({
        id: model.id,
        name: model.id.split(':')[0]
      }));
    } catch (error) {
      console.error("Error fetching Groq models:", error);
      throw error;
    }
  }
}
