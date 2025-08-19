import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, Lock, User } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminLoginProps {
  onLogin: (user: AdminUser) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const adminUser: AdminUser = {
        id: '1',
        username: credentials.username,
        email: 'admin@yourchoice.com',
        role: 'super_admin',
        permissions: [
          'view_dashboard',
          'manage_products',
          'manage_orders',
          'manage_customers',
          'view_analytics',
          'manage_inventory',
          'manage_settings',
          'manage_marketing'
        ],
        lastLogin: new Date().toISOString()
      };
      onLogin(adminUser);
    } else {
      setError('Invalid credentials. Use admin/admin123 for demo access.');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4\">
      <div className=\"w-full max-w-md\">
        {/* Header */}
        <div className=\"text-center mb-8\">
          <div className=\"flex justify-center mb-4\">
            <div className=\"bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg\">
              <Shield className=\"h-12 w-12 text-white\" />
            </div>
          </div>
          <h1 className=\"text-4xl font-bold text-gray-900 mb-2\">YourChoice</h1>
          <p className=\"text-xl text-purple-600 font-medium mb-2\">Admin Panel</p>
          <p className=\"text-gray-600\">Secure access to store management</p>
        </div>

        {/* Login Card */}
        <Card className=\"shadow-2xl border-0 bg-white/90 backdrop-blur-sm\">
          <CardHeader className=\"text-center pb-6\">
            <CardTitle className=\"text-2xl font-bold flex items-center justify-center gap-2\">
              <Lock className=\"h-5 w-5 text-purple-600\" />
              Administrator Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className=\"mb-6 border-red-200 bg-red-50\">
                <AlertDescription className=\"text-red-700\">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className=\"space-y-6\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"username\" className=\"text-sm font-medium flex items-center gap-2\">
                  <User className=\"h-4 w-4\" />
                  Username
                </Label>
                <Input
                  id=\"username\"
                  type=\"text\"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder=\"Enter your username\"
                  required
                  className=\"h-12 text-base\"
                  disabled={isLoading}
                />
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"password\" className=\"text-sm font-medium flex items-center gap-2\">
                  <Lock className=\"h-4 w-4\" />
                  Password
                </Label>
                <div className=\"relative\">
                  <Input
                    id=\"password\"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder=\"Enter your password\"
                    required
                    className=\"h-12 text-base pr-12\"
                    disabled={isLoading}
                  />
                  <Button
                    type=\"button\"
                    variant=\"ghost\"
                    size=\"sm\"
                    className=\"absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100\"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className=\"h-4 w-4 text-gray-500\" />
                    ) : (
                      <Eye className=\"h-4 w-4 text-gray-500\" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type=\"submit\" 
                className=\"w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg transition-all duration-200\"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className=\"flex items-center gap-2\">
                    <div className=\"animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent\"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In to Admin Panel'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className=\"mt-8 p-4 bg-gray-50 rounded-lg border\">
              <div className=\"text-center\">
                <p className=\"text-sm font-semibold text-gray-700 mb-2\">Demo Credentials</p>
                <div className=\"space-y-1 text-sm text-gray-600\">
                  <div><strong>Username:</strong> admin</div>
                  <div><strong>Password:</strong> admin123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className=\"mt-8 text-center text-sm text-gray-500\">
          <p>© 2024 YourChoice. All rights reserved.</p>
          <p className=\"mt-1\">Protected by advanced security systems</p>
        </div>
      </div>
    </div>
  );
}