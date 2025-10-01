"use server";

import prisma from "@/lib/db";

// Get All Customers
export async function getAllCustomers() {
  return await prisma.customer.findMany({
    include: {
      sales: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      totalSpent: "desc",
    },
  });
}

// Get Customer by ID
export async function getCustomerById(id: string) {
  return await prisma.customer.findUnique({
    where: { id },
    include: {
      sales: {
        include: {
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
      },
    },
  });
}

// Create Customer
export async function createCustomer(data: {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  return await prisma.customer.create({
    data,
  });
}

// Update Customer
export async function updateCustomer(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
) {
  return await prisma.customer.update({
    where: { id },
    data,
  });
}

// Delete Customer
export async function deleteCustomer(id: string) {
  return await prisma.customer.delete({
    where: { id },
  });
}

// Search Customers
export async function searchCustomers(query: string) {
  return await prisma.customer.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { phone: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      sales: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      totalSpent: "desc",
    },
  });
}

// Get Top Customers
export async function getTopCustomers(limit: number = 10) {
  return await prisma.customer.findMany({
    orderBy: {
      totalSpent: "desc",
    },
    take: limit,
  });
}

// Get Customer Statistics
export async function getCustomerStatistics() {
  const totalCustomers = await prisma.customer.count();
  const totalSpent = await prisma.customer.aggregate({
    _sum: { totalSpent: true },
  });
  const averageSpent = totalCustomers
    ? (totalSpent._sum.totalSpent || 0) / totalCustomers
    : 0;

  return {
    totalCustomers,
    totalSpent: totalSpent._sum.totalSpent || 0,
    averageSpent,
  };
}

// Update Customer Spending
export async function updateCustomerSpending(
  customerId: string,
  amount: number
) {
  return await prisma.customer.update({
    where: { id: customerId },
    data: {
      totalSpent: {
        increment: amount,
      },
      transactionCount: {
        increment: 1,
      },
    },
  });
}
