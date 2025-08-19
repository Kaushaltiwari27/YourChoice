import React, { useState, useEffect } from 'react';
import { Saree, CartItem, User, AppPage, Filter, AdminUser } from './types';
import { sampleSarees } from './data/sarees';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import CheckoutPage from './components/CheckoutPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AdminAuth } from './components/admin/AdminAuth';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  initGA,
  trackPageView,
  trackAddToCart,
  trackRemoveFromCart,
  trackPurchase,
  trackViewItem,
  trackSearch,
  trackBeginCheckout
} from './utils/analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filter>({});
  const [filteredSarees, setFilteredSarees] = useState<Saree[]>(sampleSarees);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminAuthError, setAdminAuthError] = useState<string>('');

  // Load cart from localStorage on mount and initialize analytics
  useEffect(() => {
    const savedCart = localStorage.getItem('yourchoice-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedUser = localStorage.getItem('yourchoice-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Initialize Google Analytics
    initGA();
  }, []);

  // Track page views when current page changes
  useEffect(() => {
    trackPageView(currentPage);
  }, [currentPage]);

  // Track search queries
  useEffect(() => {
    if (searchQuery.trim()) {
      trackSearch(searchQuery);
    }
  }, [searchQuery]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('yourchoice-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter sarees based on search and filters
  useEffect(() => {
    let filtered = sampleSarees;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(saree => 
        saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saree.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saree.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saree.color.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(saree => saree.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(saree => 
        saree.price >= filters.priceRange![0] && saree.price <= filters.priceRange![1]
      );
    }

    // Apply color filter
    if (filters.color && filters.color.length > 0) {
      filtered = filtered.filter(saree => 
        filters.color!.some(color => saree.color.toLowerCase().includes(color.toLowerCase()))
      );
    }

    // Apply fabric filter
    if (filters.fabric && filters.fabric.length > 0) {
      filtered = filtered.filter(saree => 
        filters.fabric!.some(fabric => saree.fabric.toLowerCase().includes(fabric.toLowerCase()))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // For demo, we'll sort by id (newest first)
          filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
      }
    }

    setFilteredSarees(filtered);
  }, [searchQuery, filters]);

  const addToCart = (saree: Saree, quantity: number = 1, size?: string) => {
    const cartItem = { saree, quantity, size };
    
    // Track add to cart event
    trackAddToCart(cartItem);
    
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.saree.id === saree.id && item.size === size
      );
      
      if (existingItem) {
        return prev.map(item => 
          item.saree.id === saree.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { saree, quantity, size }];
      }
    });
  };

  const updateCartItemQuantity = (sareeId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(sareeId, size);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.saree.id === sareeId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (sareeId: string, size?: string) => {
    // Find the item being removed for tracking
    const itemToRemove = cartItems.find(item => 
      item.saree.id === sareeId && item.size === size
    );
    
    if (itemToRemove) {
      trackRemoveFromCart(itemToRemove);
    }
    
    setCartItems(prev => 
      prev.filter(item => !(item.saree.id === sareeId && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.saree.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('yourchoice-user', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yourchoice-user');
  };

  const navigateToProduct = (saree: Saree) => {
    // Track product view
    trackViewItem(saree);
    
    setSelectedSaree(saree);
    setCurrentPage('product-detail');
  };

  const navigateToProducts = (category?: string) => {
    if (category) {
      setFilters({ category });
    }
    setCurrentPage('products');
  };

  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Simple demo authentication - in real app, this would be server-side
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const adminUserData: AdminUser = {
        username: credentials.username,
        role: 'Super Admin',
        permissions: ['view_dashboard', 'manage_products', 'manage_orders', 'view_customers']
      };
      setAdminUser(adminUserData);
      setCurrentPage('admin-dashboard');
      setAdminAuthError('');
    } else {
      setAdminAuthError('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
    setAdminAuthError('');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            sarees={sampleSarees}
            onProductClick={navigateToProduct}
            onCategoryClick={navigateToProducts}
          />
        );
      case 'products':
        return (
          <ProductListingPage
            sarees={filteredSarees}
            onProductClick={navigateToProduct}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
          />
        );
      case 'product-detail':
        return selectedSaree ? (
          <ProductDetailPage
            saree={selectedSaree}
            onAddToCart={addToCart}
            onBackToProducts={() => setCurrentPage('products')}
          />
        ) : null;
      case 'cart':
        return (
          <ShoppingCartPage
            cartItems={cartItems}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            onProceedToCheckout={() => setCurrentPage('checkout')}
            totalPrice={getTotalPrice()}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            totalPrice={getTotalPrice()}
            user={user}
            onOrderComplete={clearCart}
            onBackToCart={() => setCurrentPage('cart')}
          />
        );
      case 'admin-login':
        return (
          <AdminAuth
            onLogin={handleAdminLogin}
            error={adminAuthError}
          />
        );
      case 'admin-dashboard':
        return adminUser ? (
          <AdminDashboard
            onLogout={handleAdminLogout}
            adminUser={adminUser}
          />
        ) : null;
      default:
        return null;
    }
  };

  const isAdminPage = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-background">
      {!isAdminPage && (
        <Header
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          cartItemCount={getTotalItems()}
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}
      
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      
      {!isAdminPage && <Footer onNavigate={setCurrentPage} />}
      
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
      
      {!isAdminPage && <Chatbot onNavigate={setCurrentPage} />}
    </div>
  );
}
