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
  Chip,
  Paper
} from '@mui/material';
import {
  Save,
  Restore,
  Security,
  Notifications,
  Business,
  Payment,
  Settings
} from '@mui/icons-material';

interface SystemConfig {
  // General Settings
  companyName: string;
  timezone: string;
  currency: string;
  fiscalYearStart: string;
  
  // Payment Settings
  autoApprovalLimit: number;
  requireDualApproval: boolean;
  allowSelfApproval: boolean;
  paymentCategories: string[];
  
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  approvalReminders: boolean;
  reminderFrequency: number;
  
  // Security Settings
  sessionTimeout: number;
  passwordComplexity: boolean;
  twoFactorAuth: boolean;
  auditLogging: boolean;
  
  // Workflow Settings
  maxApprovalLevels: number;
  escalationTimeout: number;
  holidayCalendar: boolean;
  workingDays: string[];
}

const defaultConfig: SystemConfig = {
  companyName: 'Your Company Inc.',
  timezone: 'UTC-05:00',
  currency: 'USD',
  fiscalYearStart: 'January',
  
  autoApprovalLimit: 1000,
  requireDualApproval: true,
  allowSelfApproval: false,
  paymentCategories: ['Office Supplies', 'Software Licenses', 'Travel', 'Equipment', 'Marketing'],
  
  emailNotifications: true,
  smsNotifications: false,
  approvalReminders: true,
  reminderFrequency: 24,
  
  sessionTimeout: 30,
  passwordComplexity: true,
  twoFactorAuth: false,
  auditLogging: true,
  
  maxApprovalLevels: 3,
  escalationTimeout: 72,
  holidayCalendar: true,
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
};

const timezones = [
  'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00',
  'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00',
  'UTC-02:00', 'UTC-01:00', 'UTC+00:00', 'UTC+01:00', 'UTC+02:00',
  'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00',
  'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00'
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SystemConfigDashboard: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (field: keyof SystemConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving configuration:', config);
    setHasChanges(false);
    // Show success message
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setHasChanges(false);
  };

  const addCategory = () => {
    const newCategory = prompt('Enter new payment category:');
    if (newCategory && !config.paymentCategories.includes(newCategory)) {
      updateConfig('paymentCategories', [...config.paymentCategories, newCategory]);
    }
  };

  const removeCategory = (category: string) => {
    updateConfig('paymentCategories', config.paymentCategories.filter(c => c !== category));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        System Configuration
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure system-wide settings and preferences
      </Typography>

      {/* Save Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<Restore />}
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset to Default
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>

      <Stack spacing={3}>
        {/* General Settings */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Business color="primary" />
              <Typography variant="h6" fontWeight={600}>
                General Settings
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <TextField
                label="Company Name"
                value={config.companyName}
                onChange={(e) => updateConfig('companyName', e.target.value)}
                fullWidth
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={config.timezone}
                    label="Timezone"
                    onChange={(e) => updateConfig('timezone', e.target.value)}
                  >
                    {timezones.map(tz => (
                      <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Default Currency</InputLabel>
                  <Select
                    value={config.currency}
                    label="Default Currency"
                    onChange={(e) => updateConfig('currency', e.target.value)}
                  >
                    {currencies.map(curr => (
                      <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Fiscal Year Start</InputLabel>
                  <Select
                    value={config.fiscalYearStart}
                    label="Fiscal Year Start"
                    onChange={(e) => updateConfig('fiscalYearStart', e.target.value)}
                  >
                    {months.map(month => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Payment color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Payment Settings
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box>
                <Typography gutterBottom>
                  Auto-Approval Limit: ${config.autoApprovalLimit.toLocaleString()}
                </Typography>
                <Slider
                  value={config.autoApprovalLimit}
                  onChange={(_, value) => updateConfig('autoApprovalLimit', value)}
                  min={0}
                  max={10000}
                  step={100}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 2500, label: '$2.5K' },
                    { value: 5000, label: '$5K' },
                    { value: 7500, label: '$7.5K' },
                    { value: 10000, label: '$10K' }
                  ]}
                />
              </Box>

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.requireDualApproval}
                      onChange={(e) => updateConfig('requireDualApproval', e.target.checked)}
                    />
                  }
                  label="Require dual approval for high-value payments"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.allowSelfApproval}
                      onChange={(e) => updateConfig('allowSelfApproval', e.target.checked)}
                    />
                  }
                  label="Allow managers to approve their own requests"
                />
              </Stack>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Categories
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  {config.paymentCategories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onDelete={() => removeCategory(category)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
                <Button size="small" onClick={addCategory}>
                  Add Category
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Notifications color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Notification Settings
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.emailNotifications}
                      onChange={(e) => updateConfig('emailNotifications', e.target.checked)}
                    />
                  }
                  label="Enable email notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.approvalReminders}
                      onChange={(e) => updateConfig('approvalReminders', e.target.checked)}
                    />
                  }
                  label="Send approval reminders"
                />
              </Stack>

              <TextField
                label="Reminder Frequency (hours)"
                type="number"
                value={config.reminderFrequency}
                onChange={(e) => updateConfig('reminderFrequency', parseInt(e.target.value))}
                sx={{ maxWidth: 200 }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Security color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Security Settings
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <TextField
                label="Session Timeout (minutes)"
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => updateConfig('sessionTimeout', parseInt(e.target.value))}
                sx={{ maxWidth: 200 }}
              />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.passwordComplexity}
                      onChange={(e) => updateConfig('passwordComplexity', e.target.checked)}
                    />
                  }
                  label="Enforce password complexity requirements"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.twoFactorAuth}
                      onChange={(e) => updateConfig('twoFactorAuth', e.target.checked)}
                    />
                  }
                  label="Enable two-factor authentication"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.auditLogging}
                      onChange={(e) => updateConfig('auditLogging', e.target.checked)}
                    />
                  }
                  label="Enable audit logging within web app"
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Workflow Settings */}
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Settings color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Workflow Settings
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Maximum Approval Levels"
                  type="number"
                  value={config.maxApprovalLevels}
                  onChange={(e) => updateConfig('maxApprovalLevels', parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 5 }}
                  sx={{ maxWidth: 200 }}
                />

                <TextField
                  label="Escalation Timeout (hours)"
                  type="number"
                  value={config.escalationTimeout}
                  onChange={(e) => updateConfig('escalationTimeout', parseInt(e.target.value))}
                  sx={{ maxWidth: 200 }}
                />
              </Stack>

              <FormControlLabel
                control={
                  <Switch
                    checked={config.holidayCalendar}
                    onChange={(e) => updateConfig('holidayCalendar', e.target.checked)}
                  />
                }
                label="Enable holiday calendar integration"
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};