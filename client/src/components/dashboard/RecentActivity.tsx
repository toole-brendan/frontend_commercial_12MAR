import React from 'react';
import { mockActivities } from '@/lib/mockData';

interface ActivityProps {
  activity: {
    id: number;
    type: string;
    title: string;
    description: string;
    time: string;
    verified: boolean;
    icon: string;
    iconBg: string;
  }
}

const ActivityItem: React.FC<ActivityProps> = ({ activity }) => {
  const getIconBg = () => {
    switch (activity.iconBg) {
      case 'blue':
        return 'bg-blue-100 text-primary';
      case 'green':
        return 'bg-green-100 text-green-500';
      case 'amber':
        return 'bg-amber-100 text-amber-500';
      case 'red':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="px-6 py-4 flex items-start">
      <div className={`p-2 rounded-lg mr-4 ${getIconBg()}`}>
        <span className="material-icons text-sm">{activity.icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <span className="material-icons text-xs mr-1">access_time</span>
            <span>{activity.time}</span>
          </div>
          {activity.verified && (
            <div className="flex items-center text-xs text-green-500 ml-4">
              <span className="material-icons text-xs mr-1">verified</span>
              <span>Verified on blockchain</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Recent Activity</h2>
        <a href="#" className="text-primary text-sm">View All</a>
      </div>
      <div className="divide-y divide-gray-100">
        {mockActivities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
