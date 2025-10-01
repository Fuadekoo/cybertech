"use server";

import prisma from "@/lib/db";

// Get All Sales
export async function getAllSales() {
  return await prisma.sales.findMany({
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
  });
}

// Get Sale by ID
export async function getSaleById(id: string) {
  return await prisma.sales.findUnique({
    where: { id },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

// Create Sale
export async function createSale(data: {
  customerId?: string;
  totalAmount: number;
  paymentMethod: string;
  items: {
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}) {
  return await prisma.sales.create({
    data: {
      customerId: data.customerId,
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      items: {
        create: data.items,
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

// Update Sale
export async function updateSale(
  id: string,
  data: {
    customerId?: string;
    totalAmount?: number;
    paymentMethod?: string;
    status?: string;
  }
) {
  return await prisma.sales.update({
    where: { id },
    data,
    include: {
      customer: true,
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

// Delete Sale
export async function deleteSale(id: string) {
  return await prisma.sales.delete({
    where: { id },
  });
}

// Get Sales by Date Range
export async function getSalesByDateRange(startDate: Date, endDate: Date) {
  return await prisma.sales.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
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
  });
}

// Get Sales by Customer
export async function getSalesByCustomer(customerId: string) {
  return await prisma.sales.findMany({
    where: { customerId },
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
  });
}

// Get Sales by Payment Method
export async function getSalesByPaymentMethod(paymentMethod: string) {
  return await prisma.sales.findMany({
    where: { paymentMethod },
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
  });
}

// Get Sales Statistics
export async function getSalesStatistics(startDate: Date, endDate: Date) {
  const totalSales = await prisma.sales.aggregate({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const salesByPaymentMethod = await prisma.sales.groupBy({
    by: ["paymentMethod"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  return {
    totalSales: totalSales._sum.totalAmount || 0,
    totalTransactions: totalSales._count.id || 0,
    averageSale: totalSales._count.id
      ? (totalSales._sum.totalAmount || 0) / totalSales._count.id
      : 0,
    salesByPaymentMethod,
  };
}
