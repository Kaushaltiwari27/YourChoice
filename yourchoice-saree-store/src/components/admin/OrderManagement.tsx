import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Package,
  DollarSign,
  Calendar,
  User,
  Phone,
  MapPin,
  Download
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  shippingAddress: string;
  paymentMethod: string;
}

export const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample orders data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      customerName: 'Priya Sharma',
      customerEmail: 'priya.sharma@email.com',
      customerPhone: '+91 98765 43210',
      items: [
        { name: 'Royal Purple Silk Saree', quantity: 1, price: 12999 },
        { name: 'Classic Blue Silk Saree', quantity: 1, price: 8999 }
      ],
      total: 21998,
      status: 'confirmed',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-22',
      shippingAddress: '123 MG Road, Bangalore, Karnataka 560001',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-002',
      customerName: 'Anita Desai',
      customerEmail: 'anita.desai@email.com',
      customerPhone: '+91 87654 32109',
      items: [
        { name: 'Elegant Orange Cotton Saree', quantity: 2, price: 2999 }
      ],
      total: 5998,
      status: 'shipped',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-21',
      shippingAddress: '456 Park Street, Mumbai, Maharashtra 400001',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-003',
      customerName: 'Meera Nair',
      customerEmail: 'meera.nair@email.com',
      customerPhone: '+91 76543 21098',
      items: [
        { name: 'Premium Silk Wedding Saree', quantity: 1, price: 25999 }
      ],
      total: 25999,
      status: 'delivered',
      orderDate: '2024-01-12',
      expectedDelivery: '2024-01-19',
      shippingAddress: '789 Anna Salai, Chennai, Tamil Nadu 600002',
      paymentMethod: 'Net Banking'
    },
    {
      id: 'ORD-004',
      customerName: 'Kavita Patel',
      customerEmail: 'kavita.patel@email.com',
      customerPhone: '+91 65432 10987',
      items: [
        { name: 'Designer Party Wear Saree', quantity: 1, price: 18999 },
        { name: 'Traditional Georgette Saree', quantity: 1, price: 5999 }
      ],
      total: 24998,
      status: 'pending',
      orderDate: '2024-01-16',
      expectedDelivery: '2024-01-23',
      shippingAddress: '321 SG Highway, Ahmedabad, Gujarat 380015',
      paymentMethod: 'COD'
    },
    {
      id: 'ORD-005',
      customerName: 'Ritu Singh',
      customerEmail: 'ritu.singh@email.com',
      customerPhone: '+91 54321 09876',
      items: [
        { name: 'Sunshine Yellow Cotton Saree', quantity: 1, price: 3499 }
      ],
      total: 3499,
      status: 'cancelled',
      orderDate: '2024-01-13',
      expectedDelivery: '2024-01-20',
      shippingAddress: '654 Connaught Place, New Delhi, Delhi 110001',
      paymentMethod: 'UPI'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'shipped': return Truck;
      case 'delivered': return Package;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="space-y-6">
      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{orderStats.confirmed}</p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
              <p className="text-sm text-gray-600">Shipped</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xl font-bold text-purple-600">₹{(orderStats.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
            
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <Badge className={`${getStatusColor(order.status)} border-0 flex items-center`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium text-gray-900">{order.customerName}</div>
                          <div>{order.customerEmail}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <div>{order.customerPhone}</div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                          <div>Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
                          <div>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div className="text-sm truncate">{order.shippingAddress}</div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm text-gray-600 mb-2">Items:</div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            {item.name} × {item.quantity} - ₹{item.price.toLocaleString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:text-right space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{order.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </div>
                    
                    <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {order.status === 'pending' && (
                        <Button size="sm" className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm
                        </Button>
                      )}
                      
                      {order.status === 'confirmed' && (
                        <Button size="sm" className="flex-1 lg:flex-none bg-purple-600 hover:bg-purple-700">
                          <Truck className="h-4 w-4 mr-2" />
                          Ship
                        </Button>
                      )}
                      
                      {order.status === 'shipped' && (
                        <Button size="sm" className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700">
                          <Package className="h-4 w-4 mr-2" />
                          Deliver
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};