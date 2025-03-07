interface LowStockItem {
  id: number;
  name: string;
  percentRemaining: number;
}

interface LowStockItemsProps {
  items: LowStockItem[];
  onReorder?: (id: number) => void;
}

export default function LowStockItems({ items, onReorder }: LowStockItemsProps) {
  const handleReorder = (id: number) => {
    if (onReorder) {
      onReorder(id);
    }
  };

  const getBarColor = (percent: number) => {
    if (percent <= 15) return 'bg-red-500';
    if (percent <= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">Low Stock Items</h2>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                <div className="flex items-center mt-1">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${getBarColor(item.percentRemaining)} h-2 rounded-full`} 
                      style={{ width: `${item.percentRemaining}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-2">{item.percentRemaining}% left</span>
                </div>
              </div>
              <button 
                className="text-primary hover:text-primary-dark text-sm"
                onClick={() => handleReorder(item.id)}
              >
                Reorder
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
