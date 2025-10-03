"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import { useData } from "../../hooks/UseData";
import { FilterModal } from "../../components/FilterModal";
import { FilteredDataDisplay } from "../../components/FilteredDataDisplay";
import { Button } from "../../components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  getDashboardCardsData,
  getSalesAnalyticsData,
  getPurchaseAnalyticsData,
  getExpenseAnalyticsData,
  getTopProductsData,
  getTopCustomersData,
  getPaymentMethodsData,
  getLowStockItems,
} from "../../actions/dashboard";

// Dashboard Cards Component
interface DashboardData {
  today: {
    sales: { total: number; growth: number; count: number };
    purchases: { total: number; growth: number; count: number };
    expenses: { total: number; growth: number; count: number };
    profit: { total: number; margin: number };
  };
}

function DashboardCards({ data }: { data: DashboardData | null }) {
  if (!data) return null;

  const cards = [
    {
      title: "Today's Sales",
      value: `$${data.today.sales.total.toFixed(2)}`,
      growth: data.today.sales.growth,
      count: data.today.sales.count,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Today's Purchases",
      value: `$${data.today.purchases.total.toFixed(2)}`,
      growth: data.today.purchases.growth,
      count: data.today.purchases.count,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Today's Expenses",
      value: `$${data.today.expenses.total.toFixed(2)}`,
      growth: data.today.expenses.growth,
      count: data.today.expenses.count,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Net Profit",
      value: `$${data.today.profit.total.toFixed(2)}`,
      margin: data.today.profit.margin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`p-6 rounded-lg ${card.bgColor} border`}>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            {card.title}
          </h3>
          <p className={`text-2xl font-bold ${card.color} mb-2`}>
            {card.value}
          </p>
          {card.growth !== undefined && (
            <p className="text-sm">
              <span
                className={card.growth >= 0 ? "text-green-600" : "text-red-600"}
              >
                {card.growth >= 0 ? "+" : ""}
                {card.growth.toFixed(1)}%
              </span>
              <span className="text-gray-500 ml-2">
                ({card.count} transactions)
              </span>
            </p>
          )}
          {card.margin !== undefined && (
            <p className="text-sm text-gray-600">
              Margin: {card.margin.toFixed(1)}%
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [dateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });

  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  interface FilteredData {
    sales: {
      total: number;
      count: number;
      items: number;
      growth: number;
      topProducts: Array<{
        _id: string;
        itemName: string;
        totalQuantity: number;
        totalRevenue: number;
      }>;
      payments: Array<{
        _id: string;
        totalAmount: number;
        count: number;
      }>;
    };
    purchases: {
      total: number;
      count: number;
      items: number;
      growth: number;
    };
    expenses: {
      total: number;
      count: number;
      categories: Array<{
        _id: string;
        amount: number;
      }>;
      growth: number;
    };
    profit: {
      total: number;
      gross: number;
      net: number;
      margin: number;
    };
    dateRange: {
      start: string;
      end: string;
    };
  }

  const [filteredData, setFilteredData] = useState<FilteredData | null>(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Data fetching hooks
  const [cardData, isLoadingCardData] = useData(
    getDashboardCardsData,
    () => {}
  );

  const [salesData] = useData(
    () => getSalesAnalyticsData(dateRange.start, dateRange.end),
    () => {}
  );

  const [purchasesData] = useData(
    () => getPurchaseAnalyticsData(dateRange.start, dateRange.end),
    () => {}
  );

  const [expensesData] = useData(
    () => getExpenseAnalyticsData(dateRange.start, dateRange.end),
    () => {}
  );

  const [topProductsData] = useData(
    () => getTopProductsData(dateRange.start, dateRange.end),
    () => {}
  );

  const [topCustomersData] = useData(
    () => getTopCustomersData(dateRange.start, dateRange.end),
    () => {}
  );

  const [paymentMethodsData] = useData(
    () => getPaymentMethodsData(dateRange.start, dateRange.end),
    () => {}
  );

  const [lowStockData] = useData(getLowStockItems, () => {});

  // Filter functions
  const handleFilter = async (filterDateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    if (!filterDateRange.from || !filterDateRange.to) return;

    setIsFilterLoading(true);

    try {
      // Simulate API call - in real app, this would fetch filtered data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate sample filtered data based on the project reference structure
      const sampleFilteredData = {
        sales: {
          total: 15750.0,
          count: 28,
          items: 45,
          growth: 12.5,
          topProducts: [
            {
              _id: "64f1a2b3c4d5e6f7a8b9c0d1",
              itemName: "Premium Coffee Beans",
              totalQuantity: 8,
              totalRevenue: 207.92,
            },
            {
              _id: "64f1a2b3c4d5e6f7a8b9c0d2",
              itemName: "Wireless Bluetooth Headphones",
              totalQuantity: 3,
              totalRevenue: 135.0,
            },
            {
              _id: "64f1a2b3c4d5e6f7a8b9c0d3",
              itemName: "Organic Green Tea",
              totalQuantity: 12,
              totalRevenue: 186.0,
            },
          ],
          payments: [
            { _id: "cash", totalAmount: 8500.0, count: 15 },
            { _id: "card", totalAmount: 6500.0, count: 10 },
            { _id: "bank_transfer", totalAmount: 750.0, count: 3 },
          ],
        },
        purchases: {
          total: 9200.0,
          count: 18,
          items: 25,
          growth: 8.3,
        },
        expenses: {
          total: 1850.0,
          count: 12,
          categories: [
            { _id: "rent", amount: 800.0 },
            { _id: "utilities", amount: 450.0 },
            { _id: "salaries", amount: 600.0 },
          ],
          growth: -5.2,
        },
        profit: {
          total: 4700.0,
          gross: 6550.0,
          net: 4700.0,
          margin: 29.84,
        },
        dateRange: {
          start: filterDateRange.from.toISOString(),
          end: filterDateRange.to.toISOString(),
        },
      };

      setFilteredData(sampleFilteredData);
    } catch (error) {
      console.error("Error filtering data:", error);
    } finally {
      setIsFilterLoading(false);
    }
  };

  const handleRefreshFilter = () => {
    if (filteredData) {
      // Re-apply the same filter
      const currentFilter = {
        from: new Date(filteredData.dateRange.start),
        to: new Date(filteredData.dateRange.end),
      };
      handleFilter(currentFilter);
    }
  };

  const handleExportFilter = () => {
    if (!filteredData) return;

    const dataToExport = {
      dateRange: filteredData.dateRange,
      data: filteredData,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `filtered-data-${
      filteredData.dateRange.start.split("T")[0]
    }-to-${filteredData.dateRange.end.split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoadingCardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">Business analytics and insights</p>
            </div>
            <Button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              Filter Data
            </Button>
          </div>
        </div>

        {/* Filtered Data Display - At the Top */}
        {filteredData && (
          <div className="mb-8">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-blue-500 rounded"></div>
                <h2 className="text-lg font-semibold text-blue-900">
                  Filtered Results
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Data filtered by your selected date range appears below
              </p>
            </div>
            <FilteredDataDisplay
              data={filteredData}
              isLoading={isFilterLoading}
              dateRange={{
                from: new Date(filteredData.dateRange.start),
                to: new Date(filteredData.dateRange.end),
              }}
              onRefresh={handleRefreshFilter}
              onExport={handleExportFilter}
            />
          </div>
        )}

        {/* Regular Dashboard Content */}
        <div className={filteredData ? "mt-12" : ""}>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-8 bg-gray-400 rounded"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Dashboard Overview
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              General dashboard metrics and analytics
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards data={cardData} />

        {/* Sales Analytics Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-green-500 rounded"></div>
            Sales Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salesData?.map(
              (
                sale: { _id: string; count: number; totalSales: number },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{sale._id}</h4>
                    <span className="text-sm text-gray-500">
                      {sale.count} transactions
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${sale.totalSales?.toFixed(2) || "0.00"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Purchase Analytics Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-blue-500 rounded"></div>
            Purchase Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasesData?.map(
              (
                purchase: {
                  _id: string;
                  count: number;
                  totalPurchases: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {purchase._id}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {purchase.count} transactions
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${purchase.totalPurchases?.toFixed(2) || "0.00"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Expense Analytics Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-red-500 rounded"></div>
            Expense Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expensesData?.map(
              (
                expense: { _id: string; count: number; totalExpenses: number },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{expense._id}</h4>
                    <span className="text-sm text-gray-500">
                      {expense.count} transactions
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    ${expense.totalExpenses?.toFixed(2) || "0.00"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Payment Methods Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-500 rounded"></div>
            Payment Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethodsData?.map(
              (
                payment: { _id: string; count: number; totalAmount: number },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 capitalize">
                      {payment._id?.replace("_", " ")}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {payment.count} transactions
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${payment.totalAmount?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {(
                      (payment.totalAmount /
                        (paymentMethodsData?.reduce(
                          (sum: number, p: { totalAmount: number }) =>
                            sum + p.totalAmount,
                          0
                        ) || 1)) *
                      100
                    ).toFixed(1)}
                    % of total
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Top Selling Products Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-orange-500 rounded"></div>
            Top Selling Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProductsData?.map(
              (
                product: {
                  itemName: string;
                  totalRevenue: number;
                  totalQuantity: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {product.itemName}
                    </h4>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    ${product.totalRevenue?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {product.totalQuantity} units sold
                  </div>
                  <div className="text-sm text-gray-500">
                    ${(product.totalRevenue / product.totalQuantity).toFixed(2)}{" "}
                    avg price
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Top Customers Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-indigo-500 rounded"></div>
            Top Customers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCustomersData?.map(
              (
                customer: {
                  name: string;
                  totalSpent: number;
                  transactionCount: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {customer.name}
                    </h4>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    ${customer.totalSpent?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {customer.transactionCount} transactions
                  </div>
                  <div className="text-sm text-gray-500">
                    $
                    {(customer.totalSpent / customer.transactionCount).toFixed(
                      2
                    )}{" "}
                    avg per transaction
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Low Stock Items Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-1 w-6 bg-yellow-500 rounded"></div>
            Low Stock Items
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockData?.map(
              (
                item: {
                  itemName: string;
                  currentStock: number;
                  lowStockThreshold: number;
                  lowStockStatus: string;
                  unitPrice: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {item.itemName}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.lowStockStatus === "critical"
                          ? "bg-red-100 text-red-800"
                          : item.lowStockStatus === "new"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.lowStockStatus}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {item.currentStock} units
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Threshold: {item.lowStockThreshold}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${item.unitPrice?.toFixed(2)} per unit
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        isLoading={isFilterLoading}
      />
    </Layout>
  );
}
