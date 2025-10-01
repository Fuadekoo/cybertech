# Business Dashboard System Setup

## Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:

   ```
   DATABASE_URL="mongodb://localhost:27017/cybertech_demo"
   ```

3. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

4. **Push database schema:**

   ```bash
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Features Implemented

### ✅ Dashboard Page (`/dashboard`)

- **useData hooks** for fetching dashboard data
- **Recharts integration** with multiple chart types:
  - Line charts for sales analytics
  - Area charts for purchase analytics
  - Bar charts for expense analytics
  - Pie charts for payment methods
  - Horizontal bar charts for top products
- **Real-time data** with refresh capabilities
- **Responsive design** with Tailwind CSS

### ✅ Products Management (`/products`)

- **useData hooks** for fetching products
- **useMutation hooks** for CRUD operations:
  - Create products and variants
  - Update products and variants
  - Delete products and variants
- **Modal forms** for creating/editing
- **Nested product variants** management
- **Real-time updates** after mutations

### ✅ API Functions

- **Dashboard APIs** (`lib/api/dashboard.ts`):

  - `getDashboardCardsData()` - Today's vs yesterday's metrics
  - `getSalesAnalyticsData()` - Sales trends over time
  - `getPurchaseAnalyticsData()` - Purchase trends
  - `getExpenseAnalyticsData()` - Expense tracking
  - `getTopProductsData()` - Best selling products
  - `getTopCustomersData()` - Top customers by spending
  - `getPaymentMethodsData()` - Payment method breakdown
  - `getLowStockItems()` - Inventory alerts

- **Product APIs** (`lib/api/products.ts`):

  - `createProduct()`, `updateProduct()`, `deleteProduct()`
  - `createProductVariant()`, `updateProductVariant()`, `deleteProductVariant()`
  - `getAllProducts()`, `getProductById()`

- **Sales APIs** (`lib/api/sales.ts`):

  - `createSale()`, `updateSale()`, `deleteSale()`
  - `getAllSales()`, `getSaleById()`

- **Customer APIs** (`lib/api/customers.ts`):
  - `createCustomer()`, `updateCustomer()`, `deleteCustomer()`
  - `getAllCustomers()`, `getCustomerById()`

### ✅ Custom Hooks

- **useData hook** (`hooks/UseData.tsx`):

  ```typescript
  const [data, isLoading, refresh] = useData(apiFunction, onFinish, ...args);
  ```

- **useMutation hook** (`hooks/useMutations.tsx`):
  ```typescript
  const [executeMutation, isLoading] = useMutation(apiFunction, onFinish);
  ```

### ✅ Database Schema

- **MongoDB with Prisma** integration
- **Comprehensive models** for:
  - Products & Product Variants
  - Inventory Management
  - Sales & Purchase Transactions
  - Customer & Supplier Management
  - Analytics & Reporting
  - Financial Tracking

## Usage Examples

### Dashboard Data Fetching

```typescript
const [cardData, isLoadingCardData, refreshCardData] = useData(
  getDashboardCardsData,
  () => {}
);
```

### Mutation Operations

```typescript
const [executeDelete, isLoadingDelete] = useMutation(deleteProduct, (res) => {
  if (res.success) {
    refreshProducts();
  }
});
```

## Next Steps

1. **Add sample data** to test the dashboard
2. **Implement authentication** for user management
3. **Add more chart types** and analytics
4. **Create customer management page**
5. **Add sales transaction page**
6. **Implement real-time updates** with WebSockets

## File Structure

```
├── app/
│   ├── dashboard/page.tsx     # Dashboard with Recharts
│   ├── products/page.tsx      # Products CRUD management
│   └── page.tsx              # Home page with navigation
├── hooks/
│   ├── UseData.tsx           # Data fetching hook
│   └── useMutations.tsx      # Mutation hook
├── lib/
│   ├── api/                  # API functions
│   │   ├── dashboard.ts
│   │   ├── products.ts
│   │   ├── sales.ts
│   │   └── customers.ts
│   └── db.ts                # Prisma client
└── prisma/
    └── schema.prisma        # Database schema
```
