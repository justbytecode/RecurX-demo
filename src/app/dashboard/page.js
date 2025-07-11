"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import DashboardCharts from "../../components/DashboardCharts";
import { useTheme } from "../../context/themeContext";
import { getMetrics } from "../../smartcontractsHelpers/index";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMetrics();
        console.log(data);
        setMetrics(data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
      >
        Loading metrics...
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="flex-1">
        <div
          className={`p-8 min-h-screen ${
            isDarkMode ? "bg-slate-900" : "bg-gray-50"
          }`}
        >
          <div className="mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard
            </h1>
            <p className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Transactions */}
            <Card
              className={`transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20"
                  : "bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-500/10"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Total Transactions
                </CardTitle>
                <div className="h-4 w-4 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {(metrics?.totalTransactions ?? 0).toLocaleString()}
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  +5.6% from last month
                </p>
              </CardContent>
            </Card>

            {/* Total Subscriptions */}
            <Card
              className={`transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-green-500/20"
                  : "bg-white border-gray-200 hover:shadow-xl hover:shadow-green-500/10"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Total Subscriptions
                </CardTitle>
                <div className="h-4 w-4 text-green-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {(metrics?.totalSubscriptions ?? 0).toLocaleString()}
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  +3.1% from last month
                </p>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card
              className={`transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-purple-500/20"
                  : "bg-white border-gray-200 hover:shadow-xl hover:shadow-purple-500/10"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Revenue (USD)
                </CardTitle>
                <div className="h-4 w-4 text-purple-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <path d="M2 10h20"></path>
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {formatCurrency(metrics?.totalRevenue ?? 0)}
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  +4.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts - Replace [] with live data later */}
          <DashboardCharts
            revenueData={[]}
            dailyData={[]}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}
