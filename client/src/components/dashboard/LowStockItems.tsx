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
    if (percent <= 15) return 'bg-red-500 dark:bg-red-500';
    if (percent <= 30) return 'bg-yellow-500 dark:bg-yellow-500';
    return 'bg-green-500 dark:bg-green-500';
  };

  return (
    <div className="w-full">
      <ul className="divide-y divide-gray-200 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-200">
            <div className="flex-1">
              <p className="font-normal text-gray-900 dark:text-white">{item.name}</p>
              <div className="flex items-center mt-2">
                <div className="w-full max-w-[150px] bg-gray-200 dark:bg-white/10 h-1">
                  <div 
                    className={`${getBarColor(item.percentRemaining)} h-1`} 
                    style={{ width: `${item.percentRemaining}%` }}
                  ></div>
                </div>
                <span className="text-xs font-light text-gray-500 dark:text-gray-400 ml-3 font-mono">{item.percentRemaining}% left</span>
              </div>
            </div>
            <button 
              className="btn-8vc-primary !py-1.5 !px-4 text-xs"
              onClick={() => handleReorder(item.id)}
            >
              Reorder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
