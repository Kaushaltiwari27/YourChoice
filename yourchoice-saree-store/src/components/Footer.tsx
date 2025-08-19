import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Shield,
  Truck,
  RefreshCw
} from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const features = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: 'Free Shipping',
      description: 'On orders above ₹2000'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: 'Easy Returns',
      description: '7 days return policy'
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Premium Quality',
      description: 'Authentic handcrafted sarees'
    }
  ];

  const quickLinks = [
    { label: 'Home', page: 'home' as AppPage },
    { label: 'All Sarees', page: 'products' as AppPage },
    { label: 'Shopping Cart', page: 'cart' as AppPage }
  ];

  const categories = [
    'Silk Sarees',
    'Cotton Sarees',
    'Georgette Sarees',
    'Party Wear',
    'Casual Wear'
  ];

  const customerService = [
    'Contact Us',
    'Size Guide',
    'Care Instructions',
    'Return Policy',
    'Privacy Policy',
    'Terms of Service'
  ];

  return (
    <footer className="bg-muted/30 border-t">
      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 text-center sm:text-left">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                YC
              </div>
              <h3 className="text-xl font-serif font-bold text-primary">YourChoice</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover the beauty of traditional Indian sarees with our carefully curated collection. 
              From premium silk to comfortable cotton, we bring you authentic craftsmanship and timeless elegance.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => onNavigate('products')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Customer Service */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact Us</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>hello@yourchoice.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>123 Saree Street</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="font-semibold">Customer Service</h4>
              <ul className="space-y-2">
                {customerService.map((service) => (
                  <li key={service}>
                    <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <h4 className="font-semibold">Stay Updated</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Subscribe to our newsletter for the latest collections, exclusive offers, and styling tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <p>&copy; {currentYear} YourChoice. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Cookies</button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('admin-login' as AppPage)}
              className="hover:text-primary transition-colors text-xs opacity-60"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}