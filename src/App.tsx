import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Import Index page directly since it's the landing page
import Index from "./pages/Index";
// Lazy load other pages to improve initial load time
const NotFound = lazy(() => import("./pages/NotFound"));
const GroqAPI = lazy(() => import("./pages/GroqAPI"));
const PromptEngineering = lazy(() => import("./pages/PromptEngineering"));
const AITools = lazy(() => import("./pages/AITools"));
const Plans = lazy(() => import("./pages/Plans"));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 justify-end mt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/groq-api" element={<GroqAPI />} />
            <Route path="/prompt-engineering" element={<PromptEngineering />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/plans" element={<Plans />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
