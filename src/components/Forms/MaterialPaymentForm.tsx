import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Alert,
  Paper,
  IconButton,
  LinearProgress,
  Chip,
  Stack
} from '@mui/material';
import {
  Upload,
  Trash2,
  User,
  Building,
  DollarSign,
  FolderOpen,
  Calendar,
  Flag
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import AOS from 'aos';

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
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

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
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(254, 243, 199, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, p: 3 }}>
        <Box data-aos="fade-down" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#d97706' }}>
            Create Payment Request
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill out the form below to submit a new payment request for approval.
          </Typography>
        </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Contact Information */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="100"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <User size={20} style={{ marginRight: 8, color: '#d97706' }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#d97706' }}>
                  Contact Information
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
                gap: 3 
              }}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={handleInputChange('contactName')}
                  error={!!errors.contactName}
                  helperText={errors.contactName}
                  required
                />
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
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={formData.contactPhone}
                  onChange={handleInputChange('contactPhone')}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Vendor Information */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="200"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Building size={20} style={{ marginRight: 8, color: '#d97706' }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#d97706' }}>
                  Vendor Information
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 3 
              }}>
                <TextField
                  fullWidth
                  label="Vendor/Company Name"
                  value={formData.vendorName}
                  onChange={handleInputChange('vendorName')}
                  error={!!errors.vendorName}
                  helperText={errors.vendorName}
                  required
                />
                <TextField
                  fullWidth
                  label="Vendor Address"
                  value={formData.vendorAddress}
                  onChange={handleInputChange('vendorAddress')}
                  multiline
                  rows={2}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="300"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DollarSign size={20} style={{ marginRight: 8, color: '#d97706' }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#d97706' }}>
                  Payment Details
                </Typography>
              </Box>
              <Stack spacing={3}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                  gap: 3 
                }}>
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
                </Box>
                <TextField
                  fullWidth
                  label="Subject/Title"
                  value={formData.subject}
                  onChange={handleInputChange('subject')}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  placeholder="Provide detailed information about this payment request..."
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="400"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <FolderOpen size={20} style={{ marginRight: 8, color: '#d97706' }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#d97706' }}>
                  Classification & Priority
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, 
                gap: 3 
              }}>
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
                         <Flag size={16} style={{ color: option.color }} />
                         {option.label}
                       </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="500"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Upload size={20} style={{ marginRight: 8, color: '#d97706' }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#d97706' }}>
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
                <Upload size={48} style={{ color: '#d97706', marginBottom: 16 }} />
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
                  <Stack spacing={1}>
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
                          borderRadius: 1
                        }}
                      >
                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                           <Upload size={16} style={{ color: '#d97706' }} />
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
                          <Trash2 size={16} />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card 
            data-aos="fade-up" 
            data-aos-delay="600"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: '#d97706' }}>
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
                    sx={{ 
                      borderColor: '#fbbf24',
                      color: '#d97706',
                      '&:hover': {
                        borderColor: '#d97706',
                        backgroundColor: 'rgba(251, 191, 36, 0.1)'
                      }
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      minWidth: 150,
                      backgroundColor: '#fbbf24',
                      '&:hover': {
                        backgroundColor: '#d97706'
                      }
                    }}
                  >
                    {loading ? <LinearProgress /> : 'Submit Request'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
        </form>
      </Box>
    </Box>
  );
};