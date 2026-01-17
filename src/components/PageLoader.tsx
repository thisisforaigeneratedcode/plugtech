const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated loader */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-muted animate-pulse" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>
        
        {/* Loading text */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <span>Loading</span>
          <span className="animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
