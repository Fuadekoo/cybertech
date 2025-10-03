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
} from "recharts";

// Static data for product analytics
const topSellingProducts = [
  { name: "Laptop Pro 15", sales: 45, revenue: 67500, growth: 12.5 },
  { name: "Wireless Headphones", sales: 38, revenue: 11400, growth: 8.3 },
  { name: "Smartphone X", sales: 32, revenue: 25600, growth: 15.2 },
  { name: "Tablet Air", sales: 28, revenue: 19600, growth: 6.7 },
  { name: "Gaming Mouse", sales: 25, revenue: 3750, growth: 22.1 },
  { name: "Mechanical Keyboard", sales: 22, revenue: 4400, growth: 18.9 },
  { name: 'Monitor 27"', sales: 18, revenue: 10800, growth: 4.2 },
  { name: "Webcam HD", sales: 15, revenue: 2250, growth: 31.5 },
];

const categorySales = [
  { category: "Electronics", sales: 45, revenue: 125000, percentage: 35 },
  { category: "Accessories", sales: 38, revenue: 45000, percentage: 25 },
  { category: "Computers", sales: 32, revenue: 85000, percentage: 20 },
  { category: "Audio", sales: 28, revenue: 35000, percentage: 12 },
  { category: "Gaming", sales: 25, revenue: 25000, percentage: 8 },
];

const productPerformance = [
  {
    month: "Jan",
    electronics: 12000,
    accessories: 8000,
    computers: 15000,
    audio: 5000,
    gaming: 3000,
  },
  {
    month: "Feb",
    electronics: 15000,
    accessories: 9500,
    computers: 18000,
    audio: 6000,
    gaming: 3500,
  },
  {
    month: "Mar",
    electronics: 18000,
    accessories: 11000,
    computers: 22000,
    audio: 7000,
    gaming: 4000,
  },
  {
    month: "Apr",
    electronics: 14000,
    accessories: 9000,
    computers: 17000,
    audio: 5500,
    gaming: 3200,
  },
  {
    month: "May",
    electronics: 22000,
    accessories: 12000,
    computers: 25000,
    audio: 8000,
    gaming: 5000,
  },
  {
    month: "Jun",
    electronics: 19000,
    accessories: 10500,
    computers: 20000,
    audio: 6500,
    gaming: 4200,
  },
];

const productTrends = [
  { month: "Jan", totalProducts: 45, newProducts: 8, discontinued: 2 },
  { month: "Feb", totalProducts: 48, newProducts: 6, discontinued: 3 },
  { month: "Mar", totalProducts: 52, newProducts: 10, discontinued: 1 },
  { month: "Apr", totalProducts: 55, newProducts: 7, discontinued: 4 },
  { month: "May", totalProducts: 58, newProducts: 9, discontinued: 2 },
  { month: "Jun", totalProducts: 62, newProducts: 12, discontinued: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function ProductDataPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Data
          </h1>
          <p className="text-gray-600">
            Comprehensive product analytics including top sellers, category
            performance, and trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-blue-600">62</p>
                <p className="text-sm text-green-600">+12 new this month</p>
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
                  Top Category
                </p>
                <p className="text-2xl font-bold text-green-600">Electronics</p>
                <p className="text-sm text-green-600">35% of total sales</p>
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Seller</p>
                <p className="text-2xl font-bold text-purple-600">
                  Laptop Pro 15
                </p>
                <p className="text-sm text-purple-600">45 units sold</p>
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

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Growth</p>
                <p className="text-2xl font-bold text-orange-600">+14.8%</p>
                <p className="text-sm text-orange-600">Across all products</p>
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
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Selling Products
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sales by Category
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }: any) =>
                      `${category} ${percentage}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {categorySales.map((entry, index) => (
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
              Category Performance
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Product Performance Trends */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Product Performance Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="electronics"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="accessories"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="computers"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="audio"
                  stroke="#ff8042"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="gaming"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Product Portfolio Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalProducts"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="newProducts"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="discontinued"
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
