# DhrumilAI - Advanced AI Chatbot

A beautiful, production-ready AI chatbot interface powered by OpenAI's ChatGPT API.

## Features

- 🤖 **Real AI Integration**: Powered by OpenAI's ChatGPT API
- 💬 **Advanced Chat Interface**: Multiple conversations, message history, typing indicators
- 🎨 **Beautiful Design**: Modern UI with smooth animations and professional styling
- 🔒 **Secure**: Environment-based API key configuration
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- ⚡ **Fast**: Optimized performance with React and TypeScript

## Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key (starts with `sk-`)

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=your_actual_api_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

Optional configurations:
- `VITE_OPENAI_MODEL=gpt-4` (requires GPT-4 access)
- `VITE_OPENAI_BASE_URL=your_custom_endpoint` (for custom endpoints)

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## API Models Available

- **gpt-3.5-turbo**: Fast, cost-effective (default)
- **gpt-4**: More capable, higher cost (requires access)
- **gpt-4-turbo**: Latest GPT-4 model with improved performance

## Security Notes

⚠️ **Important**: This setup uses `dangerouslyAllowBrowser: true` for development. In production:

1. **Never expose API keys in frontend code**
2. **Use a backend proxy** to handle OpenAI API calls
3. **Implement proper authentication and rate limiting**
4. **Monitor API usage and costs**

## Production Deployment

For production deployment:

1. Remove `dangerouslyAllowBrowser: true`
2. Create a backend API endpoint
3. Proxy all OpenAI requests through your backend
4. Implement user authentication
5. Add rate limiting and usage monitoring

## Features Overview

### Chat Interface
- Real-time messaging with typing indicators
- Message timestamps and user avatars
- Copy, like/dislike functionality
- Auto-expanding text input with character counter

### Conversation Management
- Multiple conversation support
- Conversation history and titles
- Create, select, and delete conversations
- Persistent conversation state

### AI Integration
- OpenAI ChatGPT API integration
- Conversation context awareness
- Intelligent response generation
- Error handling and fallback responses

### UI/UX
- Modern dark sidebar design
- Smooth animations and transitions
- Responsive layout for all devices
- Professional typography and spacing
- API status indicator

## Troubleshooting

### API Key Issues
- Ensure your API key is valid and has sufficient credits
- Check that the key is properly set in the `.env` file
- Restart the development server after adding the API key

### Rate Limiting
- OpenAI has rate limits based on your plan
- Implement delays between requests if needed
- Monitor your usage in the OpenAI dashboard

### Model Access
- GPT-4 requires separate access approval
- Use gpt-3.5-turbo if you don't have GPT-4 access
- Check your model permissions in OpenAI dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.#   N Y C - R E N T A L  
 