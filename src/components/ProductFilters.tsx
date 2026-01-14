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
  categories: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  availableCategories: string[];
  activeFilterCount: number;
}

const CONDITIONS = ['New', 'Refurbished', 'Ex UK'];

const ProductFilters = memo(({
  filters,
  onFiltersChange,
  maxPrice,
  availableCategories,
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

  const toggleCategory = (category: string) => {
    const current = filters.categories;
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];
    updateFilter('categories', updated);
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, maxPrice],
      conditions: [],
      inStockOnly: false,
      categories: [],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <span className="font-medium">Price Range</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            max={maxPrice}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>KSh {filters.priceRange[0].toLocaleString()}</span>
            <span>KSh {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Condition */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <span className="font-medium">Condition</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {CONDITIONS.map((condition) => (
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

      {/* Categories */}
      {availableCategories.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
            <span className="font-medium">Category</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer capitalize"
                >
                  {category.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* In Stock Only */}
      <div className="flex items-center space-x-3 py-2">
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
          Clear All Filters
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
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount} active</Badge>
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
