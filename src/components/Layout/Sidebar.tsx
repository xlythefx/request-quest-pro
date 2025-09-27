import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Menu, 
  X,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  userRole: 'employee' | 'manager' | 'admin';
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active: boolean;
  badge?: string;
}

export const Sidebar = ({ userRole }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const employeeMenuItems: MenuItem[] = [
    { icon: PlusCircle, label: 'New Request', href: '/new-request', active: false },
    { icon: FileText, label: 'My Requests', href: '/my-requests', active: false },
    { icon: Clock, label: 'Pending', href: '/pending', active: false, badge: '3' },
  ];

  const managerMenuItems: MenuItem[] = [
    { icon: CheckCircle2, label: 'Approvals', href: '/approvals', active: true, badge: '12' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics', active: false },
    { icon: FileText, label: 'All Requests', href: '/all-requests', active: false },
    { icon: AlertCircle, label: 'Escalations', href: '/escalations', active: false, badge: '2' },
  ];

  const adminMenuItems: MenuItem[] = [
    { icon: Users, label: 'User Management', href: '/users', active: false },
    { icon: Settings, label: 'System Settings', href: '/settings', active: false },
    { icon: BarChart3, label: 'Reports', href: '/reports', active: false },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'manager':
      case 'admin':
        return [...managerMenuItems, ...adminMenuItems];
      default:
        return employeeMenuItems;
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg finance-gradient flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sm text-yellow-600">Feature Digital LTD</h1>
                <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {getMenuItems().map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start h-11 transition-all duration-300 hover:bg-yellow-50 hover:border-yellow-200 hover:shadow-md hover:scale-105 group"
              >
                <item.icon className="h-5 w-5 mr-3 transition-all duration-300 group-hover:text-yellow-600 group-hover:scale-110" />
                <span className="flex-1 text-left transition-all duration-300 group-hover:text-yellow-700">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.active ? "secondary" : "default"} className="ml-auto transition-all duration-300 group-hover:bg-yellow-100 group-hover:text-yellow-800">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-finance-accent flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};