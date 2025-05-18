
# Project Files Explainer

This document provides an overview of all project files with their purpose and importance based on the number of imports:

- 🟢 High importance (5+ imports)
- 🟡 Medium importance (2-4 imports)
- 🔴 Low importance (0-1 imports)

## Root Files

- `.env` 🟡 - Environment variables configuration including API keys
- `.gitignore` 🔴 - Specifies files and directories to be ignored by Git
- `README.md` 🟢 - Project documentation with setup and usage instructions
- `components.json` 🔴 - Configuration for shadcn/ui components
- `eslint.config.js` 🔴 - ESLint configuration for code quality
- `index.html` 🟢 - Main entry point HTML file for the web application
- `package-lock.json` 🔴 - Automatically generated file for npm dependency versions
- `package.json` 🟢 - Project configuration and dependencies
- `postcss.config.js` 🔴 - PostCSS configuration for CSS processing
- `tailwind.config.ts` 🟡 - Tailwind CSS configuration file
- `tsconfig.app.json` 🔴 - TypeScript configuration for the app
- `tsconfig.json` 🔴 - Main TypeScript configuration
- `tsconfig.node.json` 🔴 - TypeScript configuration for Node.js
- `vite.config.ts` 🟡 - Vite build tool configuration

## /public

- `/favicon.ico` 🔴 - Website favicon
- `/placeholder.svg` 🔴 - Default placeholder image 
- `/robots.txt` 🔴 - Instructions for web crawlers

## /src

- `App.css` 🔴 - Global application styles
- `App.tsx` 🟢 - Main application component defining routes and providers
- `index.css` 🟢 - Global CSS styles with Tailwind imports
- `main.tsx` 🟢 - Application entry point that renders the App component
- `vite-env.d.ts` 🔴 - TypeScript declaration file for Vite environment

### /src/components

- `GroqPrompt.tsx` 🟡 - Component for interacting with Groq AI API
- `MarkdownEditor.tsx` 🟡 - Markdown editor component for prompt templates
- `MobileOptimizedContainer.tsx` 🟢 - Container component with mobile responsiveness
- `PromptTemplateSelector.tsx` 🟡 - Component for selecting and managing prompt templates
- `PromptVariablesForm.tsx` 🟡 - Form for inputting variables used in prompt templates
- `SavedResponses.tsx` 🟡 - Component for displaying and managing saved AI responses
- `Toolbar.tsx` 🟡 - Application toolbar with navigation and actions

#### /src/components/ui

- `accordion.tsx` 🟡 - Reusable accordion component
- `alert-dialog.tsx` 🟡 - Dialog component for alerts and confirmations
- `alert.tsx` 🔴 - Alert notification component
- `aspect-ratio.tsx` 🔴 - Component for maintaining aspect ratios
- `avatar.tsx` 🔴 - User avatar component
- `badge.tsx` 🔴 - Badge component for labels and statuses
- `breadcrumb.tsx` 🔴 - Breadcrumb navigation component
- `button.tsx` 🟢 - Reusable button component
- `calendar.tsx` 🔴 - Date calendar component
- `card.tsx` 🟡 - Card container component
- `carousel.tsx` 🔴 - Image/content carousel component
- `chart.tsx` 🔴 - Data visualization chart component
- `checkbox.tsx` 🔴 - Checkbox input component
- `collapsible.tsx` 🔴 - Collapsible content component
- `command.tsx` 🔴 - Command palette component
- `context-menu.tsx` 🔴 - Context menu component
- `dialog.tsx` 🟡 - Modal dialog component
- `drawer.tsx` 🔴 - Sliding drawer component
- `dropdown-menu.tsx` 🟡 - Dropdown menu component
- `form.tsx` 🟡 - Form component with validation
- `hover-card.tsx` 🔴 - Card displayed on hover
- `input-otp.tsx` 🔴 - One-time password input component
- `input.tsx` 🟡 - Input field component
- `label.tsx` 🟡 - Form label component
- `menubar.tsx` 🔴 - Horizontal menu component
- `navigation-menu.tsx` 🔴 - Navigation menu component
- `pagination.tsx` 🔴 - Pagination controls component
- `popover.tsx` 🟡 - Popover component for tooltips and small UI elements
- `progress.tsx` 🔴 - Progress indicator component
- `radio-group.tsx` 🔴 - Radio button group component
- `resizable.tsx` 🔴 - Resizable panels component
- `scroll-area.tsx` 🔴 - Custom scrollable area component
- `select.tsx` 🟡 - Select dropdown component
- `separator.tsx` 🔴 - Visual separator component
- `sheet.tsx` 🔴 - Side sheet component
- `sidebar.tsx` 🟡 - Sidebar navigation component
- `skeleton.tsx` 🟡 - Loading skeleton component
- `slider.tsx` 🔴 - Range slider component
- `sonner.tsx` 🔴 - Toast notification wrapper for Sonner
- `switch.tsx` 🔴 - Toggle switch component
- `table.tsx` 🔴 - Data table component
- `tabs.tsx` 🟡 - Tabbed interface component
- `textarea.tsx` 🟡 - Multi-line text input component
- `toast.tsx` 🟡 - Toast notification component
- `toaster.tsx` 🟢 - Toast notification container
- `toggle-group.tsx` 🔴 - Group of toggle buttons
- `toggle.tsx` 🔴 - Toggle button component
- `tooltip.tsx` 🟡 - Tooltip component
- `use-toast.ts` 🟢 - Hook for managing toast notifications

### /src/hooks

- `use-mobile.tsx` 🟡 - Hook for detecting mobile devices
- `use-toast.ts` 🟢 - Hook for managing toast notifications

### /src/integrations

#### /src/integrations/supabase

- `client.ts` 🟢 - Supabase client initialization
- `types.ts` 🟡 - TypeScript types for Supabase data models

### /src/lib

- `utils.ts` 🟢 - Utility functions used across the application

### /src/pages

- `AITools.tsx` 🟡 - Page showcasing AI tools and features
- `GroqAPI.tsx` 🟡 - Page for Groq API integration and demos
- `Index.tsx` 🟢 - Homepage of the application
- `NotFound.tsx` 🔴 - 404 error page
- `PromptEngineering.tsx` 🟡 - Page for prompt engineering tools and templates

### /src/services

- `FileService.ts` 🟡 - Service for file operations
- `GroqService.ts` 🟢 - Service for interacting with Groq API
- `PromptEngineeringService.ts` 🟢 - Service for prompt engineering features
- `ResponseHistoryService.ts` 🟡 - Service for managing response history

## /supabase

- `config.toml` 🔴 - Configuration file for Supabase
