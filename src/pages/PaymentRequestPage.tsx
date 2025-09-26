import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { PaymentRequestForm } from '@/components/Forms/PaymentRequestForm';

const PaymentRequestPage = () => {
  return (
    <DashboardLayout userRole="employee">
      <PaymentRequestForm />
    </DashboardLayout>
  );
};

export default PaymentRequestPage;