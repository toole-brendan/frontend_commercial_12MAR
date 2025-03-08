import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsData } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageWrapper from "@/components/layout/PageWrapper";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon,
  Repeat,
  CalendarRange
} from "lucide-react";

// 8VC style color palette
const COLORS = ['#6941C6', '#9E77ED', '#42A5F5', '#26A69A', '#EC407A'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");
  
  // Simulate API fetch with mock data
  const { data = analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: async () => analyticsData
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6 text-center">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
      </div>
    );
  }

  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        className="block w-full sm:w-auto pl-3 pr-10 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        <option value="1m">Last 30 days</option>
        <option value="3m">Last 3 months</option>
        <option value="6m">Last 6 months</option>
        <option value="1y">Last year</option>
        <option value="all">All time</option>
      </select>
      
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
      >
        <Download className="h-4 w-4 mr-1" />
        <span>Export</span>
      </button>
    </div>
  );

  return (
    <PageWrapper
      className="space-y-4"
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Analytics</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Supply chain performance</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Track key performance indicators and supply chain metrics</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CalendarRange className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Data period: Jan 2025 - Jun 2025</span>
        </div>
        {actionButtons}
      </div>
      
      {/* KPI Cards - 8VC Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Fulfillment Rate</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.fulfillmentRate}%</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  2.1%
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Avg. Processing Time</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.avgProcessingTime} days</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  0.3 days
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Order Accuracy</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.orderAccuracy}%</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  0.5%
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">On-Time Payment</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.onTimePayment}%</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  1.2%
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Inventory Turnover</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.inventoryTurnover}</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-amber-500/30 text-amber-600 dark:text-amber-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  0.1
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Supplier Reliability</p>
              <div className="flex items-center mt-1.5">
                <div className="text-2xl font-light text-gray-900 dark:text-white">{data.kpis.supplierReliability}%</div>
                <div className="ml-2 px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-amber-500/30 text-amber-600 dark:text-amber-400">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  0.8%
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">vs previous period</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 8VC Style Section Header */}
      <div className="mt-8 mb-4">
        <div className="category-tag mb-1.5">Data Visualization</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Performance charts</h2>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      {/* Chart Tabs - 8VC Style */}
      <Tabs defaultValue="overview" className="w-full mb-6 mt-4">
        <TabsList className="border-b border-gray-200 dark:border-white/10 flex space-x-6 pb-0">
          <TabsTrigger 
            value="overview" 
            className="pb-2 text-sm text-gray-600 dark:text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:text-purple-400"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="inventory"
            className="pb-2 text-sm text-gray-600 dark:text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:text-purple-400"
          >
            <LineChartIcon className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger 
            value="transactions"
            className="pb-2 text-sm text-gray-600 dark:text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:text-purple-400"
          >
            <Repeat className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="suppliers"
            className="pb-2 text-sm text-gray-600 dark:text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:text-purple-400"
          >
            <PieChartIcon className="h-4 w-4 mr-2" />
            Suppliers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Growth</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Inventory Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.inventoryOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalItems" 
                    stroke="#6941C6" 
                    activeDot={{ r: 8 }}
                    name="Total Items"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Financial</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Monthly Transactions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.monthlyTransactions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="incoming" 
                    stackId="1"
                    stroke="#9E77ED" 
                    fill="#9E77ED" 
                    name="Incoming ($)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outgoing" 
                    stackId="1"
                    stroke="#EC407A" 
                    fill="#EC407A"
                    name="Outgoing ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Operations</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Transfer Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.transfersByStatus.labels.map((label, i) => ({
                      name: label,
                      value: data.transfersByStatus.values[i]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.transfersByStatus.labels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Financial</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Payment Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.paymentMethodDistribution.labels.map((label, i) => ({
                      name: label,
                      value: data.paymentMethodDistribution.values[i]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.paymentMethodDistribution.labels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Categories</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Inventory by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.categoryDistribution.labels.map((label, i) => ({
                  name: label,
                  value: data.categoryDistribution.values[i]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Bar dataKey="value" fill="#6941C6" name="Percentage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Age Analysis</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Inventory Aging</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.inventoryAging}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="age" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Bar dataKey="percentage" fill="#9E77ED" name="Percentage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Financial</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Monthly Transaction Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.monthlyTransactions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Legend />
                  <Line type="monotone" dataKey="incoming" stroke="#6941C6" name="Incoming ($)" />
                  <Line type="monotone" dataKey="outgoing" stroke="#EC407A" name="Outgoing ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Payment</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Payment Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.paymentMethodDistribution.labels.map((label, i) => ({
                      name: label,
                      value: data.paymentMethodDistribution.values[i]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.paymentMethodDistribution.labels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="suppliers" className="mt-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Suppliers</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Top Suppliers by Value</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={data.topSuppliers}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Legend />
                  <Bar dataKey="value" fill="#6941C6" name="Transaction Value ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
              <div className="category-tag mb-1.5">Suppliers</div>
              <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Top Suppliers by Transactions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={data.topSuppliers}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  <Legend />
                  <Bar dataKey="transactions" fill="#9E77ED" name="Number of Transactions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}