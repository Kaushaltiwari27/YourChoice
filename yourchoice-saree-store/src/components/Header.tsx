import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Heart,
  LogOut 
} from 'lucide-react';
import { AppPage, User as UserType } from '../types';

interface HeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  cartItemCount: number;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  currentPage,
  onNavigate,
  cartItemCount,
  user,
  onAuthClick,
  onLogout,
  searchQuery,
  onSearchChange
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
      setShowSearch(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { label: 'Home', page: 'home' as AppPage },
    { label: 'Sarees', page: 'products' as AppPage },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-primary"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                YC
              </div>
              <span className="hidden sm:block font-serif text-base sm:text-xl">YourChoice</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.page
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg mx-4 lg:mx-6 xl:mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 h-9 text-sm"
              />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 text-muted-foreground hover:text-primary transition-colors rounded-md">
              <Heart className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px] animate-pulse"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="hidden lg:block text-sm text-muted-foreground truncate max-w-[100px]">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="p-2 h-auto"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthClick}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 h-auto"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:block text-sm">Login</span>
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="px-2 py-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <Heart className="h-4 w-4 mr-3" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {showSearch && (
          <div className="md:hidden absolute top-0 left-0 right-0 bg-background border-b p-3 sm:p-4 z-10">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-12 h-11 text-base"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary p-1 rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}