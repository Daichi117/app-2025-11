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
    <nav className="fixed top-0 left-0 w-full bg-[#B5CBA6] text-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        <div className="text-2xl font-bold flex-1">MyPortfolio</div>
        <ul className="hidden md:flex space-x-6 flex-1 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-[#F0FFF0] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative">
      {/* ボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-[#2E4600] px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition-colors"
      >
        Get Started
      </button>

      {/* ドロップダウン */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg flex flex-col z-50">
          <Link
            href="/register"
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors rounded-t-md"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors rounded-b-md"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </div>

        {/* モバイル用ハンバーガーメニュー（簡易） */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
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
        </div>
      </div>
    </nav>
  );
}
