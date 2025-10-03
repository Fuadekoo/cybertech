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
import { ShoppingCart, TrendingUp, Package, DollarSign } from "lucide-react";

function YesterdayPurchasesChart() {
  // Static test data for yesterday's purchases
  const [yesterdayPurchaseData] = useState([
    { hour: "00:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "02:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "04:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "06:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "08:00", total: 120, electronics: 80, office: 25, supplies: 15 },
    { hour: "10:00", total: 280, electronics: 180, office: 70, supplies: 30 },
    { hour: "12:00", total: 420, electronics: 260, office: 100, supplies: 60 },
    { hour: "14:00", total: 320, electronics: 200, office: 70, supplies: 50 },
    { hour: "16:00", total: 380, electronics: 240, office: 80, supplies: 60 },
    { hour: "18:00", total: 300, electronics: 180, office: 90, supplies: 30 },
    { hour: "20:00", total: 240, electronics: 150, office: 60, supplies: 30 },
    { hour: "22:00", total: 120, electronics: 80, office: 25, supplies: 15 },
  ]);

  const [yesterdaySuppliersData] = useState([
    { supplier: "TechSupply Co", amount: 7200, orders: 10 },
    { supplier: "Office Depot", amount: 3600, orders: 6 },
    { supplier: "Global Electronics", amount: 5800, orders: 12 },
    { supplier: "Supply Chain Inc", amount: 2800, orders: 5 },
  ]);

  const [yesterdayCategoriesData] = useState([
    { category: "Electronics", amount: 10000, percentage: 42 },
    { category: "Office Supplies", amount: 7000, percentage: 29 },
    { category: "Raw Materials", amount: 3500, percentage: 15 },
    { category: "Services", amount: 2400, percentage: 10 },
  ]);

  const yesterdayStats = {
    totalAmount: 22900,
    purchaseCount: 33,
    itemsPurchased: 128,
    growthPercentage: -6.1,
    averagePurchaseValue: 693.94,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Yesterday&apos;s Purchases
            </h3>
            <p className="text-sm text-gray-500">
              Previous day procurement data
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">
            ${yesterdayStats.totalAmount.toLocaleString()}
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
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-xl font-bold text-gray-900">
                {yesterdayStats.purchaseCount}
              </p>
            </div>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="text-xl font-bold text-gray-900">
                {yesterdayStats.itemsPurchased}
              </p>
            </div>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order</p>
              <p className="text-xl font-bold text-gray-900">
                ${yesterdayStats.averagePurchaseValue}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-xl font-bold text-indigo-600">
                {yesterdayStats.growthPercentage > 0 ? "+" : ""}
                {yesterdayStats.growthPercentage}%
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Purchase Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Yesterday&apos;s Purchases by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={yesterdayPurchaseData}
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
              name="Total Purchases"
              stroke="#6366f1"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="electronics"
              name="Electronics"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="office"
              name="Office Supplies"
              stroke="#ffc658"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="supplies"
              name="Raw Materials"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Suppliers and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Top Suppliers
          </h4>
          <div className="space-y-3">
            {yesterdaySuppliersData.map((supplier, index) => (
              <div
                key={supplier.supplier}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {supplier.supplier}
                    </p>
                    <p className="text-sm text-gray-500">
                      {supplier.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${supplier.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Categories Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yesterdayCategoriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default YesterdayPurchasesChart;
