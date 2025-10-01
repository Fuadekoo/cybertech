import prisma from "../db";

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

// Delete Product
export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}

// Delete Product Variant
export async function deleteProductVariant(id: string) {
  return await prisma.productVariant.delete({
    where: { id },
  });
}

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
