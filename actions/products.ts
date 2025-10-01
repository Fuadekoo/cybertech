"use server";

import prisma from "@/lib/db";

// Get All Products
export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get Product by ID
export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    },
  });
}

// Create Product
export async function createProduct(data: {
  itemName: string;
  category: string;
  description?: string;
}) {
  return await prisma.product.create({
    data,
  });
}

// Update Product
export async function updateProduct(
  id: string,
  data: {
    itemName?: string;
    category?: string;
    description?: string;
  }
) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

// Delete Product
export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}

// Create Product Variant
export async function createProductVariant(data: {
  productId: string;
  variantCode: string;
  variantSku: string;
  variantName: string;
  unitPrice: number;
}) {
  return await prisma.productVariant.create({
    data,
  });
}

// Update Product Variant
export async function updateProductVariant(
  id: string,
  data: {
    variantCode?: string;
    variantSku?: string;
    variantName?: string;
    unitPrice?: number;
    status?: string;
  }
) {
  return await prisma.productVariant.update({
    where: { id },
    data,
  });
}

// Delete Product Variant
export async function deleteProductVariant(id: string) {
  return await prisma.productVariant.delete({
    where: { id },
  });
}

// Get Products by Category
export async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: { category },
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Search Products
export async function searchProducts(query: string) {
  return await prisma.product.findMany({
    where: {
      OR: [
        { itemName: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get Product Analytics
export async function getProductAnalytics(
  productId: string,
  startDate: Date,
  endDate: Date
) {
  const salesData = await prisma.salesItem.groupBy({
    by: ["variantId"],
    where: {
      productId,
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
  });

  return salesData;
}
