import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, DollarSign, FileText, TrendingUp, Users } from 'lucide-react';

export const ManagementDashboard = () => {
  const pendingApprovals = [
    {
      id: 'REQ-104',
      employee: 'Sarah Johnson',
      title: 'Marketing Software License',
      amount: '$12,500.00',
      currency: 'USD',
      priority: 'high',
      submitted: '2 hours ago',
      department: 'Marketing',
      requiresApprovals: 2
    },
    {
      id: 'REQ-105',
      employee: 'Mike Chen',
      title: 'Travel Expenses - Client Meeting',
      amount: '$3,200.00',
      currency: 'USD',
      priority: 'medium',
      submitted: '4 hours ago',
      department: 'Sales',
      requiresApprovals: 1
    },
    {
      id: 'REQ-106',
      employee: 'Anna Rodriguez',
      title: 'Office Equipment Purchase',
      amount: '$8,750.00',
      currency: 'USD',
      priority: 'low',
      submitted: '1 day ago',
      department: 'Operations',
      requiresApprovals: 1
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getApprovalsBadge = (required: number) => {
    if (required === 2) {
      return <Badge variant="secondary" className="bg-finance-accent/10 text-finance-accent border-finance-accent/20">2 Approvals Required</Badge>;
    }
    return <Badge variant="outline">1 Approval Required</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="finance-heading">Management Dashboard</h1>
          <p className="text-muted-foreground">Review pending approvals and monitor payment workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="finance-button-accent">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-finance-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156,450</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">$24,300 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 days</div>
            <p className="text-xs text-muted-foreground">-0.3 from target</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-warning" />
            Pending Approvals Queue
          </CardTitle>
          <CardDescription>Review and approve payment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{request.title}</h3>
                      {getPriorityBadge(request.priority)}
                      {getApprovalsBadge(request.requiresApprovals)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">{request.employee}</span>
                        <br />
                        {request.department}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{request.id}</span>
                        <br />
                        {request.submitted}
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-foreground">{request.amount}</span>
                        <br />
                        {request.currency}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="finance-button-accent">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Bulk Approve Under $2,000
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertCircle className="w-4 h-4 mr-2" />
              View Escalated Requests
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Employee Request History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>REQ-103 approved by you</span>
                <span className="text-muted-foreground ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-finance-accent rounded-full"></div>
                <span>New request from Tom Wilson</span>
                <span className="text-muted-foreground ml-auto">12m ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>REQ-101 escalated (overdue)</span>
                <span className="text-muted-foreground ml-auto">1h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};