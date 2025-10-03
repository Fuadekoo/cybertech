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
  Area,
  AreaChart,
} from "recharts";

// Static data for inventory analytics
const inventoryStatus = [
  { status: "In Stock", count: 45, value: 125000, percentage: 65 },
  { status: "Low Stock", count: 12, value: 25000, percentage: 18 },
  { status: "Out of Stock", count: 8, value: 15000, percentage: 12 },
  { status: "Discontinued", count: 5, value: 5000, percentage: 5 },
];

const lowStockItems = [
  {
    name: "Laptop Pro 15",
    currentStock: 3,
    minThreshold: 10,
    status: "Critical",
    value: 4500,
  },
  {
    name: "Wireless Headphones",
    currentStock: 5,
    minThreshold: 15,
    status: "Low",
    value: 750,
  },
  {
    name: "Smartphone X",
    currentStock: 2,
    minThreshold: 8,
    status: "Critical",
    value: 1600,
  },
  {
    name: "Tablet Air",
    currentStock: 7,
    minThreshold: 12,
    status: "Low",
    value: 2450,
  },
  {
    name: "Gaming Mouse",
    currentStock: 4,
    minThreshold: 10,
    status: "Low",
    value: 200,
  },
  {
    name: "Mechanical Keyboard",
    currentStock: 1,
    minThreshold: 5,
    status: "Critical",
    value: 200,
  },
  {
    name: 'Monitor 27"',
    currentStock: 6,
    minThreshold: 8,
    status: "Low",
    value: 1800,
  },
  {
    name: "Webcam HD",
    currentStock: 3,
    minThreshold: 6,
    status: "Low",
    value: 150,
  },
];

const inventoryMovements = [
  {
    date: "2024-01-01",
    sales: 15,
    purchases: 25,
    transfers: 5,
    adjustments: 2,
  },
  {
    date: "2024-01-02",
    sales: 18,
    purchases: 30,
    transfers: 3,
    adjustments: 1,
  },
  {
    date: "2024-01-03",
    sales: 22,
    purchases: 35,
    transfers: 8,
    adjustments: 3,
  },
  {
    date: "2024-01-04",
    sales: 12,
    purchases: 20,
    transfers: 4,
    adjustments: 1,
  },
  {
    date: "2024-01-05",
    sales: 28,
    purchases: 40,
    transfers: 6,
    adjustments: 2,
  },
  {
    date: "2024-01-06",
    sales: 20,
    purchases: 32,
    transfers: 7,
    adjustments: 2,
  },
  {
    date: "2024-01-07",
    sales: 25,
    purchases: 38,
    transfers: 9,
    adjustments: 4,
  },
];

const categoryInventory = [
  {
    category: "Electronics",
    totalItems: 25,
    inStock: 18,
    lowStock: 5,
    outOfStock: 2,
  },
  {
    category: "Accessories",
    totalItems: 20,
    inStock: 15,
    lowStock: 3,
    outOfStock: 2,
  },
  {
    category: "Computers",
    totalItems: 15,
    inStock: 12,
    lowStock: 2,
    outOfStock: 1,
  },
  { category: "Audio", totalItems: 12, inStock: 8, lowStock: 3, outOfStock: 1 },
  {
    category: "Gaming",
    totalItems: 10,
    inStock: 7,
    lowStock: 2,
    outOfStock: 1,
  },
];

const inventoryValue = [
  {
    month: "Jan",
    totalValue: 120000,
    electronics: 80000,
    accessories: 25000,
    computers: 15000,
  },
  {
    month: "Feb",
    totalValue: 135000,
    electronics: 90000,
    accessories: 28000,
    computers: 17000,
  },
  {
    month: "Mar",
    totalValue: 150000,
    electronics: 100000,
    accessories: 32000,
    computers: 18000,
  },
  {
    month: "Apr",
    totalValue: 140000,
    electronics: 95000,
    accessories: 30000,
    computers: 15000,
  },
  {
    month: "May",
    totalValue: 165000,
    electronics: 110000,
    accessories: 35000,
    computers: 20000,
  },
  {
    month: "Jun",
    totalValue: 170000,
    electronics: 115000,
    accessories: 38000,
    computers: 17000,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function InventoryDataPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inventory Data
          </h1>
          <p className="text-gray-600">
            Comprehensive inventory analytics including status, movements, and
            low stock items
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-600">70</p>
                <p className="text-sm text-green-600">+5 this month</p>
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">$170,000</p>
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
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-sm text-orange-600">Need attention</p>
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-red-600">8</p>
                <p className="text-sm text-red-600">Urgent restock needed</p>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Inventory Status Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percentage }: any) =>
                      `${status} ${percentage}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {inventoryStatus.map((entry, index) => (
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
              Inventory Value by Status
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Low Stock Items
          </h2>
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
                    Min Threshold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.currentStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minThreshold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Movements */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Inventory Movements
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inventoryMovements}>
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
                  dataKey="purchases"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="transfers"
                  stackId="3"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
                <Area
                  type="monotone"
                  dataKey="adjustments"
                  stackId="4"
                  stroke="#ff8042"
                  fill="#ff8042"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Inventory */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Inventory by Category
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryInventory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inStock" stackId="a" fill="#82ca9d" />
                <Bar dataKey="lowStock" stackId="a" fill="#ffc658" />
                <Bar dataKey="outOfStock" stackId="a" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Value Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Inventory Value Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalValue"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="electronics"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="accessories"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="computers"
                  stroke="#ff8042"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
