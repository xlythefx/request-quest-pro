import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  Security,
  Lock,
  Shield,
  Warning,
  Save,
  VpnKey,
  AccountBalance,
  Visibility
} from '@mui/icons-material';

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
    // Password Policy
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordHistoryCheck: 5,
    passwordExpiryDays: 90,
    
    // Account Security
    maxLoginAttempts: 3,
    accountLockoutDuration: 30,
    sessionTimeout: 60,
    forcePasswordChangeOnFirstLogin: true,
    
    // Multi-Factor Authentication
    enableMFA: false,
    mfaRequired: false,
    mfaMethods: ['email', 'sms'],
    
    // Audit & Monitoring
    enableAuditLogging: true,
    enableRealTimeMonitoring: true,
    enableFailedLoginNotifications: true,
    enablePermissionChangeNotifications: true,
    
    // IP & Access Control
    enableIPWhitelisting: false,
    allowedIPs: [],
    enableGeoBlocking: false,
    blockedCountries: [],
    
    // Data Protection
    enableDataEncryption: true,
    encryptionLevel: 'AES-256',
    enableBackupEncryption: true,
    dataRetentionDays: 2555 // 7 years
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (field: string, value: any) => {
    setSecurityConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving security configuration:', securityConfig);
    setHasChanges(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'error';
      case 'investigating': return 'warning';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Security Settings
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure security policies, monitoring, and access controls
      </Typography>

      {/* Save Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Alert severity="info" sx={{ flex: 1 }}>
            Changes to security settings will affect all users immediately upon saving.
          </Alert>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Security Settings
          </Button>
        </Stack>
      </Paper>

      <Stack spacing={3}>
        {/* Password Policy */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Lock color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Password Policy
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box>
                <Typography gutterBottom>
                  Minimum Password Length: {securityConfig.passwordMinLength} characters
                </Typography>
                <Slider
                  value={securityConfig.passwordMinLength}
                  onChange={(_, value) => updateConfig('passwordMinLength', value)}
                  min={6}
                  max={20}
                  step={1}
                  marks={[
                    { value: 6, label: '6' },
                    { value: 8, label: '8' },
                    { value: 12, label: '12' },
                    { value: 16, label: '16' },
                    { value: 20, label: '20' }
                  ]}
                />
              </Box>

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.passwordRequireUppercase}
                      onChange={(e) => updateConfig('passwordRequireUppercase', e.target.checked)}
                    />
                  }
                  label="Require uppercase letters"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.passwordRequireLowercase}
                      onChange={(e) => updateConfig('passwordRequireLowercase', e.target.checked)}
                    />
                  }
                  label="Require lowercase letters"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.passwordRequireNumbers}
                      onChange={(e) => updateConfig('passwordRequireNumbers', e.target.checked)}
                    />
                  }
                  label="Require numbers"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.passwordRequireSpecialChars}
                      onChange={(e) => updateConfig('passwordRequireSpecialChars', e.target.checked)}
                    />
                  }
                  label="Require special characters"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.forcePasswordChangeOnFirstLogin}
                      onChange={(e) => updateConfig('forcePasswordChangeOnFirstLogin', e.target.checked)}
                    />
                  }
                  label="Force password change on first login"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Password History Check"
                  type="number"
                  value={securityConfig.passwordHistoryCheck}
                  onChange={(e) => updateConfig('passwordHistoryCheck', parseInt(e.target.value))}
                  helperText="Prevent reusing last N passwords"
                  sx={{ maxWidth: 200 }}
                />
                <TextField
                  label="Password Expiry (days)"
                  type="number"
                  value={securityConfig.passwordExpiryDays}
                  onChange={(e) => updateConfig('passwordExpiryDays', parseInt(e.target.value))}
                  helperText="0 = never expires"
                  sx={{ maxWidth: 200 }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Shield color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Account Security
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Max Login Attempts"
                  type="number"
                  value={securityConfig.maxLoginAttempts}
                  onChange={(e) => updateConfig('maxLoginAttempts', parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 10 }}
                  sx={{ maxWidth: 200 }}
                />
                <TextField
                  label="Account Lockout Duration (minutes)"
                  type="number"
                  value={securityConfig.accountLockoutDuration}
                  onChange={(e) => updateConfig('accountLockoutDuration', parseInt(e.target.value))}
                  sx={{ maxWidth: 250 }}
                />
                <TextField
                  label="Session Timeout (minutes)"
                  type="number"
                  value={securityConfig.sessionTimeout}
                  onChange={(e) => updateConfig('sessionTimeout', parseInt(e.target.value))}
                  sx={{ maxWidth: 200 }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Multi-Factor Authentication */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <VpnKey color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Multi-Factor Authentication
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.enableMFA}
                      onChange={(e) => updateConfig('enableMFA', e.target.checked)}
                    />
                  }
                  label="Enable Multi-Factor Authentication"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.mfaRequired}
                      onChange={(e) => updateConfig('mfaRequired', e.target.checked)}
                      disabled={!securityConfig.enableMFA}
                    />
                  }
                  label="Require MFA for all users"
                />
              </Stack>

              {securityConfig.enableMFA && (
                <Alert severity="warning">
                  MFA setup will be required for all users on their next login.
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Audit & Monitoring */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Visibility color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Audit & Monitoring
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={securityConfig.enableAuditLogging}
                    onChange={(e) => updateConfig('enableAuditLogging', e.target.checked)}
                  />
                }
                label="Enable audit logging"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securityConfig.enableRealTimeMonitoring}
                    onChange={(e) => updateConfig('enableRealTimeMonitoring', e.target.checked)}
                  />
                }
                label="Enable real-time security monitoring"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securityConfig.enableFailedLoginNotifications}
                    onChange={(e) => updateConfig('enableFailedLoginNotifications', e.target.checked)}
                  />
                }
                label="Send notifications for failed login attempts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securityConfig.enablePermissionChangeNotifications}
                    onChange={(e) => updateConfig('enablePermissionChangeNotifications', e.target.checked)}
                  />
                }
                label="Send notifications for permission changes"
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <AccountBalance color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Data Protection
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.enableDataEncryption}
                      onChange={(e) => updateConfig('enableDataEncryption', e.target.checked)}
                    />
                  }
                  label="Enable data encryption at rest"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securityConfig.enableBackupEncryption}
                      onChange={(e) => updateConfig('enableBackupEncryption', e.target.checked)}
                    />
                  }
                  label="Enable backup encryption"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Encryption Level</InputLabel>
                  <Select
                    value={securityConfig.encryptionLevel}
                    label="Encryption Level"
                    onChange={(e) => updateConfig('encryptionLevel', e.target.value)}
                  >
                    <MenuItem value="AES-128">AES-128</MenuItem>
                    <MenuItem value="AES-256">AES-256</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Data Retention (days)"
                  type="number"
                  value={securityConfig.dataRetentionDays}
                  onChange={(e) => updateConfig('dataRetentionDays', parseInt(e.target.value))}
                  helperText="Legal requirement: 7 years (2555 days)"
                  sx={{ maxWidth: 250 }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Warning color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Recent Security Events
              </Typography>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Event ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockSecurityEvents.map((event) => (
                    <TableRow key={event.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {event.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {event.type.replace('_', ' ').toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{event.user}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{event.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{event.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={event.severity.toUpperCase()} 
                          color={getSeverityColor(event.severity) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={event.status.toUpperCase()} 
                          color={getStatusColor(event.status) as any}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};