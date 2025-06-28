"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "../context/themeContext"; // Adjust path as needed

export default function DashboardCharts({ revenueData, dailyData }) {
  const { isDarkMode } = useTheme();

  // Custom tooltip for better formatting with theme support
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-xl ${
          isDarkMode 
            ? 'bg-slate-800 border border-slate-600' 
            : 'bg-white border border-gray-300'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            {`${label}`}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.dataKey === 'revenue' ? '$' : ''}${entry.value.toLocaleString()}`}
              {entry.dataKey === 'revenue' ? '' : ' transactions'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const DailyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-xl ${
          isDarkMode 
            ? 'bg-slate-800 border border-slate-600' 
            : 'bg-white border border-gray-300'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            {`${label}`}
          </p>
          <p className="text-sm font-medium text-blue-500">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Theme-based colors
  const gridColor = isDarkMode ? '#475569' : '#E5E7EB';
  const textColor = isDarkMode ? '#94A3B8' : '#6B7280';
  const tooltipBg = isDarkMode ? '#1E293B' : '#FFFFFF';
  const tooltipBorder = isDarkMode ? '#475569' : '#D1D5DB';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <Card className={`col-span-1 lg:col-span-2 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Revenue & Transaction Trends
          </CardTitle>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Monthly performance overview
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="revenue"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  yAxisId="transactions"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#60A5FA"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="transactions"
                  type="monotone"
                  dataKey="transactions"
                  stroke="#34D399"
                  strokeWidth={2}
                  dot={{ fill: '#34D399', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#34D399', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Daily Revenue Wave Chart */}
      <Card className={isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
      }>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Daily Revenue
          </CardTitle>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            This week's performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<DailyTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#A78BFA"
                  strokeWidth={3}
                  fill="url(#dailyGradient)"
                  dot={{ fill: '#A78BFA', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#A78BFA', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Volume Bar Chart */}
      <Card className={isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
      }>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Transaction Volume
          </CardTitle>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Weekly transaction count
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Transactions']}
                  labelStyle={{ color: textColor }}
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    color: isDarkMode ? '#FFFFFF' : '#1F2937'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#FBBF24"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}