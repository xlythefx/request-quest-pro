import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
  BarChart3,
  AlertTriangle,
  Clock,
  Download
} from 'lucide-react';
import AOS from 'aos';

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

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const COLORS = ['#EAB308', '#22C55E', '#F97316', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">Advanced Analytics</h1>
          <p className="text-muted-foreground">Deep insights and predictive analytics for financial operations</p>
        </div>

        {/* Controls */}
        <Card data-aos="fade-up" data-aos-delay="100">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex bg-muted rounded-lg p-1">
                  {['trends', 'risk', 'efficiency', 'predictions'].map((type) => (
                    <Button
                      key={type}
                      variant={viewType === type ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewType(type)}
                      className={viewType === type ? 'finance-button-primary' : ''}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">+12.5%</p>
                  <p className="text-sm text-muted-foreground">Processing Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                  <p className="text-sm text-muted-foreground">High-Risk Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">1.8 days</p>
                  <p className="text-sm text-muted-foreground">Avg. Approval Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">-5.2%</p>
                  <p className="text-sm text-muted-foreground">Late Payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Content */}
        {viewType === 'trends' && (
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* High-Value Transaction Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">High-Value Transaction Trends</CardTitle>
                <CardDescription>Monthly analysis of high-value payment requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="highValue" stroke="#EF4444" fill="#FEE2E2" name="High-Value Requests" />
                      <Area type="monotone" dataKey="totalRequests" stroke="#EAB308" fill="#FEF3C7" name="Total Requests" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Weekly Cash Flow Analysis</CardTitle>
                <CardDescription>Incoming vs outgoing payment flows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cashflowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="incoming" fill="#22C55E" name="Incoming" />
                      <Bar dataKey="outgoing" fill="#EF4444" name="Outgoing" />
                      <Bar dataKey="pending" fill="#F97316" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {viewType === 'risk' && (
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* Department Risk Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Department Risk Analysis</CardTitle>
                <CardDescription>Risk scores vs average processing delays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={departmentRiskData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="avgDelay" name="Avg Delay (days)" />
                      <YAxis dataKey="riskScore" name="Risk Score" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter dataKey="riskScore" fill="#EF4444" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Reliability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Vendor Performance & Risk</CardTitle>
                <CardDescription>Vendor reliability scores and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorAnalysisData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="vendor" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="reliability" fill="#22C55E" name="Reliability %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {viewType === 'efficiency' && (
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* Processing Efficiency by Time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Daily Processing Efficiency</CardTitle>
                <CardDescription>Hourly breakdown of approvals and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="approvals" stroke="#EAB308" strokeWidth={3} name="Approvals" />
                      <Line type="monotone" dataKey="submissions" stroke="#22C55E" strokeWidth={3} name="Submissions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Efficiency Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">Processing Times by Department</CardTitle>
                  <CardDescription>Average processing delays across departments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departmentRiskData.map((dept) => (
                    <div key={dept.department} className="flex justify-between items-center">
                      <span className="font-medium">{dept.department}</span>
                      <Badge 
                        variant={dept.avgDelay < 1.5 ? 'default' : dept.avgDelay < 2 ? 'secondary' : 'destructive'}
                      >
                        {dept.avgDelay} days
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">Compliance Scores</CardTitle>
                  <CardDescription>Department compliance percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {viewType === 'predictions' && (
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* Predictive Models */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Predictive Cash Flow (Next 6 Months)</CardTitle>
                <CardDescription>AI-powered predictions based on historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jul', predicted: 165000, confidence: 0.95 },
                      { month: 'Aug', predicted: 172000, confidence: 0.92 },
                      { month: 'Sep', predicted: 158000, confidence: 0.89 },
                      { month: 'Oct', predicted: 178000, confidence: 0.85 },
                      { month: 'Nov', predicted: 162000, confidence: 0.82 },
                      { month: 'Dec', predicted: 185000, confidence: 0.78 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="predicted" stroke="#EAB308" strokeWidth={3} strokeDasharray="5 5" name="Predicted Amount" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Risk Predictions & Anomaly Detection</CardTitle>
                <CardDescription>AI-powered risk analysis and anomaly alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800">Anomaly Detected: IT Department</p>
                      <p className="text-sm text-yellow-700">35% increase in high-value requests detected</p>
                      <p className="text-xs text-yellow-600 mt-1">Predicted impact: $45K additional spend this month</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-800">Optimization Opportunity</p>
                      <p className="text-sm text-blue-700">Marketing department showing 15% faster processing times</p>
                      <p className="text-xs text-blue-600 mt-1">Consider applying similar workflows to other departments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};