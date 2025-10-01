import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding business dashboard data...");

  try {
    // Create a few sample products
    const product1 = await prisma.product.create({
      data: {
        itemName: "Premium Coffee Beans",
        category: "beverages",
        description: "High-quality arabica coffee beans, medium roast",
      },
    });

    const product2 = await prisma.product.create({
      data: {
        itemName: "Wireless Bluetooth Headphones",
        category: "electronics",
        description: "Noise-cancelling wireless headphones",
      },
    });

    console.log("Created products:", { product1, product2 });

    // Create variants for products
    const variant1 = await prisma.productVariant.create({
      data: {
        productId: product1.id,
        variantCode: "VAR-001",
        variantSku: "SKU-001",
        variantName: "Premium Coffee Beans - Medium Roast",
        unitPrice: 25.99,
        status: "active",
      },
    });

    const variant2 = await prisma.productVariant.create({
      data: {
        productId: product2.id,
        variantCode: "VAR-002",
        variantSku: "SKU-002",
        variantName: "Wireless Headphones - Black",
        unitPrice: 149.99,
        status: "active",
      },
    });

    console.log("Created variants:", { variant1, variant2 });

    // Create inventory items
    const inventory1 = await prisma.inventoryItem.create({
      data: {
        variantId: variant1.id,
        currentStock: 50,
        lowStockThreshold: 10,
        location: {
          aisle: "A1",
          rack: "B1",
          bin: "C1",
        },
        status: "active",
        lowStockStatus: "new",
      },
    });

    const inventory2 = await prisma.inventoryItem.create({
      data: {
        variantId: variant2.id,
        currentStock: 25,
        lowStockThreshold: 5,
        location: {
          aisle: "A2",
          rack: "B2",
          bin: "C2",
        },
        status: "active",
        lowStockStatus: "new",
      },
    });

    console.log("Created inventory items:", { inventory1, inventory2 });

    // Create a customer
    const customer = await prisma.customer.create({
      data: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1-555-0123",
        address: "123 Main St, City, State",
        totalSpent: 0,
        transactionCount: 0,
      },
    });

    console.log("Created customer:", customer);

    // Create a supplier
    const supplier = await prisma.supplier.create({
      data: {
        name: "Global Supply Co",
        email: "contact@globalsupply.com",
        phone: "+1-800-123-4567",
        address: "456 Industrial Blvd, City, State",
      },
    });

    console.log("Created supplier:", supplier);

    // Create a sample sale
    const sale = await prisma.sales.create({
      data: {
        customerId: customer.id,
        totalAmount: 175.98,
        paymentMethod: "card",
        status: "completed",
      },
    });

    console.log("Created sale:", sale);

    // Create sales items
    await prisma.salesItem.create({
      data: {
        salesId: sale.id,
        productId: product1.id,
        variantId: variant1.id,
        quantity: 2,
        unitPrice: 25.99,
        totalPrice: 51.98,
      },
    });

    await prisma.salesItem.create({
      data: {
        salesId: sale.id,
        productId: product2.id,
        variantId: variant2.id,
        quantity: 1,
        unitPrice: 149.99,
        totalPrice: 149.99,
      },
    });

    console.log("Created sales items");

    // Create an expense
    const expense = await prisma.expense.create({
      data: {
        category: "rent",
        amount: 2000.0,
        description: "Monthly office rent",
        date: new Date(),
      },
    });

    console.log("Created expense:", expense);

    // Create financial position
    const financialPosition = await prisma.financialPosition.create({
      data: {
        receivables: 5000.0,
        payables: 3000.0,
        netPosition: 2000.0,
        grossProfit: 1000.0,
        netProfit: 500.0,
        profitMargin: 15.0,
        expenseRatio: 10.0,
      },
    });

    console.log("Created financial position:", financialPosition);

    console.log("✅ Seeding completed successfully!");
    console.log("📊 Sample data created:");
    console.log("- 2 Products with variants");
    console.log("- 2 Inventory items");
    console.log("- 1 Customer");
    console.log("- 1 Supplier");
    console.log("- 1 Sale with items");
    console.log("- 1 Expense");
    console.log("- 1 Financial position");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
