import { ArrowUpRight, ArrowDownRight, Package, ArrowLeftRight, CheckCircle, Coins } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  iconBgColor: string;
  iconColor: string;
}

export default function StatCard({ label, value, icon, trend, iconBgColor, iconColor }: StatCardProps) {
  // Map the icon string to Lucide components for a more modern look
  const getIcon = () => {
    switch(icon) {
      case 'fa-boxes':
        return <Package className="h-5 w-5" />;
      case 'fa-exchange-alt':
        return <ArrowLeftRight className="h-5 w-5" />;
      case 'fa-check-circle':
        return <CheckCircle className="h-5 w-5" />;
      case 'fa-coins':
        return <Coins className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="category-tag mb-2">{label}</p>
          <p className="text-2xl text-gray-900 dark:text-white font-light">{value}</p>
        </div>
        <div className={`${iconBgColor} ${iconColor} p-2.5 border border-gray-200 dark:border-white/10`}>
          {getIcon()}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} text-sm flex items-center`}>
            {trend.isPositive ? 
              <ArrowUpRight className="h-4 w-4 mr-1" /> : 
              <ArrowDownRight className="h-4 w-4 mr-1" />
            } 
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{trend.text}</span>
        </div>
      )}
    </div>
  );
}
