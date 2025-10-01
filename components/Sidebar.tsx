"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  X,
  TrendingUp,
  DollarSign,
  Warehouse,
  FileText,
  Search,
  RefreshCw,
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
    name: "Products",
    href: "/products",
    icon: Package,
    shortcut: "⌘2",
  },
  {
    name: "Sales",
    href: "/sales",
    icon: ShoppingCart,
    shortcut: "⌘3",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    shortcut: "⌘4",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Warehouse,
    shortcut: "⌘5",
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: FileText,
    shortcut: "⌘6",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    shortcut: "⌘7",
  },
  {
    name: "Analytics Data",
    href: "/analytics-data",
    icon: TrendingUp,
    shortcut: "⌘8",
  },
  {
    name: "Product Data",
    href: "/product-data",
    icon: Package,
    shortcut: "⌘9",
  },
  {
    name: "Inventory Data",
    href: "/inventory-data",
    icon: Warehouse,
    shortcut: "⌘0",
  },
  {
    name: "Customer Data",
    href: "/customer-data",
    icon: Users,
    shortcut: "⌘⇧1",
  },
  {
    name: "Financial Data",
    href: "/financial-data",
    icon: DollarSign,
    shortcut: "⌘⇧2",
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
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  CyberTech
                </h1>
                <p className="text-sm text-gray-500">Team Plan</p>
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

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              ⌘1
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="px-4 space-y-1">
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
    </>
  );
}
