import { format, formatDistanceToNow } from 'date-fns';

interface Activity {
  id: number;
  description: string;
  details: string;
  timestamp: Date;
  blockchainVerified: boolean;
  type: 'contract' | 'receipt' | 'transfer' | 'inventory';
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Recent Activity</h2>
          <a href="/transaction-history" className="text-primary text-sm hover:underline">View All</a>
        </div>
      </div>
      <div className="p-5">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-0.5 bg-gray-200 left-1.5"></div>
          
          {/* Activity items */}
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-8">
                <div className="absolute left-0 rounded-full bg-white border-2 border-primary w-3.5 h-3.5"></div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                    <span className="text-xs text-gray-500" title={format(activity.timestamp, 'PPpp')}>
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                  {activity.blockchainVerified && (
                    <div className="flex items-center mt-2">
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Verified on blockchain
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
