
export interface GroqResponse {
  choices: {
    text: string;
    message: {
      content: string;
    };
  }[];
}

export class GroqService {
  private static readonly API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  static async generateContent(prompt: string, apiKey: string, model: string = 'llama-3.1-70b-versatile'): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate content');
      }

      const data: GroqResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error in GroqService:', error);
      throw error;
    }
  }
}
