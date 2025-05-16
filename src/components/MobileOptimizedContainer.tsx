
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  centerContent?: boolean;
}

export const MobileOptimizedContainer = ({
  children,
  className,
  spacing = 'md',
  fullHeight = false,
  centerContent = false,
  ...props
}: MobileOptimizedContainerProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div
      className={cn(
        'w-full transition-all',
        spacing === 'none' ? 'p-0' : 
        spacing === 'sm' ? 'p-2 sm:p-3' : 
        spacing === 'lg' ? 'p-4 sm:p-6' : 
        'p-3 sm:p-4',
        fullHeight && 'min-h-[calc(100vh-4rem)]',
        centerContent && 'flex flex-col items-center justify-center',
        isMobile ? 'touch-manipulation' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
