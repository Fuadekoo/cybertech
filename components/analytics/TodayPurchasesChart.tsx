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

function TodayPurchasesChart() {
  // Static test data for today's purchases
  const [purchaseData] = useState([
    { hour: "00:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "02:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "04:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "06:00", total: 0, electronics: 0, office: 0, supplies: 0 },
    { hour: "08:00", total: 150, electronics: 100, office: 30, supplies: 20 },
    { hour: "10:00", total: 320, electronics: 200, office: 80, supplies: 40 },
    { hour: "12:00", total: 480, electronics: 300, office: 120, supplies: 60 },
    { hour: "14:00", total: 380, electronics: 250, office: 80, supplies: 50 },
    { hour: "16:00", total: 420, electronics: 280, office: 90, supplies: 50 },
    { hour: "18:00", total: 350, electronics: 200, office: 100, supplies: 50 },
    { hour: "20:00", total: 280, electronics: 180, office: 70, supplies: 30 },
    { hour: "22:00", total: 150, electronics: 100, office: 30, supplies: 20 },
  ]);

  const [suppliersData] = useState([
    { supplier: "TechSupply Co", amount: 8500, orders: 12 },
    { supplier: "Office Depot", amount: 4200, orders: 8 },
    { supplier: "Global Electronics", amount: 6800, orders: 15 },
    { supplier: "Supply Chain Inc", amount: 3200, orders: 6 },
  ]);

  const [categoriesData] = useState([
    { category: "Electronics", amount: 12000, percentage: 45 },
    { category: "Office Supplies", amount: 8000, percentage: 30 },
    { category: "Raw Materials", amount: 4000, percentage: 15 },
    { category: "Services", amount: 2800, percentage: 10 },
  ]);

  const todayStats = {
    totalAmount: 26800,
    purchaseCount: 41,
    itemsPurchased: 156,
    growthPercentage: 8.3,
    averagePurchaseValue: 653.66,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Today&apos;s Purchases
            </h3>
            <p className="text-sm text-gray-500">
              Procurement and supply chain
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            ${todayStats.totalAmount.toLocaleString()}
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
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-xl font-bold text-gray-900">
                {todayStats.purchaseCount}
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
                {todayStats.itemsPurchased}
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
                ${todayStats.averagePurchaseValue}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-xl font-bold text-blue-600">
                +{todayStats.growthPercentage}%
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Purchase Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Purchases by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={purchaseData}
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
              stroke="#8884d8"
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
            {suppliersData.map((supplier, index) => (
              <div
                key={supplier.supplier}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
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
            <BarChart data={categoriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TodayPurchasesChart;
