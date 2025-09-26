import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/Auth/LoginPage';
import { MaterialLayout } from './components/Layout/MaterialLayout';
import { MaterialDashboard } from './components/Dashboard/MaterialDashboard';
import { MaterialPaymentForm } from './components/Forms/MaterialPaymentForm';
import { ApprovalsDashboard } from './components/Dashboard/ApprovalsDashboard';
import { AllRequestsDashboard } from './components/Dashboard/AllRequestsDashboard';
import { ReportsDashboard } from './components/Dashboard/ReportsDashboard';
import { UserManagementDashboard } from './components/Dashboard/UserManagementDashboard';
import { SystemConfigDashboard } from './components/Dashboard/SystemConfigDashboard';
import { AdvancedAnalyticsDashboard } from './components/Dashboard/AdvancedAnalyticsDashboard';
import { DatabaseManagementDashboard } from './components/Dashboard/DatabaseManagementDashboard';
import { SecuritySettingsDashboard } from './components/Dashboard/SecuritySettingsDashboard';
import { SystemMaintenanceDashboard } from './components/Dashboard/SystemMaintenanceDashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <MaterialLayout>
      <Routes>
        <Route path="/dashboard" element={<MaterialDashboard />} />
        <Route path="/new-request" element={<MaterialPaymentForm />} />
        <Route path="/my-requests" element={<div>My Requests Page</div>} />
        <Route path="/approvals" element={<ApprovalsDashboard />} />
        <Route path="/all-requests" element={<AllRequestsDashboard />} />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/user-management" element={<UserManagementDashboard />} />
        <Route path="/system-config" element={<SystemConfigDashboard />} />
        <Route path="/advanced-analytics" element={<AdvancedAnalyticsDashboard />} />
        <Route path="/database" element={<DatabaseManagementDashboard />} />
        <Route path="/security" element={<SecuritySettingsDashboard />} />
        <Route path="/maintenance" element={<SystemMaintenanceDashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MaterialLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;