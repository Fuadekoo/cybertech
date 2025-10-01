"use client";

import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import { ChevronDown, Loader2, TrendingUp, DollarSign } from "lucide-react";

function TodaySalesChart() {
  // Static test data for today's sales
  const [salesData] = useState([
    { hour: "00:00", total: 0, online: 0, inStore: 0 },
    { hour: "02:00", total: 0, online: 0, inStore: 0 },
    { hour: "04:00", total: 0, online: 0, inStore: 0 },
    { hour: "06:00", total: 0, online: 0, inStore: 0 },
    { hour: "08:00", total: 120, online: 80, inStore: 40 },
    { hour: "10:00", total: 280, online: 150, inStore: 130 },
    { hour: "12:00", total: 450, online: 200, inStore: 250 },
    { hour: "14:00", total: 320, online: 180, inStore: 140 },
    { hour: "16:00", total: 380, online: 220, inStore: 160 },
    { hour: "18:00", total: 520, online: 300, inStore: 220 },
    { hour: "20:00", total: 680, online: 400, inStore: 280 },
    { hour: "22:00", total: 420, online: 350, inStore: 70 },
  ]);

  const [paymentMethodsData] = useState([
    { method: "Credit Card", value: 45, amount: 12500 },
    { method: "Cash", value: 30, amount: 8500 },
    { method: "Digital Wallet", value: 15, amount: 4200 },
    { method: "Bank Transfer", value: 10, amount: 2800 },
  ]);

  const [topProductsData] = useState([
    { product: "Premium Coffee", sales: 45, revenue: 2250 },
    { product: "Wireless Headphones", sales: 32, revenue: 4800 },
    { product: "Smart Watch", sales: 28, revenue: 4200 },
    { product: "Laptop Stand", sales: 22, revenue: 880 },
    { product: "Bluetooth Speaker", sales: 18, revenue: 900 },
  ]);

  const todayStats = {
    totalRevenue: 28400,
    transactionCount: 156,
    itemsSold: 145,
    growthPercentage: 12.5,
    averageOrderValue: 182.05,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Today's Sales
            </h3>
            <p className="text-sm text-gray-500">Real-time sales performance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${todayStats.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            +{todayStats.growthPercentage}% from yesterday
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-xl font-bold text-gray-900">
                {todayStats.transactionCount}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items Sold</p>
              <p className="text-xl font-bold text-gray-900">
                {todayStats.itemsSold}
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order</p>
              <p className="text-xl font-bold text-gray-900">
                ${todayStats.averageOrderValue}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-xl font-bold text-green-600">
                +{todayStats.growthPercentage}%
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Sales by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={salesData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
              formatter={(value, name) => [`$${value}`, name]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Sales"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="online"
              name="Online"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="inStore"
              name="In-Store"
              stroke="#ffc658"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Methods and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Payment Methods
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={paymentMethodsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Top Products
          </h4>
          <div className="space-y-3">
            {topProductsData.map((product, index) => (
              <div
                key={product.product}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.product}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaySalesChart;
