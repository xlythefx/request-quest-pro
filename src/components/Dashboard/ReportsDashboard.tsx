import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileDown, TrendingUp, BarChart3 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const monthlyData = [
  { month: 'Jan', payments: 45, amount: 125000, avgTime: 2.3 },
  { month: 'Feb', payments: 52, amount: 148000, avgTime: 2.1 },
  { month: 'Mar', payments: 38, amount: 95000, avgTime: 2.8 },
  { month: 'Apr', payments: 61, amount: 172000, avgTime: 1.9 },
  { month: 'May', payments: 55, amount: 156000, avgTime: 2.2 },
  { month: 'Jun', payments: 48, amount: 134000, avgTime: 2.5 }
];

const categoryData = [
  { name: 'Software Licenses', value: 35, amount: 245000, color: '#1976d2' },
  { name: 'Office Supplies', value: 25, amount: 125000, color: '#388e3c' },
  { name: 'Travel', value: 20, amount: 95000, color: '#f57c00' },
  { name: 'Equipment', value: 15, amount: 78000, color: '#d32f2f' },
  { name: 'Marketing', value: 5, amount: 32000, color: '#7b1fa2' }
];

const approvalTimeData = [
  { department: 'IT', avgTime: 1.8, requests: 45 },
  { department: 'Sales', avgTime: 2.1, requests: 32 },
  { department: 'Marketing', avgTime: 2.4, requests: 28 },
  { department: 'Operations', avgTime: 1.9, requests: 38 },
  { department: 'HR', avgTime: 2.8, requests: 22 }
];

export const ReportsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const generateReport = () => {
    const reportData = {
      totalPayments: monthlyData.reduce((sum, item) => sum + item.payments, 0),
      totalAmount: monthlyData.reduce((sum, item) => sum + item.amount, 0),
      avgApprovalTime: 2.2,
      topCategory: 'Software Licenses'
    };

    const csvContent = `Finance Report - ${timeRange}\n\nTotal Payments,${reportData.totalPayments}\nTotal Amount,$${reportData.totalAmount.toLocaleString()}\nAvg Approval Time,${reportData.avgApprovalTime} days\nTop Category,${reportData.topCategory}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance_report_${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 finance-bg-animated p-6 rounded-lg">
      <div className="mb-4" data-aos="fade-down">
        <h1 className="finance-heading text-finance-accent">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive financial analytics and reporting dashboard</p>
      </div>

      {/* Controls */}
      <Card className="p-4" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="2years">Last 2 Years</SelectItem>
              </SelectContent>
            </Select>

            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="payments">Payment Volume</SelectItem>
                <SelectItem value="approval">Approval Times</SelectItem>
                <SelectItem value="spending">Department Spending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateReport} className="finance-button-accent">
            <FileDown className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="100">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-finance-accent">$830K</div>
                <div className="text-sm text-muted-foreground">Total Processed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-finance-accent">299</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-finance-accent">2.2 days</div>
                <div className="text-sm text-muted-foreground">Avg. Approval Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="space-y-6">
        {/* Payment Volume Trends */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <CardTitle className="text-finance-accent">Payment Volume & Amount Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="payments" fill="#1976d2" name="Number of Payments" />
                  <Bar yAxisId="right" dataKey="amount" fill="#388e3c" name="Amount ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <Card data-aos="fade-up" data-aos-delay="300">
            <CardHeader>
              <CardTitle className="text-finance-accent">Payment Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Times by Department */}
          <Card data-aos="fade-up" data-aos-delay="400">
            <CardHeader>
              <CardTitle className="text-finance-accent">Approval Times by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalTimeData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="department" />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="#f57c00" name="Avg Time (days)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};