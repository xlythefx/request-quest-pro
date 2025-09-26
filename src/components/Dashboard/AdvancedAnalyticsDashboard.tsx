import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  Warning,
  Schedule
} from '@mui/icons-material';

const trendData = [
  { month: 'Jan', highValue: 15, totalRequests: 45, avgAmount: 2800, efficiency: 85 },
  { month: 'Feb', highValue: 22, totalRequests: 52, avgAmount: 3200, efficiency: 88 },
  { month: 'Mar', highValue: 18, totalRequests: 38, avgAmount: 2950, efficiency: 82 },
  { month: 'Apr', highValue: 28, totalRequests: 61, avgAmount: 3400, efficiency: 90 },
  { month: 'May', highValue: 31, totalRequests: 55, avgAmount: 3600, efficiency: 87 },
  { month: 'Jun', highValue: 25, totalRequests: 48, avgAmount: 3100, efficiency: 89 }
];

const departmentRiskData = [
  { department: 'IT', riskScore: 85, avgDelay: 1.2, compliance: 95 },
  { department: 'Sales', riskScore: 45, avgDelay: 0.8, compliance: 88 },
  { department: 'Marketing', riskScore: 62, avgDelay: 1.5, compliance: 92 },
  { department: 'Operations', riskScore: 38, avgDelay: 0.9, compliance: 90 },
  { department: 'HR', riskScore: 72, avgDelay: 2.1, compliance: 85 }
];

const cashflowData = [
  { week: 'W1', incoming: 125000, outgoing: 95000, pending: 35000 },
  { week: 'W2', incoming: 148000, outgoing: 112000, pending: 42000 },
  { week: 'W3', incoming: 135000, outgoing: 98000, pending: 38000 },
  { week: 'W4', incoming: 162000, outgoing: 125000, pending: 48000 }
];

const vendorAnalysisData = [
  { vendor: 'Tech Solutions Inc', totalSpend: 245000, requests: 28, avgTime: 1.8, reliability: 95 },
  { vendor: 'Office Supplies Co', totalSpend: 125000, requests: 45, avgTime: 1.2, reliability: 88 },
  { vendor: 'Travel Agency Pro', totalSpend: 95000, requests: 32, avgTime: 2.1, reliability: 92 },
  { vendor: 'Marketing Solutions', totalSpend: 78000, requests: 18, avgTime: 1.5, reliability: 85 },
  { vendor: 'Equipment Rental', totalSpend: 156000, requests: 22, avgTime: 2.8, reliability: 78 }
];

const efficiencyData = [
  { time: '00:00', approvals: 0, submissions: 2 },
  { time: '02:00', approvals: 1, submissions: 1 },
  { time: '04:00', approvals: 0, submissions: 0 },
  { time: '06:00', approvals: 2, submissions: 3 },
  { time: '08:00', approvals: 12, submissions: 8 },
  { time: '10:00', approvals: 18, submissions: 15 },
  { time: '12:00', approvals: 22, submissions: 12 },
  { time: '14:00', approvals: 25, submissions: 18 },
  { time: '16:00', approvals: 20, submissions: 22 },
  { time: '18:00', approvals: 8, submissions: 5 },
  { time: '20:00', approvals: 3, submissions: 2 },
  { time: '22:00', approvals: 1, submissions: 1 }
];

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [viewType, setViewType] = useState('trends');
  const [selectedMetric, setSelectedMetric] = useState('amount');

  const COLORS = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Advanced Analytics
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Deep insights and predictive analytics for financial operations
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
                <MenuItem value="1month">Last Month</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={viewType}
              exclusive
              onChange={(_, newValue) => newValue && setViewType(newValue)}
              size="small"
            >
              <ToggleButton value="trends">Trends</ToggleButton>
              <ToggleButton value="risk">Risk Analysis</ToggleButton>
              <ToggleButton value="efficiency">Efficiency</ToggleButton>
              <ToggleButton value="predictions">Predictions</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Button variant="outlined" startIcon={<Analytics />}>
            Export Analysis
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
                bgcolor: 'success.light',
                color: 'success.contrastText'
              }}>
                <TrendingUp />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  +12.5%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Processing Efficiency
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
                <Warning />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} color="warning.main">
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  High-Risk Transactions
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
                bgcolor: 'info.light',
                color: 'info.contrastText'
              }}>
                <Schedule />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} color="info.main">
                  1.8 days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Approval Time
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
                bgcolor: 'error.light',
                color: 'error.contrastText'
              }}>
                <TrendingDown />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} color="error.main">
                  -5.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Late Payments
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Main Analytics Content */}
      {viewType === 'trends' && (
        <Stack spacing={3}>
          {/* High-Value Transaction Trends */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                High-Value Transaction Trends
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="highValue" stroke="#d32f2f" fill="#d32f2f" fillOpacity={0.3} name="High-Value Requests" />
                    <Area type="monotone" dataKey="totalRequests" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} name="Total Requests" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Cash Flow Analysis */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Weekly Cash Flow Analysis
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="incoming" fill="#388e3c" name="Incoming" />
                    <Bar dataKey="outgoing" fill="#d32f2f" name="Outgoing" />
                    <Bar dataKey="pending" fill="#f57c00" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      )}

      {viewType === 'risk' && (
        <Stack spacing={3}>
          {/* Department Risk Scores */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Department Risk Analysis
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={departmentRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="avgDelay" name="Avg Delay (days)" />
                    <YAxis dataKey="riskScore" name="Risk Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="riskScore" fill="#d32f2f" />
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Vendor Reliability */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Vendor Performance & Risk
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendorAnalysisData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="vendor" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reliability" fill="#388e3c" name="Reliability %" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      )}

      {viewType === 'efficiency' && (
        <Stack spacing={3}>
          {/* Processing Efficiency by Time */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Daily Processing Efficiency
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="approvals" stroke="#1976d2" strokeWidth={3} name="Approvals" />
                    <Line type="monotone" dataKey="submissions" stroke="#388e3c" strokeWidth={3} name="Submissions" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Department Efficiency Metrics */}
          <Stack direction="row" spacing={3}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Processing Times by Department
                </Typography>
                <Stack spacing={2}>
                  {departmentRiskData.map((dept, index) => (
                    <Box key={dept.department}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">{dept.department}</Typography>
                        <Chip 
                          label={`${dept.avgDelay} days`} 
                          color={dept.avgDelay < 1.5 ? 'success' : dept.avgDelay < 2 ? 'warning' : 'error'}
                          size="small"
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Compliance Scores
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentRiskData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="compliance"
                        nameKey="department"
                        label={({ department, compliance }) => `${department}: ${compliance}%`}
                      >
                        {departmentRiskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      )}

      {viewType === 'predictions' && (
        <Stack spacing={3}>
          {/* Predictive Models */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Predictive Cash Flow (Next 6 Months)
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jul', predicted: 165000, confidence: 0.95 },
                    { month: 'Aug', predicted: 172000, confidence: 0.92 },
                    { month: 'Sep', predicted: 158000, confidence: 0.89 },
                    { month: 'Oct', predicted: 178000, confidence: 0.85 },
                    { month: 'Nov', predicted: 162000, confidence: 0.82 },
                    { month: 'Dec', predicted: 185000, confidence: 0.78 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" stroke="#1976d2" strokeWidth={3} strokeDasharray="5 5" name="Predicted Amount" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Risk Predictions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Risk Predictions & Anomaly Detection
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    ⚠️ Anomaly Detected: IT Department showing 35% increase in high-value requests
                  </Typography>
                  <Typography variant="caption">
                    Predicted impact: $45K additional spend this month
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    📈 Trend Alert: Marketing department approval times trending upward
                  </Typography>
                  <Typography variant="caption">
                    Expected delay increase: 0.8 days by month end
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    ✅ Optimization Opportunity: Sales department efficiency improved 15%
                  </Typography>
                  <Typography variant="caption">
                    Potential savings: $12K through process automation
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
};