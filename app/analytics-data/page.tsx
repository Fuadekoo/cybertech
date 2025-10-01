"use client";

import React from "react";
import Layout from "../../components/Layout";
import {
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
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

// Static data for analytics
const salesAnalyticsData = [
  { date: "2024-01-01", sales: 12000, transactions: 45, itemsSold: 120 },
  { date: "2024-01-02", sales: 15000, transactions: 52, itemsSold: 150 },
  { date: "2024-01-03", sales: 18000, transactions: 68, itemsSold: 180 },
  { date: "2024-01-04", sales: 14000, transactions: 48, itemsSold: 140 },
  { date: "2024-01-05", sales: 22000, transactions: 75, itemsSold: 220 },
  { date: "2024-01-06", sales: 19000, transactions: 62, itemsSold: 190 },
  { date: "2024-01-07", sales: 25000, transactions: 85, itemsSold: 250 },
];

const purchaseAnalyticsData = [
  { date: "2024-01-01", purchases: 8000, count: 12, itemsPurchased: 80 },
  { date: "2024-01-02", purchases: 9500, count: 15, itemsPurchased: 95 },
  { date: "2024-01-03", purchases: 12000, count: 18, itemsPurchased: 120 },
  { date: "2024-01-04", purchases: 7000, count: 10, itemsPurchased: 70 },
  { date: "2024-01-05", purchases: 15000, count: 22, itemsPurchased: 150 },
  { date: "2024-01-06", purchases: 11000, count: 16, itemsPurchased: 110 },
  { date: "2024-01-07", purchases: 18000, count: 25, itemsPurchased: 180 },
];

const expenseAnalyticsData = [
  { date: "2024-01-01", expenses: 2000, count: 8, categories: 3 },
  { date: "2024-01-02", expenses: 2500, count: 10, categories: 4 },
  { date: "2024-01-03", expenses: 3000, count: 12, categories: 5 },
  { date: "2024-01-04", expenses: 1800, count: 6, categories: 2 },
  { date: "2024-01-05", expenses: 3500, count: 14, categories: 6 },
  { date: "2024-01-06", expenses: 2200, count: 9, categories: 3 },
  { date: "2024-01-07", expenses: 4000, count: 16, categories: 7 },
];

const profitAnalyticsData = [
  { date: "2024-01-01", gross: 12000, net: 8000, margin: 66.7 },
  { date: "2024-01-02", gross: 15000, net: 10000, margin: 66.7 },
  { date: "2024-01-03", gross: 18000, net: 12000, margin: 66.7 },
  { date: "2024-01-04", gross: 14000, net: 9500, margin: 67.9 },
  { date: "2024-01-05", gross: 22000, net: 15000, margin: 68.2 },
  { date: "2024-01-06", gross: 19000, net: 13000, margin: 68.4 },
  { date: "2024-01-07", gross: 25000, net: 17000, margin: 68.0 },
];

const paymentMethodsData = [
  { name: "Cash", value: 45, amount: 12500 },
  { name: "Card", value: 35, amount: 9800 },
  { name: "Bank Transfer", value: 20, amount: 5600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsDataPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Data
          </h1>
          <p className="text-gray-600">
            Comprehensive analytics for sales, purchases, expenses, and profit
            trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">$125,000</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Purchases
                </p>
                <p className="text-2xl font-bold text-blue-600">$78,500</p>
                <p className="text-sm text-blue-600">+8.3% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600">$18,800</p>
                <p className="text-sm text-red-600">+5.2% from last month</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-purple-600">$27,700</p>
                <p className="text-sm text-purple-600">
                  +15.8% from last month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Analytics */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sales Analytics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="transactions"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="itemsSold"
                  stackId="3"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Purchase Analytics */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Purchase Analytics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchaseAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchases" fill="#8884d8" />
                <Bar dataKey="count" fill="#82ca9d" />
                <Bar dataKey="itemsPurchased" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Analytics */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Expense Analytics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="categories"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Analytics */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Profit Analytics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="gross"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="margin"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment Methods Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodsData.map((entry, index) => (
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
        </div>
      </div>
    </Layout>
  );
}
