
export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: string;
    completion: string;
  };
}

export class OpenRouterService {
  private static readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  // Popular models available on OpenRouter
  static readonly MODELS: OpenRouterModel[] = [
    {
      id: 'openai/gpt-4o',
      name: 'GPT-4 Omni',
      description: 'Most capable GPT-4 model with vision',
      pricing: { prompt: '$5.00', completion: '$15.00' }
    },
    {
      id: 'openai/gpt-4o-mini',
      name: 'GPT-4 Omni Mini',
      description: 'Fast and efficient GPT-4 variant',
      pricing: { prompt: '$0.15', completion: '$0.60' }
    },
    {
      id: 'anthropic/claude-3.5-sonnet',
      name: 'Claude 3.5 Sonnet',
      description: 'Latest Claude model with enhanced capabilities',
      pricing: { prompt: '$3.00', completion: '$15.00' }
    },
    {
      id: 'anthropic/claude-3-haiku',
      name: 'Claude 3 Haiku',
      description: 'Fastest Claude model for quick tasks',
      pricing: { prompt: '$0.25', completion: '$1.25' }
    },
    {
      id: 'meta-llama/llama-3.1-70b-instruct',
      name: 'Llama 3.1 70B',
      description: 'Most capable open-source Llama model',
      pricing: { prompt: '$0.59', completion: '$0.79' }
    },
    {
      id: 'meta-llama/llama-3.1-8b-instruct',
      name: 'Llama 3.1 8B',
      description: 'Fast and efficient Llama model',
      pricing: { prompt: '$0.07', completion: '$0.07' }
    }
  ];

  static async generateContent(prompt: string, apiKey: string, model: string = 'openai/gpt-4o-mini'): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Prompt Engineering Tool',
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

      const data: OpenRouterResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error in OpenRouterService:', error);
      throw error;
    }
  }
}
