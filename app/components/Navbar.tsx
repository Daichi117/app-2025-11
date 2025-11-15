// components/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Post", href: "/post" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-b-[#B5CBA6] z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        {/* --- 左：ブランドロゴ --- */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-semibold tracking-wide text-[#2E4600]">
            BloomLog
          </h1>
        </div>

        {/* --- 中央：PCナビ --- */}
        <ul className="hidden md:flex justify-center flex-1 space-x-10 text-lg">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-[#2E4600] transition-colors font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* --- 右：PCの Get Started + Dropdown --- */}
        <div className="hidden md:block relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-[#2E4600] px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition-colors"
          >
            Get Started
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <Link
                href="/register"
                className="block px-2 py-2 text-gray-800 hover:bg-gray-100 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="block px-2 py-2 text-gray-800 hover:bg-gray-100 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* --- モバイル：ハンバーガー --- */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 text-black flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/register"
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
