import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  LinearProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Build,
  Memory,
  Storage,
  Speed,
  Cloud,
  Refresh,
  PlayArrow,
  Stop,
  Download,
  Delete,
  CheckCircle,
  Error,
  Warning
} from '@mui/icons-material';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
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
  { name: 'CPU Usage', value: 45, unit: '%', status: 'good', threshold: 80 },
  { name: 'Memory Usage', value: 68, unit: '%', status: 'warning', threshold: 85 },
  { name: 'Disk Usage', value: 34, unit: '%', status: 'good', threshold: 90 },
  { name: 'Network I/O', value: 23, unit: 'MB/s', status: 'good', threshold: 100 },
  { name: 'Database Connections', value: 42, unit: 'active', status: 'good', threshold: 100 },
  { name: 'Response Time', value: 235, unit: 'ms', status: 'good', threshold: 500 }
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
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isRunningTask, setIsRunningTask] = useState(false);

  // Simulate real-time metric updates
  useEffect(() => {
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
      case 'good': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'primary';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'running': return 'info';
      case 'failed': return 'error';
      case 'scheduled': return 'default';
      default: return 'default';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'running': return <PlayArrow color="info" />;
      case 'failed': return <Error color="error" />;
      case 'scheduled': return <Build color="action" />;
      default: return null;
    }
  };

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleRunTask = async (task: MaintenanceTask) => {
    setSelectedTask(task);
    setMaintenanceDialogOpen(true);
  };

  const confirmRunTask = async () => {
    setIsRunningTask(true);
    // Simulate task execution
    setTimeout(() => {
      setIsRunningTask(false);
      setMaintenanceDialogOpen(false);
      setSelectedTask(null);
    }, 3000);
  };

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Level,Category,Message',
      ...mockLogs.map(log => 
        `${log.timestamp},${log.level},${log.category},"${log.message}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system_logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        System Maintenance
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor system performance, manage maintenance tasks, and view system logs
      </Typography>

      {/* System Health Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          System status: All critical services are operational. Next scheduled maintenance: Jan 21, 2024 at 2:00 AM
        </Typography>
      </Alert>

      {/* System Metrics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              System Performance Metrics
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefreshMetrics}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Stack>

          <Stack direction="row" spacing={3} flexWrap="wrap">
            {metrics.map((metric) => (
              <Card key={metric.name} sx={{ minWidth: 200, flex: 1 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: `${getMetricColor(metric.status)}.light`,
                      color: `${getMetricColor(metric.status)}.contrastText`
                    }}>
                      {metric.name.includes('CPU') && <Speed />}
                      {metric.name.includes('Memory') && <Memory />}
                      {metric.name.includes('Disk') && <Storage />}
                      {metric.name.includes('Network') && <Cloud />}
                      {metric.name.includes('Database') && <Storage />}
                      {metric.name.includes('Response') && <Speed />}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {Math.round(metric.value)}{metric.unit}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.name}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(100, (metric.value / metric.threshold) * 100)}
                        color={getMetricColor(metric.status) as any}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={3}>
        {/* Maintenance Tasks */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Scheduled Maintenance Tasks
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Task</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Run</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Next Run</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockMaintenanceTasks.map((task) => (
                    <TableRow key={task.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {task.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{task.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{task.lastRun}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{task.nextRun}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{task.duration}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getTaskStatusIcon(task.status)}
                          <Chip 
                            label={task.status.toUpperCase()} 
                            color={getTaskStatusColor(task.status) as any}
                            size="small"
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<PlayArrow />}
                            onClick={() => handleRunTask(task)}
                            disabled={task.status === 'running'}
                          >
                            Run Now
                          </Button>
                          <IconButton size="small" color="primary">
                            <Build />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Recent System Logs
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={exportLogs}
                >
                  Export Logs
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  color="error"
                >
                  Clear Logs
                </Button>
              </Stack>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockLogs.map((log) => (
                    <TableRow key={log.id} hover>
                      <TableCell>
                        <Typography variant="body2">{log.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={log.level.toUpperCase()} 
                          color={getLogLevelColor(log.level) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{log.category}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{log.message}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>

      {/* Run Task Dialog */}
      <Dialog open={maintenanceDialogOpen} onClose={() => setMaintenanceDialogOpen(false)}>
        <DialogTitle>Run Maintenance Task</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to run the following maintenance task?
          </Typography>
          {selectedTask && (
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {selectedTask.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {selectedTask.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Estimated duration: {selectedTask.duration}
              </Typography>
            </Paper>
          )}
          {isRunningTask && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Running maintenance task...
              </Typography>
              <LinearProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMaintenanceDialogOpen(false)} disabled={isRunningTask}>
            Cancel
          </Button>
          <Button 
            onClick={confirmRunTask} 
            variant="contained" 
            disabled={isRunningTask}
          >
            Run Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};