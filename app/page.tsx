import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Business Dashboard System
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          A comprehensive business management system with analytics, inventory
          tracking, and customer management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/dashboard"
            className="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dashboard
              </h3>
              <p className="text-gray-600">
                View analytics, sales data, and business insights with
                interactive charts and reports.
              </p>
            </div>
          </Link>

          <Link
            href="/products"
            className="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-green-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Products
              </h3>
              <p className="text-gray-600">
                Manage your product catalog, variants, and inventory with full
                CRUD operations.
              </p>
            </div>
          </Link>

          <Link
            href="/analytics"
            className="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-purple-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics
              </h3>
              <p className="text-gray-600">
                Comprehensive business analytics with sales, purchases,
                expenses, and profit analysis.
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Analytics</h3>
              <p className="text-gray-600 text-sm">
                Real-time business analytics with Recharts integration for
                sales, purchases, and expenses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">🛍️ Inventory</h3>
              <p className="text-gray-600 text-sm">
                Track stock levels, low inventory alerts, and product variants
                with MongoDB and Prisma.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">👥 Customers</h3>
              <p className="text-gray-600 text-sm">
                Manage customer relationships, track spending patterns, and
                analyze customer behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
