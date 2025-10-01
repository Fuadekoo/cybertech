import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding business dashboard data...");

  // --- Clean up existing data (skip for MongoDB single instance) ---
  console.log("Skipping data cleanup for MongoDB single instance...");

  // --- Create Categories ---
  const categories = [
    "beverages",
    "electronics",
    "snacks",
    "health_wellness",
    "clothing",
    "books",
    "home_garden",
    "sports",
    "beauty",
    "automotive",
  ];

  // --- Create Products ---
  const products = [
    // Beverages
    {
      itemName: "Premium Coffee Beans",
      category: "beverages",
      description: "High-quality arabica coffee beans, medium roast",
    },
    {
      itemName: "Organic Green Tea",
      category: "beverages",
      description: "Premium organic green tea leaves",
    },
    {
      itemName: "Energy Drink",
      category: "beverages",
      description: "High-energy sports drink with vitamins",
    },
    {
      itemName: "Fresh Orange Juice",
      category: "beverages",
      description: "100% pure orange juice, no preservatives",
    },
    {
      itemName: "Sparkling Water",
      category: "beverages",
      description: "Natural sparkling mineral water",
    },

    // Electronics
    {
      itemName: "Wireless Bluetooth Headphones",
      category: "electronics",
      description: "Noise-cancelling wireless headphones",
    },
    {
      itemName: "Smartphone",
      category: "electronics",
      description: "Latest model smartphone with advanced features",
    },
    {
      itemName: "Laptop Computer",
      category: "electronics",
      description: "High-performance laptop for work and gaming",
    },
    {
      itemName: "Tablet",
      category: "electronics",
      description: "10-inch tablet with high-resolution display",
    },
    {
      itemName: "Smart Watch",
      category: "electronics",
      description: "Fitness tracking smartwatch with GPS",
    },

    // Snacks
    {
      itemName: "Chocolate Chip Cookies",
      category: "snacks",
      description: "Homemade chocolate chip cookies",
    },
    {
      itemName: "Potato Chips",
      category: "snacks",
      description: "Crispy potato chips, original flavor",
    },
    {
      itemName: "Mixed Nuts",
      category: "snacks",
      description: "Premium mixed nuts, unsalted",
    },
    {
      itemName: "Granola Bars",
      category: "snacks",
      description: "Healthy granola bars with oats and honey",
    },
    {
      itemName: "Popcorn",
      category: "snacks",
      description: "Microwave popcorn, butter flavor",
    },

    // Health & Wellness
    {
      itemName: "Vitamin C Tablets",
      category: "health_wellness",
      description: "1000mg vitamin C tablets for immune support",
    },
    {
      itemName: "Protein Powder",
      category: "health_wellness",
      description: "Whey protein powder for muscle building",
    },
    {
      itemName: "Omega-3 Supplements",
      category: "health_wellness",
      description: "Fish oil omega-3 capsules",
    },
    {
      itemName: "Multivitamin",
      category: "health_wellness",
      description: "Daily multivitamin for overall health",
    },
    {
      itemName: "Probiotics",
      category: "health_wellness",
      description: "Digestive health probiotic capsules",
    },

    // Clothing
    {
      itemName: "Cotton T-Shirt",
      category: "clothing",
      description: "100% cotton comfortable t-shirt",
    },
    {
      itemName: "Denim Jeans",
      category: "clothing",
      description: "Classic blue denim jeans",
    },
    {
      itemName: "Running Shoes",
      category: "clothing",
      description: "Comfortable running shoes with good support",
    },
    {
      itemName: "Winter Jacket",
      category: "clothing",
      description: "Warm winter jacket with hood",
    },
    {
      itemName: "Summer Dress",
      category: "clothing",
      description: "Light summer dress, floral pattern",
    },
  ];

  const createdProducts = [];
  for (const product of products) {
    const created = await prisma.product.create({ data: product });
    createdProducts.push(created);
  }
  console.log(`Created ${createdProducts.length} products.`);

  // --- Create Product Variants ---
  const variants = [];
  for (const product of createdProducts) {
    // Create 2-4 variants per product
    const variantCount = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < variantCount; i++) {
      const variant = await prisma.productVariant.create({
        data: {
          productId: product.id,
          variantCode: `VAR-${product.id.slice(-4)}-${i + 1}`,
          variantSku: `SKU-${product.id.slice(-4)}-VAR${i + 1}`,
          variantName: `${product.itemName} - ${
            ["Small", "Medium", "Large", "Extra Large", "Premium", "Standard"][
              i
            ]
          }`,
          unitPrice: Math.round((Math.random() * 200 + 10) * 100) / 100, // $10-$210
          status: "active",
        },
      });
      variants.push(variant);
    }
  }
  console.log(`Created ${variants.length} product variants.`);

  // --- Create Inventory Items ---
  const inventoryItems = [];
  for (const variant of variants) {
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        variantId: variant.id,
        currentStock: Math.floor(Math.random() * 100) + 1,
        lowStockThreshold: Math.floor(Math.random() * 20) + 5,
        location: {
          aisle: `A${Math.floor(Math.random() * 10) + 1}`,
          rack: `B${Math.floor(Math.random() * 5) + 1}`,
          bin: `C${Math.floor(Math.random() * 10) + 1}`,
        },
        status: "active",
        lowStockStatus:
          Math.random() > 0.7
            ? "critical"
            : Math.random() > 0.5
            ? "new"
            : "ignored",
      },
    });
    inventoryItems.push(inventoryItem);
  }
  console.log(`Created ${inventoryItems.length} inventory items.`);

  // --- Create Customers ---
  const customers = [];
  const customerNames = [
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Martinez",
    "William Garcia",
    "Linda Rodriguez",
    "James Wilson",
    "Patricia Brown",
    "John Jones",
    "Jennifer Garcia",
    "Robert Miller",
    "Maria Rodriguez",
    "David Martinez",
    "Mary Anderson",
    "Charles Taylor",
    "Susan Thomas",
  ];

  for (let i = 0; i < 20; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: customerNames[i],
        email: `customer${i + 1}@example.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State`,
        totalSpent: Math.round((Math.random() * 10000 + 100) * 100) / 100,
        transactionCount: Math.floor(Math.random() * 50) + 1,
      },
    });
    customers.push(customer);
  }
  console.log(`Created ${customers.length} customers.`);

  // --- Create Suppliers ---
  const suppliers = [];
  const supplierNames = [
    "Global Supply Co",
    "Premium Distributors",
    "Quality Goods Ltd",
    "Best Products Inc",
    "Reliable Suppliers",
    "Top Quality Corp",
    "Excellent Goods",
    "Superior Products",
    "Prime Distributors",
    "Elite Suppliers",
  ];

  for (let i = 0; i < 10; i++) {
    const supplier = await prisma.supplier.create({
      data: {
        name: supplierNames[i],
        email: `supplier${i + 1}@company.com`,
        phone: `+1-800-${String(
          Math.floor(Math.random() * 900) + 100
        )}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        address: `${
          Math.floor(Math.random() * 9999) + 1
        } Industrial Blvd, City, State`,
      },
    });
    suppliers.push(supplier);
  }
  console.log(`Created ${suppliers.length} suppliers.`);

  // --- Create Sales Transactions ---
  const sales = [];
  const paymentMethods = ["cash", "card", "bank_transfer"];

  for (let i = 0; i < 200; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const unitPrice = variant.unitPrice;
      const totalPrice = unitPrice * quantity;
      totalAmount += totalPrice;

      items.push({
        productId: variant.productId,
        variantId: variant.id,
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const sale = await prisma.sales.create({
      data: {
        customerId: customer.id,
        totalAmount: Math.round(totalAmount * 100) / 100,
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: "completed",
        createdAt: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
        ), // Random date within last 90 days
      },
    });

    // Create sales items
    for (const item of items) {
      await prisma.salesItem.create({
        data: {
          salesId: sale.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        },
      });
    }

    sales.push(sale);
  }
  console.log(`Created ${sales.length} sales transactions.`);

  // --- Create Purchase Transactions ---
  const purchases = [];

  for (let i = 0; i < 50; i++) {
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    const itemCount = Math.floor(Math.random() * 10) + 1;
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const quantity = Math.floor(Math.random() * 20) + 1;
      const unitPrice = variant.unitPrice * 0.7; // Purchase price is 70% of sale price
      const totalPrice = unitPrice * quantity;
      totalAmount += totalPrice;

      items.push({
        productId: variant.productId,
        variantId: variant.id,
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const purchase = await prisma.purchase.create({
      data: {
        supplierId: supplier.id,
        totalAmount: Math.round(totalAmount * 100) / 100,
        status: "completed",
        createdAt: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
      },
    });

    // Create purchase items
    for (const item of items) {
      await prisma.purchaseItem.create({
        data: {
          purchaseId: purchase.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        },
      });
    }

    purchases.push(purchase);
  }
  console.log(`Created ${purchases.length} purchase transactions.`);

  // --- Create Expenses ---
  const expenseCategories = [
    "rent",
    "utilities",
    "salaries",
    "marketing",
    "maintenance",
    "insurance",
    "office_supplies",
  ];

  for (let i = 0; i < 100; i++) {
    await prisma.expense.create({
      data: {
        category:
          expenseCategories[
            Math.floor(Math.random() * expenseCategories.length)
          ],
        amount: Math.round((Math.random() * 2000 + 50) * 100) / 100,
        description: `Expense for ${
          expenseCategories[
            Math.floor(Math.random() * expenseCategories.length)
          ]
        }`,
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log("Created 100 expense records.");

  // --- Create Daily Analytics ---
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const salesForDay = sales.filter(
      (sale) => sale.createdAt.toDateString() === date.toDateString()
    );

    const purchasesForDay = purchases.filter(
      (purchase) => purchase.createdAt.toDateString() === date.toDateString()
    );

    const expensesForDay = await prisma.expense.findMany({
      where: {
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
    });

    const totalSales = salesForDay.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );
    const totalPurchases = purchasesForDay.reduce(
      (sum, purchase) => sum + purchase.totalAmount,
      0
    );
    const totalExpenses = expensesForDay.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const grossProfit = totalSales - totalPurchases;
    const netProfit = grossProfit - totalExpenses;
    const profitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

    await prisma.dailyAnalytics.create({
      data: {
        date,
        totalSales: Math.round(totalSales * 100) / 100,
        salesCount: salesForDay.length,
        totalPurchases: Math.round(totalPurchases * 100) / 100,
        purchaseCount: purchasesForDay.length,
        totalExpenses: Math.round(totalExpenses * 100) / 100,
        expenseCount: expensesForDay.length,
        grossProfit: Math.round(grossProfit * 100) / 100,
        netProfit: Math.round(netProfit * 100) / 100,
        profitMargin: Math.round(profitMargin * 100) / 100,
      },
    });
  }
  console.log("Created 30 days of analytics data.");

  // --- Create Financial Position ---
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalPurchases = purchases.reduce(
    (sum, purchase) => sum + purchase.totalAmount,
    0
  );
  const totalExpenses = await prisma.expense.aggregate({
    _sum: { amount: true },
  });

  const grossProfit = totalSales - totalPurchases;
  const netProfit = grossProfit - (totalExpenses._sum.amount || 0);
  const profitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;
  const expenseRatio =
    totalSales > 0 ? ((totalExpenses._sum.amount || 0) / totalSales) * 100 : 0;

  await prisma.financialPosition.create({
    data: {
      receivables: Math.round((Math.random() * 50000 + 10000) * 100) / 100,
      payables: Math.round((Math.random() * 30000 + 5000) * 100) / 100,
      netPosition: Math.round((Math.random() * 20000 + 5000) * 100) / 100,
      grossProfit: Math.round(grossProfit * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      profitMargin: Math.round(profitMargin * 100) / 100,
      expenseRatio: Math.round(expenseRatio * 100) / 100,
    },
  });
  console.log("Created financial position data.");

  // --- Create Inventory Movements ---
  for (let i = 0; i < 300; i++) {
    const inventoryItem =
      inventoryItems[Math.floor(Math.random() * inventoryItems.length)];
    const movementTypes = ["sale", "purchase", "transfer", "adjustment"];
    const type =
      movementTypes[Math.floor(Math.random() * movementTypes.length)];
    const quantity = Math.floor(Math.random() * 20) + 1;

    await prisma.inventoryMovement.create({
      data: {
        inventoryId: inventoryItem.id,
        type,
        quantity: type === "sale" ? -quantity : quantity,
        reason: `${type} transaction`,
        referenceId:
          type === "sale"
            ? sales[Math.floor(Math.random() * sales.length)].id
            : type === "purchase"
            ? purchases[Math.floor(Math.random() * purchases.length)].id
            : null,
        createdAt: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
      },
    });
  }
  console.log("Created 300 inventory movements.");

  console.log("Seeding completed successfully!");
  console.log(`Summary:`);
  console.log(`- Products: ${createdProducts.length}`);
  console.log(`- Variants: ${variants.length}`);
  console.log(`- Inventory Items: ${inventoryItems.length}`);
  console.log(`- Customers: ${customers.length}`);
  console.log(`- Suppliers: ${suppliers.length}`);
  console.log(`- Sales: ${sales.length}`);
  console.log(`- Purchases: ${purchases.length}`);
  console.log(`- Expenses: 100`);
  console.log(`- Daily Analytics: 30 days`);
  console.log(`- Inventory Movements: 300`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
