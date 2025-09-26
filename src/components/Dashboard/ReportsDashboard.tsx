import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { FileDownload, TrendingUp, Analytics } from '@mui/icons-material';

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

const departmentSpendingData = [
  { department: 'IT', Q1: 85000, Q2: 92000, Q3: 78000, Q4: 95000 },
  { department: 'Sales', Q1: 45000, Q2: 52000, Q3: 48000, Q4: 55000 },
  { department: 'Marketing', Q1: 32000, Q2: 38000, Q3: 35000, Q4: 42000 },
  { department: 'Operations', Q1: 28000, Q2: 31000, Q3: 29000, Q4: 33000 },
  { department: 'HR', Q1: 18000, Q2: 22000, Q3: 20000, Q4: 24000 }
];

export const ReportsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('all');

  const generateReport = () => {
    // Mock report generation
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Reports & Analytics
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Comprehensive financial analytics and reporting dashboard
      </Typography>

      {/* Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
                <MenuItem value="2years">Last 2 Years</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="all">All Reports</MenuItem>
                <MenuItem value="payments">Payment Volume</MenuItem>
                <MenuItem value="approval">Approval Times</MenuItem>
                <MenuItem value="spending">Department Spending</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={generateReport}
          >
            Generate Report
          </Button>
        </Stack>
      </Paper>

      {/* Key Metrics */}
      <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: 'primary.light',
                color: 'primary.contrastText'
              }}>
                <TrendingUp />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  $830K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Processed
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: 'success.light',
                color: 'success.contrastText'
              }}>
                <Analytics />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  299
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Requests
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: 'warning.light',
                color: 'warning.contrastText'
              }}>
                <TrendingUp />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  2.2 days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Approval Time
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Charts Grid */}
      <Stack spacing={3}>
        {/* Payment Volume Trends */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Payment Volume & Amount Trends
            </Typography>
            <Box sx={{ height: 350 }}>
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
            </Box>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={3}>
          {/* Category Breakdown */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Payment Categories
              </Typography>
              <Box sx={{ height: 300 }}>
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
              </Box>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {categoryData.map((item, index) => (
                  <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: item.color 
                      }} />
                      <Typography variant="body2">{item.name}</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>
                      ${item.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Approval Times by Department */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Approval Times by Department
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalTimeData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="department" />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="#f57c00" name="Avg Time (days)" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Department Spending Trends */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Department Spending Trends
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={departmentSpendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Q1" stroke="#1976d2" strokeWidth={2} />
                  <Line type="monotone" dataKey="Q2" stroke="#388e3c" strokeWidth={2} />
                  <Line type="monotone" dataKey="Q3" stroke="#f57c00" strokeWidth={2} />
                  <Line type="monotone" dataKey="Q4" stroke="#d32f2f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};