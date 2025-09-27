import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { Search, Eye, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RequestReviewModal } from './RequestReviewModal';

interface PaymentRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  vendorName: string;
  amount: number;
  currency: string;
  category: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  documents: string[];
  approvedBy?: string;
  approvedDate?: string;
}

const mockRequests: PaymentRequest[] = [
  {
    id: 'REQ-001',
    employeeName: 'John Doe',
    employeeId: 'EMP-001',
    vendorName: 'ABC Supplies Ltd',
    amount: 5500,
    currency: 'USD',
    category: 'Office Supplies',
    department: 'Operations',
    priority: 'high',
    submittedDate: '2024-01-15',
    dueDate: '2024-01-22',
    status: 'approved',
    description: 'Monthly office supplies procurement',
    documents: ['invoice.pdf', 'receipt.pdf'],
    approvedBy: 'Finance Manager',
    approvedDate: '2024-01-16'
  },
  {
    id: 'REQ-002',
    employeeName: 'Jane Smith',
    employeeId: 'EMP-002',
    vendorName: 'Tech Solutions Inc',
    amount: 12000,
    currency: 'USD',
    category: 'Software License',
    department: 'IT',
    priority: 'urgent',
    submittedDate: '2024-01-14',
    dueDate: '2024-01-20',
    status: 'pending',
    description: 'Annual software license renewal',
    documents: ['contract.pdf', 'quote.pdf']
  },
  {
    id: 'REQ-003',
    employeeName: 'Mike Johnson',
    employeeId: 'EMP-003',
    vendorName: 'Travel Agency Pro',
    amount: 2800,
    currency: 'USD',
    category: 'Travel',
    department: 'Sales',
    priority: 'medium',
    submittedDate: '2024-01-13',
    dueDate: '2024-01-25',
    status: 'pending',
    description: 'Business trip to client site',
    documents: ['itinerary.pdf']
  },
  {
    id: 'REQ-004',
    employeeName: 'Sarah Wilson',
    employeeId: 'EMP-004',
    vendorName: 'Office Furniture Co',
    amount: 8500,
    currency: 'USD',
    category: 'Equipment',
    department: 'HR',
    priority: 'low',
    submittedDate: '2024-01-12',
    dueDate: '2024-01-30',
    status: 'rejected',
    description: 'New office furniture for meeting rooms',
    documents: ['quote.pdf', 'floor_plan.pdf']
  },
  {
    id: 'REQ-005',
    employeeName: 'David Brown',
    employeeId: 'EMP-005',
    vendorName: 'Marketing Solutions LLC',
    amount: 3200,
    currency: 'USD',
    category: 'Marketing',
    department: 'Marketing',
    priority: 'medium',
    submittedDate: '2024-01-11',
    dueDate: '2024-01-28',
    status: 'approved',
    description: 'Digital marketing campaign materials',
    documents: ['campaign_brief.pdf'],
    approvedBy: 'Finance Manager',
    approvedDate: '2024-01-12'
  }
];

const ITEMS_PER_PAGE = 10;

export const AllRequestsDashboard: React.FC = () => {
  const [requests] = useState<PaymentRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || request.category === filterCategory;
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesCategory && matchesDepartment;
  });

  const paginatedRequests = filteredRequests.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);

  const uniqueCategories = [...new Set(requests.map(r => r.category))];
  const uniqueDepartments = [...new Set(requests.map(r => r.department))];

  const handleViewRequest = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setReviewModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['Request ID', 'Employee', 'Vendor', 'Amount', 'Category', 'Department', 'Status', 'Submitted Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRequests.map(request => 
        [
          request.id,
          request.employeeName,
          request.vendorName,
          `${request.currency} ${request.amount}`,
          request.category,
          request.department,
          request.status,
          request.submittedDate
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_requests.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div data-aos="fade-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          All Payment Requests
        </h1>
        <p className="text-muted-foreground mb-6">
          Complete overview of all payment requests across departments
        </p>
      </div>

      {/* Search and Filters */}
      <Card data-aos="fade-up" data-aos-delay="100">
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, employee, vendor, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {uniqueDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedRequests.length} of {filteredRequests.length} requests
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card data-aos="fade-up" data-aos-delay="200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Request ID</TableHead>
                <TableHead className="font-semibold">Employee</TableHead>
                <TableHead className="font-semibold">Vendor</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Submitted</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((request, index) => (
                <TableRow key={request.id} data-aos="fade-in" data-aos-delay={index * 50}>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {request.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {request.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {request.employeeName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {request.employeeId}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.vendorName}</TableCell>
                  <TableCell>
                    <span className="font-semibold">
                      {request.currency} {request.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(request.priority)}>
                      {request.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(request.status)}>
                      {request.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.submittedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRequest(request)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center p-4 border-t">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Review Modal */}
      <RequestReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        request={selectedRequest}
      />
    </div>
  );
};