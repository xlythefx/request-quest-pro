import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ManagementDashboard } from '@/components/Dashboard/ManagementDashboard';

const ManagementPage = () => {
  return (
    <DashboardLayout userRole="manager">
      <ManagementDashboard />
    </DashboardLayout>
  );
};

export default ManagementPage;