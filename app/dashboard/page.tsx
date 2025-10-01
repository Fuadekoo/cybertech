"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import { useData } from "../../hooks/UseData";
import useMutation from "../../hooks/useMutations";
import {
  getDashboardCardsData,
  getSalesAnalyticsData,
  getPurchaseAnalyticsData,
  getExpenseAnalyticsData,
  getTopProductsData,
  getTopCustomersData,
  getPaymentMethodsData,
  getLowStockItems,
} from "../../actions/dashboard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dashboard Cards Component
function DashboardCards({ data }: { data: any }) {
  if (!data) return null;

  const cards = [
    {
      title: "Today's Sales",
      value: `$${data.today.sales.total.toFixed(2)}`,
      growth: data.today.sales.growth,
      count: data.today.sales.count,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Today's Purchases",
      value: `$${data.today.purchases.total.toFixed(2)}`,
      growth: data.today.purchases.growth,
      count: data.today.purchases.count,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Today's Expenses",
      value: `$${data.today.expenses.total.toFixed(2)}`,
      growth: data.today.expenses.growth,
      count: data.today.expenses.count,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Net Profit",
      value: `$${data.today.profit.total.toFixed(2)}`,
      margin: data.today.profit.margin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`p-6 rounded-lg ${card.bgColor} border`}>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            {card.title}
          </h3>
          <p className={`text-2xl font-bold ${card.color} mb-2`}>
            {card.value}
          </p>
          {card.growth !== undefined && (
            <p className="text-sm">
              <span
                className={card.growth >= 0 ? "text-green-600" : "text-red-600"}
              >
                {card.growth >= 0 ? "+" : ""}
                {card.growth.toFixed(1)}%
              </span>
              <span className="text-gray-500 ml-2">
                ({card.count} transactions)
              </span>
            </p>
          )}
          {card.margin !== undefined && (
            <p className="text-sm text-gray-600">
              Margin: {card.margin.toFixed(1)}%
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Sales Chart Component
function SalesChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Sales Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Purchases Chart Component
function PurchasesChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Purchase Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalPurchases"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Expenses Chart Component
function ExpensesChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Expense Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalExpenses" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Top Products Chart Component
function TopProductsChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="itemName" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalRevenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Payment Methods Chart Component
function PaymentMethodsChart({ data }: { data: any[] }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="totalAmount"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Top Customers Table Component
function TopCustomersTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transactions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((customer, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.transactionCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Low Stock Items Table Component
function LowStockItemsTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Low Stock Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Threshold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.currentStock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.lowStockThreshold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.lowStockStatus === "critical"
                        ? "bg-red-100 text-red-800"
                        : item.lowStockStatus === "new"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.lowStockStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });

  // Data fetching hooks
  const [cardData, isLoadingCardData, refreshCardData] = useData(
    getDashboardCardsData,
    () => {}
  );

  const [salesData, isLoadingSales, refreshSales] = useData(
    () => getSalesAnalyticsData(dateRange.start, dateRange.end),
    () => {},
    dateRange.start,
    dateRange.end
  );

  const [purchasesData, isLoadingPurchases, refreshPurchases] = useData(
    () => getPurchaseAnalyticsData(dateRange.start, dateRange.end),
    () => {},
    dateRange.start,
    dateRange.end
  );

  const [expensesData, isLoadingExpenses, refreshExpenses] = useData(
    () => getExpenseAnalyticsData(dateRange.start, dateRange.end),
    () => {},
    dateRange.start,
    dateRange.end
  );

  const [topProductsData, isLoadingTopProducts, refreshTopProducts] = useData(
    () => getTopProductsData(dateRange.start, dateRange.end),
    () => {},
    dateRange.start,
    dateRange.end
  );

  const [topCustomersData, isLoadingTopCustomers, refreshTopCustomers] =
    useData(
      () => getTopCustomersData(dateRange.start, dateRange.end),
      () => {},
      dateRange.start,
      dateRange.end
    );

  const [paymentMethodsData, isLoadingPaymentMethods, refreshPaymentMethods] =
    useData(
      () => getPaymentMethodsData(dateRange.start, dateRange.end),
      () => {},
      dateRange.start,
      dateRange.end
    );

  const [lowStockData, isLoadingLowStock, refreshLowStock] = useData(
    getLowStockItems,
    () => {}
  );

  // Mutation hooks for CRUD operations
  const [executeDelete, isLoadingDelete] = useMutation(
    async (id: string) => {
      // Example delete function - replace with actual API call
      console.log("Deleting item:", id);
      return { success: true, message: "Item deleted successfully" };
    },
    (res) => {
      if (res.success) {
        // Refresh all data after successful deletion
        refreshCardData();
        refreshSales();
        refreshPurchases();
        refreshExpenses();
        refreshTopProducts();
        refreshTopCustomers();
        refreshPaymentMethods();
        refreshLowStock();
      }
    }
  );

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  if (isLoadingCardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Business analytics and insights</p>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards data={cardData} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart data={salesData || []} />
          <PurchasesChart data={purchasesData || []} />
          <ExpensesChart data={expensesData || []} />
          <PaymentMethodsChart data={paymentMethodsData || []} />
        </div>

        {/* Top Products and Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TopProductsChart data={topProductsData || []} />
          <TopCustomersTable data={topCustomersData || []} />
        </div>

        {/* Low Stock Items */}
        <LowStockItemsTable data={lowStockData || []} />
      </div>
    </Layout>
  );
}
