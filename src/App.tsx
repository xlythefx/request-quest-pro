import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/Auth/LoginPage';
import { MaterialLayout } from './components/Layout/MaterialLayout';
import { MaterialDashboard } from './components/Dashboard/MaterialDashboard';
import { MaterialPaymentForm } from './components/Forms/MaterialPaymentForm';

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
        <Route path="/approvals" element={<div>Approvals Page</div>} />
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