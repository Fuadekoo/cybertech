"use server";

import prisma from "@/lib/db";

// Get All Expenses
export async function getAllExpenses() {
  return await prisma.expense.findMany({
    orderBy: {
      date: "desc",
    },
  });
}

// Get Expense by ID
export async function getExpenseById(id: string) {
  return await prisma.expense.findUnique({
    where: { id },
  });
}

// Create Expense
export async function createExpense(data: {
  category: string;
  amount: number;
  description?: string;
  date?: Date;
}) {
  return await prisma.expense.create({
    data: {
      ...data,
      date: data.date || new Date(),
    },
  });
}

// Update Expense
export async function updateExpense(
  id: string,
  data: {
    category?: string;
    amount?: number;
    description?: string;
    date?: Date;
  }
) {
  return await prisma.expense.update({
    where: { id },
    data,
  });
}

// Delete Expense
export async function deleteExpense(id: string) {
  return await prisma.expense.delete({
    where: { id },
  });
}

// Get Expenses by Category
export async function getExpensesByCategory(category: string) {
  return await prisma.expense.findMany({
    where: { category },
    orderBy: {
      date: "desc",
    },
  });
}

// Get Expenses by Date Range
export async function getExpensesByDateRange(startDate: Date, endDate: Date) {
  return await prisma.expense.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}

// Get Expense Statistics
export async function getExpenseStatistics(startDate: Date, endDate: Date) {
  const totalExpenses = await prisma.expense.aggregate({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { amount: true },
    _count: { id: true },
  });

  const expensesByCategory = await prisma.expense.groupBy({
    by: ["category"],
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { amount: true },
    _count: { id: true },
    orderBy: {
      _sum: { amount: "desc" },
    },
  });

  return {
    totalExpenses: totalExpenses._sum.amount || 0,
    totalCount: totalExpenses._count.id || 0,
    averageExpense: totalExpenses._count.id
      ? (totalExpenses._sum.amount || 0) / totalExpenses._count.id
      : 0,
    expensesByCategory,
  };
}

// Get Monthly Expense Trends
export async function getMonthlyExpenseTrends(year: number) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const data = await Promise.all(
    months.map(async (month) => {
      const expenses = await prisma.expense.aggregate({
        where: {
          date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
        _sum: { amount: true },
        _count: { id: true },
      });

      return {
        month,
        monthName: new Date(year, month - 1, 1).toLocaleString("default", {
          month: "short",
        }),
        totalAmount: expenses._sum.amount || 0,
        count: expenses._count.id || 0,
      };
    })
  );

  return data;
}

// Search Expenses
export async function searchExpenses(query: string) {
  return await prisma.expense.findMany({
    where: {
      OR: [
        { category: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      date: "desc",
    },
  });
}
