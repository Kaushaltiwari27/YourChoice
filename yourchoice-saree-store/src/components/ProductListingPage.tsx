import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Star, Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Saree, Filter as FilterType } from '../types';

interface ProductListingPageProps {
  sarees: Saree[];
  onProductClick: (saree: Saree) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export default function ProductListingPage({
  sarees,
  onProductClick,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange
}: ProductListingPageProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const categories = [
    { value: 'silk', label: 'Silk Sarees' },
    { value: 'cotton', label: 'Cotton Sarees' },
    { value: 'georgette', label: 'Georgette Sarees' },
    { value: 'party-wear', label: 'Party Wear' },
    { value: 'casual', label: 'Casual Wear' }
  ];

  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Black', 'White'];
  const fabrics = ['Pure Silk', 'Soft Silk', 'Cotton', 'Georgette', 'Chiffon', 'Handloom'];

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined
    });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const currentColors = filters.color || [];
    const updatedColors = checked 
      ? [...currentColors, color]
      : currentColors.filter(c => c !== color);
    
    onFiltersChange({
      ...filters,
      color: updatedColors.length > 0 ? updatedColors : undefined
    });
  };

  const handleFabricChange = (fabric: string, checked: boolean) => {
    const currentFabrics = filters.fabric || [];
    const updatedFabrics = checked 
      ? [...currentFabrics, fabric]
      : currentFabrics.filter(f => f !== fabric);
    
    onFiltersChange({
      ...filters,
      fabric: updatedFabrics.length > 0 ? updatedFabrics : undefined
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy as FilterType['sortBy']
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={filters.category === category.value}
                onCheckedChange={(checked) => handleCategoryChange(category.value, !!checked)}
              />
              <label 
                htmlFor={`category-${category.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium">Price Range</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceRange?.[0] || ''}
            onChange={(e) => {
              const min = e.target.value ? parseInt(e.target.value) : undefined;
              const max = filters.priceRange?.[1];
              onFiltersChange({
                ...filters,
                priceRange: min !== undefined || max !== undefined ? [min || 0, max || 100000] : undefined
              });
            }}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceRange?.[1] || ''}
            onChange={(e) => {
              const max = e.target.value ? parseInt(e.target.value) : undefined;
              const min = filters.priceRange?.[0];
              onFiltersChange({
                ...filters,
                priceRange: min !== undefined || max !== undefined ? [min || 0, max || 100000] : undefined
              });
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium">Colors</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.color?.includes(color) || false}
                onCheckedChange={(checked) => handleColorChange(color, !!checked)}
              />
              <label 
                htmlFor={`color-${color}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Fabrics */}
      <div className="space-y-3">
        <h4 className="font-medium">Fabric</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox
                id={`fabric-${fabric}`}
                checked={filters.fabric?.includes(fabric) || false}
                onCheckedChange={(checked) => handleFabricChange(fabric, !!checked)}
              />
              <label 
                htmlFor={`fabric-${fabric}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fabric}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ saree }: { saree: Saree }) => (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={saree.images[0]}
          alt={saree.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onProductClick(saree)}
        />
        {saree.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {Math.round((1 - saree.price / saree.originalPrice) * 100)}% OFF
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{saree.rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {saree.name}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-bold text-lg">{formatPrice(saree.price)}</span>
          {saree.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(saree.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground capitalize">{saree.category}</span>
          <span className="text-xs text-muted-foreground">{saree.fabric}</span>
        </div>
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => onProductClick(saree)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Saree Collection</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-muted-foreground">
              Showing {sarees.length} saree{sarees.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Mobile Search */}
              <div className="relative flex-1 sm:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Sort */}
              <Select value={filters.sortBy || ''} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Mobile Filter Button */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar isMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sarees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sarees.map((saree) => (
                  <ProductCard key={saree.id} saree={saree} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No sarees found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}