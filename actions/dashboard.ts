"use server";

import prisma from "@/lib/db";

// Dashboard Cards Data
export async function getDashboardCardsData() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Get today's data
  const todaySales = await prisma.sales.aggregate({
    where: {
      createdAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const todayPurchases = await prisma.purchase.aggregate({
    where: {
      createdAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const todayExpenses = await prisma.expense.aggregate({
    where: {
      date: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
    _sum: { amount: true },
    _count: { id: true },
  });

  // Get yesterday's data for comparison
  const yesterdaySales = await prisma.sales.aggregate({
    where: {
      createdAt: {
        gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        lt: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate() + 1
        ),
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const yesterdayPurchases = await prisma.purchase.aggregate({
    where: {
      createdAt: {
        gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        lt: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate() + 1
        ),
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const yesterdayExpenses = await prisma.expense.aggregate({
    where: {
      date: {
        gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        lt: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate() + 1
        ),
      },
    },
    _sum: { amount: true },
    _count: { id: true },
  });

  // Calculate growth percentages
  const salesGrowth = yesterdaySales._sum.totalAmount
    ? (((todaySales._sum.totalAmount || 0) -
        (yesterdaySales._sum.totalAmount || 0)) /
        yesterdaySales._sum.totalAmount) *
      100
    : 0;

  const purchaseGrowth = yesterdayPurchases._sum.totalAmount
    ? (((todayPurchases._sum.totalAmount || 0) -
        (yesterdayPurchases._sum.totalAmount || 0)) /
        yesterdayPurchases._sum.totalAmount) *
      100
    : 0;

  const expenseGrowth = yesterdayExpenses._sum.amount
    ? (((todayExpenses._sum.amount || 0) -
        (yesterdayExpenses._sum.amount || 0)) /
        yesterdayExpenses._sum.amount) *
      100
    : 0;

  // Calculate profit
  const grossProfit =
    (todaySales._sum.totalAmount || 0) - (todayPurchases._sum.totalAmount || 0);
  const netProfit = grossProfit - (todayExpenses._sum.amount || 0);
  const profitMargin = todaySales._sum.totalAmount
    ? (netProfit / todaySales._sum.totalAmount) * 100
    : 0;

  return {
    today: {
      sales: {
        total: todaySales._sum.totalAmount || 0,
        count: todaySales._count.id || 0,
        growth: salesGrowth,
      },
      purchases: {
        total: todayPurchases._sum.totalAmount || 0,
        count: todayPurchases._count.id || 0,
        growth: purchaseGrowth,
      },
      expenses: {
        total: todayExpenses._sum.amount || 0,
        count: todayExpenses._count.id || 0,
        growth: expenseGrowth,
      },
      profit: {
        total: netProfit,
        gross: grossProfit,
        net: netProfit,
        margin: profitMargin,
      },
    },
    yesterday: {
      sales: {
        total: yesterdaySales._sum.totalAmount || 0,
        count: yesterdaySales._count.id || 0,
      },
      purchases: {
        total: yesterdayPurchases._sum.totalAmount || 0,
        count: yesterdayPurchases._count.id || 0,
      },
      expenses: {
        total: yesterdayExpenses._sum.amount || 0,
        count: yesterdayExpenses._count.id || 0,
      },
      profit: {
        total:
          (yesterdaySales._sum.totalAmount || 0) -
          (yesterdayPurchases._sum.totalAmount || 0) -
          (yesterdayExpenses._sum.amount || 0),
        gross:
          (yesterdaySales._sum.totalAmount || 0) -
          (yesterdayPurchases._sum.totalAmount || 0),
        net:
          (yesterdaySales._sum.totalAmount || 0) -
          (yesterdayPurchases._sum.totalAmount || 0) -
          (yesterdayExpenses._sum.amount || 0),
        margin: yesterdaySales._sum.totalAmount
          ? (((yesterdaySales._sum.totalAmount || 0) -
              (yesterdayPurchases._sum.totalAmount || 0) -
              (yesterdayExpenses._sum.amount || 0)) /
              yesterdaySales._sum.totalAmount) *
            100
          : 0,
      },
    },
  };
}

// Sales Analytics Data
export async function getSalesAnalyticsData(startDate: Date, endDate: Date) {
  const salesData = await prisma.sales.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      totalAmount: true,
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return salesData.map((item) => ({
    _id: item.createdAt.toISOString().split("T")[0],
    totalSales: item._sum.totalAmount || 0,
    count: item._count.id || 0,
  }));
}

// Purchase Analytics Data
export async function getPurchaseAnalyticsData(startDate: Date, endDate: Date) {
  const purchaseData = await prisma.purchase.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      totalAmount: true,
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return purchaseData.map((item) => ({
    _id: item.createdAt.toISOString().split("T")[0],
    totalPurchases: item._sum.totalAmount || 0,
    count: item._count.id || 0,
  }));
}

// Expense Analytics Data
export async function getExpenseAnalyticsData(startDate: Date, endDate: Date) {
  const expenseData = await prisma.expense.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return expenseData.map((item) => ({
    _id: item.date.toISOString().split("T")[0],
    totalExpenses: item._sum.amount || 0,
    count: item._count.id || 0,
  }));
}

// Top Products Data
export async function getTopProductsData(startDate: Date, endDate: Date) {
  const topProducts = await prisma.salesItem.groupBy({
    by: ["productId", "variantId"],
    where: {
      sales: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    _sum: {
      quantity: true,
      totalPrice: true,
    },
    orderBy: {
      _sum: {
        totalPrice: "desc",
      },
    },
    take: 5,
  });

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: topProducts.map((p) => p.productId),
      },
    },
    include: {
      variants: {
        where: {
          id: {
            in: topProducts.map((p) => p.variantId),
          },
        },
      },
    },
  });

  return topProducts.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);

    return {
      _id: item.productId,
      itemName: variant?.variantName || product?.itemName || "Unknown Product",
      totalQuantity: item._sum.quantity || 0,
      totalRevenue: item._sum.totalPrice || 0,
    };
  });
}

// Top Customers Data
export async function getTopCustomersData(startDate: Date, endDate: Date) {
  const topCustomers = await prisma.customer.findMany({
    where: {
      sales: {
        some: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
    include: {
      sales: {
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
    orderBy: {
      totalSpent: "desc",
    },
    take: 5,
  });

  return topCustomers.map((customer) => ({
    _id: customer.id,
    name: customer.name,
    totalSpent: customer.totalSpent,
    transactionCount: customer.transactionCount,
  }));
}

// Payment Methods Data
export async function getPaymentMethodsData(startDate: Date, endDate: Date) {
  const paymentData = await prisma.sales.groupBy({
    by: ["paymentMethod"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      totalAmount: true,
    },
    _count: {
      id: true,
    },
  });

  return paymentData.map((item) => ({
    _id: item.paymentMethod,
    totalAmount: item._sum.totalAmount || 0,
    count: item._count.id || 0,
  }));
}

// Low Stock Items
export async function getLowStockItems() {
  const lowStockItems = await prisma.inventoryItem.findMany({
    where: {
      currentStock: {
        lte: prisma.inventoryItem.fields.lowStockThreshold,
      },
      status: "active",
    },
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      currentStock: "asc",
    },
  });

  return lowStockItems.map((item) => ({
    _id: item.id,
    variantId: item.variantId,
    variantCode: item.variant.variantCode,
    variantSku: item.variant.variantSku,
    itemName: `${item.variant.product.itemName} - ${item.variant.variantName}`,
    itemId: item.variant.productId,
    currentStock: item.currentStock,
    lowStockThreshold: item.lowStockThreshold,
    location: item.location,
    unitPrice: item.variant.unitPrice,
    status: item.status,
    lowStockStatus: item.lowStockStatus,
  }));
}

// Financial Position Data
export async function getFinancialPosition() {
  const financialPosition = await prisma.financialPosition.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return financialPosition;
}

// Recent Sales Activity
export async function getRecentSalesActivity(limit: number = 10) {
  const recentSales = await prisma.sales.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return recentSales;
}

// Inventory Status Summary
export async function getInventoryStatus() {
  const totalItems = await prisma.inventoryItem.count();
  const lowStockItems = await prisma.inventoryItem.count({
    where: {
      currentStock: {
        lte: prisma.inventoryItem.fields.lowStockThreshold,
      },
      status: "active",
    },
  });

  const totalValue = await prisma.inventoryItem.aggregate({
    _sum: {
      currentStock: true,
    },
  });

  return {
    totalItems,
    lowStockItems,
    totalValue: totalValue._sum.currentStock || 0,
  };
}
