import { format } from 'date-fns';
import { ArrowUp, ArrowDown, ArrowLeftRight, Circle } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'incoming' | 'outgoing' | 'transfer';
  description: string;
  reference: string;
  date: Date;
  amount: number;
  amountUSD: number;
  currency: string;
  status: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onFilterChange?: (filter: string) => void;
}

export default function TransactionsTable({ transactions, onFilterChange }: TransactionsTableProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterChange) {
      onFilterChange(e.target.value);
    }
  };

  const getIconForTransactionType = (type: string) => {
    switch(type) {
      case 'incoming':
        return <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 dark:bg-green-500/20"><ArrowDown size={18} className="text-green-600 dark:text-green-400" /></div>;
      case 'outgoing':
        return <div className="w-8 h-8 flex items-center justify-center bg-red-500/10 dark:bg-red-500/20"><ArrowUp size={18} className="text-red-600 dark:text-red-400" /></div>;
      case 'transfer':
        return <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20"><ArrowLeftRight size={18} className="text-purple-600 dark:text-purple-400" /></div>;
      default:
        return <div className="w-8 h-8 flex items-center justify-center bg-gray-500/10 dark:bg-gray-500/20"><Circle size={18} className="text-gray-600 dark:text-gray-400" /></div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">Completed</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">Pending</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">In Transit</span>;
      case 'failed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-red-500/30 text-red-600 dark:text-red-400">Failed</span>;
      default:
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">{status}</span>;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <select 
            className="text-xs uppercase tracking-wider font-medium border border-gray-300 dark:border-white/10 bg-transparent py-1 px-3 text-gray-600 dark:text-white"
            onChange={handleFilterChange}
          >
            <option value="all">All Transactions</option>
            <option value="payment">Payments</option>
            <option value="transfer">Transfers</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full data-table">
          <thead>
            <tr className="border-b border-gray-300 dark:border-white/10">
              <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
              <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th scope="col" className="py-2 pl-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150">
                <td className="py-2.5 pr-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getIconForTransactionType(transaction.type)}
                    <div className="ml-3">
                      <div className="text-sm font-normal text-gray-900 dark:text-white">{transaction.description}</div>
                      <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">{transaction.reference}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400">
                  {format(transaction.date, 'MMM d, yyyy')}
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                    {transaction.currency === 'items' 
                      ? `${transaction.amount} items` 
                      : `${transaction.amount.toLocaleString()} ${transaction.currency}`}
                  </div>
                  {transaction.currency !== 'items' && (
                    <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">${transaction.amountUSD.toLocaleString()} USD</div>
                  )}
                  {transaction.currency === 'items' && (
                    <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">Value: ${transaction.amountUSD.toLocaleString()}</div>
                  )}
                </td>
                <td className="py-2.5 pl-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
