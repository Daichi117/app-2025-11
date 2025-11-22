"use client";

import { Button } from "../ui/button";
import { LogOut, PenSquare } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  username?: string;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn, onLogout, username }: NavigationProps) {
  const navItems = [
    { page: "home", label: "Home" },
    { page: "about", label: "About" },
    { page: "work", label: "Work" },
    { page: "contact", label: "Contact" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            className="text-foreground cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            The Blog
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors ${
                  currentPage === item.page
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-muted-foreground hidden md:inline">{username}</span>

              <Button 
                className="hidden md:flex items-center gap-2"
                onClick={() => onNavigate("post")}
              >
                <PenSquare className="size-4" />
                New Post
              </Button>

              <Button variant="ghost" size="icon" onClick={onLogout} className="text-muted-foreground">
                <LogOut className="size-5" />
              </Button>
            </>
          ) : (
            <Button onClick={() => onNavigate("getstarted")}>
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
