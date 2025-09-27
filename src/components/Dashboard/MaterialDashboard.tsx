import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactElement;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <Avatar className="w-12 h-12" style={{ backgroundColor: color }}>
          <AvatarFallback className="text-white">
            {icon}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          {changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span className={`text-sm ${changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </CardContent>
  </Card>
);

const recentRequests = [
  { id: 'REQ-001', requester: 'John Smith', amount: '$2,450.00', status: 'pending', date: '2024-01-15', description: 'Office supplies purchase' },
  { id: 'REQ-002', requester: 'Sarah Johnson', amount: '$8,900.00', status: 'approved', date: '2024-01-14', description: 'Software licensing' },
  { id: 'REQ-003', requester: 'Mike Wilson', amount: '$1,200.00', status: 'rejected', date: '2024-01-13', description: 'Travel expenses' },
  { id: 'REQ-004', requester: 'Emily Davis', amount: '$5,500.00', status: 'pending', date: '2024-01-12', description: 'Marketing campaign' }
];

export const MaterialDashboard: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case 'employee':
        return [
          { title: 'My Requests', value: '8', change: '+12%', changeType: 'positive' as const, icon: <DollarSign />, color: '#1976d2' },
          { title: 'Pending Approval', value: '3', change: '-5%', changeType: 'negative' as const, icon: <Clock />, color: '#ed6c02' },
          { title: 'Approved This Month', value: '12', change: '+8%', changeType: 'positive' as const, icon: <CheckCircle2 />, color: '#2e7d32' },
          { title: 'Total Amount', value: '$24,500', change: '+15%', changeType: 'positive' as const, icon: <DollarSign />, color: '#9c27b0' }
        ];
      case 'finance_manager':
      case 'senior_management':
        return [
          { title: 'Pending Approvals', value: '12', change: '+5%', changeType: 'positive' as const, icon: <Clock />, color: '#ed6c02' },
          { title: 'Approved Today', value: '28', change: '+12%', changeType: 'positive' as const, icon: <CheckCircle2 />, color: '#2e7d32' },
          { title: 'Total Amount', value: '$156,800', change: '+8%', changeType: 'positive' as const, icon: <DollarSign />, color: '#1976d2' },
          { title: 'Processing Time', value: '2.4 days', change: '-15%', changeType: 'positive' as const, icon: <TrendingUp />, color: '#9c27b0' }
        ];
      default:
        return [
          { title: 'Total Users', value: '124', change: '+8%', changeType: 'positive' as const, icon: <DollarSign />, color: '#1976d2' },
          { title: 'System Uptime', value: '99.9%', change: '0%', changeType: 'positive' as const, icon: <TrendingUp />, color: '#2e7d32' },
          { title: 'Active Sessions', value: '47', change: '+12%', changeType: 'positive' as const, icon: <Clock />, color: '#ed6c02' },
          { title: 'Storage Used', value: '65%', change: '+5%', changeType: 'negative' as const, icon: <XCircle />, color: '#d32f2f' }
        ];
    }
  };

  const stats = getRoleSpecificStats();

  return (
    <div className="space-y-6 finance-bg-animated p-6 rounded-lg">
      <div className="mb-4" data-aos="fade-down">
        <h1 className="finance-heading text-finance-accent mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your finance requests today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4" data-aos="fade-up">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-finance-accent">Recent Payment Requests</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {request.requester.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{request.description}</span>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {request.requester} • {request.amount}
                      </div>
                      <div className="text-xs text-muted-foreground">{request.date}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6" data-aos="fade-up" data-aos-delay="400">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-finance-accent">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">Create New Request</Button>
              <Button variant="outline" className="w-full justify-start">View My Requests</Button>
              {(user?.role === 'finance_manager' || user?.role === 'senior_management') && (
                <Button variant="outline" className="w-full justify-start">Approve Requests</Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-finance-accent">Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Average Processing Time</span>
                    <span>2.4 days</span>
                  </div>
                  <Progress value={75} className="mb-1" />
                  <div className="text-xs text-muted-foreground">Target: 3 days</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Approval Rate</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="mb-1" />
                  <div className="text-xs text-muted-foreground">85% approved this month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};