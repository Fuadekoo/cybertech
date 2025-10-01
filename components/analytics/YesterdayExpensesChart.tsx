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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Receipt, TrendingDown, DollarSign, AlertCircle } from "lucide-react";

function YesterdayExpensesChart() {
  // Static test data for yesterday's expenses
  const [yesterdayExpenseData] = useState([
    { hour: "00:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "02:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "04:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "06:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    {
      hour: "08:00",
      total: 180,
      rent: 0,
      utilities: 45,
      supplies: 90,
      other: 45,
    },
    {
      hour: "10:00",
      total: 140,
      rent: 0,
      utilities: 0,
      supplies: 70,
      other: 70,
    },
    {
      hour: "12:00",
      total: 280,
      rent: 0,
      utilities: 90,
      supplies: 110,
      other: 80,
    },
    {
      hour: "14:00",
      total: 160,
      rent: 0,
      utilities: 0,
      supplies: 80,
      other: 80,
    },
    {
      hour: "16:00",
      total: 220,
      rent: 0,
      utilities: 70,
      supplies: 90,
      other: 60,
    },
    {
      hour: "18:00",
      total: 110,
      rent: 0,
      utilities: 0,
      supplies: 55,
      other: 55,
    },
    {
      hour: "20:00",
      total: 70,
      rent: 0,
      utilities: 0,
      supplies: 35,
      other: 35,
    },
    {
      hour: "22:00",
      total: 45,
      rent: 0,
      utilities: 0,
      supplies: 22,
      other: 23,
    },
  ]);

  const [yesterdayCategoriesData] = useState([
    { category: "Rent", amount: 2000, percentage: 40, color: "#8884d8" },
    { category: "Utilities", amount: 700, percentage: 14, color: "#82ca9d" },
    { category: "Supplies", amount: 1100, percentage: 22, color: "#ffc658" },
    { category: "Marketing", amount: 550, percentage: 11, color: "#ff7300" },
    { category: "Other", amount: 350, percentage: 7, color: "#ff8042" },
  ]);

  const [yesterdayRecentExpenses] = useState([
    {
      description: "Office Rent",
      amount: 2000,
      category: "Rent",
      time: "09:00",
    },
    {
      description: "Electricity Bill",
      amount: 320,
      category: "Utilities",
      time: "10:30",
    },
    {
      description: "Office Supplies",
      amount: 160,
      category: "Supplies",
      time: "11:15",
    },
    {
      description: "Internet Service",
      amount: 110,
      category: "Utilities",
      time: "12:00",
    },
    {
      description: "Marketing Campaign",
      amount: 420,
      category: "Marketing",
      time: "14:30",
    },
    {
      description: "Cleaning Service",
      amount: 180,
      category: "Other",
      time: "16:00",
    },
  ]);

  const yesterdayStats = {
    totalAmount: 4700,
    expenseCount: 16,
    categoriesCount: 5,
    growthPercentage: -2.1,
    averageExpenseValue: 293.75,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-100 rounded-lg">
            <Receipt className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Yesterday's Expenses
            </h3>
            <p className="text-sm text-gray-500">
              Previous day cost management
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rose-600">
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
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-xl font-bold text-gray-900">
                {yesterdayStats.expenseCount}
              </p>
            </div>
            <Receipt className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">
                {yesterdayStats.categoriesCount}
              </p>
            </div>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Expense</p>
              <p className="text-xl font-bold text-gray-900">
                ${yesterdayStats.averageExpenseValue}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Change</p>
              <p
                className={`text-xl font-bold ${
                  yesterdayStats.growthPercentage > 0
                    ? "text-rose-600"
                    : "text-green-600"
                }`}
              >
                {yesterdayStats.growthPercentage > 0 ? "+" : ""}
                {yesterdayStats.growthPercentage}%
              </p>
            </div>
            <TrendingDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expense Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Yesterday's Expenses by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={yesterdayExpenseData}
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
              name="Total Expenses"
              stroke="#f43f5e"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="utilities"
              name="Utilities"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="supplies"
              name="Supplies"
              stroke="#ffc658"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="other"
              name="Other"
              stroke="#ff8042"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Categories and Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Expense Categories
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={yesterdayCategoriesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
                label={({ category, percentage }) =>
                  `${category}: ${percentage}%`
                }
              >
                {yesterdayCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Recent Expenses
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {yesterdayRecentExpenses.map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {expense.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.category} • {expense.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${expense.amount}
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

export default YesterdayExpensesChart;
