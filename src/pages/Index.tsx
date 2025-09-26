import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Shield, TrendingUp, CheckCircle2, Clock, FileText, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="finance-gradient">
          <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <DollarSign className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                FinanceFlow
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Streamline your payment request process with automated approvals, 
                real-time tracking, and comprehensive analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6" asChild>
                  <a href="/employee">Employee Portal</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6" asChild>
                  <a href="/management">Management Portal</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 mx-auto max-w-7xl lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modern Finance Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for efficiency, designed for compliance, optimized for your finance team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-finance-accent/20 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-finance-accent" />
              </div>
              <CardTitle>Smart Approval Workflow</CardTitle>
              <CardDescription>
                Automated approval routing based on amount thresholds with escalation management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Auto-approve &lt; $2,000</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">1 approval: $2K-$10K</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">2 approvals: $10K+</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Real-time Tracking</CardTitle>
              <CardDescription>
                Monitor request status, approval progress, and processing times in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Track every step from submission to payment with detailed audit trails and notifications.
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                Secure file upload and management for invoices, receipts, and supporting documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Support for PDF, images, and Office documents with 10MB file size limits.
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-finance-accent/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-finance-accent" />
              </div>
              <CardTitle>Analytics & Reporting</CardTitle>
              <CardDescription>
                Comprehensive dashboards with insights into spending patterns and approval metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Generate detailed reports for compliance, budgeting, and process optimization.
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Role-based Access</CardTitle>
              <CardDescription>
                Granular permissions for employees, managers, and administrators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Secure access controls ensure users only see what they're authorized to access.
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Bank-level security with encryption, audit trails, and compliance features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                WCAG 2.1 AA compliant with comprehensive audit logging for compliance.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/30">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-muted-foreground">
              Organizations using FinanceFlow see immediate improvements in efficiency and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-finance-accent mb-2">60%</div>
              <div className="text-muted-foreground">Faster Processing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">500+</div>
              <div className="text-muted-foreground">Concurrent Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-warning mb-2">1.8</div>
              <div className="text-muted-foreground">Days Avg. Approval</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Audit Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 mx-auto max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Finance Process?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations already streamlining their payment workflows with FinanceFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="finance-button-accent text-lg px-8 py-6" asChild>
              <a href="/employee">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
