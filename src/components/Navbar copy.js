"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 transition-all duration-300 w-full border-none ${
        isScrolled
          ? "bg-black/50 backdrop-blur-sm shadow-sm border-none"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20 sm:h-16 md:h-18 lg:h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-white"
              >
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 0H9.43669V17.6813H22V0Z" fill="#1C75DD" />
                  <path
                    d="M7.95862 0C6.91347 0 5.87856 0.229265 4.91297 0.674704C3.94738 1.12014 3.07003 1.77303 2.331 2.5961C1.59197 3.41916 1.00574 4.39628 0.60578 5.47167C0.20582 6.54706 -3.8147e-05 7.69965 -3.8147e-05 8.86364C-3.8147e-05 10.0276 0.20582 11.1802 0.60578 12.2556C1.00574 13.331 1.59197 14.3081 2.331 15.1312C3.07003 15.9542 3.94738 16.6071 4.91297 17.0526C5.87856 17.498 6.91347 17.7273 7.95862 17.7273L7.95862 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.832 26C3.10522 26 1.70539 24.5449 1.70539 22.75C1.70539 20.9551 3.10522 19.5 4.832 19.5C6.55878 19.5 7.95862 20.9551 7.95862 22.75C7.95862 24.5449 6.55878 26 4.832 26Z"
                    fill="white"
                  />
                  <path d="M15 22L9.45322 19V26H22L15 22Z" fill="white" />
                </svg>
              </motion.span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center flex-1 mx-4 xl:mx-8">
            <div className="bg-[#1f1c2f] rounded-full px-4 xl:px-6 py-2 shadow-lg">
              <nav className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                {/* <NavLink href="/airdrop" className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 ">Airdrop</NavLink> */}
                <NavLink
                  href="/product"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Product
                </NavLink>
                <NavLink
                  href="/news"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  News
                </NavLink>
                <NavLink
                  href="/airdrop"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Airdrop
                </NavLink>
                <NavLink
                  href="/pricing"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Pricing
                </NavLink>
                <NavLink
                  href="/career"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Career
                </NavLink>
                <NavLink
                  href="/team"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  About us
                </NavLink>
                <NavLink
                  href="/contact-us"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Contact us
                </NavLink>
              </nav>
            </div>
          </div>

          {/* Medium screens navigation */}
          <div className="hidden md:flex lg:hidden md:items-center md:justify-center flex-1 mx-2">
            <div className="bg-[#1f1c2f] rounded-full px-3 py-2 shadow-lg">
              <nav className="flex items-center space-x-3">
                {/* <NavLink href="/airdrop" className="text-white text-xs">Airdrop</NavLink> */}
                <NavLink href="/product" className="text-white text-xs">
                  Product
                </NavLink>
                <NavLink href="/pricing" className="text-white text-xs">
                  Pricing
                </NavLink>
                <NavLink href="/career" className="text-white text-xs">
                  Career
                </NavLink>
                <NavLink href="/team" className="text-white text-xs">
                  About
                </NavLink>
                <NavLink href="/contact-us" className="text-white text-xs">
                  Contact
                </NavLink>
              </nav>
            </div>
          </div>

          {/* Right: Waitlist Button */}
          <div className="hidden md:flex flex-shrink-0">
            <Button
              asChild
              variant="ghost"
              className="text-gray-300 hover:text-white hover:scale-110 text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 py-1 md:py-2 bg-[linear-gradient(top_bottom,_#FFFFFF,_#8B8B8B)] border-1 border-white "
            >
              <Link href="/signin">Request Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 h-8 w-8 sm:h-10 sm:w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-800 backdrop-blur-lg"
        >
          <div className="px-3 sm:px-4 py-4 flex flex-col space-y-3 sm:space-y-4 font-medium min-h-screen bg-black/90">
            {/* <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/airdrop">
              Airdrop
            </MobileNavLink> */}
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/product"
            >
              Product
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/pricing"
            >
              Pricing
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/career"
            >
              Career
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/team"
            >
              About us
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/contact-us"
            >
              Contact us
            </MobileNavLink>

            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              <Button
                asChild
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base"
              >
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Go for demo
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLink({ href, children, className }) {
  return (
    <Link
      href={href}
      className={`${className} hover:text-white transition-colors duration-200 whitespace-nowrap`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3 sm:py-4 text-gray-300 hover:text-white transition-colors duration-200 text-base sm:text-lg border-b border-gray-800/50 last:border-b-0"
    >
      {children}
    </Link>
  );
}
