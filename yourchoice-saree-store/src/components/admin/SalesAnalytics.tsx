import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Calendar,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';

export const SalesAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [viewType, setViewType] = useState('revenue');

  const salesData = {
    '7d': {
      revenue: '₹45,678',
      orders: 123,
      growth: '+12.5%',
      trend: 'up'
    },
    '30d': {
      revenue: '₹1,89,456',
      orders: 456,
      growth: '+8.3%',
      trend: 'up'
    },
    '90d': {
      revenue: '₹5,67,890',
      orders: 1234,
      growth: '+15.7%',
      trend: 'up'
    }
  };

  const topCategories = [
    {
      name: 'Silk Sarees',
      revenue: '₹1,23,456',
      orders: 234,
      percentage: 35,
      growth: '+18%'
    },
    {
      name: 'Cotton Sarees',
      revenue: '₹89,012',
      orders: 189,
      percentage: 25,
      growth: '+12%'
    },
    {
      name: 'Georgette Sarees',
      revenue: '₹67,890',
      orders: 145,
      percentage: 20,
      growth: '+8%'
    },
    {
      name: 'Party Wear',
      revenue: '₹56,789',
      orders: 123,
      percentage: 15,
      growth: '+22%'
    },
    {
      name: 'Bridal Wear',
      revenue: '₹34,567',
      orders: 67,
      percentage: 5,
      growth: '+45%'
    }
  ];

  const dailySales = [
    { day: 'Mon', revenue: 8500, orders: 15 },
    { day: 'Tue', revenue: 12300, orders: 22 },
    { day: 'Wed', revenue: 9800, orders: 18 },
    { day: 'Thu', revenue: 15600, orders: 28 },
    { day: 'Fri', revenue: 18900, orders: 34 },
    { day: 'Sat', revenue: 22100, orders: 41 },
    { day: 'Sun', revenue: 19500, orders: 36 }
  ];

  const currentData = salesData[timeRange as keyof typeof salesData];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32">
              <BarChart3 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="products">Products</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.revenue}</p>
                <div className="flex items-center mt-2">
                  {currentData.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className="text-sm text-green-600">{currentData.growth}</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.orders}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+9.2%</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Order</p>
                <p className="text-2xl font-bold text-gray-900">₹1,542</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">+3.1%</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {dailySales.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-100 rounded-t relative h-48 flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-500"
                      style={{ height: `${(day.revenue / 25000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center">
                    <div className="font-medium">{day.day}</div>
                    <div className="text-purple-600">₹{(day.revenue / 1000).toFixed(1)}k</div>
                    <div className="text-gray-500">{day.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.orders} orders
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.revenue}</div>
                      <div className="text-xs text-green-600">{category.growth}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹1,89,456</div>
              <div className="text-sm text-gray-600">Current Month</div>
              <div className="text-xs text-green-600 mt-1">↗ +12.5% vs last month</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₹1,68,234</div>
              <div className="text-sm text-gray-600">Previous Month</div>
              <div className="text-xs text-green-600 mt-1">↗ +8.3% vs 2 months ago</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹1,45,678</div>
              <div className="text-sm text-gray-600">Same Month Last Year</div>
              <div className="text-xs text-green-600 mt-1">↗ +30.1% growth YoY</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};