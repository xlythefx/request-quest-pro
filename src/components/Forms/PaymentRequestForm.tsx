import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, DollarSign, Calendar, User, Mail, Phone, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AOS from 'aos';

export const PaymentRequestForm = () => {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-finance-accent/5">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div data-aos="fade-down">
          <h1 className="finance-heading text-finance-accent">New Payment Request</h1>
          <p className="text-muted-foreground">Submit a new payment request for approval</p>
        </div>

        <form className="space-y-6">
          {/* Contact Information */}
          <Card data-aos="fade-up" data-aos-delay="100" className="finance-card border-finance-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-finance-accent/5 to-finance-accent/10 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-finance-accent">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Current user contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-finance-accent" />
                    Contact Name
                  </Label>
                  <div className="p-3 bg-muted/50 rounded-lg border border-muted">
                    <p className="font-medium text-foreground">{user?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-finance-accent" />
                    Contact Email
                  </Label>
                  <div className="p-3 bg-muted/50 rounded-lg border border-muted">
                    <p className="font-medium text-foreground">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-finance-accent" />
                    Contact Phone
                  </Label>
                  <div className="p-3 bg-muted/50 rounded-lg border border-muted">
                    <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="h-4 w-4 text-finance-accent" />
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="border-finance-accent/20 focus:border-finance-accent">
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


          {/* Payment Details */}
          <Card data-aos="fade-up" data-aos-delay="200" className="finance-card border-finance-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-finance-accent/5 to-finance-accent/10 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-finance-accent">
                <DollarSign className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription>Amount, currency, and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-sm font-medium">Amount *</Label>
                  <div className="flex gap-3">
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-32 border-finance-accent/20 focus:border-finance-accent">
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
                      className="flex-1 border-finance-accent/20 focus:border-finance-accent"
                    />
                  </div>
                  {amount && (
                    <div className="mt-3">
                      <Badge variant="outline" className={`${getApprovalWorkflow().color} border-0 shadow-sm`}>
                        {getApprovalWorkflow().text}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="expectedDate" className="text-sm font-medium">Expected Payment Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-finance-accent" />
                    <Input 
                      id="expectedDate" 
                      type="date" 
                      className="pl-10 border-finance-accent/20 focus:border-finance-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject" className="text-sm font-medium">Subject/Description *</Label>
                <Input 
                  id="subject" 
                  placeholder="Brief description of the payment" 
                  className="border-finance-accent/20 focus:border-finance-accent"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-medium">Detailed Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide detailed information about this payment request, including purpose, justification, and any relevant details..."
                  className="min-h-24 border-finance-accent/20 focus:border-finance-accent resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card data-aos="fade-up" data-aos-delay="300" className="finance-card border-finance-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-finance-accent/5 to-finance-accent/10 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-finance-accent">
                <Briefcase className="h-5 w-5" />
                Classification
              </CardTitle>
              <CardDescription>Categorize your payment request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-finance-accent/20 focus:border-finance-accent">
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
                  <div className="mt-3">
                    <Label htmlFor="customCategory" className="text-sm font-medium">Specify Category *</Label>
                    <Input
                      id="customCategory"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="border-finance-accent/20 focus:border-finance-accent"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card data-aos="fade-up" data-aos-delay="400" className="finance-card border-finance-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-finance-accent/5 to-finance-accent/10 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-finance-accent">
                <Upload className="h-5 w-5" />
                Supporting Documents
              </CardTitle>
              <CardDescription>Upload invoices, receipts, contracts, or other supporting documents (PDF, JPG, PNG, DOC, DOCX - Max 10MB each)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="border-2 border-dashed border-finance-accent/30 rounded-xl p-8 text-center bg-gradient-to-br from-finance-accent/5 to-transparent hover:from-finance-accent/10 transition-all duration-300">
                <Upload className="mx-auto h-12 w-12 text-finance-accent mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files here, or{' '}
                    <label className="text-finance-accent cursor-pointer hover:underline font-medium">
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
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Uploaded Files ({files.length})</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-finance-accent/20 rounded-lg bg-muted/30">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="hover:bg-destructive/10 hover:text-destructive"
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
          <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="submit" className="finance-button-accent flex-1 sm:flex-initial shadow-lg hover:shadow-xl transition-all duration-300">
              Submit Request
            </Button>
            <Button type="button" variant="outline" className="border-finance-accent/30 text-finance-accent hover:bg-finance-accent/5">
              Save as Draft
            </Button>
            <Button type="button" variant="ghost" className="hover:bg-muted/50">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};