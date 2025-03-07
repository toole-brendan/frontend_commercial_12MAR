import { format } from 'date-fns';

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
        return <div className="bg-green-100 p-2 rounded"><i className="fas fa-arrow-down text-green-600"></i></div>;
      case 'outgoing':
        return <div className="bg-red-100 p-2 rounded"><i className="fas fa-arrow-up text-red-600"></i></div>;
      case 'transfer':
        return <div className="bg-blue-100 p-2 rounded"><i className="fas fa-exchange-alt text-blue-600"></i></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded"><i className="fas fa-circle text-gray-600"></i></div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Transit</span>;
      case 'failed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Latest Transactions</h2>
          <div>
            <select 
              className="text-sm border border-gray-300 rounded py-1 px-2"
              onChange={handleFilterChange}
            >
              <option value="all">All Transactions</option>
              <option value="payment">Payments</option>
              <option value="transfer">Transfers</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getIconForTransactionType(transaction.type)}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{transaction.reference}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(transaction.date, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {transaction.currency === 'items' 
                      ? `${transaction.amount} items` 
                      : `${transaction.amount.toLocaleString()} ${transaction.currency}`}
                  </div>
                  {transaction.currency !== 'items' && (
                    <div className="text-xs text-gray-500">${transaction.amountUSD.toLocaleString()} USD</div>
                  )}
                  {transaction.currency === 'items' && (
                    <div className="text-xs text-gray-500">Value: ${transaction.amountUSD.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
