import { memo, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

export interface FilterState {
  priceRange: [number, number];
  conditions: string[];
  inStockOnly: boolean;
  ramOptions: string[];
  storageOptions: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  availableConditions: string[];
  availableRam: string[];
  availableStorage: string[];
  activeFilterCount: number;
}

const ProductFilters = memo(({
  filters,
  onFiltersChange,
  maxPrice,
  availableConditions,
  availableRam,
  availableStorage,
  activeFilterCount
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCondition = (condition: string) => {
    const current = filters.conditions;
    const updated = current.includes(condition)
      ? current.filter(c => c !== condition)
      : [...current, condition];
    updateFilter('conditions', updated);
  };

  const toggleRam = (ram: string) => {
    const current = filters.ramOptions;
    const updated = current.includes(ram)
      ? current.filter(r => r !== ram)
      : [...current, ram];
    updateFilter('ramOptions', updated);
  };

  const toggleStorage = (storage: string) => {
    const current = filters.storageOptions;
    const updated = current.includes(storage)
      ? current.filter(s => s !== storage)
      : [...current, storage];
    updateFilter('storageOptions', updated);
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, maxPrice],
      conditions: [],
      inStockOnly: false,
      ramOptions: [],
      storageOptions: [],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
          <span className="font-medium">Price Range</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            max={maxPrice}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded">KSh {filters.priceRange[0].toLocaleString()}</span>
            <span className="text-muted-foreground">—</span>
            <span className="bg-muted px-2 py-1 rounded">KSh {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Condition */}
      {availableConditions.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
            <span className="font-medium">Condition</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {availableConditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-3">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={filters.conditions.includes(condition)}
                  onCheckedChange={() => toggleCondition(condition)}
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* RAM */}
      {availableRam.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
            <span className="font-medium">RAM</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {availableRam.map((ram) => (
              <div key={ram} className="flex items-center space-x-3">
                <Checkbox
                  id={`ram-${ram}`}
                  checked={filters.ramOptions.includes(ram)}
                  onCheckedChange={() => toggleRam(ram)}
                />
                <Label
                  htmlFor={`ram-${ram}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {ram}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Storage */}
      {availableStorage.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
            <span className="font-medium">Storage</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {availableStorage.map((storage) => (
              <div key={storage} className="flex items-center space-x-3">
                <Checkbox
                  id={`storage-${storage}`}
                  checked={filters.storageOptions.includes(storage)}
                  onCheckedChange={() => toggleStorage(storage)}
                />
                <Label
                  htmlFor={`storage-${storage}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {storage}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* In Stock Only */}
      <div className="flex items-center space-x-3 py-2 border-t border-border pt-4">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) => updateFilter('inStockOnly', checked === true)}
        />
        <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-background">
            <SheetHeader className="mb-6">
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </div>
    </>
  );
});

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;
