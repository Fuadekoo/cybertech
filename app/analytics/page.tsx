"use client";

import Layout from "../../components/Layout";
import TodaySalesChart from "../../components/analytics/TodaySalesChart";
import TodayPurchasesChart from "../../components/analytics/TodayPurchasesChart";
import TodayExpensesChart from "../../components/analytics/TodayExpensesChart";
import TodayProfitChart from "../../components/analytics/TodayProfitChart";
import YesterdayComparison from "../../components/analytics/YesterdayComparison";
import YesterdaySalesChart from "../../components/analytics/YesterdaySalesChart";
import YesterdayPurchasesChart from "../../components/analytics/YesterdayPurchasesChart";
import YesterdayExpensesChart from "../../components/analytics/YesterdayExpensesChart";

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Business Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis of your business performance
          </p>
        </div>

        {/* Yesterday vs Today Comparison */}
        <YesterdayComparison
          title="Yesterday vs Today Comparison"
          data={{
            sales: {
              today: 28400,
              yesterday: 25200,
              change: 3200,
              changePercent: 12.7,
            },
            purchases: {
              today: 26800,
              yesterday: 22900,
              change: 3900,
              changePercent: 17.0,
            },
            expenses: {
              today: 5000,
              yesterday: 4700,
              change: 300,
              changePercent: 6.4,
            },
            profit: {
              today: 22000,
              yesterday: 19000,
              change: 3000,
              changePercent: 15.8,
            },
          }}
        />

        {/* Today's Analytics Grid */}
        <div className="space-y-8 mt-8">
          {/* Sales Analytics */}
          <TodaySalesChart />

          {/* Purchases Analytics */}
          <TodayPurchasesChart />

          {/* Expenses Analytics */}
          <TodayExpensesChart />

          {/* Profit Analytics */}
          <TodayProfitChart />
        </div>

        {/* Yesterday's Analytics Grid */}
        <div className="space-y-8 mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Yesterday&apos;s Data
            </h2>
            <p className="text-gray-600">
              Previous day performance for comparison
            </p>
          </div>

          {/* Yesterday Sales Analytics */}
          <YesterdaySalesChart />

          {/* Yesterday Purchases Analytics */}
          <YesterdayPurchasesChart />

          {/* Yesterday Expenses Analytics */}
          <YesterdayExpensesChart />
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$28,400</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                +12.5% from yesterday
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">$5,000</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-red-600">-5.2% from yesterday</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-gray-900">$22,000</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                +15.3% from yesterday
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">68.8%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                +2.1% from yesterday
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
