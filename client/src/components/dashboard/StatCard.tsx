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
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 font-display key-number">{value}</p>
        </div>
        <div className={`${iconBgColor} ${iconColor} p-3`}>
          <i className={`fas ${icon}`}></i>
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center">
          <span className={`${trend.isPositive ? 'text-green-500' : 'text-red-500'} text-sm flex items-center`}>
            <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'} mr-1`}></i> {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{trend.text}</span>
        </div>
      )}
    </div>
  );
}
