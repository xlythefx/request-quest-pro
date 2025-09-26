import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'employee' | 'manager' | 'admin';
}

export const DashboardLayout = ({ children, userRole = 'employee' }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <main className="lg:pl-64 transition-all duration-200">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};