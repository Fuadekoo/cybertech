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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";

// Static data for customer analytics
const topCustomers = [
  {
    name: "John Smith",
    totalSpent: 12500,
    transactions: 15,
    avgOrder: 833,
    loyalty: "Gold",
  },
  {
    name: "Sarah Johnson",
    totalSpent: 9800,
    transactions: 12,
    avgOrder: 817,
    loyalty: "Gold",
  },
  {
    name: "Mike Wilson",
    totalSpent: 8500,
    transactions: 18,
    avgOrder: 472,
    loyalty: "Silver",
  },
  {
    name: "Emily Davis",
    totalSpent: 7200,
    transactions: 8,
    avgOrder: 900,
    loyalty: "Silver",
  },
  {
    name: "David Brown",
    totalSpent: 6800,
    transactions: 14,
    avgOrder: 486,
    loyalty: "Silver",
  },
  {
    name: "Lisa Anderson",
    totalSpent: 5500,
    transactions: 6,
    avgOrder: 917,
    loyalty: "Bronze",
  },
  {
    name: "Tom Miller",
    totalSpent: 4800,
    transactions: 10,
    avgOrder: 480,
    loyalty: "Bronze",
  },
  {
    name: "Anna Taylor",
    totalSpent: 4200,
    transactions: 7,
    avgOrder: 600,
    loyalty: "Bronze",
  },
];

const customerSegments = [
  { segment: "Gold", count: 15, revenue: 45000, percentage: 25 },
  { segment: "Silver", count: 35, revenue: 65000, percentage: 45 },
  { segment: "Bronze", count: 50, revenue: 40000, percentage: 30 },
];

const customerAcquisition = [
  {
    month: "Jan",
    newCustomers: 25,
    returningCustomers: 45,
    totalRevenue: 85000,
  },
  {
    month: "Feb",
    newCustomers: 30,
    returningCustomers: 52,
    totalRevenue: 95000,
  },
  {
    month: "Mar",
    newCustomers: 35,
    returningCustomers: 58,
    totalRevenue: 110000,
  },
  {
    month: "Apr",
    newCustomers: 28,
    returningCustomers: 48,
    totalRevenue: 90000,
  },
  {
    month: "May",
    newCustomers: 40,
    returningCustomers: 65,
    totalRevenue: 125000,
  },
  {
    month: "Jun",
    newCustomers: 32,
    returningCustomers: 55,
    totalRevenue: 105000,
  },
];

const customerRetention = [
  { month: "Jan", retentionRate: 85, churnRate: 15, newCustomers: 25 },
  { month: "Feb", retentionRate: 88, churnRate: 12, newCustomers: 30 },
  { month: "Mar", retentionRate: 82, churnRate: 18, newCustomers: 35 },
  { month: "Apr", retentionRate: 90, churnRate: 10, newCustomers: 28 },
  { month: "May", retentionRate: 87, churnRate: 13, newCustomers: 40 },
  { month: "Jun", retentionRate: 89, churnRate: 11, newCustomers: 32 },
];

const customerLifetimeValue = [
  { segment: "Gold", ltv: 2500, avgOrder: 800, frequency: 3.2 },
  { segment: "Silver", ltv: 1200, avgOrder: 450, frequency: 2.1 },
  { segment: "Bronze", ltv: 600, avgOrder: 200, frequency: 1.5 },
];

const customerGeographic = [
  { region: "North America", customers: 45, revenue: 75000, percentage: 40 },
  { region: "Europe", customers: 35, revenue: 55000, percentage: 30 },
  { region: "Asia", customers: 25, revenue: 40000, percentage: 20 },
  { region: "Other", customers: 15, revenue: 20000, percentage: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CustomerDataPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customer Data
          </h1>
          <p className="text-gray-600">
            Comprehensive customer analytics including top customers, segments,
            and retention metrics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-blue-600">120</p>
                <p className="text-sm text-green-600">+15 this month</p>
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Top Customer
                </p>
                <p className="text-2xl font-bold text-green-600">John Smith</p>
                <p className="text-sm text-green-600">$12,500 total spent</p>
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Retention Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">87%</p>
                <p className="text-sm text-purple-600">+2% from last month</p>
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. LTV</p>
                <p className="text-2xl font-bold text-orange-600">$1,200</p>
                <p className="text-sm text-orange-600">
                  Customer lifetime value
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-600"
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
        </div>

        {/* Top Customers */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Customers
          </h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loyalty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.transactions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${customer.avgOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.loyalty === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : customer.loyalty === "Silver"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {customer.loyalty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Customer Segments
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ segment, percentage }) =>
                      `${segment} ${percentage}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {customerSegments.map((entry, index) => (
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

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Customer Lifetime Value
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerLifetimeValue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ltv" fill="#8884d8" />
                  <Bar dataKey="avgOrder" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Acquisition Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerAcquisition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="returningCustomers"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Retention */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Retention & Churn
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerRetention}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="retentionRate"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="#ff8042"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Geographic Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerGeographic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" fill="#8884d8" />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
