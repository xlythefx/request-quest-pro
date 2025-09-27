import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Wifi,
  Database,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Trash2,
  Wrench
} from 'lucide-react';
import AOS from 'aos';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  category: string;
  message: string;
}

interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  nextRun: string;
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  duration: string;
}

const mockMetrics: SystemMetric[] = [
  { name: 'CPU Usage', value: 45, unit: '%', status: 'good', threshold: 80, icon: Cpu },
  { name: 'Memory Usage', value: 68, unit: '%', status: 'warning', threshold: 85, icon: Activity },
  { name: 'Disk Usage', value: 34, unit: '%', status: 'good', threshold: 90, icon: HardDrive },
  { name: 'Network I/O', value: 23, unit: 'MB/s', status: 'good', threshold: 100, icon: Wifi },
  { name: 'Database Connections', value: 42, unit: 'active', status: 'good', threshold: 100, icon: Database },
  { name: 'Response Time', value: 235, unit: 'ms', status: 'good', threshold: 500, icon: Zap }
];

const mockLogs: LogEntry[] = [
  {
    id: 'LOG-001',
    timestamp: '2024-01-20 16:45:22',
    level: 'info',
    category: 'System',
    message: 'Database backup completed successfully'
  },
  {
    id: 'LOG-002',
    timestamp: '2024-01-20 16:30:15',
    level: 'warning',
    category: 'Performance',
    message: 'High memory usage detected (78%)'
  },
  {
    id: 'LOG-003',
    timestamp: '2024-01-20 16:15:08',
    level: 'error',
    category: 'Security',
    message: 'Failed login attempt from IP 192.168.1.100'
  },
  {
    id: 'LOG-004',
    timestamp: '2024-01-20 16:00:33',
    level: 'info',
    category: 'Maintenance',
    message: 'Index optimization task started'
  },
  {
    id: 'LOG-005',
    timestamp: '2024-01-20 15:45:11',
    level: 'warning',
    category: 'Storage',
    message: 'Disk space usage above 80% on /var/log'
  }
];

const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 'TASK-001',
    name: 'Database Backup',
    description: 'Full database backup to secure storage',
    lastRun: '2024-01-20 02:00:00',
    nextRun: '2024-01-21 02:00:00',
    status: 'completed',
    duration: '15 min'
  },
  {
    id: 'TASK-002',
    name: 'Log Cleanup',
    description: 'Remove old log files and archive',
    lastRun: '2024-01-19 03:00:00',
    nextRun: '2024-01-26 03:00:00',
    status: 'scheduled',
    duration: '5 min'
  },
  {
    id: 'TASK-003',
    name: 'Index Optimization',
    description: 'Rebuild and optimize database indexes',
    lastRun: '2024-01-18 04:00:00',
    nextRun: '2024-01-25 04:00:00',
    status: 'scheduled',
    duration: '30 min'
  },
  {
    id: 'TASK-004',
    name: 'Security Scan',
    description: 'Scan system for security vulnerabilities',
    lastRun: '2024-01-17 01:00:00',
    nextRun: '2024-01-24 01:00:00',
    status: 'failed',
    duration: '45 min'
  }
];

export const SystemMaintenanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>(mockMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });

    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        status: metric.value > metric.threshold ? 'critical' : 
                metric.value > metric.threshold * 0.8 ? 'warning' : 'good'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'outline';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'outline';
      case 'failed': return 'destructive';
      case 'scheduled': return 'secondary';
      default: return 'outline';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running': return <Play className="h-4 w-4 text-blue-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">System Maintenance</h1>
          <p className="text-muted-foreground">Monitor system performance, manage maintenance tasks, and view system logs</p>
        </div>

        {/* System Health Alert */}
        <Alert data-aos="fade-up" data-aos-delay="100" className="border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            System status: All critical services are operational. Next scheduled maintenance: Jan 21, 2024 at 2:00 AM
          </AlertDescription>
        </Alert>

        {/* System Metrics */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-yellow-600">System Performance Metrics</CardTitle>
                <CardDescription>Real-time monitoring of system resources</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={handleRefreshMetrics}
                disabled={isRefreshing}
                className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric) => (
                <Card key={metric.name} className="border-l-4 border-l-yellow-400">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        metric.status === 'good' ? 'bg-green-100' :
                        metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <metric.icon className={`h-6 w-6 ${
                          metric.status === 'good' ? 'text-green-600' :
                          metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{metric.name}</h3>
                          <Badge variant={getMetricColor(metric.status) as any}>
                            {metric.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">
                          {Math.round(metric.value)}{metric.unit}
                        </p>
                        <Progress
                          value={Math.min(100, (metric.value / metric.threshold) * 100)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Maintenance Tasks */}
          <Card data-aos="fade-up" data-aos-delay="300">
            <CardHeader>
              <CardTitle className="text-yellow-600">Scheduled Maintenance Tasks</CardTitle>
              <CardDescription>Automated maintenance tasks and their execution status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMaintenanceTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-yellow-50/50">
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.lastRun}</TableCell>
                      <TableCell>{task.nextRun}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTaskStatusIcon(task.status)}
                          <Badge variant={getTaskStatusColor(task.status) as any}>
                            {task.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={task.status === 'running'}
                            className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Run Now
                          </Button>
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Wrench className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* System Logs */}
          <Card data-aos="fade-up" data-aos-delay="400">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-yellow-600">Recent System Logs</CardTitle>
                  <CardDescription>System events and error logs</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Logs
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-yellow-50/50">
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={getLogLevelColor(log.level) as any}>
                          {log.level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.category}</TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};