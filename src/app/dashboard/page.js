"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import DashboardCharts from "../../components/DashboardCharts";
import { useTheme } from "../../context/themeContext";

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  // Note: You'll need to handle session check differently in client component
  // Consider moving session logic to a separate server component or using useSession
  
  // Dummy data for dashboard
  const dashboardData = {
    totalTransactions: 0,
    activeSubscriptions: 0,
    revenue: 0,
    revenueChange: 0, // percentage change
    transactionChange: 0,
    subscriptionChange: 0,

    // Data for charts
    revenueData: [
      { month: "Jan", revenue: 12000, transactions: 145 },
      { month: "Feb", revenue: 19000, transactions: 210 },
      { month: "Mar", revenue: 15000, transactions: 180 },
      { month: "Apr", revenue: 25000, transactions: 290 },
      { month: "May", revenue: 22000, transactions: 265 },
      { month: "Jun", revenue: 30000, transactions: 340 },
      { month: "Jul", revenue: 28000, transactions: 320 },
      { month: "Aug", revenue: 35000, transactions: 380 },
      { month: "Sep", revenue: 32000, transactions: 360 },
      { month: "Oct", revenue: 40000, transactions: 420 },
      { month: "Nov", revenue: 38000, transactions: 400 },
      { month: "Dec", revenue: 45000, transactions: 480 },
    ],

    dailyData: [
      { day: "Mon", amount: 2400 },
      { day: "Tue", amount: 1398 },
      { day: "Wed", amount: 9800 },
      { day: "Thu", amount: 3908 },
      { day: "Fri", amount: 4800 },
      { day: "Sat", amount: 3800 },
      { day: "Sun", amount: 4300 },
    ],
  };

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

  return (
    <div className={`flex min-h-screen ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="flex-1">
        <div className={`p-8 min-h-screen ${
          isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
        }`}>
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Dashboard
            </h1>
            <p className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className={`transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-500/10'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>
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
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dashboardData.totalTransactions.toLocaleString()}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    dashboardData.transactionChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatPercentage(dashboardData.transactionChange)} from last month
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-green-500/20' 
                : 'bg-white border-gray-200 hover:shadow-xl hover:shadow-green-500/10'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>
                  Active Subscriptions
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
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dashboardData.activeSubscriptions.toLocaleString()}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    dashboardData.subscriptionChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatPercentage(dashboardData.subscriptionChange)} from last month
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-purple-500/20' 
                : 'bg-white border-gray-200 hover:shadow-xl hover:shadow-purple-500/10'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>
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
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatCurrency(dashboardData.revenue)}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    dashboardData.revenueChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatPercentage(dashboardData.revenueChange)} from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <DashboardCharts
            revenueData={dashboardData.revenueData}
            dailyData={dashboardData.dailyData}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}