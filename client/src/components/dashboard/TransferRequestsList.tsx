import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

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
    <div className="bg-background dark:bg-black border-0">
      <div className="flex justify-end mb-4">
        <a href="/transfers" className="text-purple-600 dark:text-purple-400 text-xs uppercase tracking-wider hover:underline">View All</a>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-white/10">
          {requests.map((request) => {
            const processed = processedRequests[request.id];
            
            if (processed) {
              return (
                <li key={request.id} className="py-4 border-gray-200 dark:border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className={`${processed.status === 'accepted' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {processed.status === 'accepted' ? 
                        <Check className="h-5 w-5" /> : 
                        <X className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {processed.status === 'accepted' ? 'Transfer accepted' : 'Transfer declined'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
              <li key={request.id} className="py-4 border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-purple-600 dark:text-purple-400">
                      {request.type === 'incoming' ? 
                        <ArrowRight className="h-5 w-5" /> : 
                        <ArrowLeft className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{request.itemName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {request.type === 'incoming' ? `From: ${request.fromParty}` : `To: ${request.toParty}`}
                      </p>
                    </div>
                  </div>
                  {request.status === 'pending' ? (
                    request.type === 'incoming' ? (
                      <div className="flex space-x-3">
                        <button 
                          className="btn-8vc-primary text-xs py-1 px-3"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn-8vc text-xs py-1 px-3"
                          onClick={() => handleDecline(request.id)}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span className="text-yellow-600 dark:text-yellow-400 text-xs uppercase tracking-wider">Pending</span>
                      </div>
                    )
                  ) : (
                    <div>
                      <span className={`text-xs uppercase tracking-wider ${
                        request.status === 'completed' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
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
