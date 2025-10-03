"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  PackageIcon,
  CreditCardIcon,
  BarChart3Icon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react";
import { format, isValid } from "date-fns";

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

interface FilteredDataDisplayProps {
  data: FilteredData | null;
  isLoading: boolean;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onRefresh?: () => void;
  onExport?: () => void;
}

export function FilteredDataDisplay({
  data,
  isLoading,
  dateRange,
  onRefresh,
  onExport,
}: FilteredDataDisplayProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date || !isValid(date)) return "N/A";
    return format(date, "PPP");
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading filtered data...</span>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <BarChart3Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Filter Applied</h3>
            <p className="text-muted-foreground">
              Use the filter button above to select a date range and view
              filtered data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Enhanced Styling */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BarChart3Icon className="h-5 w-5" />
                📊 Filtered Data Results
              </CardTitle>
              <CardDescription className="text-blue-700">
                📅 Data for {formatDate(dateRange.from)} to{" "}
                {formatDate(dateRange.to)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button
                  onClick={onRefresh}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <RefreshCwIcon className="h-4 w-4" />
                  Refresh
                </Button>
              )}
              {onExport && (
                <Button
                  onClick={onExport}
                  size="sm"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.sales.total)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {data.sales.growth > 0 ? (
                <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDownIcon className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={
                  data.sales.growth > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {formatPercentage(data.sales.growth)}
              </span>
              <span className="ml-1">growth</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.sales.count} transactions • {data.sales.items} items
            </div>
          </CardContent>
        </Card>

        {/* Purchases Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Purchases
            </CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.purchases.total)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {data.purchases.growth > 0 ? (
                <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDownIcon className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={
                  data.purchases.growth > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {formatPercentage(data.purchases.growth)}
              </span>
              <span className="ml-1">growth</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.purchases.count} transactions • {data.purchases.items} items
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.expenses.total)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {data.expenses.growth > 0 ? (
                <TrendingUpIcon className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <TrendingDownIcon className="h-3 w-3 text-green-500 mr-1" />
              )}
              <span
                className={
                  data.expenses.growth > 0 ? "text-red-500" : "text-green-500"
                }
              >
                {formatPercentage(data.expenses.growth)}
              </span>
              <span className="ml-1">growth</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.expenses.count} transactions
            </div>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.profit.net)}
            </div>
            <div className="text-xs text-muted-foreground">
              {data.profit.margin.toFixed(1)}% profit margin
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Gross: {formatCurrency(data.profit.gross)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Selling Products</CardTitle>
            <CardDescription>
              Best performing products in the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.sales.topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    >
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{product.itemName}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.totalQuantity} units sold
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(product.totalRevenue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(
                        product.totalRevenue / product.totalQuantity
                      )}{" "}
                      avg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Revenue breakdown by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.sales.payments.map((payment) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium capitalize">
                        {payment._id.replace("_", " ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {payment.count} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(payment.totalAmount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {((payment.totalAmount / data.sales.total) * 100).toFixed(
                        1
                      )}
                      %
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Expense Categories</CardTitle>
          <CardDescription>Breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.expenses.categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <div className="font-medium capitalize">
                    {category._id.replace("_", " ")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {((category.amount / data.expenses.total) * 100).toFixed(1)}
                    % of total
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
