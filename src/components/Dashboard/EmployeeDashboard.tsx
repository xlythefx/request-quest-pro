import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Clock, CheckCircle2, XCircle, DollarSign, FileText } from 'lucide-react';

export const EmployeeDashboard = () => {
  const recentRequests = [
    {
      id: 'REQ-001',
      title: 'Office Supplies Purchase',
      amount: '$1,250.00',
      status: 'pending',
      date: '2024-01-15',
      category: 'Office Expenses'
    },
    {
      id: 'REQ-002',
      title: 'Marketing Campaign Payment',
      amount: '$8,500.00',
      status: 'approved',
      date: '2024-01-10',
      category: 'Marketing'
    },
    {
      id: 'REQ-003',
      title: 'Software License Renewal',
      amount: '$450.00',
      status: 'auto-approved',
      date: '2024-01-08',
      category: 'Technology'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'auto-approved':
        return <Badge variant="secondary" className="bg-finance-accent/10 text-finance-accent border-finance-accent/20"><CheckCircle2 className="w-3 h-3 mr-1" />Auto-Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="finance-heading">Employee Dashboard</h1>
          <p className="text-muted-foreground">Manage your payment requests and track approvals</p>
        </div>
        <Button className="finance-button-accent">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Payment Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,200</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-finance-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 days</div>
            <p className="text-xs text-muted-foreground">-0.5 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>Your latest payment requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{request.title}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{request.id}</span>
                    <span>{request.category}</span>
                    <span>{request.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{request.amount}</div>
                  <Button variant="ghost" size="sm" className="mt-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};