"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Receipt,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

interface ComparisonData {
  today: number;
  yesterday: number;
  change: number;
  changePercent: number;
}

interface YesterdayComparisonProps {
  title: string;
  data: {
    sales: ComparisonData;
    purchases: ComparisonData;
    expenses: ComparisonData;
    profit: ComparisonData;
  };
}

function YesterdayComparison({ title, data }: YesterdayComparisonProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeBgColor = (change: number) => {
    if (change > 0) return "bg-green-50 border-green-200";
    if (change < 0) return "bg-red-50 border-red-200";
    return "bg-gray-50 border-gray-200";
  };

  const metrics = [
    {
      title: "Sales",
      icon: ShoppingCart,
      today: data.sales.today,
      yesterday: data.sales.yesterday,
      change: data.sales.change,
      changePercent: data.sales.changePercent,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Purchases",
      icon: Receipt,
      today: data.purchases.today,
      yesterday: data.purchases.yesterday,
      change: data.purchases.change,
      changePercent: data.purchases.changePercent,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Expenses",
      icon: DollarSign,
      today: data.expenses.today,
      yesterday: data.expenses.yesterday,
      change: data.expenses.change,
      changePercent: data.expenses.changePercent,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Profit",
      icon: Target,
      today: data.profit.today,
      yesterday: data.profit.yesterday,
      change: data.profit.change,
      changePercent: data.profit.changePercent,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">Yesterday vs Today comparison</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getChangeBgColor(
                metric.change
              )}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {getChangeIcon(metric.change)}
                  <span
                    className={`text-sm font-medium ${getChangeColor(
                      metric.change
                    )}`}
                  >
                    {metric.changePercent > 0 ? "+" : ""}
                    {metric.changePercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Today</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(metric.today)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Yesterday</p>
                  <p className="text-sm font-medium text-gray-700">
                    {formatCurrency(metric.yesterday)}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Change</span>
                    <span
                      className={`text-xs font-medium ${getChangeColor(
                        metric.change
                      )}`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {formatCurrency(metric.change)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Best Performer
              </p>
              <p className="text-lg font-bold text-blue-700">
                {data.profit.changePercent > 0 ? "Profit" : "Sales"}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Growth</p>
              <p className="text-lg font-bold text-green-700">
                +
                {(
                  (data.sales.changePercent + data.profit.changePercent) /
                  2
                ).toFixed(1)}
                %
              </p>
            </div>
            <Target className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Net Change</p>
              <p className="text-lg font-bold text-purple-700">
                {formatCurrency(
                  data.sales.change + data.profit.change - data.expenses.change
                )}
              </p>
            </div>
            <DollarSign className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YesterdayComparison;
