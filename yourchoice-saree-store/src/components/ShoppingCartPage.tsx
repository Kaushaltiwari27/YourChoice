import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart,
  ArrowRight,
  Star
} from 'lucide-react';
import { CartItem } from '../types';

interface ShoppingCartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (sareeId: string, quantity: number, size?: string) => void;
  onRemoveItem: (sareeId: string, size?: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  totalPrice: number;
}

export default function ShoppingCartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  totalPrice
}: ShoppingCartPageProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = (item: CartItem) => {
    return item.saree.price * item.quantity;
  };

  const shipping = totalPrice > 2000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05); // 5% tax
  const finalTotal = totalPrice + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added any sarees to your cart yet. 
              Start shopping to fill it up!
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => window.location.reload()} // This would navigate to products in a real app
            className="w-full sm:w-auto"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Shopping Cart</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
            </p>
            <Button 
              variant="ghost" 
              onClick={onClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={`${item.saree.id}-${item.size}-${index}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-24 h-48 sm:h-32 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                      <img
                        src={item.saree.images[0]}
                        alt={item.saree.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{item.saree.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{item.saree.rating}</span>
                          </div>
                          <Badge variant="outline" className="capitalize text-xs">
                            {item.saree.category.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Fabric: {item.saree.fabric}</p>
                        <p>Color: {item.saree.color}</p>
                        {item.size && <p>Size: {item.size}</p>}
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">{formatPrice(item.saree.price)}</span>
                            {item.saree.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.saree.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Subtotal: {formatPrice(getSubtotal(item))}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.saree.id, item.quantity - 1, item.size)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.saree.id, item.quantity + 1, item.size)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.saree.id, item.size)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <div className="text-right">
                      {shipping === 0 ? (
                        <div>
                          <span className="text-green-600">Free</span>
                          <p className="text-xs text-muted-foreground">Orders above ₹2000</p>
                        </div>
                      ) : (
                        <span>{formatPrice(shipping)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                {totalPrice < 2000 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      Add {formatPrice(2000 - totalPrice)} more to get free shipping!
                    </p>
                  </div>
                )}

                <Button 
                  onClick={onProceedToCheckout}
                  size="lg"
                  className="w-full"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>7-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span>Quality guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}