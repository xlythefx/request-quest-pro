import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  RotateCcw, 
  Settings, 
  Bell, 
  Building2, 
  CreditCard,
  Shield,
  Workflow,
  Trash2
} from 'lucide-react';
import AOS from 'aos';

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
  companyName: 'Feature Digital LTD',
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const updateConfig = (field: keyof SystemConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving configuration:', config);
    setHasChanges(false);
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
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">System Configuration</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>

        {/* Save Actions */}
        <Card data-aos="fade-up" data-aos-delay="100">
          <CardContent className="p-6">
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!hasChanges}
                className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="finance-button-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Building2 className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Company information and basic configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={config.companyName}
                  onChange={(e) => updateConfig('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={config.timezone} onValueChange={(value) => updateConfig('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={config.currency} onValueChange={(value) => updateConfig('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(curr => (
                      <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                <Select value={config.fiscalYearStart} onValueChange={(value) => updateConfig('fiscalYearStart', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <CreditCard className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Configure payment approval limits and categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">
                  Auto-Approval Limit: ${config.autoApprovalLimit.toLocaleString()}
                </Label>
                <Slider
                  value={[config.autoApprovalLimit]}
                  onValueChange={(value) => updateConfig('autoApprovalLimit', value[0])}
                  max={10000}
                  step={100}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$0</span>
                  <span>$2.5K</span>
                  <span>$5K</span>
                  <span>$7.5K</span>
                  <span>$10K</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dualApproval">Require dual approval for high-value payments</Label>
                  <Switch
                    id="dualApproval"
                    checked={config.requireDualApproval}
                    onCheckedChange={(checked) => updateConfig('requireDualApproval', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="selfApproval">Allow managers to approve their own requests</Label>
                  <Switch
                    id="selfApproval"
                    checked={config.allowSelfApproval}
                    onCheckedChange={(checked) => updateConfig('allowSelfApproval', checked)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Payment Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {config.paymentCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {category}
                      <button
                        onClick={() => removeCategory(category)}
                        className="ml-1 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addCategory}>
                  Add Category
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card data-aos="fade-up" data-aos-delay="400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure notification preferences and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotif">Enable email notifications</Label>
                <Switch
                  id="emailNotif"
                  checked={config.emailNotifications}
                  onCheckedChange={(checked) => updateConfig('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="approvalReminders">Send approval reminders</Label>
                <Switch
                  id="approvalReminders"
                  checked={config.approvalReminders}
                  onCheckedChange={(checked) => updateConfig('approvalReminders', checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderFreq">Reminder Frequency (hours)</Label>
              <Input
                id="reminderFreq"
                type="number"
                value={config.reminderFrequency}
                onChange={(e) => updateConfig('reminderFrequency', parseInt(e.target.value))}
                className="max-w-48"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card data-aos="fade-up" data-aos-delay="500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Configure security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => updateConfig('sessionTimeout', parseInt(e.target.value))}
                className="max-w-48"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="passwordComplexity">Enforce password complexity requirements</Label>
                <Switch
                  id="passwordComplexity"
                  checked={config.passwordComplexity}
                  onCheckedChange={(checked) => updateConfig('passwordComplexity', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor">Enable two-factor authentication</Label>
                <Switch
                  id="twoFactor"
                  checked={config.twoFactorAuth}
                  onCheckedChange={(checked) => updateConfig('twoFactorAuth', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auditLogging">Enable audit logging</Label>
                <Switch
                  id="auditLogging"
                  checked={config.auditLogging}
                  onCheckedChange={(checked) => updateConfig('auditLogging', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Settings */}
        <Card data-aos="fade-up" data-aos-delay="600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Workflow className="h-5 w-5" />
              Workflow Settings
            </CardTitle>
            <CardDescription>Configure approval workflows and escalation rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxApprovalLevels">Maximum Approval Levels</Label>
                <Input
                  id="maxApprovalLevels"
                  type="number"
                  min="1"
                  max="5"
                  value={config.maxApprovalLevels}
                  onChange={(e) => updateConfig('maxApprovalLevels', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="escalationTimeout">Escalation Timeout (hours)</Label>
                <Input
                  id="escalationTimeout"
                  type="number"
                  value={config.escalationTimeout}
                  onChange={(e) => updateConfig('escalationTimeout', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="holidayCalendar">Enable holiday calendar integration</Label>
              <Switch
                id="holidayCalendar"
                checked={config.holidayCalendar}
                onCheckedChange={(checked) => updateConfig('holidayCalendar', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};