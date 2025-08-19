import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Search, 
  Users, 
  UserPlus, 
  TrendingUp, 
  TrendingDown,
  Star,
  ShoppingBag,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Gift,
  Heart,
  Filter,
  Download
} from 'lucide-react';

interface Customer {
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
}

export const CustomerInsights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('totalSpent');

  // Sample customer data
  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, Karnataka',
      joinDate: '2023-05-15',
      totalOrders: 15,
      totalSpent: 189450,
      averageOrder: 12630,
      lastOrderDate: '2024-01-15',
      favoriteCategory: 'Silk Sarees',
      loyaltyPoints: 1894,
      status: 'vip'
    },
    {
      id: 'CUST-002',
      name: 'Anita Desai',
      email: 'anita.desai@email.com',
      phone: '+91 87654 32109',
      location: 'Mumbai, Maharashtra',
      joinDate: '2023-08-22',
      totalOrders: 8,
      totalSpent: 67890,
      averageOrder: 8486,
      lastOrderDate: '2024-01-14',
      favoriteCategory: 'Cotton Sarees',
      loyaltyPoints: 678,
      status: 'active'
    },
    {
      id: 'CUST-003',
      name: 'Meera Nair',
      email: 'meera.nair@email.com',
      phone: '+91 76543 21098',
      location: 'Chennai, Tamil Nadu',
      joinDate: '2023-03-10',
      totalOrders: 12,
      totalSpent: 156780,
      averageOrder: 13065,
      lastOrderDate: '2024-01-12',
      favoriteCategory: 'Party Wear',
      loyaltyPoints: 1567,
      status: 'vip'
    },
    {
      id: 'CUST-004',
      name: 'Kavita Patel',
      email: 'kavita.patel@email.com',
      phone: '+91 65432 10987',
      location: 'Ahmedabad, Gujarat',
      joinDate: '2023-11-05',
      totalOrders: 5,
      totalSpent: 34560,
      averageOrder: 6912,
      lastOrderDate: '2024-01-16',
      favoriteCategory: 'Georgette',
      loyaltyPoints: 345,
      status: 'active'
    },
    {
      id: 'CUST-005',
      name: 'Ritu Singh',
      email: 'ritu.singh@email.com',
      phone: '+91 54321 09876',
      location: 'New Delhi, Delhi',
      joinDate: '2023-12-01',
      totalOrders: 2,
      totalSpent: 12450,
      averageOrder: 6225,
      lastOrderDate: '2023-12-15',
      favoriteCategory: 'Casual',
      loyaltyPoints: 124,
      status: 'inactive'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segmentFilter === 'all' || customer.status === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'totalSpent':
        return b.totalSpent - a.totalSpent;
      case 'totalOrders':
        return b.totalOrders - a.totalOrders;
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return 0;
    }
  });

  const customerStats = {
    total: customers.length,
    vip: customers.filter(c => c.status === 'vip').length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    newThisMonth: customers.filter(c => new Date(c.joinDate) > new Date('2024-01-01')).length,
    averageSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length
  };

  const topCategories = [
    { name: 'Silk Sarees', customers: 45, percentage: 35 },
    { name: 'Cotton Sarees', customers: 38, percentage: 29 },
    { name: 'Party Wear', customers: 25, percentage: 19 },
    { name: 'Georgette', customers: 15, percentage: 12 },
    { name: 'Casual', customers: 7, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{customerStats.total}</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{customerStats.vip}</p>
              <p className="text-sm text-gray-600">VIP Customers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{customerStats.inactive}</p>
              <p className="text-sm text-gray-600">Inactive</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{customerStats.newThisMonth}</p>
              <p className="text-sm text-gray-600">New This Month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xl font-bold text-orange-600">₹{(customerStats.averageSpent / 1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-600">Avg. Lifetime Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm">VIP Customers</span>
                </div>
                <span className="text-sm font-medium">{customerStats.vip}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Active Customers</span>
                </div>
                <span className="text-sm font-medium">{customerStats.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-sm">Inactive Customers</span>
                </div>
                <span className="text-sm font-medium">{customerStats.inactive}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.customers} customers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserPlus className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">New Customers</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">+25</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Customer Retention</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">87%</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm">Avg. Rating</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">4.7/5</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2
                  </div>
                </div>
              </div>
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
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Segments</option>
                <option value="vip">VIP Customers</option>
                <option value="active">Active Customers</option>
                <option value="inactive">Inactive Customers</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="totalSpent">Sort by Spend</option>
                <option value="totalOrders">Sort by Orders</option>
                <option value="name">Sort by Name</option>
                <option value="joinDate">Sort by Join Date</option>
              </select>
            </div>
            
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
                    <Badge className={`${getStatusColor(customer.status)} border-0`}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{customer.location}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-lg font-bold text-purple-600">
                        ₹{(customer.totalSpent / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-gray-500">Total Spent</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {customer.totalOrders}
                      </div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{(customer.averageOrder / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-gray-500">Avg. Order</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <Gift className="h-3 w-3 mr-1" />
                        {customer.loyaltyPoints}
                      </div>
                      <div className="text-xs text-gray-500">Loyalty Points</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Joined: {new Date(customer.joinDate).toLocaleDateString()}</span>
                      <span>Favorite: {customer.favoriteCategory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};