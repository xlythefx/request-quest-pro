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
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Toolbar,
  Stack,
  Paper,
  Avatar,
  Collapse
} from '@mui/material';
import {
  Visibility,
  CheckCircle,
  Cancel,
  FilterList,
  Sort,
  AttachFile,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { RequestReviewModal } from './RequestReviewModal';

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
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [comment, setComment] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getAmountColor = (amount: number) => {
    if (amount > 10000) return 'error.main';
    if (amount > 5000) return 'warning.main';
    return 'text.primary';
  };

  const handleAction = (request: PaymentRequest, action: 'approve' | 'reject') => {
    // Auto-approved requests cannot be manually approved
    if (request.amount < 2000 && action === 'approve') {
      return;
    }
    setSelectedRequest(request);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleViewRequest = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setReviewModalOpen(true);
  };

  const confirmAction = () => {
    if (selectedRequest) {
      const newStatus = actionType === 'approve' ? 'approved' : 'rejected';
      setRequests(prev => 
        prev.map(req => 
          req.id === selectedRequest.id 
            ? { ...req, status: newStatus as any }
            : req
        )
      );
    }
    setDialogOpen(false);
    setComment('');
    setSelectedRequest(null);
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Approve Payment Requests
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review and approve pending payment requests from your team
      </Typography>

      {/* Filters and Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar sx={{ px: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All Priority</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {filteredRequests.length} requests found
          </Typography>
        </Toolbar>
      </Paper>

      {/* Requests Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Request ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Vendor</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRowExpansion(request.id)}
                      >
                        {expandedRows.has(request.id) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
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
                        <Typography variant="body2">{request.employeeName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{request.vendorName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getAmountColor(request.amount)}
                      >
                        {request.currency} {request.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={request.priority.toUpperCase()} 
                        color={getPriorityColor(request.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(request.dueDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status.toUpperCase()} 
                        color={request.status === 'pending' ? 'warning' : request.status === 'approved' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="small"
                              startIcon={<CheckCircle />}
                              color="success"
                              variant="contained"
                              onClick={() => handleAction(request, 'approve')}
                              disabled={request.amount < 2000}
                            >
                              {request.amount < 2000 ? 'Auto-approved' : 'Approve'}
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Cancel />}
                              color="error"
                              variant="outlined"
                              onClick={() => handleAction(request, 'reject')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Visibility />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Row Details */}
                  <TableRow>
                    <TableCell colSpan={9} sx={{ py: 0 }}>
                      <Collapse in={expandedRows.has(request.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                          <Stack spacing={2}>
                            <Typography variant="body2">
                              <strong>Description:</strong> {request.description}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Category:</strong> {request.category}
                            </Typography>
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Documents:</strong>
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                {request.documents.map((doc, index) => (
                                  <Chip
                                    key={index}
                                    icon={<AttachFile />}
                                    label={doc}
                                    size="small"
                                    clickable
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Action Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Request ID: {selectedRequest?.id}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Amount: {selectedRequest?.currency} {selectedRequest?.amount.toLocaleString()}
          </Typography>
          {selectedRequest && selectedRequest.amount >= 10000 && actionType === 'approve' && (
            <Typography variant="body2" sx={{ mb: 3, color: 'warning.main' }}>
              Note: This request requires dual approval (≥ $10,000)
            </Typography>
          )}
          <TextField
            label="Comment (Required)"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmAction}
            color={actionType === 'approve' ? 'success' : 'error'}
            variant="contained"
            disabled={!comment.trim()}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Review Modal */}
      <RequestReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        request={selectedRequest}
      />
    </Box>
  );
};