
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  centerContent?: boolean;
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  mobileScroll?: boolean;
  bottomPadding?: boolean;
}

export const MobileOptimizedContainer = ({
  children,
  className,
  spacing = 'md',
  fullHeight = false,
  centerContent = false,
  maxWidth = 'none',
  mobileScroll = true,
  bottomPadding = false,
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
        maxWidth === 'sm' && 'max-w-screen-sm mx-auto',
        maxWidth === 'md' && 'max-w-screen-md mx-auto',
        maxWidth === 'lg' && 'max-w-screen-lg mx-auto',
        maxWidth === 'xl' && 'max-w-screen-xl mx-auto',
        maxWidth === 'full' && 'max-w-full',
        isMobile && 'touch-manipulation',
        isMobile && mobileScroll && 'overflow-auto',
        isMobile && bottomPadding && 'pb-24',
        className
      )}
      style={isMobile ? {
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: '-ms-autohiding-scrollbar'
      } : {}}
      {...props}
    >
      {children}
    </div>
  );
};
