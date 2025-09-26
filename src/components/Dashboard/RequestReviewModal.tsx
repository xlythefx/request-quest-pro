import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Box,
  Button
} from '@mui/material';
import {
  AttachFile,
  Download,
  Close
} from '@mui/icons-material';

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
  requestor?: {
    name: string;
    email: string;
    department: string;
    phone?: string;
  };
  vendor?: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  paymentDetails?: {
    expectedDate?: string;
    subject?: string;
  };
}

interface RequestReviewModalProps {
  open: boolean;
  onClose: () => void;
  request: PaymentRequest | null;
}

export const RequestReviewModal: React.FC<RequestReviewModalProps> = ({
  open,
  onClose,
  request
}) => {
  if (!request) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getApprovalRequirement = (amount: number) => {
    if (amount < 2000) return 'Auto-approved';
    if (amount < 10000) return 'Single approval required';
    return 'Dual approval required';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Request Review - {request.id}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3}>
          {/* Status and Priority */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip 
              label={`Status: ${request.status.toUpperCase()}`}
              color={getStatusColor(request.status) as any}
            />
            <Chip 
              label={`Priority: ${request.priority.toUpperCase()}`}
              color={getPriorityColor(request.priority) as any}
            />
            <Chip 
              label={getApprovalRequirement(request.amount)}
              variant="outlined"
            />
          </Stack>

          {/* Payment Details */}
          <Box>
            <Typography variant="h6" gutterBottom>Payment Information</Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Amount:</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {request.currency} {request.amount.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Category:</Typography>
                <Typography variant="body2">{request.category}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Submitted Date:</Typography>
                <Typography variant="body2">
                  {new Date(request.submittedDate).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Due Date:</Typography>
                <Typography variant="body2">
                  {new Date(request.dueDate).toLocaleDateString()}
                </Typography>
              </Stack>
              {request.paymentDetails?.expectedDate && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Expected Payment Date:</Typography>
                  <Typography variant="body2">
                    {new Date(request.paymentDetails.expectedDate).toLocaleDateString()}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Requestor Information */}
          <Box>
            <Typography variant="h6" gutterBottom>Requestor Information</Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Name:</Typography>
                <Typography variant="body2">{request.employeeName}</Typography>
              </Stack>
              {request.requestor?.email && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Email:</Typography>
                  <Typography variant="body2">{request.requestor.email}</Typography>
                </Stack>
              )}
              {request.requestor?.department && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Department:</Typography>
                  <Typography variant="body2">{request.requestor.department}</Typography>
                </Stack>
              )}
              {request.requestor?.phone && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Phone:</Typography>
                  <Typography variant="body2">{request.requestor.phone}</Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Vendor Information */}
          <Box>
            <Typography variant="h6" gutterBottom>Vendor Information</Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Company Name:</Typography>
                <Typography variant="body2">{request.vendorName}</Typography>
              </Stack>
              {request.vendor?.email && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Email:</Typography>
                  <Typography variant="body2">{request.vendor.email}</Typography>
                </Stack>
              )}
              {request.vendor?.phone && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Phone:</Typography>
                  <Typography variant="body2">{request.vendor.phone}</Typography>
                </Stack>
              )}
              {request.vendor?.address && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Address:</Typography>
                  <Typography variant="body2">{request.vendor.address}</Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Description */}
          <Box>
            <Typography variant="h6" gutterBottom>Description</Typography>
            {request.paymentDetails?.subject && (
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Subject: {request.paymentDetails.subject}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {request.description}
            </Typography>
          </Box>

          <Divider />

          {/* Attachments */}
          <Box>
            <Typography variant="h6" gutterBottom>Supporting Documents</Typography>
            {request.documents.length > 0 ? (
              <Stack spacing={1}>
                {request.documents.map((doc, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1}>
                    <AttachFile fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ flex: 1 }}>{doc}</Typography>
                    <IconButton size="small" color="primary">
                      <Download fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No supporting documents attached
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};