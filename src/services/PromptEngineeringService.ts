/**
 * Service for managing prompt engineering templates and utilities
 */

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: string;
  isFavorite?: boolean;
}

export class PromptEngineeringService {
  private static readonly STORAGE_KEY = 'prompt_favorites';
  
  /**
   * Get all available prompt templates
   */
  static getPromptTemplates(): PromptTemplate[] {
    const templates = [
      {
        id: "code-react",
        name: "React Component Generator",
        description: "Generate React components based on requirements",
        template: "Create a React functional component with TypeScript that {{description}}. Use Tailwind CSS for styling and include proper props typing. The component should be responsive and accessible.",
        category: "development"
      },
      {
        id: "code-debug",
        name: "Code Debugger",
        description: "Debug code issues with structured analysis",
        template: "Debug the following code and identify potential issues:\n\n```\n{{code}}\n```\n\nProvide a detailed explanation of the problems and suggest fixes.",
        category: "development"
      },
      {
        id: "code-optimize",
        name: "Performance Optimizer",
        description: "Optimize code for better performance",
        template: "Analyze this code for performance issues and suggest optimizations:\n\n```\n{{code}}\n```\n\nFocus on time complexity, rendering efficiency, and best practices.",
        category: "development"
      },
      {
        id: "ui-design",
        name: "UI Component Design",
        description: "Design UI components with detailed specifications",
        template: "Design a {{component_type}} UI component that {{functionality}}. Include details on: layout, color scheme, interactions, states (hover, active, disabled), responsiveness, and accessibility considerations.",
        category: "design"
      },
      {
        id: "ux-flow",
        name: "UX Flow Designer",
        description: "Design user experience flows",
        template: "Create a detailed UX flow for {{user_action}} in a {{application_type}} application. Include user steps, potential pain points, and solutions for a smooth experience.",
        category: "design"
      },
      {
        id: "api-spec",
        name: "API Specification",
        description: "Create detailed API endpoint specifications",
        template: "Design an API endpoint for {{functionality}}. Include: URL structure, HTTP method, request parameters, request body schema, response schema, status codes, error handling, and authentication requirements.",
        category: "development"
      },
      {
        id: "tech-stack",
        name: "Tech Stack Advisor",
        description: "Get recommendations for technology stack",
        template: "Recommend a technology stack for building {{application_type}} with requirements: {{requirements}}. Consider scalability, developer experience, community support, and performance.",
        category: "development"
      },
      {
        id: "schema-design",
        name: "Database Schema Designer",
        description: "Design efficient database schemas",
        template: "Design a database schema for {{application_type}} that needs to store {{data_description}}. Include tables, fields, data types, relationships, and indexing strategies.",
        category: "development"
      },
      {
        id: "accessibility-audit",
        name: "Accessibility Audit",
        description: "Perform accessibility audits on components",
        template: "Perform an accessibility audit on this component:\n\n```\n{{code}}\n```\n\nCheck for WCAG compliance, keyboard navigation, screen reader compatibility, and suggest improvements.",
        category: "development"
      },
      {
        id: "state-management",
        name: "State Management Planner",
        description: "Plan state management for applications",
        template: "Design a state management strategy for {{application_type}} with features: {{features}}. Consider data flow, component structure, and performance implications.",
        category: "development"
      },
      {
        id: "test-cases",
        name: "Test Case Generator",
        description: "Generate comprehensive test cases",
        template: "Generate test cases for this function:\n\n```\n{{code}}\n```\n\nInclude unit tests covering normal cases, edge cases, error conditions, and mocking strategies.",
        category: "development"
      },
      {
        id: "code-review",
        name: "Code Reviewer",
        description: "Perform detailed code reviews",
        template: "Review this code for quality, maintainability, and best practices:\n\n```\n{{code}}\n```\n\nProvide constructive feedback and specific improvement suggestions.",
        category: "development"
      },
      {
        id: "security-audit",
        name: "Security Audit",
        description: "Audit code for security vulnerabilities",
        template: "Conduct a security audit on this code:\n\n```\n{{code}}\n```\n\nIdentify potential vulnerabilities like XSS, CSRF, injection attacks, and suggest security improvements.",
        category: "development"
      },
      {
        id: "feature-spec",
        name: "Feature Specification",
        description: "Create detailed feature specifications",
        template: "Create a detailed specification for implementing {{feature_name}} in a {{application_type}} application. Include user stories, acceptance criteria, technical requirements, and potential challenges.",
        category: "planning"
      },
      {
        id: "refactoring-plan",
        name: "Refactoring Planner",
        description: "Plan code refactoring strategies",
        template: "Create a step-by-step refactoring plan for this code:\n\n```\n{{code}}\n```\n\nFocus on improving readability, maintainability, and performance without changing functionality.",
        category: "development"
      },
      {
        id: "animation-design",
        name: "UI Animation Designer",
        description: "Design UI animations and transitions",
        template: "Design animations and transitions for {{interaction_type}} in a {{component_type}} component. Describe timing, easing, keyframes, and how it enhances user experience.",
        category: "design"
      },
      {
        id: "error-handling",
        name: "Error Handling Strategy",
        description: "Develop comprehensive error handling",
        template: "Design an error handling strategy for {{functionality}} in a {{application_type}} application. Include error types, user feedback, logging, recovery mechanisms, and graceful degradation.",
        category: "development"
      },
      {
        id: "responsive-design",
        name: "Responsive Design Strategy",
        description: "Create responsive design strategies",
        template: "Develop a responsive design strategy for {{component_type}} that works across mobile, tablet, and desktop. Include breakpoints, layout changes, and content adaptation.",
        category: "design"
      },
      {
        id: "performance-budget",
        name: "Performance Budget Planner",
        description: "Create performance budgets for web applications",
        template: "Create a performance budget for a {{application_type}} web application. Include load time targets, bundle size limits, rendering metrics, and monitoring strategy.",
        category: "planning"
      },
      {
        id: "localization-plan",
        name: "Localization Strategy",
        description: "Plan application localization",
        template: "Design a localization strategy for {{application_type}} supporting {{languages}}. Include translation workflow, content structure, cultural considerations, and technical implementation.",
        category: "planning"
      },
      // Development Templates
      {
        id: "dom-performance",
        name: "DOM Performance Optimizer",
        description: "Optimize DOM operations for high performance",
        template: "Analyze these DOM operations and suggest performance optimizations:\n\n```\n{{code}}\n```\n\nFocus on reducing reflows/repaints, efficient event handling, and virtual DOM usage.",
        category: "development"
      },
      {
        id: "rendering-strategy",
        name: "Rendering Strategy Advisor",
        description: "Design efficient rendering strategies",
        template: "Design a rendering strategy for {{component_type}} that handles {{data_volume}} data items. Consider virtualization, lazy loading, and efficient DOM updates.",
        category: "development"
      },
      {
        id: "web-vitals-optimizer",
        name: "Core Web Vitals Optimizer",
        description: "Optimize for Core Web Vitals",
        template: "Analyze this code for Core Web Vitals impact and suggest improvements:\n\n```\n{{code}}\n```\n\nFocus on LCP, FID/INP, and CLS optimizations.",
        category: "development"
      },
      {
        id: "event-delegation",
        name: "Event Delegation Strategy",
        description: "Design efficient event handling with delegation",
        template: "Design an event delegation strategy for {{interaction_type}} in a list with {{list_size}} items. Optimize for performance and memory usage.",
        category: "development"
      },
      // Content Creation Templates
      {
        id: "content-blog",
        name: "Technical Blog Post",
        description: "Generate technical blog content",
        template: "Write a technical blog post about {{topic}} for developers. Include code examples, best practices, and practical applications. The tone should be informative yet conversational.",
        category: "content"
      },
      {
        id: "content-docs",
        name: "Technical Documentation",
        description: "Create technical documentation",
        template: "Create technical documentation for {{feature_name}}. Include overview, installation steps, API reference, usage examples, and troubleshooting tips.",
        category: "content"
      },
      {
        id: "content-tutorial",
        name: "Step-by-step Tutorial",
        description: "Create detailed tutorials",
        template: "Create a step-by-step tutorial for implementing {{feature_name}} in {{framework}}. Include code snippets, explanations, screenshots, and common pitfalls to avoid.",
        category: "content"
      },
      {
        id: "changelog-generator",
        name: "Changelog Generator",
        description: "Generate formatted changelogs",
        template: "Generate a formatted changelog from these git commits:\n\n{{commit_messages}}\n\nOrganize by feature, bugfix, and breaking changes. Use semantic versioning principles.",
        category: "content"
      },
      // Data & Analytics Templates
      {
        id: "data-visualization",
        name: "Data Visualization Designer",
        description: "Design data visualization strategies",
        template: "Design a data visualization strategy for displaying {{data_type}} data to {{audience_type}}. Recommend chart types, interaction models, and information hierarchy.",
        category: "data"
      },
      {
        id: "analytics-event",
        name: "Analytics Event Planner",
        description: "Plan analytics event tracking",
        template: "Design an analytics event tracking plan for {{feature_name}}. Include event names, properties, user journeys to track, and insights to derive.",
        category: "data"
      },
      // Architecture Templates
      {
        id: "arch-microservices",
        name: "Microservices Designer",
        description: "Design microservice architectures",
        template: "Design a microservices architecture for {{application_type}} with requirements: {{requirements}}. Include service boundaries, communication patterns, data consistency, and deployment considerations.",
        category: "architecture"
      },
      {
        id: "arch-serverless",
        name: "Serverless Architecture",
        description: "Design serverless architectures",
        template: "Design a serverless architecture for {{application_type}} with requirements: {{requirements}}. Include function design, data flow, cold start strategies, and cost optimization.",
        category: "architecture"
      },
      // Specialized Optimization Templates
      {
        id: "bundle-optimization",
        name: "Bundle Size Optimizer",
        description: "Optimize application bundle size",
        template: "Analyze this webpack/package configuration and suggest bundle size optimizations:\n\n```\n{{config}}\n```\n\nFocus on code splitting, lazy loading, tree shaking, and dependency management.",
        category: "optimization"
      },
      {
        id: "memory-leak-detective",
        name: "Memory Leak Detective",
        description: "Identify potential memory leaks",
        template: "Analyze this code for potential memory leaks:\n\n```\n{{code}}\n```\n\nIdentify event listeners, closure issues, and suggest fixes.",
        category: "optimization"
      },
      {
        id: "critical-path-optimizer",
        name: "Critical Path Optimizer",
        description: "Optimize critical rendering path",
        template: "Analyze this HTML/CSS/JS and optimize the critical rendering path:\n\n```\n{{code}}\n```\n\nFocus on resource prioritization, async loading, and render-blocking elimination.",
        category: "optimization"
      },
      // AI Integration Templates
      {
        id: "ai-prompt-engineering",
        name: "AI Prompt Designer",
        description: "Design effective AI prompts",
        template: "Design an effective prompt for {{ai_model}} to achieve {{task_description}}. Include context setting, examples, constraints, and evaluation criteria.",
        category: "ai"
      },
      {
        id: "ai-integration-strategy",
        name: "AI Integration Strategy",
        description: "Plan AI integrations for applications",
        template: "Design a strategy to integrate {{ai_capability}} into a {{application_type}} application. Include user experience, API design, fallback mechanisms, and ethical considerations.",
        category: "ai"
      },
      // Agile & Project Management Templates
      {
        id: "sprint-planning",
        name: "Sprint Planning Guide",
        description: "Create structured sprint plans",
        template: "Create a sprint planning document for implementing {{feature_name}}. Break down into stories, tasks, estimate effort, identify dependencies, and define acceptance criteria.",
        category: "planning"
      },
      {
        id: "tech-debt-assessment",
        name: "Technical Debt Assessor",
        description: "Assess and prioritize technical debt",
        template: "Assess the technical debt in this codebase:\n\n```\n{{code_sample}}\n```\n\nIdentify issues, prioritize by impact, and suggest a remediation plan.",
        category: "planning"
      },
      // Production Readiness Templates
      {
        id: "monitoring-strategy",
        name: "Monitoring Strategy Designer",
        description: "Design application monitoring strategies",
        template: "Design a monitoring strategy for a {{application_type}} in production. Include metrics to track, alerting thresholds, logging strategy, and incident response workflow.",
        category: "operations"
      },
      {
        id: "deployment-pipeline",
        name: "CI/CD Pipeline Designer",
        description: "Design CI/CD pipelines",
        template: "Design a CI/CD pipeline for a {{application_type}} with {{requirements}}. Include build steps, test automation, deployment stages, and rollback mechanisms.",
        category: "operations"
      },
      {
        id: "disaster-recovery",
        name: "Disaster Recovery Planner",
        description: "Create disaster recovery plans",
        template: "Create a disaster recovery plan for a {{application_type}} with {{data_sensitivity}} data. Include backup strategies, recovery time objectives, and step-by-step recovery procedures.",
        category: "operations"
      },
      // Mobile & Cross-Platform Templates
      {
        id: "cross-platform-strategy",
        name: "Cross-Platform Strategy",
        description: "Plan cross-platform development strategies",
        template: "Design a strategy for developing {{application_type}} across web, iOS, and Android. Compare code sharing approaches, platform-specific considerations, and maintenance trade-offs.",
        category: "mobile"
      },
      {
        id: "mobile-optimization",
        name: "Mobile Performance Optimizer",
        description: "Optimize for mobile performance",
        template: "Analyze this code for mobile performance issues and suggest optimizations:\n\n```\n{{code}}\n```\n\nFocus on battery usage, network efficiency, and smooth UI interactions.",
        category: "mobile"
      },
      // Communication Templates
      {
        id: "tech-explainer",
        name: "Technical Concept Explainer",
        description: "Explain technical concepts clearly",
        template: "Explain {{technical_concept}} in simple terms for {{audience_type}}. Use analogies, examples, and visual descriptions without jargon.",
        category: "communication"
      },
      {
        id: "status-update",
        name: "Project Status Update",
        description: "Create clear project status updates",
        template: "Create a status update for the {{project_name}} project. Include accomplishments, challenges, next steps, and areas requiring attention or decisions.",
        category: "communication"
      },
      // Innovation Templates
      {
        id: "feature-ideation",
        name: "Feature Brainstormer",
        description: "Generate innovative feature ideas",
        template: "Generate 5 innovative feature ideas for {{product_type}} that would solve {{user_problem}}. For each idea, describe the functionality, user benefit, and implementation complexity.",
        category: "innovation"
      },
      {
        id: "trend-analyzer",
        name: "Tech Trend Analyzer",
        description: "Analyze technology trends and applications",
        template: "Analyze how {{technology_trend}} could impact {{industry_type}} in the next 2-3 years. Include potential applications, challenges, and strategic recommendations.",
        category: "innovation"
      },
      {
        id: "competitive-analysis",
        name: "Competitive Feature Analysis",
        description: "Analyze competitive features",
        template: "Conduct a competitive analysis of {{feature_name}} across {{competitor_list}}. Compare implementation approaches, user experience, limitations, and unique selling points.",
        category: "innovation"
      },
      {
        id: "design-system-component",
        name: "Design System Component",
        description: "Create design system component specifications",
        template: "Create a comprehensive specification for a {{component_type}} component in a design system. Include variants, props, accessibility, responsive behavior, and usage guidelines.",
        category: "design"
      }
    ];
    
    // Add favorite status to templates
    const favorites = this.getFavoriteTemplates();
    return templates.map(template => ({
      ...template,
      isFavorite: favorites.includes(template.id)
    }));
  }

  /**
   * Get a prompt template by ID
   * @param id The template ID
   * @returns The prompt template or undefined if not found
   */
  static getPromptTemplate(id: string): PromptTemplate | undefined {
    const template = this.getPromptTemplates().find(template => template.id === id);
    if (template) {
      const favorites = this.getFavoriteTemplates();
      return {
        ...template,
        isFavorite: favorites.includes(template.id)
      };
    }
    return undefined;
  }

  /**
   * Get prompt templates by category
   * @param category The category to filter by
   * @returns Array of prompt templates in the category
   */
  static getPromptTemplatesByCategory(category: string): PromptTemplate[] {
    const templates = this.getPromptTemplates().filter(template => template.category === category);
    const favorites = this.getFavoriteTemplates();
    
    return templates.map(template => ({
      ...template,
      isFavorite: favorites.includes(template.id)
    }));
  }

  /**
   * Get all available categories
   * @returns Array of unique categories
   */
  static getCategories(): string[] {
    const templates = this.getPromptTemplates();
    return [...new Set(templates.map(template => template.category))];
  }

  /**
   * Fill a prompt template with variables
   * @param templateId The template ID
   * @param variables Object containing variable values
   * @returns The filled prompt or null if template not found
   */
  static fillPromptTemplate(templateId: string, variables: Record<string, string>): string | null {
    const template = this.getPromptTemplate(templateId);
    
    if (!template) {
      return null;
    }
    
    let filledPrompt = template.template;
    
    // Replace all variables in the format {{variable_name}}
    Object.entries(variables).forEach(([key, value]) => {
      filledPrompt = filledPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    return filledPrompt;
  }
  
  /**
   * Get favorite template IDs from localStorage
   */
  static getFavoriteTemplates(): string[] {
    try {
      const favoritesJSON = localStorage.getItem(this.STORAGE_KEY);
      return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    } catch (error) {
      console.error('Error loading favorite templates:', error);
      return [];
    }
  }
  
  /**
   * Add a template to favorites
   */
  static addToFavorites(templateId: string): void {
    try {
      const favorites = this.getFavoriteTemplates();
      if (!favorites.includes(templateId)) {
        favorites.push(templateId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding template to favorites:', error);
    }
  }
  
  /**
   * Remove a template from favorites
   */
  static removeFromFavorites(templateId: string): void {
    try {
      let favorites = this.getFavoriteTemplates();
      favorites = favorites.filter(id => id !== templateId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error removing template from favorites:', error);
    }
  }
  
  /**
   * Toggle favorite status of a template
   */
  static toggleFavorite(templateId: string): boolean {
    const favorites = this.getFavoriteTemplates();
    const isFavorite = favorites.includes(templateId);
    
    if (isFavorite) {
      this.removeFromFavorites(templateId);
      return false;
    } else {
      this.addToFavorites(templateId);
      return true;
    }
  }
  
  /**
   * Get all favorite templates
   */
  static getAllFavoriteTemplates(): PromptTemplate[] {
    const favoriteIds = this.getFavoriteTemplates();
    return this.getPromptTemplates().filter(template => favoriteIds.includes(template.id));
  }
}
