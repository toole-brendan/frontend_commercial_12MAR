import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { ActionButton } from "@/components/ui/action-button";
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
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon,
  Repeat
} from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");
  
  // Simulate API fetch with mock data
  const { data = analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: async () => analyticsData
  });

  if (isLoading) {
    return <div className="p-8">Loading analytics data...</div>;
  }

  const actionButtons = (
    <div className="flex items-center space-x-2">
      <Select defaultValue="6m" onValueChange={(val) => setTimeRange(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1m">Last 30 days</SelectItem>
          <SelectItem value="3m">Last 3 months</SelectItem>
          <SelectItem value="6m">Last 6 months</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </SelectContent>
      </Select>
      
      <ActionButton 
        variant="secondary"
        icon={<Download className="h-4 w-4" />}
      >
        Export
      </ActionButton>
    </div>
  );

  return (
    <PageWrapper
      title="Analytics" 
      description="Supply chain performance and insights"
      actions={actionButtons}
      className="space-y-6"
    >
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Fulfillment Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.fulfillmentRate}%</div>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-900/30">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2.1%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Avg. Processing Time</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.avgProcessingTime} days</div>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-900/30">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                0.3 days
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Order Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.orderAccuracy}%</div>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-900/30">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                0.5%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">On-Time Payment</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.onTimePayment}%</div>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-900/30">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                1.2%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Inventory Turnover</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.inventoryTurnover}</div>
              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/50 dark:hover:bg-amber-900/30">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                0.1
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Supplier Reliability</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.kpis.supplierReliability}%</div>
              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/50 dark:hover:bg-amber-900/30">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                0.8%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs previous period</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Tabs */}
      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="mb-4 dark:bg-gray-700">
          <TabsTrigger value="overview" className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="transactions" className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300">
            <Repeat className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Suppliers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Inventory Trends</CardTitle>
              </CardHeader>
              <CardContent>
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
                      stroke="#0088FE" 
                      activeDot={{ r: 8 }}
                      name="Total Items"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Monthly Transactions</CardTitle>
              </CardHeader>
              <CardContent>
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
                      stroke="#00C49F" 
                      fill="#00C49F" 
                      name="Incoming ($)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="outgoing" 
                      stackId="1"
                      stroke="#FF8042" 
                      fill="#FF8042"
                      name="Outgoing ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Transfer Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
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
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Inventory by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.categoryDistribution.labels.map((label, i) => ({
                    name: label,
                    value: data.categoryDistribution.values[i]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" name="Percentage (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Inventory Aging</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.inventoryAging}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      nameKey="age"
                      label={({ age, percentage }) => `${age}: ${percentage}%`}
                    >
                      {data.inventoryAging.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Inventory Alerts Card */}
            <Card className="md:col-span-2 border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Inventory Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.inventoryAlerts.map((alert, index) => (
                    <Card key={index} className={`border-l-4 border dark:border-gray-700 dark:bg-gray-800 ${
                      alert.category === 'Low Stock' ? 'border-l-red-500' :
                      alert.category === 'Excess Inventory' ? 'border-l-amber-500' :
                      alert.category === 'Aging Inventory' ? 'border-l-purple-500' :
                      'border-l-blue-500'
                    }`}>
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{alert.category}</p>
                        <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">{alert.count}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {alert.category === 'Low Stock' ? 'Items below threshold' :
                          alert.category === 'Excess Inventory' ? 'Overstock items' :
                          alert.category === 'Aging Inventory' ? 'Items > 90 days' :
                          'Items with issues'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Monthly Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.monthlyTransactions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                    <Legend />
                    <Bar dataKey="incoming" fill="#00C49F" name="Incoming ($)" />
                    <Bar dataKey="outgoing" fill="#FF8042" name="Outgoing ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Cash Flow Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.monthlyTransactions.map(item => ({
                    month: item.month,
                    balance: item.incoming - item.outgoing
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#8884d8" 
                      name="Net Balance ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="suppliers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Top Suppliers by Value</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    layout="vertical" 
                    data={data.topSuppliers}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" name="Value ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Top Suppliers by Transaction Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    layout="vertical" 
                    data={data.topSuppliers}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
                    <Legend />
                    <Bar dataKey="transactions" fill="#00C49F" name="Transactions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Additional Insights Card */}
      <Card className="mb-6 border dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full dark:bg-green-900/30">
                <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Increased Efficiency</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Processing time has decreased by 12% compared to last quarter, resulting in faster order fulfillment.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Aging Inventory Alert</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  12% of inventory is over 90 days old. Consider promotional strategies to move these items.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full dark:bg-purple-900/30">
                <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Smart Contract Efficiency</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Suppliers with smart contracts show 15% faster payment processing and 23% fewer disputes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}