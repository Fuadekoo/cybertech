"use client";

import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, DollarSign, Percent, Target } from "lucide-react";

function TodayProfitChart() {
  // Static test data for today's profit
  const [profitData] = useState([
    { hour: "00:00", gross: 0, net: 0, margin: 0, revenue: 0, expenses: 0 },
    { hour: "02:00", gross: 0, net: 0, margin: 0, revenue: 0, expenses: 0 },
    { hour: "04:00", gross: 0, net: 0, margin: 0, revenue: 0, expenses: 0 },
    { hour: "06:00", gross: 0, net: 0, margin: 0, revenue: 0, expenses: 0 },
    {
      hour: "08:00",
      gross: 1200,
      net: 800,
      margin: 66.7,
      revenue: 1800,
      expenses: 200,
    },
    {
      hour: "10:00",
      gross: 2800,
      net: 1900,
      margin: 67.9,
      revenue: 4200,
      expenses: 350,
    },
    {
      hour: "12:00",
      gross: 4500,
      net: 3000,
      margin: 66.7,
      revenue: 6800,
      expenses: 480,
    },
    {
      hour: "14:00",
      gross: 3200,
      net: 2100,
      margin: 65.6,
      revenue: 4800,
      expenses: 180,
    },
    {
      hour: "16:00",
      gross: 3800,
      net: 2500,
      margin: 65.8,
      revenue: 5700,
      expenses: 250,
    },
    {
      hour: "18:00",
      gross: 5200,
      net: 3400,
      margin: 65.4,
      revenue: 7800,
      expenses: 120,
    },
    {
      hour: "20:00",
      gross: 6800,
      net: 4400,
      margin: 64.7,
      revenue: 10200,
      expenses: 80,
    },
    {
      hour: "22:00",
      gross: 4200,
      net: 2700,
      margin: 64.3,
      revenue: 6300,
      expenses: 50,
    },
  ]);

  const [profitBreakdown] = useState([
    { category: "Product Sales", gross: 18000, net: 12000, margin: 66.7 },
    { category: "Service Revenue", gross: 8000, net: 5200, margin: 65.0 },
    { category: "Consulting", gross: 4000, net: 2800, margin: 70.0 },
    { category: "Other Income", gross: 2000, net: 1400, margin: 70.0 },
  ]);

  const [marginTrend] = useState([
    { period: "Q1", margin: 62.5 },
    { period: "Q2", margin: 64.2 },
    { period: "Q3", margin: 65.8 },
    { period: "Q4", margin: 66.7 },
  ]);

  const todayStats = {
    totalRevenue: 32000,
    totalExpenses: 5000,
    grossProfit: 27000,
    netProfit: 22000,
    grossMargin: 84.4,
    netMargin: 68.8,
    growthPercentage: 15.3,
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
              Today&apos;s Profit
            </h3>
            <p className="text-sm text-gray-500">
              Revenue and profitability analysis
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${todayStats.netProfit.toLocaleString()}
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
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                ${todayStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gross Profit</p>
              <p className="text-xl font-bold text-gray-900">
                ${todayStats.grossProfit.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Margin</p>
              <p className="text-xl font-bold text-gray-900">
                {todayStats.netMargin}%
              </p>
            </div>
            <Percent className="w-5 h-5 text-gray-400" />
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
            <Target className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>

      {/* Profit Chart */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-4">
          Profit by Hour
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={profitData}
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
            <Area
              type="monotone"
              dataKey="gross"
              name="Gross Profit"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="net"
              name="Net Profit"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Profit Breakdown and Margin Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Profit by Category
          </h4>
          <div className="space-y-3">
            {profitBreakdown.map((item) => (
              <div key={item.category} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{item.category}</h5>
                  <span className="text-sm font-semibold text-green-600">
                    {item.margin}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Gross: ${item.gross.toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    Net: ${item.net.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.margin}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Margin Trend
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={marginTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Margin"]} />
              <Bar dataKey="margin" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Gross Margin</p>
              <p className="text-2xl font-bold text-green-700">
                {todayStats.grossMargin}%
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Net Margin</p>
              <p className="text-2xl font-bold text-blue-700">
                {todayStats.netMargin}%
              </p>
            </div>
            <Percent className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Profit Growth
              </p>
              <p className="text-2xl font-bold text-purple-700">
                +{todayStats.growthPercentage}%
              </p>
            </div>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayProfitChart;
