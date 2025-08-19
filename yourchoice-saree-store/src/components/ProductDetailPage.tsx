import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronLeft, 
  Truck, 
  Shield, 
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { Saree } from '../types';

interface ProductDetailPageProps {
  saree: Saree;
  onAddToCart: (saree: Saree, quantity: number, size?: string) => void;
  onBackToProducts: () => void;
}

export default function ProductDetailPage({ saree, onAddToCart, onBackToProducts }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const sizes = ['Free Size', 'Blouse: S', 'Blouse: M', 'Blouse: L', 'Blouse: XL'];

  const handleAddToCart = () => {
    onAddToCart(saree, quantity, selectedSize || sizes[0]);
  };

  const features = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: 'Free Shipping',
      description: 'On orders above ₹2000'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Quality Assurance',
      description: '100% authentic products'
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: 'Easy Returns',
      description: '7 days return policy'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={onBackToProducts}
          className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={saree.images[activeImage] || saree.images[0]}
                alt={saree.name}
                className="h-full w-full object-cover"
              />
              {saree.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  {Math.round((1 - saree.price / saree.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {saree.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {saree.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      activeImage === index 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${saree.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{saree.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(saree.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{saree.rating}</span>
                  <span className="text-sm text-muted-foreground">({saree.reviews} reviews)</span>
                </div>
                <Badge variant="outline" className="capitalize">
                  {saree.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">{formatPrice(saree.price)}</span>
                {saree.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(saree.originalPrice)}
                  </span>
                )}
              </div>
              {saree.originalPrice && (
                <p className="text-sm text-green-600 font-medium">
                  You save {formatPrice(saree.originalPrice - saree.price)}!
                </p>
              )}
            </div>

            <Separator />

            {/* Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Fabric:</span>
                <span className="ml-2 text-muted-foreground">{saree.fabric}</span>
              </div>
              <div>
                <span className="font-medium">Color:</span>
                <span className="ml-2 text-muted-foreground">{saree.color}</span>
              </div>
              {saree.work && (
                <div>
                  <span className="font-medium">Work:</span>
                  <span className="ml-2 text-muted-foreground">{saree.work}</span>
                </div>
              )}
              {saree.length && (
                <div>
                  <span className="font-medium">Length:</span>
                  <span className="ml-2 text-muted-foreground">{saree.length}</span>
                </div>
              )}
              <div>
                <span className="font-medium">Blouse Piece:</span>
                <span className="ml-2 text-muted-foreground">
                  {saree.blousePiece ? 'Included' : 'Not Included'}
                </span>
              </div>
              <div>
                <span className="font-medium">Stock:</span>
                <span className={`ml-2 font-medium ${saree.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {saree.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Size (Blouse)</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!saree.inStock}
                size="lg"
                className="w-full"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {saree.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-primary">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {saree.description}
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Care Instructions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Dry clean only for best results</li>
                    <li>• Store in a cool, dry place</li>
                    <li>• Avoid direct sunlight when drying</li>
                    <li>• Iron on low heat with a cloth</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Additional Information</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Handcrafted with premium materials</li>
                    <li>• Perfect for special occasions</li>
                    <li>• Comes with matching blouse piece</li>
                    <li>• Authentic traditional craftsmanship</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}