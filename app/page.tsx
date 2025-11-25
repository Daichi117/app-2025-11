"use client";
import { useState,useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { HomePage } from '@pages/home/HomePage'
import { AboutPage } from '@pages/AboutPage'
import { WorkPage } from '@pages/WorkPage';
import {PostPage} from "@pages/PostPage"
import { ContactPage } from "./components/pages/ContactPage";
import { GetStartedPage } from "./components/pages/GetStartedPage";

import Navigation from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from 'sonner';
import { getAllPosts, getPostById } from "./lib/posts";

function Router() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const posts = getAllPosts();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    // Intercept link clicks for client-side routing
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const newPath = new URL(link.href).pathname;
        window.history.pushState({}, "", newPath);
        setCurrentPath(newPath);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Route matching
  let content;
  
  if (currentPath === "/") {
    content = <HomePage posts={posts} />;
  } else if (currentPath === "/about") {
    content = <AboutPage />;
  } else if (currentPath === "/work") {
    content = <WorkPage posts={posts} />;
  } else if (currentPath === "/contact") {
    content = <ContactPage />;
  } else if (currentPath === "/getstarted") {
    content = <GetStartedPage />;
  } else if (currentPath === "/post") {
    content = <PostPage post={posts}/>;
  }
  return content;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-background min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}