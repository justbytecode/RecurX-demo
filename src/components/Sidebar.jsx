"use client";
import { NavLink } from "./ui/nav-link";
import { useState } from "react";
import { useTheme } from "../context/themeContext";

export default function Sidebar() {
  const {  themeClasses } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const links = [
    { name: "Dashboard", href: "/dashboard", disabled: false },
    {
      name: "Payment Management",
      href: "/dashboard/payment-management",
      disabled: false,
    },
    {
      name: "Subscription Management",
      href: "/dashboard/subscription-management",
      disabled: false,
    },
    {
      name: "Wallet Integration",
      href: "/dashboard/wallet-integration",
      disabled: true,
    },
    {
      name: "API Integration",
      href: "/dashboard/api-integration",
      disabled: false,
    },
    {
      name: "Security & Compliance",
      href: "/dashboard/security-compliance",
      disabled: true,
    },
    {
      name: "Analytics & Reporting",
      href: "/dashboard/analytics-reporting",
      disabled: true,
    },
    {
      name: "LeaderBoard",
      href: "/dashboard/leaderboard",
      disabled: false,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      children: [
          {
          name: "Manage Profile",
          href: "/dashboard/userprofile",
          disabled: false,
        },
        {
          name: "Notification",
          href: "/",
          disabled: true,
        },
      ],
      disabled: false,
    },
    {
      name: "Support & Community",
      href: "/dashboard/support-community",
      disabled: false,
    },
    {
      name: "Invite",
      href: "/dashboard/invite",
      disabled: false,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${themeClasses.background} ${themeClasses.textPrimary} rounded-md shadow-lg border ${themeClasses.border}`}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 ${
            themeClasses.background
          } min-h-screen p-4 shadow-lg border-r ${themeClasses.border}
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary} text-center mt-4`}
        >
          Recurx
        </h2>
        <nav className="space-y-1">
          {links.map((link) => {
            return (
              <div key={link.name}>
                {link?.children ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setShowSettingsDropdown((prev) => !prev)}
                      disabled={link.disabled}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        link.disabled
                          ? `${themeClasses.textMuted} cursor-not-allowed opacity-60`
                          : `${themeClasses.textAccent} hover:${themeClasses.hoverBackground} hover:${themeClasses.textAccent}`
                      }`}
                    >
                      Settings
                      <span className="float-right">
                        {showSettingsDropdown ? "▴" : "▾"}
                      </span>
                    </button>
                    {showSettingsDropdown &&
                      link.children.map((l) => (
                        <NavLink
                          key={l.href}
                          href={l.href}
                          disabled={l.disabled}
                          className={`block p-2 text-sm rounded-lg transition-colors duration-200 ml-4 mt-1 ${
                            l.disabled
                              ? `${themeClasses.textMuted} cursor-not-allowed opacity-60`
                              : `hover:${themeClasses.textAccent}`
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {l.name}
                        </NavLink>
                      ))}
                  </div>
                ) : (
                  <>
                    <NavLink
                      key={link.href}
                      href={link.href}
                      disabled={link.disabled}
                      className={`block p-3 rounded-lg transition-colors duration-200 ${
                        link.disabled
                          ? `${themeClasses.textMuted} cursor-not-allowed opacity-60`
                          : `${themeClasses.textAccent} hover:${themeClasses.hoverBackground} hover:${themeClasses.textAccent}`
                      }`}
                      onClick={() => setIsOpen(false)} // Close mobile menu on link click
                    >
                      {link.name}
                    </NavLink>
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
