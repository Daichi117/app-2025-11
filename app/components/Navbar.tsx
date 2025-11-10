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
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-3">
        {/* 左：ロゴ */}
        <div className="text-2xl font-bold flex-shrink-0">MyPortfolio</div>

        {/* 中央：ナビ */}
        <ul className="hidden md:flex justify-center flex-1 space-x-8 px-4">
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

        <div className="hidden md:block relative flex-shrink-0">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="bg-white text-[#2E4600] px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition-colors w-full"
  >
    Get Started
  </button>

  {/* ドロップダウン */}
  {isOpen && (
    <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg flex flex-col z-50">
      <Link
        href="/register"
        className="px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors rounded-t-md w-full text-center"
        onClick={() => setIsOpen(false)}
      >
        Register
      </Link>
      <Link
        href="/login"
        className="px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors rounded-b-md w-full text-center"
        onClick={() => setIsOpen(false)}
      >
        Login
      </Link>
    </div>
  )}
</div>

        {/* モバイル用ハンバーガーメニュー */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
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

          {/* モバイルメニュー */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg flex flex-col z-50 text-black">
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
              {/* モバイルではここにGet Startedの中身を入れる */}
              <Link
                href="/register"
                className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-t-md"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-b-md"
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
