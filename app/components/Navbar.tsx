"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, PenSquare } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Navigation() {
  const pathname = usePathname();
  const { isLoggedIn, username, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'work', label: 'Work', href: '/work' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-foreground cursor-pointer">
              BloomLog
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-muted-foreground hidden md:inline">
                {username}
              </span>
              <Link href="/post">
                <Button className="hidden md:flex items-center gap-2">
                  <PenSquare className="size-4" />
                  New Post
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
                className="text-muted-foreground"
              >
                <LogOut className="size-5" />
              </Button>
            </>
          ) : (
            <Link href="/getstarted">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
