import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            E-commerce Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Designed by{" "}
            <span className="font-semibold text-purple-600">
              Fuad Abdurahman
            </span>
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to Your Business Analytics Hub
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            A comprehensive e-commerce dashboard designed to help you track
            sales, manage inventory, analyze customer behavior, and monitor your
            business performance with real-time analytics and beautiful
            visualizations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Sales Analytics & Reports</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Inventory Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Customer Insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">Financial Tracking</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-6 h-6"
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
          <span>Go to Dashboard</span>
        </Link>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Built with Next.js, Tailwind CSS, and Recharts</p>
          <p className="mt-1">Contact: fuad@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
