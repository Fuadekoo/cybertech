# Comprehensive Seed Data Guide

## 🎯 What's Included in the Seed Data

The seed file creates a **massive amount of realistic business data** for your dashboard:

### 📊 **Data Volume**

- **25 Products** across 5 categories (beverages, electronics, snacks, health_wellness, clothing)
- **75+ Product Variants** (2-4 variants per product)
- **75+ Inventory Items** with realistic stock levels and locations
- **20 Customers** with contact information and spending history
- **10 Suppliers** for purchase transactions
- **200 Sales Transactions** with detailed line items
- **50 Purchase Transactions** from suppliers
- **100 Expense Records** across 7 categories
- **30 Days of Analytics Data** for dashboard charts
- **300 Inventory Movements** tracking stock changes
- **Financial Position Data** with receivables, payables, and profit metrics

### 🏪 **Business Categories**

- **Beverages**: Coffee, tea, energy drinks, juices
- **Electronics**: Headphones, smartphones, laptops, tablets, smartwatches
- **Snacks**: Cookies, chips, nuts, granola bars, popcorn
- **Health & Wellness**: Vitamins, protein powder, supplements
- **Clothing**: T-shirts, jeans, shoes, jackets, dresses

### 💰 **Financial Data**

- **Sales**: $10-$210 per item, realistic transaction amounts
- **Purchases**: 70% of sale price (realistic wholesale pricing)
- **Expenses**: Rent, utilities, salaries, marketing, maintenance, insurance
- **Profit Margins**: Calculated automatically based on sales vs costs
- **Growth Metrics**: Day-over-day comparisons for dashboard cards

### 📈 **Analytics Features**

- **Daily Analytics**: 30 days of sales, purchases, expenses, and profit data
- **Product Performance**: Top-selling products with revenue tracking
- **Customer Analytics**: Top customers by spending and transaction count
- **Payment Methods**: Breakdown by cash, card, and bank transfer
- **Low Stock Alerts**: Inventory items below threshold with status tracking

## 🚀 **How to Run the Seed Data**

### 1. **Set up your environment:**

```bash
# Create .env file with your MongoDB connection
DATABASE_URL="mongodb://localhost:27017/cybertech_demo"
```

### 2. **Push the database schema:**

```bash
npx prisma db push
```

### 3. **Run the seed script:**

```bash
npm run db:seed
```

### 4. **Start your application:**

```bash
npm run dev
```

## 📊 **Dashboard Data Preview**

After seeding, your dashboard will show:

### **Today's Metrics**

- Sales: $1,000 - $5,000+ (varies by day)
- Purchases: $500 - $2,000+ (wholesale costs)
- Expenses: $200 - $1,000+ (operating costs)
- Profit: Calculated automatically with margins

### **Charts & Analytics**

- **Sales Chart**: 30 days of sales trends
- **Purchase Chart**: 30 days of purchase trends
- **Expense Chart**: 30 days of expense tracking
- **Top Products**: Best-selling items with revenue
- **Top Customers**: Highest spending customers
- **Payment Methods**: Cash vs card vs bank transfer breakdown
- **Low Stock**: Items needing restocking

### **Realistic Business Scenarios**

- **Peak Sales Days**: Higher sales on certain days
- **Seasonal Patterns**: Varying purchase patterns
- **Customer Behavior**: Different spending levels per customer
- **Inventory Management**: Stock movements and low stock alerts
- **Financial Health**: Receivables, payables, and net position

## 🎨 **Data Relationships**

The seed data creates realistic relationships:

- **Products → Variants → Inventory**: Full product hierarchy
- **Customers → Sales → Sales Items**: Complete transaction history
- **Suppliers → Purchases → Purchase Items**: Supply chain tracking
- **Daily Analytics**: Aggregated daily metrics for dashboard
- **Financial Position**: Overall business health metrics

## 🔄 **Refresh Data**

To refresh the seed data:

```bash
# Clear existing data and re-seed
npm run db:seed
```

## 📈 **Dashboard Features Enabled**

With this seed data, your dashboard will have:

- ✅ **Real-time metrics** with growth percentages
- ✅ **Interactive charts** with 30 days of data
- ✅ **Top performers** (products and customers)
- ✅ **Inventory alerts** for low stock items
- ✅ **Financial insights** with profit margins
- ✅ **Payment analytics** by method
- ✅ **Trend analysis** with historical data

## 🎯 **Perfect for Demo**

This seed data is perfect for:

- **Client presentations** with realistic business data
- **Development testing** with comprehensive scenarios
- **Dashboard demonstrations** with rich analytics
- **Business intelligence** showcasing capabilities
- **Training purposes** with real-world data patterns

The data is designed to showcase all features of your business dashboard system with realistic, varied, and comprehensive business scenarios!
