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
    <div>
      <div className="flex justify-end mb-2">
        <a href="/transaction-history" className="text-purple-600 dark:text-purple-400 text-xs uppercase tracking-wider hover:underline">View All</a>
      </div>
      <div className="p-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-0.5 bg-gray-200 dark:bg-gray-700 left-1.5"></div>
          
          {/* Activity items */}
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-8">
                <div className="absolute left-0 rounded-full bg-white dark:bg-black border-2 border-purple-600 dark:border-purple-400 w-3.5 h-3.5"></div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400" title={format(activity.timestamp, 'PPpp')}>
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.details}</p>
                  {activity.blockchainVerified && (
                    <div className="flex items-center mt-2">
                      <span className="text-xs uppercase tracking-wider bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 border border-green-200 dark:border-green-800">
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
