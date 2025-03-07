import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface TransferRequest {
  id: number;
  itemName: string;
  fromParty: string;
  toParty: string;
  status: string;
  type: 'incoming' | 'outgoing';
}

interface TransferRequestsListProps {
  requests: TransferRequest[];
  onAccept?: (id: number) => void;
  onDecline?: (id: number) => void;
}

export default function TransferRequestsList({ requests, onAccept, onDecline }: TransferRequestsListProps) {
  const [processedRequests, setProcessedRequests] = useState<Record<number, { status: string, message: string }>>({});
  const { toast } = useToast();

  const handleAccept = async (id: number) => {
    try {
      await apiRequest("PATCH", `/api/transfers/${id}/status`, { status: "accepted" });
      setProcessedRequests(prev => ({
        ...prev,
        [id]: {
          status: "accepted",
          message: "Transfer accepted successfully"
        }
      }));
      if (onAccept) onAccept(id);
      toast({
        title: "Transfer Accepted",
        description: "The item has been added to your inventory",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept transfer request",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await apiRequest("PATCH", `/api/transfers/${id}/status`, { status: "declined" });
      setProcessedRequests(prev => ({
        ...prev,
        [id]: {
          status: "declined",
          message: "Transfer declined"
        }
      }));
      if (onDecline) onDecline(id);
      toast({
        title: "Transfer Declined",
        description: "The sender has been notified",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline transfer request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border shadow-sm">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 font-display">Recent Transfer Requests</h2>
          <a href="/transfers" className="text-primary text-sm hover:underline">View All</a>
        </div>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => {
            const processed = processedRequests[request.id];
            
            if (processed) {
              return (
                <li key={request.id} className={`p-4 ${processed.status === 'accepted' ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`${processed.status === 'accepted' ? 'bg-green-100 p-2' : 'bg-red-100 p-2'}`}>
                      <i className={`${processed.status === 'accepted' ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'}`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {processed.status === 'accepted' ? 'Transfer accepted' : 'Transfer declined'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {processed.status === 'accepted' 
                          ? 'The item has been added to your inventory' 
                          : 'The sender has been notified'}
                      </p>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={request.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-50 p-2">
                      <i className={`fas fa-arrow-${request.type === 'incoming' ? 'right' : 'left'} text-primary`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{request.itemName}</p>
                      <p className="text-xs text-gray-500">
                        {request.type === 'incoming' ? `From: ${request.fromParty}` : `To: ${request.toParty}`}
                      </p>
                    </div>
                  </div>
                  {request.status === 'pending' ? (
                    request.type === 'incoming' ? (
                      <div className="flex space-x-2">
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs font-display action-button"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </button>
                        <button 
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 text-xs font-display action-button"
                          onClick={() => handleDecline(request.id)}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span className="bg-yellow-100 text-yellow-500 px-2 py-1 text-xs status-tag">Pending</span>
                      </div>
                    )
                  ) : (
                    <div>
                      <span className={`${
                        request.status === 'completed' 
                          ? 'bg-green-100 text-green-500' 
                          : 'bg-gray-100 text-gray-500'
                      } px-2 py-1 text-xs status-tag`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
