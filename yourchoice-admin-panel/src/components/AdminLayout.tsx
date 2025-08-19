import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Home,
  Warehouse,
  Megaphone,
  FileText,
  ChevronDown,
  Shield
} from 'lucide-react';
import { AdminUser, AdminPage } from '../types';

interface AdminLayoutProps {
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
  adminUser: AdminUser;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function AdminLayout({
  currentPage,
  onPageChange,
  adminUser,
  onLogout,
  children
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    {
      id: 'dashboard' as AdminPage,
      label: 'Dashboard',
      icon: Home,
      description: 'Overview & Analytics'
    },
    {
      id: 'products' as AdminPage,
      label: 'Products',
      icon: Package,
      description: 'Manage Catalog'
    },
    {
      id: 'orders' as AdminPage,
      label: 'Orders',
      icon: ShoppingCart,
      description: 'Order Management'
    },
    {
      id: 'customers' as AdminPage,
      label: 'Customers',
      icon: Users,
      description: 'Customer Database'
    },
    {
      id: 'inventory' as AdminPage,
      label: 'Inventory',
      icon: Warehouse,
      description: 'Stock Management'
    },
    {
      id: 'analytics' as AdminPage,
      label: 'Analytics',
      icon: TrendingUp,
      description: 'Reports & Insights'
    },
    {
      id: 'marketing' as AdminPage,
      label: 'Marketing',
      icon: Megaphone,
      description: 'Campaigns & Promotions'
    },
    {
      id: 'reports' as AdminPage,
      label: 'Reports',
      icon: FileText,
      description: 'Business Reports'
    },
    {
      id: 'settings' as AdminPage,
      label: 'Settings',
      icon: Settings,
      description: 'System Configuration'
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-700';
      case 'admin':
        return 'bg-blue-100 text-blue-700';
      case 'manager':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const Sidebar = () => (
    <div className=\"h-full bg-white border-r border-gray-200 shadow-sm flex flex-col\">
      {/* Sidebar Header */}
      <div className=\"p-6 border-b border-gray-200\">
        <div className=\"flex items-center gap-3 mb-4\">
          <div className=\"h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center\">
            <Shield className=\"h-6 w-6 text-white\" />
          </div>
          <div>
            <h1 className=\"text-xl font-bold text-gray-900\">YourChoice</h1>
            <p className=\"text-sm text-purple-600 font-medium\">Admin Panel</p>
          </div>
        </div>
        
        {/* Admin User Info */}
        <div className=\"flex items-center gap-3 p-3 bg-gray-50 rounded-lg\">
          <Avatar className=\"h-8 w-8\">
            <AvatarFallback className=\"bg-purple-100 text-purple-600 text-xs font-semibold\">
              {adminUser.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className=\"flex-1 min-w-0\">
            <p className=\"text-sm font-medium text-gray-900 truncate\">{adminUser.username}</p>
            <Badge className={`text-xs ${getRoleBadgeColor(adminUser.role)} border-0`}>
              {adminUser.role.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className=\"flex-1 p-4 space-y-2 overflow-y-auto\">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onPageChange(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm border border-purple-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 flex-shrink-0 ${
              currentPage === item.id ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
            }`} />
            <div className=\"flex-1 min-w-0\">
              <div className=\"text-sm font-medium\">{item.label}</div>
              <div className=\"text-xs opacity-75 truncate\">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className=\"p-4 border-t border-gray-200\">
        <div className=\"text-xs text-gray-500 text-center\">
          <p>© 2024 YourChoice</p>
          <p>Version 2.0.1</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className=\"h-screen bg-gray-50 flex overflow-hidden\">
      {/* Desktop Sidebar */}
      <div className=\"hidden lg:flex w-80 flex-shrink-0\">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className=\"lg:hidden fixed inset-0 z-50 flex\">
          <div className=\"fixed inset-0 bg-black bg-opacity-50\" onClick={() => setSidebarOpen(false)} />
          <div className=\"relative w-80 flex-shrink-0\">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className=\"flex-1 flex flex-col overflow-hidden\">
        {/* Top Header */}
        <header className=\"bg-white border-b border-gray-200 shadow-sm\">
          <div className=\"flex items-center justify-between px-6 py-4\">
            <div className=\"flex items-center gap-4\">
              {/* Mobile Menu Button */}
              <Button
                variant=\"ghost\"
                size=\"sm\"
                className=\"lg:hidden\"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className=\"h-5 w-5\" />
              </Button>

              {/* Page Title */}
              <div>
                <h2 className=\"text-xl font-semibold text-gray-900 capitalize\">
                  {currentPage === 'dashboard' ? 'Dashboard Overview' : currentPage}
                </h2>
                <p className=\"text-sm text-gray-500\">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className=\"flex items-center gap-4\">
              {/* Search */}
              <Button variant=\"ghost\" size=\"sm\" className=\"hidden md:flex\">
                <Search className=\"h-4 w-4\" />
              </Button>

              {/* Notifications */}
              <Button variant=\"ghost\" size=\"sm\" className=\"relative\">
                <Bell className=\"h-4 w-4\" />
                <span className=\"absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center\">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant=\"ghost\" className=\"flex items-center gap-2 hover:bg-gray-50\">
                    <Avatar className=\"h-8 w-8\">
                      <AvatarFallback className=\"bg-purple-100 text-purple-600 text-xs font-semibold\">
                        {adminUser.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className=\"hidden md:block text-left\">
                      <div className=\"text-sm font-medium\">{adminUser.username}</div>
                      <div className=\"text-xs text-gray-500\">{adminUser.email}</div>
                    </div>
                    <ChevronDown className=\"h-4 w-4 text-gray-400\" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align=\"end\" className=\"w-56\">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange('settings')}>
                    <Settings className=\"mr-2 h-4 w-4\" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className=\"text-red-600\">
                    <LogOut className=\"mr-2 h-4 w-4\" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className=\"flex-1 overflow-auto\">
          <div className=\"p-6\">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}