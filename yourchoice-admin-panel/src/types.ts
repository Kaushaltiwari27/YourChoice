export interface Product {
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
  stock: number;
  rating: number;
  reviews: number;
  sku: string;
  tags: string[];
  featured: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  averageOrder: number;
  lastOrderDate: string;
  favoriteCategory: string;
  loyaltyPoints: number;
  status: 'active' | 'inactive' | 'vip';
  avatar?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  orderDate: string;
  expectedDelivery: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager' | 'staff';
  permissions: string[];
  avatar?: string;
  lastLogin: string;
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  conversionRate: number;
  averageOrderValue: number;
  totalSales: number;
  totalOrders: number;
  newCustomers: number;
  returningCustomers: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  salesByCategory: Array<{
    category: string;
    sales: number;
    revenue: number;
  }>;
  revenueOverTime: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

export type AdminPage = 
  | 'login'
  | 'dashboard' 
  | 'products' 
  | 'orders' 
  | 'customers' 
  | 'analytics' 
  | 'inventory'
  | 'settings'
  | 'marketing'
  | 'reports';