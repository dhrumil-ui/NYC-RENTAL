import OpenAI from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AIService {
  private openai: OpenAI | null = null;
  private isConfigured = false;

  constructor() {
    this.initializeOpenAI();
  }

  private initializeOpenAI() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({
        apiKey: apiKey,
        baseURL: import.meta.env.VITE_OPENAI_BASE_URL || undefined,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
      this.isConfigured = true;
    }
  }

  async generateResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    if (!this.isConfigured || !this.openai) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are DhrumilAI, an advanced AI assistant created to help users with a wide variety of tasks. You are intelligent, helpful, creative, and engaging. You can assist with:

- Programming and software development
- Creative writing and content creation
- Data analysis and research
- Problem-solving and critical thinking
- Educational explanations
- Technical documentation
- And much more

Always be professional, accurate, and helpful. Provide detailed explanations when appropriate, and ask clarifying questions if needed. Your responses should be well-structured and easy to understand.`
      };

      const messages: ChatMessage[] = [
        systemMessage,
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: userMessage }
      ];

      const completion = await this.openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return 'Please configure your OpenAI API key in the environment variables to enable AI responses.';
        } else if (error.message.includes('quota')) {
          return 'OpenAI API quota exceeded. Please check your billing settings or try again later.';
        } else if (error.message.includes('rate limit')) {
          return 'Rate limit exceeded. Please wait a moment before sending another message.';
        }
      }
      
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm DhrumilAI, your intelligent assistant. To enable full AI capabilities, please configure your OpenAI API key in the environment variables. For now, I'm running in demo mode. What can I help you with today?";
    }
    
    if (message.includes('api key') || message.includes('configure') || message.includes('setup')) {
      return `To enable full AI capabilities with OpenAI's ChatGPT:

1. Get an API key from https://platform.openai.com/api-keys
2. Create a .env file in your project root
3. Add: VITE_OPENAI_API_KEY=your_actual_api_key_here
4. Restart the development server

Optional configurations:
- VITE_OPENAI_MODEL=gpt-4 (for GPT-4, requires access)
- VITE_OPENAI_BASE_URL=your_custom_endpoint (for custom endpoints)

⚠️ Security Note: In production, always use a backend proxy to protect your API key!`;
    }
    
    return `I'm currently running in demo mode. To unlock my full AI capabilities powered by OpenAI's ChatGPT, please configure your API key. 

Your message: "${userMessage}"

I would normally provide a detailed, intelligent response here, but I need an OpenAI API key to access the language model. Once configured, I can help with coding, writing, analysis, creative projects, and much more!`;
  }

  isApiConfigured(): boolean {
    return this.isConfigured;
  }
}

export const aiService = new AIService();