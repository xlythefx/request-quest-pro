import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, TrendingUp, Shield, Clock, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const [demoFormOpen, setDemoFormOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    industry: '',
    currentSolution: '',
    message: ''
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', demoForm);
    setDemoFormOpen(false);
    // Show success message
  };

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Automated Workflows",
      description: "Streamline approval processes with intelligent routing and escalation rules"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and audit trails"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Monitor request status and approval times in real-time"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and insights into spending patterns"
    }
  ];

  const benefits = [
    "Reduce approval times by 70%",
    "Eliminate manual paperwork",
    "Ensure compliance and audit trails",
    "Gain real-time spending visibility",
    "Streamline vendor management",
    "Automated escalation rules"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Feature Digital LTD</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              Trusted by 500+ Companies
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Feature Digital LTD
              <span className="text-primary block">Finance Web App</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline payment requests, approvals, and financial workflows with our intelligent 
              finance management platform. Reduce processing time and increase visibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                  Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 px-8 py-4 text-lg">
                Login with Google
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Modern Finance Teams
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage payments, approvals, and financial workflows efficiently
              </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Companies Choose Feature Digital LTD
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of organizations that have transformed their finance operations 
                with our comprehensive platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">70%</div>
                  <div className="text-gray-600">Faster Approvals</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Finance Operations?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join thousands of companies already using Feature Digital LTD to streamline 
            their payment processes and improve financial visibility.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6" />
                <span className="ml-2 text-xl font-bold">Feature Digital LTD</span>
              </div>
              <p className="text-gray-400">
                Streamlining finance operations for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinanceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};