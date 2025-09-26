import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Storage,
  Backup,
  Restore,
  Delete,
  Refresh,
  Warning,
  CheckCircle,
  Error,
  Settings
} from '@mui/icons-material';

interface DatabaseTable {
  name: string;
  rows: number;
  size: string;
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'error';
}

interface BackupRecord {
  id: string;
  date: string;
  size: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'failed' | 'in_progress';
}

const mockTables: DatabaseTable[] = [
  { name: 'users', rows: 1250, size: '2.5 MB', lastUpdated: '2024-01-20 14:30', status: 'healthy' },
  { name: 'payment_requests', rows: 8943, size: '45.2 MB', lastUpdated: '2024-01-20 15:45', status: 'healthy' },
  { name: 'vendors', rows: 342, size: '1.2 MB', lastUpdated: '2024-01-20 12:15', status: 'healthy' },
  { name: 'departments', rows: 12, size: '0.1 MB', lastUpdated: '2024-01-15 10:00', status: 'warning' },
  { name: 'audit_logs', rows: 25683, size: '128.7 MB', lastUpdated: '2024-01-20 16:00', status: 'healthy' },
  { name: 'approvals', rows: 4521, size: '18.3 MB', lastUpdated: '2024-01-20 15:30', status: 'healthy' },
  { name: 'documents', rows: 3204, size: '2.1 GB', lastUpdated: '2024-01-20 14:00', status: 'error' }
];

const mockBackups: BackupRecord[] = [
  { id: 'BCK-001', date: '2024-01-20 02:00', size: '2.8 GB', type: 'full', status: 'completed' },
  { id: 'BCK-002', date: '2024-01-19 02:00', size: '2.7 GB', type: 'full', status: 'completed' },
  { id: 'BCK-003', date: '2024-01-18 02:00', size: '2.7 GB', type: 'full', status: 'completed' },
  { id: 'BCK-004', date: '2024-01-17 02:00', size: '2.6 GB', type: 'full', status: 'failed' },
  { id: 'BCK-005', date: '2024-01-16 02:00', size: '2.6 GB', type: 'full', status: 'completed' }
];

export const DatabaseManagementDashboard: React.FC = () => {
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupRecord | null>(null);
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'completed': return 'success';
      case 'failed': return 'error';
      case 'in_progress': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
      case 'failed':
        return <Error color="error" />;
      default:
        return null;
    }
  };

  const handleBackup = async () => {
    setIsPerformingAction(true);
    // Mock backup process
    setTimeout(() => {
      setIsPerformingAction(false);
      setBackupDialogOpen(false);
    }, 3000);
  };

  const handleRestore = async () => {
    setIsPerformingAction(true);
    // Mock restore process
    setTimeout(() => {
      setIsPerformingAction(false);
      setRestoreDialogOpen(false);
      setSelectedBackup(null);
    }, 5000);
  };

  const handleMaintenance = async () => {
    setIsPerformingAction(true);
    // Mock maintenance process
    setTimeout(() => {
      setIsPerformingAction(false);
      setMaintenanceDialogOpen(false);
    }, 4000);
  };

  const totalSize = mockTables.reduce((sum, table) => {
    const size = parseFloat(table.size);
    const unit = table.size.split(' ')[1];
    if (unit === 'GB') return sum + size * 1024;
    return sum + size;
  }, 0);

  const healthyTables = mockTables.filter(t => t.status === 'healthy').length;
  const totalRows = mockTables.reduce((sum, table) => sum + table.rows, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Database Management
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor database health, perform backups, and manage system maintenance
      </Typography>

      {/* Database Overview */}
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
                <Storage />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {(totalSize / 1024).toFixed(1)} GB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Database Size
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
                <CheckCircle />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {healthyTables}/{mockTables.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Healthy Tables
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
                <Storage />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {totalRows.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Records
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
                <Backup />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {mockBackups.filter(b => b.status === 'completed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful Backups
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* System Health Alert */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>System Notice:</strong> The 'documents' table is showing storage errors. 
          Consider running maintenance or archiving old files.
        </Typography>
      </Alert>

      {/* Action Buttons */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Backup />}
            onClick={() => setBackupDialogOpen(true)}
            disabled={isPerformingAction}
          >
            Create Backup
          </Button>
          <Button
            variant="outlined"
            startIcon={<Restore />}
            onClick={() => setRestoreDialogOpen(true)}
            disabled={isPerformingAction}
          >
            Restore Database
          </Button>
          <Button
            variant="outlined"
            startIcon={<Settings />}
            onClick={() => setMaintenanceDialogOpen(true)}
            disabled={isPerformingAction}
          >
            Run Maintenance
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            disabled={isPerformingAction}
          >
            Refresh Stats
          </Button>
        </Stack>
      </Paper>

      <Stack spacing={3}>
        {/* Database Tables */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Database Tables
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Table Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rows</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTables.map((table) => (
                    <TableRow key={table.name} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {table.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {table.rows.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{table.size}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{table.lastUpdated}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getStatusIcon(table.status)}
                          <Chip 
                            label={table.status.toUpperCase()} 
                            color={getStatusColor(table.status) as any}
                            size="small"
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small" color="primary">
                            <Settings />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
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

        {/* Backup History */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Backup History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Backup ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBackups.map((backup) => (
                    <TableRow key={backup.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {backup.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{backup.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{backup.size}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={backup.type.toUpperCase()} 
                          color={backup.type === 'full' ? 'primary' : 'secondary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getStatusIcon(backup.status)}
                          <Chip 
                            label={backup.status.replace('_', ' ').toUpperCase()} 
                            color={getStatusColor(backup.status) as any}
                            size="small"
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setSelectedBackup(backup);
                              setRestoreDialogOpen(true);
                            }}
                            disabled={backup.status !== 'completed'}
                          >
                            Restore
                          </Button>
                          <IconButton size="small" color="error">
                            <Delete />
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
      </Stack>

      {/* Backup Dialog */}
      <Dialog open={backupDialogOpen} onClose={() => setBackupDialogOpen(false)}>
        <DialogTitle>Create Database Backup</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will create a full backup of the entire database. The process may take several minutes.
          </Typography>
          {isPerformingAction && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Creating backup...</Typography>
              <LinearProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackupDialogOpen(false)} disabled={isPerformingAction}>
            Cancel
          </Button>
          <Button onClick={handleBackup} variant="contained" disabled={isPerformingAction}>
            Create Backup
          </Button>
        </DialogActions>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={restoreDialogOpen} onClose={() => setRestoreDialogOpen(false)}>
        <DialogTitle>Restore Database</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {selectedBackup 
              ? `Restore from backup ${selectedBackup.id} (${selectedBackup.date})?`
              : 'Select a backup to restore from the table above.'
            }
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This will overwrite all current data. Make sure to create a backup first!
          </Alert>
          {isPerformingAction && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Restoring database...</Typography>
              <LinearProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestoreDialogOpen(false)} disabled={isPerformingAction}>
            Cancel
          </Button>
          <Button 
            onClick={handleRestore} 
            color="error" 
            variant="contained" 
            disabled={!selectedBackup || isPerformingAction}
          >
            Restore Database
          </Button>
        </DialogActions>
      </Dialog>

      {/* Maintenance Dialog */}
      <Dialog open={maintenanceDialogOpen} onClose={() => setMaintenanceDialogOpen(false)}>
        <DialogTitle>System Maintenance</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Run database maintenance tasks including:
          </Typography>
          <Box component="ul" sx={{ mb: 2 }}>
            <li>Index optimization</li>
            <li>Table defragmentation</li>
            <li>Statistics updates</li>
            <li>Log file cleanup</li>
          </Box>
          {isPerformingAction && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Running maintenance tasks...</Typography>
              <LinearProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMaintenanceDialogOpen(false)} disabled={isPerformingAction}>
            Cancel
          </Button>
          <Button onClick={handleMaintenance} variant="contained" disabled={isPerformingAction}>
            Run Maintenance
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};