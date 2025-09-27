import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, DollarSign, Calendar, User, FileText, Tag } from 'lucide-react';

export const PaymentRequestForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100/30">
      <div className="max-w-5xl mx-auto space-y-8 p-6">
        {/* Header */}
        <div 
          className="text-center space-y-4 py-8"
          data-aos="fade-down"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
            Create Payment Request
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit a new payment request with all necessary details for streamlined approval
          </p>
        </div>

        <form className="space-y-8">
          {/* Contact Information */}
          <Card 
            className="bg-white/70 backdrop-blur-sm border-yellow-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-yellow-800">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                Contact Information
              </CardTitle>
              <CardDescription className="text-yellow-700/80">
                Your contact details for this request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Enter your full name"
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567"
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">Department *</Label>
                  <Select>
                    <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30">
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
          <Card 
            className="bg-white/70 backdrop-blur-sm border-yellow-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-yellow-800">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
                Payment Details
              </CardTitle>
              <CardDescription className="text-yellow-700/80">
                Amount, currency, and payment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium">Amount *</Label>
                  <div className="flex gap-2">
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-32 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30">
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
                      className="flex-1 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
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
                  <Label htmlFor="expectedDate" className="text-sm font-medium">Expected Payment Date</Label>
                  <Input 
                    id="expectedDate" 
                    type="date"
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">Subject/Description *</Label>
                  <Input 
                    id="subject" 
                    placeholder="Brief description of the payment"
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide detailed information about this payment request, including purpose, justification, and any relevant details..."
                    className="min-h-32 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card 
            className="bg-white/70 backdrop-blur-sm border-yellow-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-yellow-800">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Tag className="h-5 w-5" />
                </div>
                Classification
              </CardTitle>
              <CardDescription className="text-yellow-700/80">
                Categorize your payment request for proper routing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30">
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
                  <div className="mt-4">
                    <Label htmlFor="customCategory" className="text-sm font-medium">Specify Category *</Label>
                    <Input
                      id="customCategory"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/30"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card 
            className="bg-white/70 backdrop-blur-sm border-yellow-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-yellow-800">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                Supporting Documents
              </CardTitle>
              <CardDescription className="text-yellow-700/80">
                Upload invoices, receipts, contracts, or other supporting documents (PDF, JPG, PNG, DOC, DOCX - Max 10MB each)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="border-2 border-dashed border-yellow-300 bg-yellow-50/50 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors duration-300">
                <Upload className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
                <div className="space-y-3">
                  <p className="text-base text-yellow-700">
                    Drag and drop files here, or{' '}
                    <label className="text-yellow-600 font-semibold cursor-pointer hover:text-yellow-700 underline">
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
                  <p className="text-sm text-yellow-600/80">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-base font-medium text-yellow-800">
                    Uploaded Files ({files.length})
                  </Label>
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50/30 hover:bg-yellow-50/50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-yellow-800 truncate">{file.name}</p>
                            <p className="text-xs text-yellow-600">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
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
          <div 
            className="flex flex-col sm:flex-row gap-4 pt-8"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-initial"
            >
              Submit Request
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 py-3 px-6 rounded-lg transition-all duration-300"
            >
              Save as Draft
            </Button>
            <Button 
              type="button" 
              variant="ghost"
              className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 py-3 px-6 rounded-lg transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};