import prisma from "../db";

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
