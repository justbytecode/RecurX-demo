"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Award,
} from "lucide-react";

const getRankIcon = (rank) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-orange-500" />;
  return <span className="font-bold text-gray-100">#{rank}</span>;
};

export default function UserLeaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/leaderboard"); // Adjust this path if your route is different
        const data = await res.json();
        if (res.ok && Array.isArray(data.message)) {
          setUsers(data.message);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-10">Loading leaderboard...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 text-slate-100">
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Top Users Leaderboard
          </h2>
          <p className="text-indigo-200 mt-1">Ranked by total points earned</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-700 text-slate-300">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                const globalRank = startIndex + index + 1;
                return (
                  <tr key={user.name} className="hover:bg-slate-700 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center text-white">{getRankIcon(globalRank)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-semibold text-sm">
                          {user.name?.split(" ").map((s) => s[0]).join("")}
                        </div>
                        <div className="ml-4 text-sm font-medium text-white">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-indigo-300">
                        {user.point?.toLocaleString() || 0}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-800 px-4 py-3 border-t border-slate-700 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Showing{" "}
                  <span className="font-medium text-white">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium text-white">{Math.min(endIndex, users.length)}</span>{" "}
                  of{" "}
                  <span className="font-medium text-white">{users.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-2 rounded-l-md border border-slate-600 bg-slate-700 text-sm text-slate-400 hover:bg-slate-600 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "bg-indigo-700 text-white border-indigo-500 z-10"
                            : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-2 rounded-r-md border border-slate-600 bg-slate-700 text-sm text-slate-400 hover:bg-slate-600 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
