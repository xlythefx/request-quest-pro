import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, TrendingUp, Shield, Clock, Users, DollarSign, BarChart3, Star, Award, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroBusiness from '@/assets/hero-business.jpg';
import teamMeeting from '@/assets/team-meeting.jpg';
import financeDashboard from '@/assets/finance-dashboard.jpg';
import corporateOffice from '@/assets/corporate-office.jpg';

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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', demoForm);
    setDemoFormOpen(false);
    // Show success message
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automated Workflows",
      description: "Streamline approval processes with intelligent routing and escalation rules",
      gradient: "from-primary to-primary/80"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and audit trails",
      gradient: "from-red-500 to-red-400"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Tracking",
      description: "Monitor request status and approval times in real-time",
      gradient: "from-secondary to-secondary/80"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and insights into spending patterns",
      gradient: "from-primary to-secondary"
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

  const stats = [
    { value: "60%", label: "Faster Payment Processing", icon: <TrendingUp className="h-6 w-6" /> },
    { value: "Internal", label: "Feature Digital Use", icon: <Users className="h-6 w-6" /> },
    { value: "99.9%", label: "System Uptime", icon: <Shield className="h-6 w-6" /> },
    { value: "24/7", label: "Internal Support", icon: <Globe className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3" data-aos="fade-right">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Feature Digital LTD
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8" data-aos="fade-left">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors story-link">Features</a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors story-link">Benefits</a>
              <a href="#stats" className="text-muted-foreground hover:text-primary transition-colors story-link">Results</a>
              <Link to="/login">
                <Button variant="outline" className="hover-scale">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8" data-aos="fade-right">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover-scale" data-aos="fade-up" data-aos-delay="100">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 500+ Companies
              </Badge>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight" data-aos="fade-up" data-aos-delay="200">
                  Feature Digital LTD
                  <span className="block text-4xl lg:text-6xl bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent animate-pulse">
                    Finance Web App
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl" data-aos="fade-up" data-aos-delay="300">
                  Streamline payment requests, approvals, and financial workflows with our intelligent 
                  finance management platform. Reduce processing time and increase visibility with enterprise-grade security.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="400">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-4 text-lg font-semibold shadow-lg hover-scale">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-delay="500">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroBusiness} 
                  alt="Modern business team collaborating" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 bg-secondary p-4 rounded-2xl shadow-lg animate-pulse">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent p-4 rounded-2xl shadow-lg animate-pulse delay-500">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Powerful Features for Modern Finance Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage payments, approvals, and financial workflows efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm hover-scale" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Why Companies Choose Feature Digital LTD
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Our internal finance management system has transformed Feature Digital's operations 
                with comprehensive workflow automation and real-time tracking.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 group" 
                    data-aos="fade-up" 
                    data-aos-delay={index * 100}
                  >
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-full group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img 
                    src={teamMeeting} 
                    alt="Team collaboration meeting" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                  <img 
                    src={corporateOffice} 
                    alt="Modern corporate office" 
                    className="w-full h-32 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="space-y-6 pt-12">
                  <img 
                    src={financeDashboard} 
                    alt="Finance dashboard analytics" 
                    className="w-full h-32 object-cover rounded-2xl shadow-lg"
                  />
                  <img 
                    src={heroBusiness} 
                    alt="Business professionals" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Internal Performance Metrics</h2>
            <p className="text-xl text-muted-foreground">Feature Digital's finance system results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center border-0 bg-background/50 backdrop-blur-sm hover-scale group" 
                data-aos="zoom-in" 
                data-aos-delay={index * 100}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="mb-4 p-3 bg-gradient-to-br from-primary to-secondary rounded-full w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Finance Operations?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of companies already using Feature Digital LTD to streamline 
              their payment processes and improve financial visibility.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold shadow-xl hover-scale">
                Get Started Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div data-aos="fade-up">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl mr-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Feature Digital LTD</span>
              </div>
              <p className="text-muted">
                Streamlining finance operations for modern businesses with cutting-edge technology.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-muted">
                <li className="hover:text-primary transition-colors cursor-pointer">Features</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Security</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Integrations</li>
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-muted">
                <li className="hover:text-primary transition-colors cursor-pointer">About</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-muted">
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-primary transition-colors cursor-pointer">API Reference</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted/20 pt-8 mt-12 text-center" data-aos="fade-up">
            <p className="text-muted">
              © 2024 Feature Digital LTD. All rights reserved. Empowering businesses with intelligent finance solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};