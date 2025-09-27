import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Users, 
  Shield, 
  Building2,
  Mail,
  Phone
} from 'lucide-react';
import AOS from 'aos';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'finance_manager' | 'senior_management' | 'system_admin';
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdDate: string;
}

const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee',
    department: 'Operations',
    status: 'active',
    lastLogin: '2024-01-20',
    createdDate: '2023-05-15'
  },
  {
    id: 'USR-002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'finance_manager',
    department: 'Finance',
    status: 'active',
    lastLogin: '2024-01-19',
    createdDate: '2023-03-10'
  },
  {
    id: 'USR-003',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'employee',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-18',
    createdDate: '2023-07-22'
  },
  {
    id: 'USR-004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'senior_management',
    department: 'Executive',
    status: 'active',
    lastLogin: '2024-01-20',
    createdDate: '2023-01-05'
  },
  {
    id: 'USR-005',
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'employee',
    department: 'Marketing',
    status: 'inactive',
    lastLogin: '2024-01-10',
    createdDate: '2023-09-12'
  }
];

const departments = ['Operations', 'Finance', 'Sales', 'Marketing', 'IT', 'HR', 'Executive'];

export const UserManagementDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'suspended': return 'destructive';
      default: return 'outline';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'system_admin': return 'destructive';
      case 'senior_management': return 'default';
      case 'finance_manager': return 'blue';
      case 'employee': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'system_admin': return 'System Admin';
      case 'senior_management': return 'Senior Management';
      case 'finance_manager': return 'Finance Manager';
      case 'employee': return 'Employee';
      default: return role;
    }
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as User['status'] }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesRole && matchesDepartment && matchesStatus;
  });

  return (
    <div className="min-h-screen finance-bg-animated">
      <div className="p-6 space-y-6">
        <div data-aos="fade-down">
          <h1 className="finance-heading text-yellow-600">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {users.filter(u => u.role === 'finance_manager').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Finance Managers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {departments.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {users.filter(u => u.status === 'inactive').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Inactive Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header Actions & Filters */}
        <Card data-aos="fade-up" data-aos-delay="200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="finance_manager">Finance Manager</SelectItem>
                    <SelectItem value="senior_management">Senior Management</SelectItem>
                    <SelectItem value="system_admin">System Admin</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="finance-button-primary">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardHeader>
            <CardTitle className="text-yellow-600">User Accounts</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-yellow-50/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-yellow-100 text-yellow-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role) as any}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{user.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(user.status) as any}>
                          {user.status.toUpperCase()}
                        </Badge>
                        <Switch
                          checked={user.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(user.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(user.createdDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                          <Edit className="h-4 w-4" />
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
  );
};