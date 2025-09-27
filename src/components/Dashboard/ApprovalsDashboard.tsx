import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle2, 
  X, 
  Eye, 
  Filter, 
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import AOS from 'aos';

interface PaymentRequest {
  id: string;
  employeeName: string;
  vendorName: string;
  amount: number;
  currency: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  documents: string[];
}

const mockRequests: PaymentRequest[] = [
  {
    id: 'REQ-001',
    employeeName: 'John Doe',
    vendorName: 'ABC Supplies Ltd',
    amount: 5500,
    currency: 'USD',
    category: 'Office Supplies',
    priority: 'high',
    submittedDate: '2024-01-15',
    dueDate: '2024-01-22',
    status: 'pending',
    description: 'Monthly office supplies procurement',
    documents: ['invoice.pdf', 'receipt.pdf']
  },
  {
    id: 'REQ-002',
    employeeName: 'Jane Smith',
    vendorName: 'Tech Solutions Inc',
    amount: 12000,
    currency: 'USD',
    category: 'Software License',
    priority: 'urgent',
    submittedDate: '2024-01-14',
    dueDate: '2024-01-20',
    status: 'pending',
    description: 'Annual software license renewal',
    documents: ['contract.pdf', 'quote.pdf', 'approval_form.pdf']
  },
  {
    id: 'REQ-003',
    employeeName: 'Mike Johnson',
    vendorName: 'Travel Agency Pro',
    amount: 2800,
    currency: 'USD',
    category: 'Travel',
    priority: 'medium',
    submittedDate: '2024-01-13',
    dueDate: '2024-01-25',
    status: 'pending',
    description: 'Business trip to client site',
    documents: ['itinerary.pdf']
  }
];

export const ApprovalsDashboard: React.FC = () => {
  const [requests, setRequests] = useState<PaymentRequest[]>(mockRequests);
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'orange';
      case 'medium': return 'blue';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getAmountColor = (amount: number) => {
    if (amount > 10000) return 'text-red-600';
    if (amount > 5000) return 'text-orange-600';
    return 'text-foreground';
  };

  const handleAction = (request: PaymentRequest, action: 'approve' | 'reject') => {
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    setRequests(prev => 
      prev.map(req => 
        req.id === request.id 
          ? { ...req, status: newStatus as any }
          : req
      )
    );
  };

  const toggleRowExpansion = (requestId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(requestId)) {
      newExpanded.delete(requestId);
    } else {
      newExpanded.add(requestId);
    }
    setExpandedRows(newExpanded);
  };

  const filteredRequests = requests
    .filter(req => filterStatus === 'all' || req.status === filterStatus)
    .filter(req => filterPriority === 'all' || req.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === 'priority') {
        const priorities = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorities[b.priority] - priorities[a.priority];
      }
      return 0;
    });

  return (
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">Approve Payment Requests</h1>
          <p className="text-muted-foreground">Review and approve pending payment requests from your team</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {filteredRequests.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredRequests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    ${filteredRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredRequests.filter(r => r.priority === 'urgent').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Urgent Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto text-sm text-muted-foreground">
                {filteredRequests.length} requests found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardHeader>
            <CardTitle className="text-yellow-600">Payment Requests</CardTitle>
            <CardDescription>Review and take action on pending requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <React.Fragment key={request.id}>
                    <TableRow className="hover:bg-yellow-50/50">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(request.id)}
                        >
                          {expandedRows.has(request.id) ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{request.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.vendorName}</TableCell>
                      <TableCell className={getAmountColor(request.amount)}>
                        <span className="font-semibold">
                          {request.currency} {request.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(request.priority) as any}>
                          {request.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(request.dueDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.status === 'pending' ? 'secondary' : 
                                       request.status === 'approved' ? 'default' : 'destructive'}>
                          {request.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                className="finance-button-primary"
                                onClick={() => handleAction(request, 'approve')}
                                disabled={request.amount < 2000}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                {request.amount < 2000 ? 'Auto-approved' : 'Approve'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleAction(request, 'reject')}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row Details */}
                    {expandedRows.has(request.id) && (
                      <TableRow>
                        <TableCell colSpan={9} className="bg-yellow-50/30 p-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-yellow-700 mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{request.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-yellow-700 mb-2">Category</h4>
                              <Badge variant="outline">{request.category}</Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-yellow-700 mb-2">Documents</h4>
                              <div className="flex flex-wrap gap-2">
                                {request.documents.map((doc, index) => (
                                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-yellow-100">
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};