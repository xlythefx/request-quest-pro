import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Lock, Eye, Database, Save, AlertTriangle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'password_change' | 'permission_change' | 'suspicious_activity';
  user: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating';
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'SEC-001',
    type: 'login_attempt',
    user: 'admin@company.com',
    description: 'Multiple failed login attempts detected',
    timestamp: '2024-01-20 15:30:22',
    severity: 'high',
    status: 'investigating'
  },
  {
    id: 'SEC-002',
    type: 'permission_change',
    user: 'jane.smith@company.com',
    description: 'User role changed from Employee to Finance Manager',
    timestamp: '2024-01-20 14:15:10',
    severity: 'medium',
    status: 'resolved'
  },
  {
    id: 'SEC-003',
    type: 'suspicious_activity',
    user: 'unknown',
    description: 'Unusual access pattern from IP 192.168.1.100',
    timestamp: '2024-01-20 13:45:33',
    severity: 'critical',
    status: 'active'
  }
];

export const SecuritySettingsDashboard: React.FC = () => {
  const [securityConfig, setSecurityConfig] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordHistoryCheck: 5,
    passwordExpiryDays: 90,
    maxLoginAttempts: 3,
    accountLockoutDuration: 30,
    sessionTimeout: 60,
    forcePasswordChangeOnFirstLogin: true,
    enableMFA: false,
    mfaRequired: false,
    enableAuditLogging: true,
    enableRealTimeMonitoring: true,
    enableFailedLoginNotifications: true,
    enablePermissionChangeNotifications: true,
    enableDataEncryption: true,
    encryptionLevel: 'AES-256',
    enableBackupEncryption: true,
    dataRetentionDays: 2555
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const updateConfig = (field: string, value: any) => {
    setSecurityConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving security configuration:', securityConfig);
    setHasChanges(false);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 finance-bg-animated p-6 rounded-lg">
      <div className="mb-4" data-aos="fade-down">
        <h1 className="finance-heading text-finance-accent">Security Settings</h1>
        <p className="text-muted-foreground">Configure security policies, monitoring, and access controls</p>
      </div>

      {/* Save Actions */}
      <Card className="p-4" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Changes to security settings will affect all users immediately upon saving.
            </AlertDescription>
          </Alert>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="finance-button-accent"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Security Settings
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {/* Password Policy */}
        <Card data-aos="fade-up" data-aos-delay="100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-finance-accent">
              <Lock className="w-5 h-5" />
              Password Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">
                Minimum Password Length: {securityConfig.passwordMinLength} characters
              </Label>
              <Slider
                value={[securityConfig.passwordMinLength]}
                onValueChange={(value) => updateConfig('passwordMinLength', value[0])}
                min={6}
                max={20}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>6</span>
                <span>8</span>
                <span>12</span>
                <span>16</span>
                <span>20</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.passwordRequireUppercase}
                  onCheckedChange={(checked) => updateConfig('passwordRequireUppercase', checked)}
                />
                <Label>Require uppercase letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.passwordRequireLowercase}
                  onCheckedChange={(checked) => updateConfig('passwordRequireLowercase', checked)}
                />
                <Label>Require lowercase letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.passwordRequireNumbers}
                  onCheckedChange={(checked) => updateConfig('passwordRequireNumbers', checked)}
                />
                <Label>Require numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.passwordRequireSpecialChars}
                  onCheckedChange={(checked) => updateConfig('passwordRequireSpecialChars', checked)}
                />
                <Label>Require special characters</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passwordHistory">Password History Check</Label>
                <Input
                  id="passwordHistory"
                  type="number"
                  value={securityConfig.passwordHistoryCheck}
                  onChange={(e) => updateConfig('passwordHistoryCheck', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Prevent reusing last N passwords</p>
              </div>
              <div>
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={securityConfig.passwordExpiryDays}
                  onChange={(e) => updateConfig('passwordExpiryDays', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">0 = never expires</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-finance-accent">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={securityConfig.maxLoginAttempts}
                  onChange={(e) => updateConfig('maxLoginAttempts', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lockoutDuration">Account Lockout Duration (minutes)</Label>
                <Input
                  id="lockoutDuration"
                  type="number"
                  value={securityConfig.accountLockoutDuration}
                  onChange={(e) => updateConfig('accountLockoutDuration', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securityConfig.sessionTimeout}
                  onChange={(e) => updateConfig('sessionTimeout', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit & Monitoring */}
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-finance-accent">
              <Eye className="w-5 h-5" />
              Audit & Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.enableAuditLogging}
                  onCheckedChange={(checked) => updateConfig('enableAuditLogging', checked)}
                />
                <Label>Enable audit logging</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.enableRealTimeMonitoring}
                  onCheckedChange={(checked) => updateConfig('enableRealTimeMonitoring', checked)}
                />
                <Label>Enable real-time security monitoring</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.enableFailedLoginNotifications}
                  onCheckedChange={(checked) => updateConfig('enableFailedLoginNotifications', checked)}
                />
                <Label>Send notifications for failed login attempts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={securityConfig.enablePermissionChangeNotifications}
                  onCheckedChange={(checked) => updateConfig('enablePermissionChangeNotifications', checked)}
                />
                <Label>Send notifications for permission changes</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card data-aos="fade-up" data-aos-delay="400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-finance-accent">
              <Database className="w-5 h-5" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={securityConfig.enableDataEncryption}
                    onCheckedChange={(checked) => updateConfig('enableDataEncryption', checked)}
                  />
                  <Label>Enable data encryption at rest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={securityConfig.enableBackupEncryption}
                    onCheckedChange={(checked) => updateConfig('enableBackupEncryption', checked)}
                  />
                  <Label>Enable backup encryption</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Encryption Level</Label>
                  <Select
                    value={securityConfig.encryptionLevel}
                    onValueChange={(value) => updateConfig('encryptionLevel', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="AES-256">AES-256</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={securityConfig.dataRetentionDays}
                    onChange={(e) => updateConfig('dataRetentionDays', parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Legal requirement: 7 years (2555 days)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card data-aos="fade-up" data-aos-delay="500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-finance-accent">
              <AlertTriangle className="w-5 h-5" />
              Recent Security Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSecurityEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell>{event.type.replace('_', ' ')}</TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.timestamp}</TableCell>
                    <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};