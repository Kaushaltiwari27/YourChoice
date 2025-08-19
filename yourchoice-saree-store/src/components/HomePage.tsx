import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Saree } from '../types';
import { categories } from '../data/sarees';

interface HomePageProps {
  sarees: Saree[];
  onProductClick: (saree: Saree) => void;
  onCategoryClick: (category?: string) => void;
}

export default function HomePage({ sarees, onProductClick, onCategoryClick }: HomePageProps) {
  const newArrivals = sarees.slice(0, 4);
  const bestSellers = sarees.filter(saree => saree.rating >= 4.5).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const ProductCard = ({ saree }: { saree: Saree }) => (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={saree.images[0]}
          alt={saree.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onProductClick(saree)}
          loading="lazy"
        />
        {saree.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
            {Math.round((1 - saree.price / saree.originalPrice) * 100)}% OFF
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{saree.rating}</span>
        </div>
      </div>
      <CardContent className="p-3 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {saree.name}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-bold text-base sm:text-lg">{formatPrice(saree.price)}</span>
          {saree.originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatPrice(saree.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {saree.description}
        </p>
        <Button 
          size="sm" 
          className="w-full text-xs sm:text-sm"
          onClick={() => onProductClick(saree)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  Discover
                  <span className="block text-primary">Exquisite Sarees</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Embrace the beauty of traditional craftsmanship with our carefully curated collection of premium sarees.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => onCategoryClick()}
                    className="group w-full sm:w-auto min-w-[140px]"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => onCategoryClick('silk')}
                    className="w-full sm:w-auto min-w-[140px]"
                  >
                    Silk Collection
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <img
                    src="/images/purple-silk-saree.jpg"
                    alt="Featured Saree"
                    className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">4.9/5</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 sm:mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Explore our diverse collection of sarees, each category crafted to perfection
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => onCategoryClick(category.id)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base text-center leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-1 sm:mb-2">New Arrivals</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Fresh additions to our collection</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onCategoryClick()}
              className="hidden sm:flex"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((saree) => (
              <ProductCard key={saree.id} saree={saree} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8 sm:hidden">
            <Button 
              variant="outline"
              onClick={() => onCategoryClick()}
              className="w-full"
            >
              View All New Arrivals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-1 sm:mb-2">Best Sellers</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Most loved by our customers</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onCategoryClick()}
              className="hidden sm:flex"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((saree) => (
              <ProductCard key={saree.id} saree={saree} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8 sm:hidden">
            <Button 
              variant="outline"
              onClick={() => onCategoryClick()}
              className="w-full"
            >
              View All Best Sellers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 sm:mb-4">Why Choose YourChoice?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Handpicked sarees with finest fabrics and authentic craftsmanship
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Quick and secure delivery to your doorstep across India
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Best Prices</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Competitive pricing with regular offers and discounts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}