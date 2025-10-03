"use client";

import * as React from "react";
import { CalendarFilter } from "@/components/CalendarFilter";
import { DataDisplay } from "@/components/DataDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon, DownloadIcon } from "lucide-react";

// Sample data based on the project reference
const sampleData = {
  "2024-01-01": {
    sales: {
      total: 12000.0,
      count: 20,
      items: 35,
      growth: 8.5,
      topProducts: [
        {
          _id: "1",
          itemName: "Premium Coffee Beans",
          totalQuantity: 5,
          totalRevenue: 129.95,
        },
        {
          _id: "2",
          itemName: "Wireless Headphones",
          totalQuantity: 2,
          totalRevenue: 90.0,
        },
        {
          _id: "3",
          itemName: "Organic Green Tea",
          totalQuantity: 8,
          totalRevenue: 124.0,
        },
      ],
      payments: [
        { _id: "cash", totalAmount: 6000.0, count: 10 },
        { _id: "card", totalAmount: 4800.0, count: 8 },
        { _id: "bank_transfer", totalAmount: 1200.0, count: 2 },
      ],
    },
    purchases: {
      total: 8500.0,
      count: 12,
      items: 18,
      growth: 5.2,
    },
    expenses: {
      total: 1800.0,
      count: 10,
      categories: [
        { _id: "rent", amount: 800.0 },
        { _id: "utilities", amount: 450.0 },
        { _id: "salaries", amount: 550.0 },
      ],
      growth: -2.1,
    },
    profit: {
      total: 1700.0,
      gross: 3500.0,
      net: 1700.0,
      margin: 14.17,
    },
  },
  "2024-01-02": {
    sales: {
      total: 13500.0,
      count: 22,
      items: 38,
      growth: 12.5,
      topProducts: [
        {
          _id: "1",
          itemName: "Premium Coffee Beans",
          totalQuantity: 6,
          totalRevenue: 155.94,
        },
        {
          _id: "2",
          itemName: "Wireless Headphones",
          totalQuantity: 3,
          totalRevenue: 135.0,
        },
        {
          _id: "3",
          itemName: "Organic Green Tea",
          totalQuantity: 10,
          totalRevenue: 155.0,
        },
      ],
      payments: [
        { _id: "cash", totalAmount: 6750.0, count: 11 },
        { _id: "card", totalAmount: 5400.0, count: 9 },
        { _id: "bank_transfer", totalAmount: 1350.0, count: 2 },
      ],
    },
    purchases: {
      total: 9200.0,
      count: 15,
      items: 22,
      growth: 8.2,
    },
    expenses: {
      total: 1950.0,
      count: 12,
      categories: [
        { _id: "rent", amount: 800.0 },
        { _id: "utilities", amount: 500.0 },
        { _id: "salaries", amount: 650.0 },
      ],
      growth: 8.3,
    },
    profit: {
      total: 2350.0,
      gross: 4300.0,
      net: 2350.0,
      margin: 17.41,
    },
  },
  "2024-01-15": {
    sales: {
      total: 15750.0,
      count: 28,
      items: 45,
      growth: 12.5,
      topProducts: [
        {
          _id: "1",
          itemName: "Premium Coffee Beans",
          totalQuantity: 8,
          totalRevenue: 207.92,
        },
        {
          _id: "2",
          itemName: "Wireless Bluetooth Headphones",
          totalQuantity: 3,
          totalRevenue: 135.0,
        },
        {
          _id: "3",
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
  },
};

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export default function FilterPage() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  });
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

  const [filteredData, setFilteredData] = React.useState<FilteredData | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  const handleFilter = async () => {
    if (!dateRange.from || !dateRange.to) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filter sample data based on date range
    const filteredResults = filterDataByDateRange(dateRange.from, dateRange.to);
    setFilteredData(filteredResults);

    setIsLoading(false);
  };

  const filterDataByDateRange = (startDate: Date, endDate: Date) => {
    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    // For demo purposes, we'll aggregate the sample data
    // In a real app, this would be an API call
    const availableDates = Object.keys(sampleData);
    const datesInRange = availableDates.filter(
      (date) => date >= startDateStr && date <= endDateStr
    );

    if (datesInRange.length === 0) {
      return null;
    }

    // Aggregate data from all dates in range
    const aggregatedData = datesInRange.reduce(
      (acc, date) => {
        const dayData = sampleData[date as keyof typeof sampleData];

        return {
          sales: {
            total: acc.sales.total + dayData.sales.total,
            count: acc.sales.count + dayData.sales.count,
            items: acc.sales.items + dayData.sales.items,
            growth: acc.sales.growth, // Keep the latest growth
            topProducts: mergeTopProducts(
              acc.sales.topProducts,
              dayData.sales.topProducts
            ),
            payments: mergePayments(acc.sales.payments, dayData.sales.payments),
          },
          purchases: {
            total: acc.purchases.total + dayData.purchases.total,
            count: acc.purchases.count + dayData.purchases.count,
            items: acc.purchases.items + dayData.purchases.items,
            growth: acc.purchases.growth,
          },
          expenses: {
            total: acc.expenses.total + dayData.expenses.total,
            count: acc.expenses.count + dayData.expenses.count,
            categories: mergeExpenseCategories(
              acc.expenses.categories,
              dayData.expenses.categories
            ),
            growth: acc.expenses.growth,
          },
          profit: {
            total: acc.profit.total + dayData.profit.total,
            gross: acc.profit.gross + dayData.profit.gross,
            net: acc.profit.net + dayData.profit.net,
            margin:
              ((acc.profit.net + dayData.profit.net) /
                (acc.profit.gross + dayData.profit.gross)) *
              100,
          },
        };
      },
      {
        sales: {
          total: 0,
          count: 0,
          items: 0,
          growth: 0,
          topProducts: [],
          payments: [],
        },
        purchases: { total: 0, count: 0, items: 0, growth: 0 },
        expenses: { total: 0, count: 0, categories: [], growth: 0 },
        profit: { total: 0, gross: 0, net: 0, margin: 0 },
      }
    );

    return {
      ...aggregatedData,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    };
  };

  const mergeTopProducts = (
    existing: Array<{
      _id: string;
      totalQuantity: number;
      totalRevenue: number;
    }>,
    newProducts: Array<{
      _id: string;
      totalQuantity: number;
      totalRevenue: number;
    }>
  ) => {
    const merged = [...existing];
    newProducts.forEach((product) => {
      const existingProduct = merged.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.totalQuantity += product.totalQuantity;
        existingProduct.totalRevenue += product.totalRevenue;
      } else {
        merged.push(product);
      }
    });
    return merged.sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
  };

  const mergePayments = (
    existing: Array<{ _id: string; totalAmount: number; count: number }>,
    newPayments: Array<{ _id: string; totalAmount: number; count: number }>
  ) => {
    const merged = [...existing];
    newPayments.forEach((payment) => {
      const existingPayment = merged.find((p) => p._id === payment._id);
      if (existingPayment) {
        existingPayment.totalAmount += payment.totalAmount;
        existingPayment.count += payment.count;
      } else {
        merged.push(payment);
      }
    });
    return merged;
  };

  const mergeExpenseCategories = (
    existing: Array<{ _id: string; amount: number }>,
    newCategories: Array<{ _id: string; amount: number }>
  ) => {
    const merged = [...existing];
    newCategories.forEach((category) => {
      const existingCategory = merged.find((c) => c._id === category._id);
      if (existingCategory) {
        existingCategory.amount += category.amount;
      } else {
        merged.push(category);
      }
    });
    return merged;
  };

  const handleRefresh = () => {
    if (dateRange.from && dateRange.to) {
      handleFilter();
    }
  };

  const handleExport = () => {
    if (!filteredData) return;

    const dataToExport = {
      dateRange: {
        start: dateRange.from?.toISOString(),
        end: dateRange.to?.toISOString(),
      },
      data: filteredData,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `filtered-data-${
      dateRange.from?.toISOString().split("T")[0]
    }-to-${dateRange.to?.toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Data Filter Dashboard
          </h1>
          <p className="text-muted-foreground">
            Filter and analyze your business data by date range
          </p>
        </div>

        {/* Calendar Filter */}
        <CalendarFilter
          onDateRangeChange={handleDateRangeChange}
          onFilter={handleFilter}
          isLoading={isLoading}
        />

        {/* Action Buttons */}
        {filteredData && (
          <Card>
            <CardContent className="flex items-center justify-center gap-4 p-4">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCwIcon className="h-4 w-4" />
                Refresh Data
              </Button>
              <Button
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Data Display */}
        <DataDisplay
          data={filteredData}
          isLoading={isLoading}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
}
