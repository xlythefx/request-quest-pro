import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, DollarSign, Calendar, Building2, User } from 'lucide-react';
import AOS from 'aos';

export const PaymentRequestForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ];

  const categories = [
    'Office Expenses',
    'Marketing',
    'Technology',
    'Travel',
    'Professional Services',
    'Equipment',
    'Software',
    'Training',
    'Utilities',
    'Other'
  ];

  const departments = [
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
    'HR',
    'Technology',
    'Legal',
    'Executive',
    'Customer Service'
  ];

  const getPriority = (amount: number) => {
    if (amount < 2000) return { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' };
    if (amount < 10000) return { value: 'high', label: 'High Priority', color: 'bg-yellow-100 text-yellow-800' };
    return { value: 'highest', label: 'Highest Priority', color: 'bg-red-100 text-red-800' };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const validSize = file.size <= 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && validSize;
    });
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCurrentCurrency = () => {
    return currencies.find(c => c.code === currency);
  };

  const getApprovalWorkflow = () => {
    const numAmount = parseFloat(amount);
    if (numAmount < 1) return { level: 'invalid', text: 'Amount must be at least $1', color: 'bg-red-100 text-red-800' };
    if (numAmount < 2000) return { level: 'auto', text: 'Auto-approved (< $2,000)', color: 'bg-green-100 text-green-800' };
    if (numAmount < 10000) return { level: 'single', text: '1 Manager Approval Required', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'dual', text: '2 Approvals Required (≥ $10,000)', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="min-h-screen finance-bg-animated">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">New Payment Request</h1>
          <p className="text-muted-foreground">Submit a new payment request for approval</p>
        </div>

        <form className="space-y-6">
          {/* Contact Information */}
          <Card data-aos="fade-up" data-aos-delay="100" className="finance-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Your contact details for this request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="your.email@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Vendor/Company Information */}
          <Card data-aos="fade-up" data-aos-delay="200" className="finance-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Vendor/Company Information
            </CardTitle>
            <CardDescription>Details about the payment recipient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor/Company Name *</Label>
                <Input id="vendorName" placeholder="Enter vendor or company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorEmail">Vendor Email</Label>
                <Input id="vendorEmail" type="email" placeholder="vendor@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorPhone">Vendor Phone</Label>
                <Input id="vendorPhone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorAddress">Vendor Address</Label>
                <Input id="vendorAddress" placeholder="123 Main St, City, State, ZIP" />
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Payment Details */}
          <Card data-aos="fade-up" data-aos-delay="300" className="finance-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Details
            </CardTitle>
            <CardDescription>Amount, currency, and payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <div className="flex gap-2">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(curr => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="1.00" 
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1"
                  />
                </div>
                {amount && (
                  <div className="mt-2">
                    <Badge className={getApprovalWorkflow().color}>
                      {getApprovalWorkflow().text}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory === 'other' && (
                  <div className="mt-2">
                    <Label htmlFor="customCategory">Specify Category *</Label>
                    <Input
                      id="customCategory"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedDate">Expected Payment Date</Label>
                <Input id="expectedDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority (Auto-assigned)</Label>
                <div className="p-3 border rounded-md bg-gray-50">
                  {amount && parseFloat(amount) >= 1 ? (
                    <Badge className={getPriority(parseFloat(amount)).color}>
                      {getPriority(parseFloat(amount)).label}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Enter amount to see priority</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject/Description *</Label>
              <Input id="subject" placeholder="Brief description of the payment" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed information about this payment request, including purpose, justification, and any relevant details..."
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

          {/* File Upload */}
          <Card data-aos="fade-up" data-aos-delay="400" className="finance-card">
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>Upload invoices, receipts, contracts, or other supporting documents (PDF, JPG, PNG, DOC, DOCX - Max 10MB each)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here, or{' '}
                  <label className="text-finance-accent cursor-pointer hover:underline">
                    browse files
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files ({files.length})</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

          {/* Submit Actions */}
          <div data-aos="fade-up" data-aos-delay="500" className="flex gap-4 pt-4">
            <Button type="submit" className="finance-button-primary flex-1 sm:flex-initial">
              Submit Request
            </Button>
            <Button type="button" variant="outline" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
              Save as Draft
            </Button>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};