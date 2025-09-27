import React, { useState, useEffect } from 'react';
import { Building2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const roles = [
  { value: 'employee', label: 'Employee' },
  { value: 'finance_manager', label: 'Finance Manager' },
  { value: 'senior_management', label: 'Senior Management' },
  { value: 'system_admin', label: 'System Admin' }
];

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl" data-aos="fade-up">
          <CardHeader className="text-center space-y-4 pb-2">
            <div 
              className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Building2 className="h-8 w-8 text-white" />
            </div>
            
            <div data-aos="fade-up" data-aos-delay="300">
              <CardTitle className="text-2xl font-bold text-foreground">
                Feature Digital LTD
              </CardTitle>
              <CardDescription className="text-base mt-2 font-medium text-secondary">
                Finance Department Dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {error && (
              <Alert className="border-destructive/20 bg-destructive/5" data-aos="shake">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2" data-aos="fade-right" data-aos-delay="400">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 transition-all duration-200 focus:scale-[1.02]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2" data-aos="fade-right" data-aos-delay="500">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 transition-all duration-200 focus:scale-[1.02]"
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-2" data-aos="fade-right" data-aos-delay="600">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger className="h-11 transition-all duration-200 focus:scale-[1.02]">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold finance-button-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
                data-aos="fade-up"
                data-aos-delay="700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>

            <div className="text-center pt-4" data-aos="fade-up" data-aos-delay="800">
              <p className="text-sm text-muted-foreground">
                Demo Credentials: Use any email/password with your desired role
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};