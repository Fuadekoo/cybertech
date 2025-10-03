"use client";

import React, { useState } from "react";
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
import { TrendingUp, DollarSign } from "lucide-react";

function YesterdaySalesChart() {
  // Static test data for yesterday's sales
  const [yesterdaySalesData] = useState([
    { hour: "00:00", total: 0, online: 0, inStore: 0 },
    { hour: "02:00", total: 0, online: 0, inStore: 0 },
    { hour: "04:00", total: 0, online: 0, inStore: 0 },
    { hour: "06:00", total: 0, online: 0, inStore: 0 },
    { hour: "08:00", total: 95, online: 60, inStore: 35 },
    { hour: "10:00", total: 220, online: 120, inStore: 100 },
    { hour: "12:00", total: 380, online: 180, inStore: 200 },
    { hour: "14:00", total: 280, online: 150, inStore: 130 },
    { hour: "16:00", total: 320, online: 190, inStore: 130 },
    { hour: "18:00", total: 450, online: 250, inStore: 200 },
    { hour: "20:00", total: 580, online: 350, inStore: 230 },
    { hour: "22:00", total: 350, online: 280, inStore: 70 },
  ]);

  const [yesterdayPaymentMethodsData] = useState([
    { method: "Credit Card", value: 42, amount: 11200 },
    { method: "Cash", value: 28, amount: 7800 },
    { method: "Digital Wallet", value: 18, amount: 3800 },
    { method: "Bank Transfer", value: 12, amount: 2400 },
  ]);

  const [yesterdayTopProductsData] = useState([
    { product: "Premium Coffee", sales: 38, revenue: 1900 },
    { product: "Wireless Headphones", sales: 28, revenue: 4200 },
    { product: "Smart Watch", sales: 22, revenue: 3300 },
    { product: "Laptop Stand", sales: 18, revenue: 720 },
    { product: "Bluetooth Speaker", sales: 15, revenue: 750 },
  ]);

  const yesterdayStats = {
    totalRevenue: 25200,
    transactionCount: 142,
    itemsSold: 121,
    growthPercentage: -8.2,
    averageOrderValue: 177.46,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Yesterday&apos;s Sales
            </h3>
            <p className="text-sm text-gray-500">Previous day performance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">
            ${yesterdayStats.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {yesterdayStats.growthPercentage > 0 ? "+" : ""}
            {yesterdayStats.growthPercentage}% from day before
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
                {yesterdayStats.transactionCount}
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
                {yesterdayStats.itemsSold}
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
                ${yesterdayStats.averageOrderValue}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-xl font-bold text-orange-600">
                {yesterdayStats.growthPercentage > 0 ? "+" : ""}
                {yesterdayStats.growthPercentage}%
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Yesterday&apos;s Sales by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={yesterdaySalesData}
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
              stroke="#f97316"
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
            <BarChart data={yesterdayPaymentMethodsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="amount" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Top Products
          </h4>
          <div className="space-y-3">
            {yesterdayTopProductsData.map((product, index) => (
              <div
                key={product.product}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
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

export default YesterdaySalesChart;
