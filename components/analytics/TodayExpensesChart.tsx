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

function TodayExpensesChart() {
  // Static test data for today's expenses
  const [expenseData] = useState([
    { hour: "00:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "02:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "04:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    { hour: "06:00", total: 0, rent: 0, utilities: 0, supplies: 0, other: 0 },
    {
      hour: "08:00",
      total: 200,
      rent: 0,
      utilities: 50,
      supplies: 100,
      other: 50,
    },
    {
      hour: "10:00",
      total: 150,
      rent: 0,
      utilities: 0,
      supplies: 80,
      other: 70,
    },
    {
      hour: "12:00",
      total: 300,
      rent: 0,
      utilities: 100,
      supplies: 120,
      other: 80,
    },
    {
      hour: "14:00",
      total: 180,
      rent: 0,
      utilities: 0,
      supplies: 90,
      other: 90,
    },
    {
      hour: "16:00",
      total: 250,
      rent: 0,
      utilities: 80,
      supplies: 100,
      other: 70,
    },
    {
      hour: "18:00",
      total: 120,
      rent: 0,
      utilities: 0,
      supplies: 60,
      other: 60,
    },
    {
      hour: "20:00",
      total: 80,
      rent: 0,
      utilities: 0,
      supplies: 40,
      other: 40,
    },
    {
      hour: "22:00",
      total: 50,
      rent: 0,
      utilities: 0,
      supplies: 25,
      other: 25,
    },
  ]);

  const [categoriesData] = useState([
    { category: "Rent", amount: 2000, percentage: 40, color: "#8884d8" },
    { category: "Utilities", amount: 800, percentage: 16, color: "#82ca9d" },
    { category: "Supplies", amount: 1200, percentage: 24, color: "#ffc658" },
    { category: "Marketing", amount: 600, percentage: 12, color: "#ff7300" },
    { category: "Other", amount: 400, percentage: 8, color: "#ff8042" },
  ]);

  const [recentExpenses] = useState([
    {
      description: "Office Rent",
      amount: 2000,
      category: "Rent",
      time: "09:00",
    },
    {
      description: "Electricity Bill",
      amount: 350,
      category: "Utilities",
      time: "10:30",
    },
    {
      description: "Office Supplies",
      amount: 180,
      category: "Supplies",
      time: "11:15",
    },
    {
      description: "Internet Service",
      amount: 120,
      category: "Utilities",
      time: "12:00",
    },
    {
      description: "Marketing Campaign",
      amount: 450,
      category: "Marketing",
      time: "14:30",
    },
    {
      description: "Cleaning Service",
      amount: 200,
      category: "Other",
      time: "16:00",
    },
  ]);

  const todayStats = {
    totalAmount: 5000,
    expenseCount: 18,
    categoriesCount: 5,
    growthPercentage: -5.2,
    averageExpenseValue: 277.78,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Receipt className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Today's Expenses
            </h3>
            <p className="text-sm text-gray-500">
              Cost management and tracking
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">
            ${todayStats.totalAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {todayStats.growthPercentage > 0 ? "+" : ""}
            {todayStats.growthPercentage}% from yesterday
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
                {todayStats.expenseCount}
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
                {todayStats.categoriesCount}
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
                ${todayStats.averageExpenseValue}
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
                  todayStats.growthPercentage > 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {todayStats.growthPercentage > 0 ? "+" : ""}
                {todayStats.growthPercentage}%
              </p>
            </div>
            <TrendingDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expense Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Expenses by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={expenseData}
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
              stroke="#ff7300"
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
                data={categoriesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
                label={({ category, percentage }) =>
                  `${category}: ${percentage}%`
                }
              >
                {categoriesData.map((entry, index) => (
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
            {recentExpenses.map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
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

export default TodayExpensesChart;
