import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingCart,
  Target,
  Clock,
  Globe,
  MousePointer,
  Zap,
  BarChart3
} from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Simulated analytics data - in real app, this would come from Google Analytics API
  const performanceData = {
    '7d': {
      pageViews: 12456,
      uniqueVisitors: 8234,
      bounceRate: 42.5,
      avgSessionDuration: '3m 24s',
      conversionRate: 2.8,
      pageLoadTime: 1.8,
      searchQueries: 1567,
      clickThroughRate: 18.5
    },
    '30d': {
      pageViews: 45678,
      uniqueVisitors: 28934,
      bounceRate: 38.2,
      avgSessionDuration: '4m 12s',
      conversionRate: 3.1,
      pageLoadTime: 1.6,
      searchQueries: 6789,
      clickThroughRate: 22.1
    },
    '90d': {
      pageViews: 156789,
      uniqueVisitors: 89456,
      bounceRate: 35.8,
      avgSessionDuration: '4m 45s',
      conversionRate: 3.4,
      pageLoadTime: 1.5,
      searchQueries: 23456,
      clickThroughRate: 25.3
    }
  };

  const currentData = performanceData[timeRange as keyof typeof performanceData];

  const keyMetrics = [
    {
      title: 'Page Views',
      value: currentData.pageViews.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Unique Visitors',
      value: currentData.uniqueVisitors.toLocaleString(),
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Bounce Rate',
      value: `${currentData.bounceRate}%`,
      change: '-5.2%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Conversion Rate',
      value: `${currentData.conversionRate}%`,
      change: '+15.7%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Avg. Session Duration',
      value: currentData.avgSessionDuration,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Page Load Time',
      value: `${currentData.pageLoadTime}s`,
      icon: Zap,
      color: 'text-green-600'
    },
    {
      title: 'Search Queries',
      value: currentData.searchQueries.toLocaleString(),
      icon: Globe,
      color: 'text-purple-600'
    },
    {
      title: 'Click-through Rate',
      value: `${currentData.clickThroughRate}%`,
      icon: MousePointer,
      color: 'text-orange-600'
    }
  ];

  const topPages = [
    { page: '/products', views: 4567, percentage: 36.7 },
    { page: '/', views: 3234, percentage: 26.0 },
    { page: '/products/silk-sarees', views: 1890, percentage: 15.2 },
    { page: '/cart', views: 1234, percentage: 9.9 },
    { page: '/product-detail', views: 987, percentage: 7.9 }
  ];

  const deviceBreakdown = [
    { device: 'Mobile', visitors: 5456, percentage: 66.2 },
    { device: 'Desktop', visitors: 2234, percentage: 27.1 },
    { device: 'Tablet', visitors: 544, percentage: 6.6 }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 3456, percentage: 42.0 },
    { source: 'Direct', visitors: 2234, percentage: 27.1 },
    { source: 'Social Media', visitors: 1456, percentage: 17.7 },
    { source: 'Email', visitors: 678, percentage: 8.2 },
    { source: 'Paid Ads', visitors: 410, percentage: 5.0 }
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs previous period</span>
                  </div>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <metric.icon className={`h-5 w-5 ${metric.color} mr-3`} />
                    <span className="text-sm font-medium">{metric.title}</span>
                  </div>
                  <span className="text-sm font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{page.page}</span>
                    <span className="text-sm text-gray-500">{page.views.toLocaleString()} views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceBreakdown.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{device.visitors.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{device.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0 ? 'bg-green-500' : 
                      index === 1 ? 'bg-blue-500' : 
                      index === 2 ? 'bg-pink-500' : 
                      index === 3 ? 'bg-orange-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{source.visitors.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Analytics Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Google Analytics 4</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Connected
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">E-commerce Tracking</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Enabled
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Custom Event Tracking</span>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Active
              </Badge>
            </div>

            <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
              <strong>Note:</strong> To enable live analytics data, replace 'G-XXXXXXXXXX' in 
              <code className="mx-1 px-1 py-0.5 bg-gray-200 rounded text-xs">src/utils/analytics.ts</code>
              with your actual Google Analytics 4 measurement ID.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};