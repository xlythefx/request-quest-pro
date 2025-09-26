import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Alert,
  Paper,
  IconButton,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  AttachFile,
  Delete,
  CloudUpload,
  Person,
  Business,
  AttachMoney,
  Category,
  CalendarToday,
  Flag
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface PaymentFormData {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  vendorName: string;
  vendorAddress: string;
  amount: string;
  currency: string;
  subject: string;
  description: string;
  category: string;
  department: string;
  expectedDate: string;
  priority: string;
}

const currencies = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'BTC', label: 'Bitcoin (₿)' },
  { value: 'ETH', label: 'Ethereum (Ξ)' },
  { value: 'USDT', label: 'Tether (USDT)' }
];

const categories = [
  'Office Supplies',
  'Software & Licenses',
  'Travel & Accommodation',
  'Marketing & Advertising',
  'Professional Services',
  'Equipment & Hardware',
  'Utilities',
  'Other'
];

const departments = [
  'Finance',
  'IT',
  'HR',
  'Marketing',
  'Sales',
  'Operations',
  'Legal',
  'Administration'
];

const priorities = [
  { value: 'low', label: 'Low', color: '#2e7d32' },
  { value: 'medium', label: 'Medium', color: '#ed6c02' },
  { value: 'high', label: 'High', color: '#d32f2f' },
  { value: 'urgent', label: 'Urgent', color: '#9c27b0' }
];

export const MaterialPaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    vendorName: '',
    vendorAddress: '',
    amount: '',
    currency: 'USD',
    subject: '',
    description: '',
    category: '',
    department: '',
    expectedDate: '',
    priority: 'medium'
  });

  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleInputChange = (field: keyof PaymentFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!formData.vendorName.trim()) newErrors.vendorName = 'Vendor name is required';
    if (!formData.amount.trim()) newErrors.amount = 'Amount is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.expectedDate) newErrors.expectedDate = 'Expected date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    // Amount validation
    const amount = parseFloat(formData.amount);
    if (formData.amount && (isNaN(amount) || amount <= 0)) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          vendorName: '',
          vendorAddress: '',
          amount: '',
          currency: 'USD',
          subject: '',
          description: '',
          category: '',
          department: '',
          expectedDate: '',
          priority: 'medium'
        });
        setFiles([]);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" color="success.main" gutterBottom>
            ✓ Request Submitted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your payment request has been submitted and is now pending approval.
            You will receive an email confirmation shortly.
          </Typography>
          <Alert severity="success" sx={{ mt: 3 }}>
            Request ID: REQ-{Date.now().toString().slice(-6)}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create Payment Request
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Fill out the form below to submit a new payment request for approval.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Contact Information */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Contact Information
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Contact Name"
                      value={formData.contactName}
                      onChange={handleInputChange('contactName')}
                      error={!!errors.contactName}
                      helperText={errors.contactName}
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Contact Email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange('contactEmail')}
                      error={!!errors.contactEmail}
                      helperText={errors.contactEmail}
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      value={formData.contactPhone}
                      onChange={handleInputChange('contactPhone')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Vendor Information */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Business sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Vendor Information
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Vendor/Company Name"
                      value={formData.vendorName}
                      onChange={handleInputChange('vendorName')}
                      error={!!errors.vendorName}
                      helperText={errors.vendorName}
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Vendor Address"
                      value={formData.vendorAddress}
                      onChange={handleInputChange('vendorAddress')}
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Details */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Payment Details
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange('amount')}
                      error={!!errors.amount}
                      helperText={errors.amount}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currencies.find(c => c.value === formData.currency)?.label.slice(-3, -1) || '$'}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Currency"
                      value={formData.currency}
                      onChange={handleInputChange('currency')}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="Subject/Title"
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange('description')}
                      placeholder="Provide detailed information about this payment request..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Classification */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Category sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Classification & Priority
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      value={formData.category}
                      onChange={handleInputChange('category')}
                      error={!!errors.category}
                      helperText={errors.category}
                      required
                    >
                      {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      select
                      label="Department"
                      value={formData.department}
                      onChange={handleInputChange('department')}
                      error={!!errors.department}
                      helperText={errors.department}
                      required
                    >
                      {departments.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Expected Date"
                      value={formData.expectedDate}
                      onChange={handleInputChange('expectedDate')}
                      error={!!errors.expectedDate}
                      helperText={errors.expectedDate}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      select
                      label="Priority"
                      value={formData.priority}
                      onChange={handleInputChange('priority')}
                    >
                      {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Flag sx={{ color: option.color, fontSize: 16 }} />
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* File Upload */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AttachFile sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Supporting Documents
                  </Typography>
                </Box>
                
                <Paper
                  {...getRootProps()}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: 2,
                    borderStyle: 'dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    bgcolor: isDragActive ? 'primary.light' : 'grey.50',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.light'
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                  </Typography>
                </Paper>

                {files.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Uploaded Files ({files.length})
                    </Typography>
                    {files.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          border: 1,
                          borderColor: 'grey.200',
                          borderRadius: 1,
                          mb: 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <AttachFile color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {file.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => removeFile(index)}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Submit Button */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Submit Request
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Review your information and submit the payment request for approval.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      disabled={loading}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ minWidth: 150 }}
                    >
                      {loading ? <LinearProgress /> : 'Submit Request'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};