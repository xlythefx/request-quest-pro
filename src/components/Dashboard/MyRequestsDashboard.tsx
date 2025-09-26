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
  Tabs,
  Tab,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton
} from '@mui/material';
import {
  Visibility,
  Edit,
  Send,
  AttachFile,
  Download
} from '@mui/icons-material';

interface PaymentRequest {
  id: string;
  vendorName: string;
  amount: number;
  currency: string;
  category: string;
  priority: 'low' | 'high' | 'highest';
  submittedDate?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  description: string;
  documents: string[];
  lastModified: string;
}

const mockRequests: PaymentRequest[] = [
  {
    id: 'REQ-001',
    vendorName: 'ABC Supplies Ltd',
    amount: 5500,
    currency: 'USD',
    category: 'Office Supplies',
    priority: 'high',
    submittedDate: '2024-01-15',
    status: 'pending',
    description: 'Monthly office supplies procurement for Q1 operations',
    documents: ['invoice.pdf', 'purchase_order.pdf'],
    lastModified: '2024-01-15'
  },
  {
    id: 'DRAFT-001',
    vendorName: 'Tech Solutions Inc',
    amount: 12000,
    currency: 'USD',
    category: 'Software License',
    priority: 'highest',
    status: 'draft',
    description: 'Annual software license renewal for development tools',
    documents: ['quote.pdf'],
    lastModified: '2024-01-16'
  },
  {
    id: 'REQ-002',
    vendorName: 'Travel Agency Pro',
    amount: 2800,
    currency: 'USD',
    category: 'Travel',
    priority: 'high',
    submittedDate: '2024-01-10',
    status: 'approved',
    description: 'Business trip to client site for project kickoff',
    documents: ['itinerary.pdf', 'hotel_booking.pdf'],
    lastModified: '2024-01-10'
  }
];

export const MyRequestsDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const filteredRequests = mockRequests.filter(req => {
    if (currentTab === 0) return req.status !== 'draft'; // Submitted
    return req.status === 'draft'; // Drafts
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'error';
      case 'high': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'draft': return 'info';
      default: return 'default';
    }
  };

  const handleViewRequest = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const handleSubmitDraft = (requestId: string) => {
    console.log('Submitting draft:', requestId);
    // Mock submission - in real app, this would update the status
  };

  const handleEditDraft = (requestId: string) => {
    console.log('Editing draft:', requestId);
    // Mock edit - in real app, this would navigate to edit form
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        My Requests
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        View and manage your payment requests and drafts
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={`Submitted Requests (${mockRequests.filter(r => r.status !== 'draft').length})`} />
          <Tab label={`Draft Requests (${mockRequests.filter(r => r.status === 'draft').length})`} />
        </Tabs>
      </Paper>

      {/* Requests Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Request ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Vendor</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Modified</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {request.id}
                    </Typography>
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
                    <Chip 
                      label={request.priority.toUpperCase()} 
                      color={getPriorityColor(request.priority) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={request.status.toUpperCase()} 
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(request.lastModified).toLocaleDateString()}
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
                      {request.status === 'draft' && (
                        <>
                          <Button
                            size="small"
                            startIcon={<Edit />}
                            onClick={() => handleEditDraft(request.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Send />}
                            onClick={() => handleSubmitDraft(request.id)}
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredRequests.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {currentTab === 0 ? 'No submitted requests found' : 'No draft requests found'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentTab === 0 
                ? 'You haven\'t submitted any payment requests yet.' 
                : 'You don\'t have any draft requests saved.'}
            </Typography>
          </Box>
        )}
      </Card>

      {/* View Request Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Request Details - {selectedRequest?.id}
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Stack spacing={3}>
              {/* Basic Information */}
              <Box>
                <Typography variant="h6" gutterBottom>Basic Information</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Vendor:</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedRequest.vendorName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Amount:</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {selectedRequest.currency} {selectedRequest.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Category:</Typography>
                    <Typography variant="body2">{selectedRequest.category}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Priority:</Typography>
                    <Chip 
                      label={selectedRequest.priority.toUpperCase()} 
                      color={getPriorityColor(selectedRequest.priority) as any}
                      size="small"
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Status:</Typography>
                    <Chip 
                      label={selectedRequest.status.toUpperCase()} 
                      color={getStatusColor(selectedRequest.status) as any}
                      size="small"
                    />
                  </Stack>
                  {selectedRequest.submittedDate && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Submitted:</Typography>
                      <Typography variant="body2">
                        {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>

              <Divider />

              {/* Description */}
              <Box>
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedRequest.description}
                </Typography>
              </Box>

              <Divider />

              {/* Documents */}
              <Box>
                <Typography variant="h6" gutterBottom>Attachments</Typography>
                {selectedRequest.documents.length > 0 ? (
                  <Stack spacing={1}>
                    {selectedRequest.documents.map((doc, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={1}>
                        <AttachFile fontSize="small" />
                        <Typography variant="body2" sx={{ flex: 1 }}>{doc}</Typography>
                        <IconButton size="small">
                          <Download fontSize="small" />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments
                  </Typography>
                )}
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};