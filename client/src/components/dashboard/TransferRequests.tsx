import React from 'react';
import { mockTransferRequests } from '@/lib/mockData';

interface TransferRequestProps {
  request: {
    id: string;
    type: string;
    from: string;
    to: string;
    contents: string;
    scheduled: string;
    status: string;
  }
}

const TransferRequestItem: React.FC<TransferRequestProps> = ({ request }) => {
  const getTypeBadge = () => {
    if (request.type === 'incoming') {
      return <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Incoming</span>;
    } else {
      return <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Outgoing</span>;
    }
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <p className="text-sm font-medium">
              {request.type === 'incoming' ? 'Incoming' : 'Outgoing'} Transfer #{request.id}
            </p>
            {getTypeBadge()}
          </div>
          {request.from && <p className="text-xs text-gray-500 mt-1">From: {request.from}</p>}
          {request.to && <p className="text-xs text-gray-500 mt-1">To: {request.to}</p>}
          <p className="text-xs text-gray-500">Contents: {request.contents}</p>
          <p className="text-xs text-gray-500">
            {request.type === 'incoming' ? 'Scheduled' : 'Requested'}: {request.scheduled}
          </p>
        </div>
        <div className="flex">
          {request.status === 'pending' ? (
            <>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mr-2">
                Accept
              </button>
              <button className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                Decline
              </button>
            </>
          ) : (
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              Pending Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TransferRequests: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="font-semibold text-lg">Transfer Requests</h2>
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {mockTransferRequests.length} pending
          </span>
        </div>
        <a href="#" className="text-primary text-sm">View All</a>
      </div>
      <div className="divide-y divide-gray-100">
        {mockTransferRequests.map(request => (
          <TransferRequestItem key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default TransferRequests;
