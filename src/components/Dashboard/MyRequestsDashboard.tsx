import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Eye, Edit, Send, Paperclip, Download } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface PaymentRequest {
  id: string;
  vendorName: string;
  amount: number;
  currency: string;
  category: string;
  priority: 'low' | 'high' | 'highest';
  submittedDate?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  description: string;
  documents: string[];
  lastModified: string;
}

const mockRequests: PaymentRequest[] = [
  {
    id: 'REQ-001',
    vendorName: 'ABC Supplies Ltd',
    amount: 5500,
    currency: 'USD',
    category: 'Office Supplies',
    priority: 'high',
    submittedDate: '2024-01-15',
    status: 'pending',
    description: 'Monthly office supplies procurement for Q1 operations',
    documents: ['invoice.pdf', 'purchase_order.pdf'],
    lastModified: '2024-01-15'
  },
  {
    id: 'DRAFT-001',
    vendorName: 'Tech Solutions Inc',
    amount: 12000,
    currency: 'USD',
    category: 'Software License',
    priority: 'highest',
    status: 'draft',
    description: 'Annual software license renewal for development tools',
    documents: ['quote.pdf'],
    lastModified: '2024-01-16'
  },
  {
    id: 'REQ-002',
    vendorName: 'Travel Agency Pro',
    amount: 2800,
    currency: 'USD',
    category: 'Travel',
    priority: 'high',
    submittedDate: '2024-01-10',
    status: 'approved',
    description: 'Business trip to client site for project kickoff',
    documents: ['itinerary.pdf', 'hotel_booking.pdf'],
    lastModified: '2024-01-10'
  }
];

export const MyRequestsDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('submitted');
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const filteredRequests = mockRequests.filter(req => {
    if (currentTab === 'submitted') return req.status !== 'draft';
    return req.status === 'draft';
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'destructive';
      case 'high': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-finance-accent/10 text-finance-accent border-finance-accent/20">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmitDraft = (requestId: string) => {
    console.log('Submitting draft:', requestId);
  };

  const handleEditDraft = (requestId: string) => {
    console.log('Editing draft:', requestId);
  };

  return (
    <div className="space-y-6 finance-bg-animated p-6 rounded-lg">
      <div className="mb-4" data-aos="fade-down">
        <h1 className="finance-heading text-finance-accent">My Requests</h1>
        <p className="text-muted-foreground">View and manage your payment requests and drafts</p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} data-aos="fade-up">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submitted">
            Submitted Requests ({mockRequests.filter(r => r.status !== 'draft').length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Draft Requests ({mockRequests.filter(r => r.status === 'draft').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab} className="mt-6">
          <Card data-aos="fade-up" data-aos-delay="200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.vendorName}</TableCell>
                    <TableCell className="font-medium">
                      {request.currency} {request.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(request.priority)}>
                        {request.priority.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {new Date(request.lastModified).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Request Details - {selectedRequest?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-finance-accent mb-3">Basic Information</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Vendor:</span>
                                      <span className="font-medium">{selectedRequest.vendorName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Amount:</span>
                                      <span className="font-medium">
                                        {selectedRequest.currency} {selectedRequest.amount.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Category:</span>
                                      <span>{selectedRequest.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Priority:</span>
                                      <Badge variant={getPriorityColor(selectedRequest.priority)}>
                                        {selectedRequest.priority.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Status:</span>
                                      {getStatusBadge(selectedRequest.status)}
                                    </div>
                                    {selectedRequest.submittedDate && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Submitted:</span>
                                        <span>{new Date(selectedRequest.submittedDate).toLocaleDateString()}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <Separator />

                                <div>
                                  <h3 className="text-lg font-semibold text-finance-accent mb-3">Description</h3>
                                  <p className="text-muted-foreground">{selectedRequest.description}</p>
                                </div>

                                <Separator />

                                <div>
                                  <h3 className="text-lg font-semibold text-finance-accent mb-3">Attachments</h3>
                                  {selectedRequest.documents.length > 0 ? (
                                    <div className="space-y-2">
                                      {selectedRequest.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                          <div className="flex items-center gap-2">
                                            <Paperclip className="w-4 h-4" />
                                            <span>{doc}</span>
                                          </div>
                                          <Button size="sm" variant="ghost">
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-muted-foreground">No attachments</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {request.status === 'draft' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditDraft(request.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="finance-button-accent"
                              onClick={() => handleSubmitDraft(request.id)}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredRequests.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {currentTab === 'submitted' ? 'No submitted requests found' : 'No draft requests found'}
                </h3>
                <p className="text-muted-foreground">
                  {currentTab === 'submitted' 
                    ? 'You haven\'t submitted any payment requests yet.' 
                    : 'You don\'t have any draft requests saved.'}
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};