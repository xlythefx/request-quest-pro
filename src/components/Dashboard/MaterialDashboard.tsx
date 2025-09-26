import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Pending,
  CheckCircle,
  Cancel,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactElement;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
          {icon}
        </Avatar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {changeType === 'positive' ? (
            <TrendingUp color="success" fontSize="small" />
          ) : (
            <TrendingDown color="error" fontSize="small" />
          )}
          <Typography variant="body2" color={changeType === 'positive' ? 'success.main' : 'error.main'}>
            {change}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const recentRequests = [
  { id: 'REQ-001', requester: 'John Smith', amount: '$2,450.00', status: 'pending', date: '2024-01-15', description: 'Office supplies purchase' },
  { id: 'REQ-002', requester: 'Sarah Johnson', amount: '$8,900.00', status: 'approved', date: '2024-01-14', description: 'Software licensing' },
  { id: 'REQ-003', requester: 'Mike Wilson', amount: '$1,200.00', status: 'rejected', date: '2024-01-13', description: 'Travel expenses' },
  { id: 'REQ-004', requester: 'Emily Davis', amount: '$5,500.00', status: 'pending', date: '2024-01-12', description: 'Marketing campaign' }
];

export const MaterialDashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case 'employee':
        return [
          { title: 'My Requests', value: '8', change: '+12%', changeType: 'positive' as const, icon: <AttachMoney />, color: '#1976d2' },
          { title: 'Pending Approval', value: '3', change: '-5%', changeType: 'negative' as const, icon: <Pending />, color: '#ed6c02' },
          { title: 'Approved This Month', value: '12', change: '+8%', changeType: 'positive' as const, icon: <CheckCircle />, color: '#2e7d32' },
          { title: 'Total Amount', value: '$24,500', change: '+15%', changeType: 'positive' as const, icon: <AttachMoney />, color: '#9c27b0' }
        ];
      case 'finance_manager':
      case 'senior_management':
        return [
          { title: 'Pending Approvals', value: '12', change: '+5%', changeType: 'positive' as const, icon: <Pending />, color: '#ed6c02' },
          { title: 'Approved Today', value: '28', change: '+12%', changeType: 'positive' as const, icon: <CheckCircle />, color: '#2e7d32' },
          { title: 'Total Amount', value: '$156,800', change: '+8%', changeType: 'positive' as const, icon: <AttachMoney />, color: '#1976d2' },
          { title: 'Processing Time', value: '2.4 days', change: '-15%', changeType: 'positive' as const, icon: <TrendingUp />, color: '#9c27b0' }
        ];
      default:
        return [
          { title: 'Total Users', value: '124', change: '+8%', changeType: 'positive' as const, icon: <AttachMoney />, color: '#1976d2' },
          { title: 'System Uptime', value: '99.9%', change: '0%', changeType: 'positive' as const, icon: <TrendingUp />, color: '#2e7d32' },
          { title: 'Active Sessions', value: '47', change: '+12%', changeType: 'positive' as const, icon: <Pending />, color: '#ed6c02' },
          { title: 'Storage Used', value: '65%', change: '+5%', changeType: 'negative' as const, icon: <Cancel />, color: '#d32f2f' }
        ];
    }
  };

  const stats = getRoleSpecificStats();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your finance requests today.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Recent Payment Requests</Typography>
              <Button variant="outlined" size="small">View All</Button>
            </Box>
            <List disablePadding>
              {recentRequests.map((request, index) => (
                <React.Fragment key={request.id}>
                  <ListItem sx={{ px: 0 }} secondaryAction={<IconButton edge="end"><Visibility /></IconButton>}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {request.requester.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle2" fontWeight="bold">{request.description}</Typography>
                          <Chip label={request.status} color={getStatusColor(request.status) as any} size="small" variant="outlined" />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">{request.requester} • {request.amount}</Typography>
                          <Typography variant="caption" color="text.secondary">{request.date}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentRequests.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Quick Actions</Typography>
              <Stack spacing={2}>
                <Button variant="contained" fullWidth>Create New Request</Button>
                <Button variant="outlined" fullWidth>View My Requests</Button>
                {(user?.role === 'finance_manager' || user?.role === 'senior_management') && (
                  <Button variant="outlined" fullWidth>Approve Requests</Button>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Processing Status</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Average Processing Time</Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                <Typography variant="caption" color="text.secondary">2.4 days (Target: 3 days)</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>Approval Rate</Typography>
                <LinearProgress variant="determinate" value={85} color="success" sx={{ mb: 1 }} />
                <Typography variant="caption" color="text.secondary">85% approved this month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};