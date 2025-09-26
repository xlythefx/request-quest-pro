import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
  Button,
  Stack,
  Paper,
  Toolbar,
  Avatar,
  Pagination,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Visibility,
  Download,
  FilterList,
  FileDownload
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'in_review': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
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
    
    const submittedDate = new Date(request.submittedDate);
    const matchesDateRange = 
      (!dateFrom || submittedDate >= dateFrom) &&
      (!dateTo || submittedDate <= dateTo);

    return matchesSearch && matchesStatus && matchesCategory && matchesDepartment && matchesDateRange;
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          All Payment Requests
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complete overview of all payment requests across departments
        </Typography>

        {/* Search and Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack spacing={2}>
            {/* Search Bar */}
            <TextField
              placeholder="Search by ID, employee, vendor, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filter Controls */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  label="Category"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {uniqueCategories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {uniqueDepartments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="From Date"
                value={dateFrom}
                onChange={setDateFrom}
                slotProps={{ textField: { size: 'small', sx: { minWidth: 140 } } }}
              />

              <DatePicker
                label="To Date"
                value={dateTo}
                onChange={setDateTo}
                slotProps={{ textField: { size: 'small', sx: { minWidth: 140 } } }}
              />

              <Button
                variant="outlined"
                startIcon={<FileDownload />}
                onClick={exportToCSV}
                sx={{ height: 40 }}
              >
                Export CSV
              </Button>
            </Stack>

            <Stack direction="row" justifyContent="between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedRequests.length} of {filteredRequests.length} requests
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Requests Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Request ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Vendor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {request.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                          {request.employeeName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {request.employeeName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {request.employeeId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{request.vendorName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {request.currency} {request.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{request.category}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{request.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={request.priority.toUpperCase()} 
                        color={getPriorityColor(request.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status.replace('_', ' ').toUpperCase()} 
                        color={getStatusColor(request.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(request.submittedDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleViewRequest(request)}
                  >
                    <Visibility />
                  </IconButton>
                        <IconButton size="small" color="primary">
                          <Download />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          )}
        </Card>

        {/* Request Review Modal */}
        <RequestReviewModal
          open={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          request={selectedRequest}
        />
      </Box>
    </LocalizationProvider>
  );
};