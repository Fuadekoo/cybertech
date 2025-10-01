"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Warehouse,
  FileText,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Zap,
  Folder,
  Calendar,
  Inbox,
  Activity,
  HelpCircle,
  LogOut,
  User,
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
];

const sharedItems = [
  {
    name: "Boosts",
    href: "/boosts",
    icon: Zap,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: Folder,
  },
];

const projects = [
  { name: "Personal", color: "bg-green-400", href: "/projects/personal" },
  { name: "Business", color: "bg-purple-400", href: "/projects/business" },
  { name: "Travel", color: "bg-pink-400", href: "/projects/travel" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

        {/* Shared Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Shared</h3>
            <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-1">
            {sharedItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Projects Section */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Projects</h3>
          <div className="space-y-1">
            {projects.map((project) => (
              <Link
                key={project.name}
                href={project.href}
                className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50"
              >
                <div className={`w-3 h-3 rounded-sm ${project.color}`} />
                <span className="text-sm font-medium">{project.name}</span>
              </Link>
            ))}
            <button className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-500 hover:bg-gray-50 w-full">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add New Project</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto px-4 py-4 space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Help</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@cybertech.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@cybertech.com</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="w-4 h-4" />
                    <span>Integrations</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Activity className="w-4 h-4" />
                    <span>History</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <TrendingUp className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-green-700 bg-green-50">
                    <RefreshCw className="w-4 h-4" />
                    <span>Update App</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="px-3 py-2 text-xs text-gray-400 border-t border-gray-200">
                  v1.0.0 • Terms & Conditions
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
