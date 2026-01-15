const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-muted" />
      
      {/* Content skeleton */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <div className="h-4 bg-muted rounded mb-2 w-full" />
        <div className="h-4 bg-muted rounded mb-4 w-3/4" />
        
        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded" />
        </div>
        
        {/* Price and button */}
        <div className="pt-3 border-t border-border mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
          <div className="h-10 bg-muted rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
