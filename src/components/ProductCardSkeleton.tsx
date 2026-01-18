const ShimmerBar = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-muted rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-background/20 to-transparent" />
  </div>
);

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col">
      {/* Image skeleton with shimmer */}
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-background/10 to-transparent" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <ShimmerBar className="h-4 mb-2 w-full" />
        <ShimmerBar className="h-4 mb-4 w-3/4" />
        
        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
          <ShimmerBar className="h-3" />
          <ShimmerBar className="h-3" />
          <ShimmerBar className="h-3" />
          <ShimmerBar className="h-3" />
        </div>
        
        {/* Price and button */}
        <div className="pt-3 border-t border-border mt-auto">
          <div className="flex items-center justify-between mb-3">
            <ShimmerBar className="h-5 w-24" />
            <ShimmerBar className="h-3 w-16" />
          </div>
          <ShimmerBar className="h-10 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
