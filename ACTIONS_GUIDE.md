# Server Actions Guide

## 🎯 **Complete Server Actions Implementation**

All your API functions have been converted to **Next.js Server Actions** with the `"use server"` directive for optimal performance and security.

## 📁 **Actions Structure**

```
actions/
├── index.ts          # Export all actions
├── dashboard.ts      # Dashboard analytics actions
├── products.ts       # Product management actions
├── sales.ts          # Sales transaction actions
├── customers.ts      # Customer management actions
├── inventory.ts       # Inventory management actions
└── expenses.ts       # Expense tracking actions
```

## 🚀 **Dashboard Actions (`actions/dashboard.ts`)**

### **Core Analytics Functions:**

- `getDashboardCardsData()` - Today vs yesterday metrics with growth calculations
- `getSalesAnalyticsData(startDate, endDate)` - Sales trends over time
- `getPurchaseAnalyticsData(startDate, endDate)` - Purchase trends
- `getExpenseAnalyticsData(startDate, endDate)` - Expense tracking
- `getTopProductsData(startDate, endDate)` - Best selling products
- `getTopCustomersData(startDate, endDate)` - Top customers by spending
- `getPaymentMethodsData(startDate, endDate)` - Payment method breakdown
- `getLowStockItems()` - Inventory alerts
- `getFinancialPosition()` - Overall financial health
- `getRecentSalesActivity(limit)` - Recent sales with details
- `getInventoryStatus()` - Inventory summary statistics

## 🛍️ **Product Actions (`actions/products.ts`)**

### **Product Management:**

- `getAllProducts()` - Get all products with variants
- `getProductById(id)` - Get single product with details
- `createProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product information
- `deleteProduct(id)` - Delete product
- `getProductsByCategory(category)` - Filter by category
- `searchProducts(query)` - Search products by name/description
- `getProductAnalytics(productId, startDate, endDate)` - Product performance

### **Product Variants:**

- `createProductVariant(data)` - Create product variant
- `updateProductVariant(id, data)` - Update variant details
- `deleteProductVariant(id)` - Delete variant

## 💰 **Sales Actions (`actions/sales.ts`)**

### **Sales Management:**

- `getAllSales()` - Get all sales with customer and item details
- `getSaleById(id)` - Get single sale with full details
- `createSale(data)` - Create new sale transaction
- `updateSale(id, data)` - Update sale information
- `deleteSale(id)` - Delete sale
- `getSalesByDateRange(startDate, endDate)` - Filter by date range
- `getSalesByCustomer(customerId)` - Customer's sales history
- `getSalesByPaymentMethod(method)` - Filter by payment method
- `getSalesStatistics(startDate, endDate)` - Sales analytics and trends

## 👥 **Customer Actions (`actions/customers.ts`)**

### **Customer Management:**

- `getAllCustomers()` - Get all customers with recent sales
- `getCustomerById(id)` - Get customer with full sales history
- `createCustomer(data)` - Create new customer
- `updateCustomer(id, data)` - Update customer information
- `deleteCustomer(id)` - Delete customer
- `searchCustomers(query)` - Search customers by name/email/phone
- `getTopCustomers(limit)` - Top customers by spending
- `getCustomerStatistics()` - Customer analytics
- `updateCustomerSpending(customerId, amount)` - Update spending totals

## 📦 **Inventory Actions (`actions/inventory.ts`)**

### **Inventory Management:**

- `getAllInventoryItems()` - Get all inventory with product details
- `getInventoryItemById(id)` - Get single item with movements
- `updateInventoryStock(id, newStock)` - Update stock levels
- `getLowStockItems()` - Items below threshold
- `createInventoryMovement(data)` - Record stock movements
- `getInventoryMovements(inventoryId)` - Movement history
- `getInventoryStatistics()` - Inventory analytics
- `updateLowStockStatus(id, status)` - Update low stock status
- `getInventoryByCategory(category)` - Filter by category
- `searchInventoryItems(query)` - Search inventory

## 💸 **Expense Actions (`actions/expenses.ts`)**

### **Expense Management:**

- `getAllExpenses()` - Get all expenses
- `getExpenseById(id)` - Get single expense
- `createExpense(data)` - Create new expense
- `updateExpense(id, data)` - Update expense
- `deleteExpense(id)` - Delete expense
- `getExpensesByCategory(category)` - Filter by category
- `getExpensesByDateRange(startDate, endDate)` - Filter by date
- `getExpenseStatistics(startDate, endDate)` - Expense analytics
- `getMonthlyExpenseTrends(year)` - Monthly expense trends
- `searchExpenses(query)` - Search expenses

## 🔧 **Usage Examples**

### **In Your Components:**

```typescript
import { getDashboardCardsData, createProduct } from "@/actions";

// Use with useData hook
const [cardData, isLoading, refresh] = useData(getDashboardCardsData, () => {});

// Use with useMutation hook
const [executeCreate, isLoadingCreate] = useMutation(createProduct, (res) => {
  console.log("Product created:", res);
  refreshProducts();
});
```

### **Direct Server Action Calls:**

```typescript
import { getTopCustomers } from "@/actions/customers";

// In a server component
const topCustomers = await getTopCustomers(5);
```

## ⚡ **Performance Benefits**

- **Server-Side Execution**: All database queries run on the server
- **Automatic Caching**: Next.js caches server actions automatically
- **Type Safety**: Full TypeScript support with Prisma types
- **Security**: Database access is server-side only
- **Optimization**: Reduced client-side JavaScript bundle

## 🎯 **Key Features**

- ✅ **Full CRUD Operations** for all entities
- ✅ **Advanced Filtering** by date, category, customer, etc.
- ✅ **Search Functionality** across all data types
- ✅ **Analytics & Statistics** for business insights
- ✅ **Real-time Data** with proper relationships
- ✅ **Type Safety** with TypeScript and Prisma
- ✅ **Performance Optimized** with server-side execution

## 🚀 **Ready to Use**

All actions are now available and can be imported directly into your components. The dashboard and products pages have been updated to use these server actions instead of the API functions.

Your business dashboard system now has a complete, production-ready server actions architecture!
