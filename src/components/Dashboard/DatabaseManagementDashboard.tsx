import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  HardDrive, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  Upload,
  Settings,
  Trash2,
  RefreshCw
} from 'lucide-react';
import AOS from 'aos';

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
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'error':
      case 'failed':
        return 'destructive';
      case 'in_progress':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
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
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">Database Management</h1>
          <p className="text-muted-foreground">Monitor database health, perform backups, and manage system maintenance</p>
        </div>

        {/* Database Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {(totalSize / 1024).toFixed(1)} GB
                  </p>
                  <p className="text-sm text-muted-foreground">Total Database Size</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {healthyTables}/{mockTables.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Healthy Tables</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <HardDrive className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {totalRows.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Upload className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockBackups.filter(b => b.status === 'completed').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Successful Backups</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Alert */}
        <Alert data-aos="fade-up" data-aos-delay="200" className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>System Notice:</strong> The 'documents' table is showing storage errors. 
            Consider running maintenance or archiving old files.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                className="finance-button-primary"
                disabled={isPerformingAction}
              >
                <Upload className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                disabled={isPerformingAction}
              >
                <Download className="h-4 w-4 mr-2" />
                Restore Database
              </Button>
              <Button 
                variant="outline"
                disabled={isPerformingAction}
              >
                <Settings className="h-4 w-4 mr-2" />
                Run Maintenance
              </Button>
              <Button 
                variant="outline"
                disabled={isPerformingAction}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Stats
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Database Tables */}
          <Card data-aos="fade-up" data-aos-delay="400">
            <CardHeader>
              <CardTitle className="text-yellow-600">Database Tables</CardTitle>
              <CardDescription>Overview of all database tables and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTables.map((table) => (
                    <TableRow key={table.name} className="hover:bg-yellow-50/50">
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.rows.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>{table.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(table.status)}
                          <Badge variant={getStatusColor(table.status) as any}>
                            {table.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Backup History */}
          <Card data-aos="fade-up" data-aos-delay="500">
            <CardHeader>
              <CardTitle className="text-yellow-600">Backup History</CardTitle>
              <CardDescription>Recent database backup records and status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBackups.map((backup) => (
                    <TableRow key={backup.id} className="hover:bg-yellow-50/50">
                      <TableCell className="font-medium">{backup.id}</TableCell>
                      <TableCell>{backup.date}</TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>
                        <Badge variant={backup.type === 'full' ? 'default' : 'secondary'}>
                          {backup.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(backup.status)}
                          <Badge variant={getStatusColor(backup.status) as any}>
                            {backup.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={backup.status !== 'completed'}
                            className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Restore
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
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