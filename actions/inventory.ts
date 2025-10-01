"use server";

import prisma from "@/lib/db";

// Get All Inventory Items
export async function getAllInventoryItems() {
  return await prisma.inventoryItem.findMany({
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
}

// Get Inventory Item by ID
export async function getInventoryItemById(id: string) {
  return await prisma.inventoryItem.findUnique({
    where: { id },
    include: {
      variant: {
        include: {
          product: true,
        },
      },
      movements: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

// Update Inventory Stock
export async function updateInventoryStock(id: string, newStock: number) {
  return await prisma.inventoryItem.update({
    where: { id },
    data: { currentStock: newStock },
  });
}

// Get Low Stock Items
export async function getLowStockItems() {
  return await prisma.inventoryItem.findMany({
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
}

// Create Inventory Movement
export async function createInventoryMovement(data: {
  inventoryId: string;
  type: string;
  quantity: number;
  reason?: string;
  referenceId?: string;
}) {
  return await prisma.inventoryMovement.create({
    data,
  });
}

// Get Inventory Movements
export async function getInventoryMovements(inventoryId: string) {
  return await prisma.inventoryMovement.findMany({
    where: { inventoryId },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get Inventory Statistics
export async function getInventoryStatistics() {
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
    lowStockPercentage: totalItems ? (lowStockItems / totalItems) * 100 : 0,
  };
}

// Update Low Stock Status
export async function updateLowStockStatus(id: string, status: string) {
  return await prisma.inventoryItem.update({
    where: { id },
    data: { lowStockStatus: status },
  });
}

// Get Inventory by Category
export async function getInventoryByCategory(category: string) {
  return await prisma.inventoryItem.findMany({
    where: {
      variant: {
        product: {
          category,
        },
      },
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
}

// Search Inventory Items
export async function searchInventoryItems(query: string) {
  return await prisma.inventoryItem.findMany({
    where: {
      variant: {
        product: {
          OR: [
            { itemName: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
          ],
        },
      },
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
}
