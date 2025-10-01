import prisma from "../db";

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
