import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import {
  Dashboard,
  AddCircle,
  Assignment,
  Approval,
  Analytics,
  People,
  Settings,
  Storage,
  Security,
  Build,
  ExpandLess,
  ExpandMore,
  AccountBalance,
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout
} from '@mui/icons-material';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  path?: string;
  roles: UserRole[];
  children?: MenuItem[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
    roles: ['employee', 'finance_manager', 'senior_management', 'system_admin']
  },
  {
    id: 'requests',
    label: 'Payment Requests',
    icon: <Assignment />,
    roles: ['employee', 'finance_manager', 'senior_management'],
    children: [
      {
        id: 'new-request',
        label: 'Create New Request',
        icon: <AddCircle />,
        path: '/new-request',
        roles: ['employee', 'finance_manager', 'senior_management']
      },
      {
        id: 'my-requests',
        label: 'My Requests',
        icon: <Assignment />,
        path: '/my-requests',
        roles: ['employee', 'finance_manager', 'senior_management']
      }
    ]
  },
  {
    id: 'approvals',
    label: 'Approve Requests',
    icon: <Approval />,
    path: '/approvals',
    roles: ['finance_manager', 'senior_management'],
    badge: '12'
  },
  {
    id: 'all-requests',
    label: 'View All Requests',
    icon: <Assignment />,
    path: '/all-requests',
    roles: ['finance_manager', 'senior_management']
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: <Analytics />,
    path: '/reports',
    roles: ['finance_manager', 'senior_management']
  },
  {
    id: 'management',
    label: 'Management',
    icon: <People />,
    roles: ['senior_management', 'system_admin'],
    children: [
      {
        id: 'user-management',
        label: 'User Management',
        icon: <People />,
        path: '/user-management',
        roles: ['senior_management', 'system_admin']
      },
      {
        id: 'system-config',
        label: 'System Configuration',
        icon: <Settings />,
        path: '/system-config',
        roles: ['senior_management', 'system_admin']
      },
      {
        id: 'advanced-analytics',
        label: 'Advanced Analytics',
        icon: <Analytics />,
        path: '/advanced-analytics',
        roles: ['senior_management']
      }
    ]
  },
  {
    id: 'admin',
    label: 'System Administration',
    icon: <Build />,
    roles: ['system_admin'],
    children: [
      {
        id: 'database',
        label: 'Database Management',
        icon: <Storage />,
        path: '/database',
        roles: ['system_admin']
      },
      {
        id: 'security',
        label: 'Security Settings',
        icon: <Security />,
        path: '/security',
        roles: ['system_admin']
      },
      {
        id: 'maintenance',
        label: 'System Maintenance',
        icon: <Build />,
        path: '/maintenance',
        roles: ['system_admin']
      }
    ]
  }
];

interface MaterialSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const MaterialSidebar: React.FC<MaterialSidebarProps> = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [expandedItems, setExpandedItems] = useState<string[]>(['requests', 'management', 'admin']);

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      if (!user || !item.roles.includes(user.role)) return false;
      if (item.children) {
        item.children = filterMenuItems(item.children);
        return item.children.length > 0;
      }
      return true;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountBalance />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#EAB308' }}>
              Feature Digital LTD
            </Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user.role.replace('_', ' ').toUpperCase()}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 1 }}>
          {filteredMenuItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleToggleExpand(item.id);
                    } else if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                  selected={item.path === location.pathname}
                  sx={{
                    borderRadius: 2,
                    minHeight: 48,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white'
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  {item.badge && (
                    <Chip 
                      label={item.badge} 
                      size="small" 
                      color="secondary"
                      sx={{ ml: 1, minWidth: 24, height: 24 }}
                    />
                  )}
                  {item.children && (
                    expandedItems.includes(item.id) ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse in={expandedItems.includes(item.id)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ ml: 2 }}>
                    {item.children.map((child) => (
                      <ListItem key={child.id} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                          onClick={() => child.path && handleNavigation(child.path)}
                          selected={child.path === location.pathname}
                          sx={{
                            borderRadius: 2,
                            pl: 4,
                            minHeight: 44,
                            '&.Mui-selected': {
                              bgcolor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'primary.dark',
                              },
                              '& .MuiListItemIcon-root': {
                                color: 'white'
                              }
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={child.label}
                            primaryTypographyProps={{ fontSize: '0.875rem' }}
                          />
                          {child.badge && (
                            <Chip 
                              label={child.badge} 
                              size="small" 
                              color="secondary"
                              sx={{ ml: 1, minWidth: 24, height: 20 }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.light',
              color: 'error.contrastText'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};