import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  LogOut,
  Settings,
  Bell,
  Search,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Activity
} from 'lucide-react';
import { OverviewAnalytics } from './OverviewAnalytics';
import { SalesAnalytics } from './SalesAnalytics';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { CustomerInsights } from './CustomerInsights';
import { PerformanceMetrics } from './PerformanceMetrics';

interface AdminDashboardProps {
  onLogout: () => void;
  adminUser: {
    username: string;
    role: string;
  };
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, adminUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Active Products',
      value: '456',
      change: '+5.1%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Total Customers',
      value: '2,891',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              YourChoice Admin
            </h1>
            <Badge variant="secondary" className="text-xs">
              Dashboard v2.0
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleString()}
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                  {adminUser.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{adminUser.username}</div>
                <div className="text-gray-500 text-xs">{adminUser.role}</div>
              </div>
            </div>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} bg-gray-50 p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-3xl grid-cols-6 bg-white shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                Sales
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <Package className="h-4 w-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <Activity className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <OverviewAnalytics />
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <SalesAnalytics />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <CustomerInsights />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <PerformanceMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};