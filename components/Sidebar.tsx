"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  X,
  TrendingUp,
  DollarSign,
  Warehouse,
  Users,
  RefreshCw,
  ShoppingCart,
  FileText,
  Filter,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    shortcut: "⌘1",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    shortcut: "⌘2",
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    shortcut: "⌘3",
  },
  {
    name: "Product Data",
    href: "/product-data",
    icon: TrendingUp,
    shortcut: "⌘4",
  },
  {
    name: "Sales",
    href: "/sales",
    icon: ShoppingCart,
    shortcut: "⌘5",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    shortcut: "⌘6",
  },
  {
    name: "Customer Data",
    href: "/customer-data",
    icon: Users,
    shortcut: "⌘7",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Warehouse,
    shortcut: "⌘8",
  },
  {
    name: "Inventory Data",
    href: "/inventory-data",
    icon: Warehouse,
    shortcut: "⌘9",
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: FileText,
    shortcut: "⌘0",
  },
  {
    name: "Analytics Data",
    href: "/analytics-data",
    icon: BarChart3,
    shortcut: "⌘⇧1",
  },
  {
    name: "Financial Data",
    href: "/financial-data",
    icon: DollarSign,
    shortcut: "⌘⇧2",
  },
  {
    name: "Data Filter",
    href: "/filter",
    icon: Filter,
    shortcut: "⌘⇧3",
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Fuad Abdurahman
                </h1>
                <p className="text-sm text-gray-500">fuad@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 space-y-1 pb-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{item.shortcut}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
