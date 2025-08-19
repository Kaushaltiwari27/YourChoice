import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Eye, 
  ShoppingCart, 
  Package,
  Target,
  Clock
} from 'lucide-react';

export const OverviewAnalytics: React.FC = () => {
  const recentActivity = [
    {
      id: 1,
      type: 'order',
      message: 'New order #1234 received',
      time: '2 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'product',
      message: 'Silk Saree added to inventory',
      time: '15 minutes ago',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'user',
      message: '5 new customers registered',
      time: '1 hour ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'view',
      message: 'Product views increased by 20%',
      time: '2 hours ago',
      icon: Eye,
      color: 'text-orange-600'
    }
  ];

  const topPerformingProducts = [
    {
      name: 'Red Bridal Silk Saree',
      sales: 45,
      revenue: '₹67,500',
      growth: '+25%'
    },
    {
      name: 'Blue Georgette Party Saree',
      sales: 38,
      revenue: '₹45,600',
      growth: '+18%'
    },
    {
      name: 'Green Cotton Casual Saree',
      sales: 32,
      revenue: '₹28,800',
      growth: '+12%'
    },
    {
      name: 'Purple Silk Wedding Saree',
      sales: 28,
      revenue: '₹42,000',
      growth: '+8%'
    }
  ];

  const conversionMetrics = [
    {
      metric: 'Website Visitors',
      value: '12,456',
      percentage: 100,
      color: 'bg-blue-500'
    },
    {
      metric: 'Product Views',
      value: '8,234',
      percentage: 66,
      color: 'bg-purple-500'
    },
    {
      metric: 'Add to Cart',
      value: '2,891',
      percentage: 23,
      color: 'bg-orange-500'
    },
    {
      metric: 'Purchases',
      value: '1,234',
      percentage: 10,
      color: 'bg-green-500'
    }
  ];

  const monthlyGoals = [
    {
      title: 'Sales Target',
      current: 245680,
      target: 300000,
      percentage: 82
    },
    {
      title: 'New Customers',
      current: 289,
      target: 350,
      percentage: 83
    },
    {
      title: 'Product Views',
      current: 8234,
      target: 10000,
      percentage: 82
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`${activity.color} bg-gray-50 p-2 rounded-lg flex-shrink-0`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Products */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.sales} sales • {product.revenue}
                  </p>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {product.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                  <span className="text-sm text-gray-900">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goals */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Monthly Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{goal.title}</h3>
                  <span className="text-sm text-gray-500">{goal.percentage}%</span>
                </div>
                <Progress value={goal.percentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {goal.title.includes('Sales') ? `₹${goal.current.toLocaleString()}` : goal.current.toLocaleString()}
                  </span>
                  <span>
                    {goal.title.includes('Sales') ? `₹${goal.target.toLocaleString()}` : goal.target.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Website Performance Metrics */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Today's Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2,456</div>
              <div className="text-sm text-gray-600">Page Views</div>
              <div className="text-xs text-green-600 mt-1">↗ +12%</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1.8s</div>
              <div className="text-sm text-gray-600">Avg Load Time</div>
              <div className="text-xs text-green-600 mt-1">↗ +5%</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">72%</div>
              <div className="text-sm text-gray-600">Bounce Rate</div>
              <div className="text-xs text-red-600 mt-1">↘ -8%</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3.2</div>
              <div className="text-sm text-gray-600">Pages/Session</div>
              <div className="text-xs text-green-600 mt-1">↗ +15%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};