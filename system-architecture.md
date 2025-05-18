
# System Architecture

This document provides a high-level overview of the system architecture for the AI Prompt Engineering & Groq Integration Tool.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Client Application                 │
│                                                         │
│  ┌─────────┐   ┌────────────┐   ┌────────────────────┐  │
│  │ Pages   │   │ Components │   │ Hooks              │  │
│  └─────────┘   └────────────┘   └────────────────────┘  │
│       │             │                │                  │
│       └─────────────┼────────────────┘                  │
│                     │                                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │                  Services Layer                    │ │
│  └────────────────────────────────────────────────────┘ │
│                     │                                   │
└─────────────────────┼───────────────────────────────────┘
                      │
          ┌───────────┴────────────┐
          │                        │
┌─────────▼──────────┐   ┌─────────▼──────────┐
│    Groq API        │   │      Supabase      │
│ (AI Model Access)  │   │  (Database & Auth) │
└────────────────────┘   └────────────────────┘
```

## Core Components

### Frontend (Client Application)

1. **Pages**:
   - `Index.tsx`: Main landing page
   - `PromptEngineering.tsx`: Prompt creation and management
   - `GroqAPI.tsx`: Interface for Groq API interactions
   - `AITools.tsx`: Collection of AI utility tools
   - `NotFound.tsx`: 404 error page

2. **Components**:
   - UI components (buttons, forms, modals, etc.)
   - `MarkdownEditor.tsx`: Editor for prompt templates
   - `PromptTemplateSelector.tsx`: UI for selecting templates
   - `PromptVariablesForm.tsx`: Form for prompt variables
   - `SavedResponses.tsx`: Display of saved AI responses
   - `MobileOptimizedContainer.tsx`: Mobile-responsive container

3. **Services**:
   - `PromptEngineeringService.ts`: Handles prompt template logic
   - `GroqService.ts`: Manages communication with Groq API
   - `ResponseHistoryService.ts`: Manages response storage and retrieval
   - `FileService.ts`: Handles file operations

4. **Hooks**:
   - `use-mobile.tsx`: Detects mobile devices
   - `use-toast.ts`: Manages toast notifications

### External Services

1. **Groq API**:
   - Provides AI model access for generating responses
   - Connected via REST API using API key authentication

2. **Supabase**:
   - Database storage for user data
   - Authentication services
   - File storage capabilities

## Data Flow

1. **Prompt Creation Flow**:
   ```
   User → PromptEngineering Page → PromptTemplateSelector → PromptEngineeringService → LocalStorage
   ```

2. **AI Response Generation Flow**:
   ```
   User → PromptVariablesForm → GroqPrompt → GroqService → Groq API → Response → SavedResponses
   ```

3. **Response Management Flow**:
   ```
   SavedResponses → ResponseHistoryService → LocalStorage → User Interface
   ```

## Authentication & Security

- Environment variables for API key storage
- Supabase client for authenticated database operations
- Client-side storage for user preferences and templates

## Mobile Responsiveness

The application uses responsive design principles with:
- `MobileOptimizedContainer` for adaptive layouts
- `use-mobile` hook for device-specific behaviors
- Step-based UI flow for mobile users
- Touch-optimized interactions

This architecture supports scalable development while maintaining clean separation of concerns between UI components, business logic, and external services.
