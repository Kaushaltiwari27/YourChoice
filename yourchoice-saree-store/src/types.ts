export interface Saree {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'silk' | 'cotton' | 'georgette' | 'party-wear' | 'casual';
  fabric: string;
  color: string;
  work?: string;
  length?: string;
  blousePiece: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Filter {
  category?: string;
  priceRange?: [number, number];
  color?: string[];
  fabric?: string[];
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export type AppPage = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'auth' | 'admin-login' | 'admin-dashboard';

export interface AdminUser {
  username: string;
  role: string;
  permissions: string[];
}