
# AI Prompt Engineering & Groq Integration Tool

A powerful web application for prompt engineering, AI response management, and integration with the Groq API. This tool helps users create, manage, and optimize AI prompts with a focus on mobile responsiveness and usability.

## Demo

Visit [https://lovable.dev/projects/e1e525ee-4990-4bba-8038-83573884bd09](https://lovable.dev/projects/e1e525ee-4990-4bba-8038-83573884bd09) to see the application in action.

## Features

- **Prompt Engineering Tools**: Create, edit, and save prompt templates
- **Variable Support**: Define and use variables within prompt templates
- **Groq API Integration**: Send prompts to Groq's AI models and receive responses
- **Response Management**: Save and manage AI responses for future reference
- **Mobile Optimized**: Responsive design for both desktop and mobile users
- **Template Favoriting**: Mark frequently used templates as favorites

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router
- **State Management**: React Query
- **API Integration**: Groq API
- **Database**: Supabase
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v16+) and npm installed
- Groq API key for AI integration

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd ai-prompt-engineering-tool
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_api_key_here
     VITE_GROQ_API_KEY=your_api_key_here
     ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Project Structure

The project follows a modular structure:
- `/components`: UI components
- `/hooks`: Custom React hooks
- `/integrations`: External service integrations
- `/lib`: Utility functions
- `/pages`: Route-based page components
- `/services`: Business logic and data services

For a detailed breakdown of all files, please see [filesExplainer.md](./filesExplainer.md).

## Deployment

This project is configured for deployment with Lovable:

1. Navigate to the [Lovable Project](https://lovable.dev/projects/e1e525ee-4990-4bba-8038-83573884bd09)
2. Click on Share -> Publish to deploy the application
3. To connect a custom domain, go to Project > Settings > Domains

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit with descriptive messages: `git commit -m 'Add some feature'`
5. Push to your branch: `git push origin feature/your-feature-name`
6. Open a pull request

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Add appropriate comments and documentation
- Use ESLint and follow project formatting rules
- Write tests for new features

## License

This project is licensed under the MIT License - see the LICENSE file for details.
