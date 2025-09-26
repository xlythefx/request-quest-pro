import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { EmployeeDashboard } from '@/components/Dashboard/EmployeeDashboard';

const EmployeePage = () => {
  return (
    <DashboardLayout userRole="employee">
      <EmployeeDashboard />
    </DashboardLayout>
  );
};

export default EmployeePage;